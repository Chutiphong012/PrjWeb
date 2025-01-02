import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import withAuth from '../lib/auth'; // นำเข้า HOC

function Map() {
  const [location, setLocation] = useState(null);
  const mapContainerRef = useRef(null);
  const [userId,setUserId] = useState(null);
  useEffect(() => {
    const userlocal = localStorage.getItem("userId")
    if (userlocal) {
      setUserId(userlocal)
    } 
  },[])
  // ดึงพิกัดจาก API เมื่อโหลด component
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        console.log("hello")
        const response = await fetch(`/api/get-location?id=${userId}`);
        const data = await response.json();
        
        if (data && data.latitude && data.longitude) {
          setLocation({ lat:Number( data.latitude), lng:Number (data.longitude) });
        } else {
          console.log('ไม่พบข้อมูลตำแหน่ง');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    if (userId) {
      fetchLocation();
    }
  }, [userId]);

  useEffect(() => {
    if (location && typeof window !== "undefined" && window.google) {
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: location, // ใช้พิกัดที่ดึงมา
        zoom: 17, // ระดับการซูม
      });

      // เพิ่ม marker ที่พิกัดที่ดึงมา
      new window.google.maps.Marker({
        position: location,
        map: map,
        title: "ตำแหน่งของผู้ใช้",
      });
    }
  }, [location]);

  return (
    <>
      <Head>
        <title>แสดงตำแหน่งผู้ใช้</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col justify-start items-center py-4">
        <h1 className="text-center text-2xl md:text-4xl font-bold py-4 px-4 text-white">
          ตำแหน่งสวนผู้ใช้
        </h1>
        <div className="bg-white p-8 mx-4 my-6 rounded-2xl shadow-lg w-full max-w-4xl">
          <div
            ref={mapContainerRef}
            style={{ width: '100%', height: '400px' }}
            className="rounded-lg"
          ></div>
        </div>
      </div>
    </>
  );
}

// ส่ง user จาก HOC ไปยัง Component
export default withAuth(Map);
