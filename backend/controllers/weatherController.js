const axios = require("axios");

exports.getWeather = async (req, res) => {

try {

const location = req.query.location || "Punjab";

const apiKey = process.env.WEATHER_API_KEY;

const response = await axios.get(
`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
);

res.json({
location: response.data.name,
temperature: response.data.main.temp,
condition: response.data.weather[0].description
});

}

catch(error){

res.status(500).json({
message: "Weather fetch failed"
});

}

};