import { useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Map() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: 9.0865664, lng: 99.3558528 }, // พิกัดเริ่มต้น
        zoom: 17, // ระดับการซูม
      });

      // เพิ่ม markers หรือ feature อื่นๆ
      const marker = new window.google.maps.Marker({
        position: { lat: 9.0865664, lng: 99.3558528 },
        map: map,
        title: "ตำแหน่งโรค",
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>แสดงตำแหน่งโรค</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col justify-start items-center py-4">
        <h1 className="text-center text-2xl md:text-4xl font-bold py-4 px-4 text-white">
        แสดงตำแหน่งโรค
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
