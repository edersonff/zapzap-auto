const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const route = process.argv[2];

async function verify() {
  try {
    await axios.post(
      process.env.BASE_URL + "/api/job/" + route,
      {},
      {
        headers: {
          Authorization: "Bearer " + process.env.JOB_TOKEN,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

verify();
