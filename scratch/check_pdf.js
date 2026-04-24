const { PDFParse } = require("pdf-parse");
const fs = require("fs");

async function test() {
  console.log("PDFParse:", PDFParse);
  if (!PDFParse) {
    console.error("PDFParse is undefined! Trying require('pdf-parse').default...");
    const pdf = require("pdf-parse");
    console.log("pdf-parse exports:", Object.keys(pdf));
  }
}

test();
