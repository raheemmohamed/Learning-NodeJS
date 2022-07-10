// Process.argv is related to node and you can pass argument and run the file using following command
// File run command: node processArg.js learn
const mission = process.argv[2];

if (mission == "learn") {
  console.log("im Learning NodeJS");
} else {
  console.log("im Not learning NodeJS");
}
