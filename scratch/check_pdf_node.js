try {
  const nodePdf = require("pdf-parse/node");
  console.log("pdf-parse/node exports:", Object.keys(nodePdf));
} catch (e) {
  console.error("Failed to require pdf-parse/node:", e.message);
}
