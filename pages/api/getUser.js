export default function handler(req, res) {
    const token = req.headers.authorization; // ดึง Token จาก Header
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" }); // ถ้าไม่มี Token, ส่งกลับ 401
    }
  
    // ตรวจสอบ Token (คุณอาจต้องเพิ่มการตรวจสอบความถูกต้องของ Token ที่นี่)
    res.status(200).json({ message: "Authorized Access", user: { id: 1, email: "user@example.com" } });
  }
  