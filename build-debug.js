const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Check TypeScript version
console.log("TypeScript version:");
execSync("npx tsc --version", { stdio: "inherit" });

// Run TypeScript with verbose logging
console.log("\nRunning TypeScript with verbose logging:");
try {
  execSync("npx tsc --listFiles --outDir ./dist", { stdio: "inherit" });
  console.log("TypeScript compilation completed successfully");
} catch (error) {
  console.error("TypeScript compilation failed:", error.message);
}

// Check if files were generated
console.log("\nChecking output directory:");
const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath, { recursive: true });
  console.log("Generated files:", files);
} else {
  console.log("Output directory does not exist");
}

// Run the Babel step
console.log("\nRunning Babel:");
try {
  execSync(
    'npx babel dist --out-dir dist --extensions ".js,.jsx" --copy-files',
    { stdio: "inherit" }
  );
  console.log("Babel processing completed successfully");
} catch (error) {
  console.error("Babel processing failed:", error.message);
}
