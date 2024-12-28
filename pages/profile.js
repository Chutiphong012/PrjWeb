import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>โปรไฟล์</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex justify-center items-center min-h-screen px-4 py-10">
        {/* กล่องที่ 2 */}
        <div className="bg-white p-6 rounded-3xl w-full max-w-3xl">
          {/* ชื่อ */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <input
                type="text"
                id="first-name"
                className="mt-1 py-5 block w-full rounded-md bg-gray-300 pl-10"
                placeholder="ชื่อ"
              />
            </div>
          </div>

          {/* อีเมล */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <input
                type="email"
                id="email"
                className="mt-1 py-5 block w-full rounded-md bg-gray-300 pl-10"
                placeholder="อีเมล"
              />
            </div>
          </div>

          {/* ตำแหน่งสวน */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <input
                type="text"
                id="garden-position"
                className="mt-1 py-5 block w-full rounded-md bg-gray-300 pl-10"
                placeholder="ตำแหน่งสวน"
              />
            </div>
          </div>

          {/* ปุ่มแก้ไขและออกจากระบบ */}
          <div className="flex justify-center gap-4 mt-6 py-5">
            <button className="bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 md:w-auto">
              แก้ไขตำแหน่งสวน
            </button>
            <button className="bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 md:w-auto">
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
