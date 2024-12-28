export default async function handler(req, res) {
    const apiKey = process.env.API_KEY;
    const response = await fetch('https://api.example.com/data', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  }
  