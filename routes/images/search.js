const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

module.exports = async (req, res) => {
  const { API, API_ACCESS_KEY } = process.env;
  const { query } = req.query;

  const request = await fetch(`${API}?query=${query}&client_id=${API_ACCESS_KEY}`);
  const json = await request.json();

  res.send(json.results);
}
