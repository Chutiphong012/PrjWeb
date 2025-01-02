// pages/api/get-location.js
import { getLocationFromDatabase } from '../../lib/database'; // ฟังก์ชันดึงข้อมูลจากฐานข้อมูล

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing user id' });
  }
  console.log(id)
  try {
    const location = await getLocationFromDatabase(id);

    if (!location) {
      return res.status(404).json({ error: 'No location data found' });
    }
    console.log(id)

    res.status(200).json(location);
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
