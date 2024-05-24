const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const cmd = process.argv.slice(2).join(" ");

var child_process = require("child_process");

function system(cmd) {
  child_process.exec(`sleep 5 && npm run startup`, { stdio: "inherit" });

  child_process.execSync(cmd, { stdio: "inherit" });
}

system(cmd);
