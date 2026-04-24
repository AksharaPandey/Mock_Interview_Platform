import mammoth from "mammoth";
import PDFParser from "pdf2json";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";



export const runtime = "nodejs";

const KEYWORDS = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node",
  "api",
  "sql",
  "mongodb",
  "docker",
  "git",
];

const VIDEO_RECOMMENDATIONS: Record<string, { title: string; channel: string; url: string }> = {
  system_design: {
    title: "System Design Interview: Scale From 0 to 1M Users",
    channel: "ByteByteGo",
    url: "https://www.youtube.com/watch?v=UzLMhqg3_Wc",
  },
  behavioral: {
    title: "Behavioral Interview Questions and STAR Method",
    channel: "Google Career Certificates",
    url: "https://www.youtube.com/watch?v=ws9WCecM6g8",
  },
  performance: {
    title: "React Performance Patterns You Should Know",
    channel: "Web Dev Simplified",
    url: "https://www.youtube.com/watch?v=cu_hd4f1RVs",
  },
};

const getVideosFromWeakAreas = (weakAreas: string[]) =>
  Array.from(new Set(weakAreas))
    .slice(0, 3)
    .map((area) => VIDEO_RECOMMENDATIONS[area])
    .filter(Boolean);

const parseAiJson = (text: string) => {
  const cleaned = text.trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const fenced = cleaned.match(/```json\s*([\s\S]*?)```/i);
    if (fenced?.[1]) return JSON.parse(fenced[1].trim());

    const jsonSlice = cleaned.match(/\{[\s\S]*\}/);
    if (jsonSlice?.[0]) return JSON.parse(jsonSlice[0]);

    throw new Error("AI response was not valid JSON.");
  }
};

const extractResumeText = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const mime = file.type.toLowerCase();
  const extension = file.name.toLowerCase().split(".").pop();

  // ✅ Replace with this
  if (mime.includes("pdf") || extension === "pdf") {
    try {
      const text = await new Promise<string>((resolve, reject) => {
        const parser = new PDFParser(null, true);

        parser.on("pdfParser_dataReady", () => {
          resolve(parser.getRawTextContent());
        });

        parser.on("pdfParser_dataError", (err: unknown) => {
          reject(new Error("PDF parsing failed: " + String(err)));
        });

        parser.parseBuffer(buffer);
      });

      return text.trim();
    } catch (error) {
      console.error("pdf2json extraction failed:", error);
      throw new Error("Failed to extract text from PDF.");
    }
  }
  if (
    mime.includes("officedocument.wordprocessingml.document") ||
    extension === "docx"
  ) {
    const parsed = await mammoth.extractRawText({ buffer });
    return parsed.value || "";
  }

  if (mime.includes("text/plain") || extension === "txt") {
    return buffer.toString("utf-8");
  }

  throw new Error("Unsupported file type. Please upload PDF, DOCX, or TXT.");
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const resume = formData.get("resume");
    const targetRole = String(formData.get("targetRole") || "Software Engineer");

    if (!(resume instanceof File)) {
      return Response.json(
        { success: false, error: "Resume file is required." },
        { status: 400 }
      );
    }

    const extractedText = await extractResumeText(resume);
    const normalizedText = extractedText.toLowerCase();

    if (!normalizedText.trim()) {
      return Response.json(
        { success: false, error: "Could not read content from resume." },
        { status: 400 }
      );
    }

    const hasExperience = /experience|work history|employment/.test(normalizedText);
    const hasProjects = /projects|portfolio|case study/.test(normalizedText);
    const hasSkills = /skills|technical skills|tech stack/.test(normalizedText);
    const hasEducation = /education|university|college|bachelor|master/.test(normalizedText);
    const hasMetrics = /\b\d+%|\b\d+\+|\$\d+|\b\d+\s*(users|clients|projects)\b/.test(
      normalizedText
    );

    const matchedKeywords = KEYWORDS.filter((word) =>
      normalizedText.includes(word)
    );
    const keywordCoverage = matchedKeywords.length / KEYWORDS.length;

    let score = 35;
    score += hasExperience ? 12 : 0;
    score += hasProjects ? 12 : 0;
    score += hasSkills ? 10 : 0;
    score += hasEducation ? 8 : 0;
    score += hasMetrics ? 8 : 0;
    score += Math.round(keywordCoverage * 15);
    score = Math.max(0, Math.min(100, score));

    const strengths: string[] = [];
    const improvements: string[] = [];
    const weakAreas: string[] = [];

    if (hasExperience) strengths.push("Work experience section is present.");
    else {
      improvements.push("Add a clear work experience section with role impact.");
      weakAreas.push("behavioral");
    }

    if (hasProjects) strengths.push("Projects are included, which supports technical credibility.");
    else {
      improvements.push("Add 2-3 projects with stack, problem, and business outcome.");
      weakAreas.push("system_design");
    }

    if (hasSkills) strengths.push("Skills section is explicitly listed.");
    else improvements.push("Add a dedicated technical skills section.");

    if (!hasMetrics) {
      improvements.push("Use quantifiable impact (%, users, revenue, latency reduction).");
      weakAreas.push("performance");
    } else {
      strengths.push("Achievements include measurable impact.");
    }

    if (matchedKeywords.length < 4) {
      improvements.push("Increase job-relevant keywords to improve ATS discoverability.");
    } else {
      strengths.push("Good ATS keyword coverage for technical roles.");
    }

    const suggestedVideos = getVideosFromWeakAreas(weakAreas);
    let personalizedSummary =
      "Solid baseline resume. Keep improving structure, measurable impact, and role-specific keyword alignment.";
    let analysisMode: "ai-enhanced" | "rule-based" = "rule-based";
    let interviewFocus: string[] = [];

    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      try {
        const { text } = await generateText({
          model: google("gemini-2.0-flash-001"),
          prompt: `You are an expert resume reviewer and interview coach.
Analyze this resume text for a target role.

Target role: ${targetRole}
Resume text:
${extractedText.slice(0, 12000)}

Return STRICT JSON only in this exact shape:
{
  "summary": "2 sentence concise role-specific assessment",
  "strengths": ["max 3 bullet strings"],
  "improvements": ["max 4 bullet strings"],
  "weakAreas": ["system_design" | "behavioral" | "performance"],
  "interviewFocus": ["max 4 specific interview prep areas"]
}
`,
        });

        const parsed = parseAiJson(text);

        const aiStrengths = Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 3) : [];
        const aiImprovements = Array.isArray(parsed.improvements) ? parsed.improvements.slice(0, 4) : [];
        const aiWeakAreas = Array.isArray(parsed.weakAreas) ? parsed.weakAreas : [];
        const aiInterviewFocus = Array.isArray(parsed.interviewFocus)
          ? parsed.interviewFocus.slice(0, 4)
          : [];

        if (typeof parsed.summary === "string" && parsed.summary.trim()) {
          personalizedSummary = parsed.summary.trim();
        }

        const mergedStrengths = Array.from(new Set([...aiStrengths, ...strengths])).slice(0, 4);
        const mergedImprovements = Array.from(new Set([...aiImprovements, ...improvements])).slice(0, 5);
        const mergedWeakAreas = Array.from(
          new Set([...aiWeakAreas.filter((item: string) => item in VIDEO_RECOMMENDATIONS), ...weakAreas])
        );

        analysisMode = "ai-enhanced";
        interviewFocus = aiInterviewFocus;

        return Response.json({
          success: true,
          data: {
            atsScore: score,
            strengths: mergedStrengths,
            improvements: mergedImprovements,
            matchedKeywords,
            suggestedVideos: getVideosFromWeakAreas(mergedWeakAreas),
            personalizedSummary,
            targetRole,
            interviewFocus,
            analysisMode,
          },
        });
      } catch {
        // Fall through to deterministic rule-based result if AI fails.
      }
    }

    return Response.json({
      success: true,
      data: {
        atsScore: score,
        strengths,
        improvements,
        matchedKeywords,
        suggestedVideos,
        personalizedSummary,
        targetRole,
        interviewFocus,
        analysisMode,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Resume analysis failed.";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
