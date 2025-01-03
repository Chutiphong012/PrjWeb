import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router"; // import useRouter
import Link from "next/link"; // import Link from Next.js

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter(); // สร้างตัวแปร router เพื่อใช้ในการนำทาง

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost/PrjWeb/database/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log(data)
      if (data.status==="success") {
        // เก็บ Token ใน localStorage
        localStorage.setItem("userId", data.userId);
  
        alert("เข้าสู่ระบบสำเร็จ");
        router.push("/"); // ส่งไปหน้า index.js
      } else {
        alert(`เกิดข้อผิดพลาด: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <>
      <Head>
        <title>เข้าสู่ระบบ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-4">เข้าสู่ระบบ</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">อีเมล</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">รหัสผ่าน</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          
          <div className="mt-4 text-center">
            <Link href="/register" className="text-blue-500 underline">
              ยังไม่เป็นสมาชิก? สมัครเลย!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
