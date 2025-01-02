import mysql from 'mysql2/promise';

// ตัวอย่างการเชื่อมต่อฐานข้อมูล
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nextjs_db',
});

export const getLocationFromDatabase = async (userId) => {
  try {
    const [rows] = await connection.execute('SELECT latitude, longitude FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return null;
    }
    console.log(rows)
    return rows[0]; // คืนค่าพิกัดจากฐานข้อมูล
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch location data');
  }
};
