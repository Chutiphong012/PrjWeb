import { useState } from "react";
import Head from 'next/head';  // import Head สำหรับการตั้งชื่อเพจ

export default function Analyze() {
  const [result, setResult] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [symptoms, setSymptoms] = useState({
    leaves: "",
    structure: "",
  });

  // ฟังก์ชันจัดการเมื่อกดปุ่ม
  const handleAnalyze = (status) => {
    setSeverity(null);
    setSymptoms({ leaves: "", structure: "" });
    if (status === "healthy") {
      setResult("ผลการวิเคราะห์: ไม่พบโรค");
    } else if (status === "disease") {
      setResult("ผลการวิเคราะห์: พบโรค");
    }
  };

  const handleSymptomChange = (field, value) => {
    setSymptoms((prev) => ({ ...prev, [field]: prev[field] === value ? "" : value }));
  };

  return (
    <>
      <Head>
        <title>วิเคราะห์โรค</title> {/* ตั้งชื่อเพจในแท็บของเบราว์เซอร์ */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen">
        <h1 className="text-center text-2xl md:text-4xl font-bold py-4 px-4 text-white">วิเคราะห์โรค</h1>

        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
          {/* ปุ่มเลือกผลการวิเคราะห์ */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => handleAnalyze("healthy")}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              ไม่เป็นโรครากเน่า
            </button>
            <button
              onClick={() => handleAnalyze("disease")}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              เป็นโรครากเน่า
            </button>
          </div>

          {/* แสดงผลการวิเคราะห์ */}
          {result && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                result.includes("ไม่พบ")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {result}
            </div>
          )}

          {/* แสดงฟอร์มเลือกความรุนแรงเฉพาะเมื่อพบโรค */}
          {result === "ผลการวิเคราะห์: พบโรค" && (
            <div className="mt-6">
              <h2 className="text-lg font-bold mb-4">ลักษณะอาการของ</h2>

              {/* ถามอาการเกี่ยวกับใบ */}
              <div className="mb-4">
                <h3 className="text-md font-bold mb-2">ใบ</h3>
                <div className="space-y-2">
                  <div>
                    <input
                      type="radio"
                      name="leaves"
                      value="ใบเปลี่ยนเป็นสีเหลืองซีด"
                      checked={symptoms.leaves === "ใบเปลี่ยนเป็นสีเหลืองซีด"}
                      onChange={(e) => handleSymptomChange("leaves", e.target.value)}
                    />
                    <label className="ml-2">ใบเปลี่ยนเป็นสีเหลืองซีด</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="leaves"
                      value="ใบเริ่มร่วง"
                      checked={symptoms.leaves === "ใบเริ่มร่วง"}
                      onChange={(e) => handleSymptomChange("leaves", e.target.value)}
                    />
                    <label className="ml-2">ใบเริ่มร่วง</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="leaves"
                      value="ใบร่วงเยอะหรือร่วงจนหมดต้น"
                      checked={symptoms.leaves === "ใบร่วงเยอะหรือร่วงจนหมดต้น"}
                      onChange={(e) => handleSymptomChange("leaves", e.target.value)}
                    />
                    <label className="ml-2">ใบร่วงเยอะหรือร่วงจนหมดต้น</label>
                  </div>
                </div>
              </div>

              {/* ถามอาการเกี่ยวกับลำต้น กิ่ง ราก */}
              <div className="mb-4">
                <h3 className="text-md font-bold mb-2">ลำต้น กิ่ง ราก</h3>
                <div className="space-y-2">
                  <div>
                    <input
                      type="radio"
                      name="structure"
                      value="ลำต้น,กิ่ง,รากมีสีเปลือกที่เข้มเป็นจุดฉ่ำน้ำหรือมีรอยแตกของแผลสีน้ำตาล"
                      checked={symptoms.structure === "ลำต้น,กิ่ง,รากมีสีเปลือกที่เข้มเป็นจุดฉ่ำน้ำหรือมีรอยแตกของแผลสีน้ำตาล"}
                      onChange={(e) => handleSymptomChange("structure", e.target.value)}
                    />
                    <label className="ml-2">ลำต้น กิ่ง รากมีสีเปลือกที่เข้มเป็นจุดฉ่ำน้ำหรือมีรอยแตกของแผลสีน้ำตาล</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="structure"
                      value="แผลบริเวณลำต้น,กิ่ง,รากมีขนาดใหญ่"
                      checked={symptoms.structure === "แผลบริเวณลำต้น,กิ่ง,รากมีขนาดใหญ่"}
                      onChange={(e) => handleSymptomChange("structure", e.target.value)}
                    />
                    <label className="ml-2">แผลบริเวณลำต้น กิ่ง รากมีขนาดใหญ่</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="structure"
                      value="รากเสียหายอย่างหนัก ลำต้นเน่า"
                      checked={symptoms.structure === "รากเสียหายอย่างหนัก ลำต้นเน่า"}
                      onChange={(e) => handleSymptomChange("structure", e.target.value)}
                    />
                    <label className="ml-2">รากเสียหายอย่างหนัก ลำต้นเน่า</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
