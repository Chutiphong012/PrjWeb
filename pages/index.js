import { useState, useEffect } from "react";
import Head from 'next/head';

export default function Home() {
  const [province, setProvince] = useState("กรุงเทพมหานคร");
  const [forecast, setForecast] = useState({});
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingCurrent, setLoadingCurrent] = useState(true);

  const provinces = [
    "กระบี่", "กรุงเทพมหานคร", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร",
    "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท",
    "ชัยภูมิ", "ชุมพร", "ตรัง", "ตราด", "ตาก",
    "นครนายก", "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช",
    "นครสวรรค์", "นนทบุรี", "นราธิวาส", "น่าน", "บึงกาฬ",
    "บุรีรัมย์", "ปทุมธานี", "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี",
    "พระนครศรีอยุธยา", "พะเยา", "พังงา", "พัทลุง", "พิจิตร",
    "พิษณุโลก", "ภูเก็ต", "มหาสารคาม", "มุกดาหาร", "ยะลา",
    "ยโสธร", "ระนอง", "ระยอง", "ราชบุรี", "ร้อยเอ็ด",
    "ลพบุรี", "ลำปาง", "ลำพูน", "ศรีสะเกษ", "สกลนคร",
    "สงขลา", "สตูล", "สมุทรปราการ", "สมุทรสงคราม", "สมุทรสาคร",
    "สระบุรี", "สระแก้ว", "สิงห์บุรี", "สุพรรณบุรี", "สุราษฎร์ธานี",
    "สุรินทร์", "สุโขทัย", "หนองคาย", "หนองบัวลำภู", "อำนาจเจริญ",
    "อุดรธานี", "อุตรดิตถ์", "อุทัยธานี", "อุบลราชธานี", "อ่างทอง",
    "เชียงราย", "เชียงใหม่", "เพชรบุรี", "เพชรบูรณ์", "เลย",
    "แพร่", "แม่ฮ่องสอน"
  ];

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; // API Key

  useEffect(() => {
    // Current weather data
    const fetchCurrentWeather = async () => {
      setLoadingCurrent(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${province}&appid=${API_KEY}&units=metric&lang=th`
        );
        const data = await response.json();
        setCurrentWeather(data);
      } catch (error) {
        console.error("Error fetching current weather data:", error);
      }
      setLoadingCurrent(false);
    };

    // 5 Day / 3 Hour Forecast
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${province}&appid=${API_KEY}&units=metric&lang=th`
        );
        const data = await response.json();

        if (data.list) {
          const now = new Date();
          const thailandTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
          const validForecast = data.list.filter((item) => {
            const itemDate = new Date(item.dt_txt);
            const hour = itemDate.getHours();
            return itemDate >= thailandTime && [0, 6, 12, 18].includes(hour);
          });

          // Group by date
          const groupedByDate = validForecast.reduce((acc, curr) => {
            const date = curr.dt_txt.split(" ")[0];
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(curr);
            return acc;
          }, {});
          setForecast(groupedByDate);
        } else {
          setForecast({});
        }
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
      setLoading(false);
    };

    fetchCurrentWeather();
    fetchForecast();
  }, [province]);

  // Format date
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Head>
        <title>หน้าหลัก</title> {/* Set page title */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <h1 className="text-center text-2xl md:text-4xl font-bold py-4 px-4 text-white">
        Durian Epidemic Geospatial Report System
      </h1>

      <div className="py-5 px-2">
        {/* Dropdown to select province */}
        <div className="mb-4 flex justify-between items-center flex-col md:flex-row">
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-sm md:text-base text-black"
          >
            {provinces.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        {/* Current weather */}
        {loadingCurrent ? (
          <p className="text-center">กำลังโหลดข้อมูลสภาพอากาศขณะนี้...</p>
        ) : currentWeather ? (
          <div className="mb-6 border rounded-lg p-4 shadow-md text-black bg1 max-w-md">
            <h2 className="text-lg font-bold mb-2">สภาพอากาศขณะนี้</h2>
            <p>📍 จังหวัด: {currentWeather.name}</p>
            <p>🌡️ อุณหภูมิ: {currentWeather.main.temp} °C</p>
            <p>💧 ความชื้น: {currentWeather.main.humidity}%</p>
            <p>🌥️ สภาพอากาศ: {currentWeather.weather[0].description}</p>
            <div className="flex justify-center items-center">
              <img
                src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                alt={currentWeather.weather[0].description}
                className="w-12 h-12"
              />
            </div>
          </div>
        ) : (
          <p className="text-center">ไม่พบข้อมูลสภาพอากาศขณะนี้</p>
        )}

        {/* Weather forecast */}
        {loading ? (
          <p className="text-center">กำลังโหลดข้อมูลพยากรณ์อากาศ...</p>
        ) : Object.keys(forecast).length === 0 ? (
          <p className="text-center">ไม่พบข้อมูลพยากรณ์อากาศ</p>
        ) : (
          <div>
            {Object.entries(forecast).map(([date, forecasts], index) => (
              <div key={index} className="mb-6">
                <h2 className="text-lg font-bold mb-2">{formatDate(date)}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                  {forecasts.map((item, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg p-4 shadow-md text-black bg1"
                    >
                      <p>🕒 เวลา: {item.dt_txt.split(" ")[1]}</p>
                      <p>🌡️ อุณหภูมิ: {item.main.temp} °C</p>
                      <p>💧 ความชื้น: {item.main.humidity}%</p>
                      <p>🌥️ สภาพอากาศ: {item.weather[0].description}</p>

                      {/* Center icon */}
                      <div className="flex justify-center items-center">
                        <img
                          src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          alt={item.weather[0].description}
                          className="w-12 h-12"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
