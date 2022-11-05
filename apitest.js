require('dotenv').config()
const axios = require('axios')

const riotUrl =
  "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations";

const result = async () => {
  let response = null;
  try {
    response = await axios.get(`${riotUrl}?api_key=${process.env.API_KEY}`);
    console.log(response.data.freeChampionIds)
  } catch (err) {
    console.log(err.message);
  }
};

result()



