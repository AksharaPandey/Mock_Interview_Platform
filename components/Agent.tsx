"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { Video, VideoOff, Download, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  type?: string;
}

const Agent = ({ userName, interviewId }: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [callError, setCallError] = useState<string | null>(null);

  // Phase 2: Video Recording States
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : "";

  useEffect(() => {
    const handleCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      console.log("Call started");

      // Start recording automatically if webcam is on
      if (isWebcamOn && videoRef.current?.srcObject) {
        startRecording(videoRef.current.srcObject as MediaStream);
      }
    };

    const handleCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      setIsSpeaking(false);
      console.log("Call ended");
      stopRecording();
    };

    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [...prev, message.transcript]);
      }
    };

    // Attach Vapi event listeners
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("message", handleMessage);

    return () => {
      // Cleanup event listeners on unmount
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("message", handleMessage);
      vapi.stop();

      // Ensure webcam turns off if navigating away
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [isWebcamOn]);

  const toggleWebcam = async () => {
    if (isWebcamOn) {
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) videoRef.current.srcObject = null;
      setIsWebcamOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsWebcamOn(true);
        // Clear previous recordings when starting a new session
        setRecordedVideoUrl(null);
        chunksRef.current = [];
      } catch (e) {
        console.error(e);
        alert("Failed to access webcam/microphone. Check permissions.");
      }
    }
  };

  const startRecording = (stream: MediaStream) => {
    chunksRef.current = [];
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleCall = async () => {
    if (callStatus === CallStatus.CONNECTING || callStatus === CallStatus.ACTIVE) return;
    
    setCallStatus(CallStatus.CONNECTING);
    setCallError(null);
    try {
      // Ensure any previous session is fully stopped
      await vapi.stop();
      
      // Start the Vapi call using the config from constants
      await vapi.start(interviewer);
    } catch (error) {
      console.error("Failed to start Vapi call:", error);
      setCallError("Failed to start interview. Check microphone permission and VAPI key setup.");
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async () => {
    try {
      await vapi.stop();
      setCallStatus(CallStatus.FINISHED);
    } catch (error) {
      console.error("Failed to end call:", error);
      setCallError("Something went wrong while ending the interview. Please try once more.");
    }
  };

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar h-20 w-20">
            <Image 
              src="/ai-interviewer.png" 
              alt="Sarah" 
              width={80} 
              height={80} 
              className={cn(
                "rounded-full object-cover w-full h-full transition-all duration-500",
                isSpeaking && "scale-105 brightness-110"
              )} 
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3 className="text-lg">Sarah (AI Interviewer)</h3>
        </div>

        <div className="card-border">
          <div className="card-content flex flex-col items-center">

            <div className="relative group">
              <div className={cn(
                "w-[120px] h-[120px] rounded-full overflow-hidden bg-dark-200",
                !isWebcamOn && "flex items-center justify-center border-none"
              )}>
                {isWebcamOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover -scale-x-100"
                  />
                ) : (
                  <Image
                    src="/user-profile.jpeg"
                    alt="profile-image"
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                  />
                )}
              </div>

              <button
                onClick={toggleWebcam}
                className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border border-gray-600 hover:bg-gray-700 transition z-10"
              >
                {isWebcamOn ? (
                  <VideoOff className="w-4 h-4 text-white" />
                ) : (
                  <Video className="w-4 h-4 text-white" />
                )}
              </button>
            </div>

            <h3 className="mt-4">{userName}</h3>

            {recordedVideoUrl && callStatus === CallStatus.FINISHED && (
              <a
                href={recordedVideoUrl}
                download="interview-recording.webm"
                className="mt-6 flex items-center gap-2 text-xs bg-brand-primary text-dark-100 font-bold px-4 py-2 rounded-full hover:bg-brand-primary/90 transition shadow-lg"
              >
                <Download className="w-3 h-3" />
                Download Recording
              </a>
            )}

          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border mt-8">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center mt-10">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call" onClick={handleCall} disabled={callStatus === CallStatus.CONNECTING}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            />
            <span className="relative">
              {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End Interview
          </button>
        )}
      </div>

      {callError && (
        <p className="text-sm text-red-500 text-center mt-6 font-medium">{callError}</p>
      )}

      {callStatus === CallStatus.FINISHED && (
        <div className="w-full mt-10 flex flex-wrap items-center justify-center gap-4">
          {interviewId && (
            <button
              type="button"
              onClick={() => router.push(`/interviews/${interviewId}/feedback`)}
              className="btn-primary"
            >
              View Feedback
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push("/interviews/history")}
            className="btn-secondary"
          >
            History
          </button>
        </div>
      )}
    </>
  );
};

export default Agent;
