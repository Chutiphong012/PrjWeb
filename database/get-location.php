<?php
// api/get-location.php
header('Content-Type: application/json');

// เชื่อมต่อกับฐานข้อมูล MySQL
$servername = "localhost";
$username = "username"; // ชื่อผู้ใช้ MySQL
$password = "password"; // รหัสผ่าน MySQL
$dbname = "database_name"; // ชื่อฐานข้อมูล

$conn = new mysqli($servername, $username, $password, $dbname);

// เช็คการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// คำสั่ง SQL เพื่อดึงข้อมูลตำแหน่ง
$sql = "SELECT latitude, longitude FROM locations WHERE id = 1"; // เปลี่ยน id ให้เหมาะสม
$result = $conn->query($sql);

$response = [];
if ($result->num_rows > 0) {
    // ดึงข้อมูลและเก็บใน array
    $row = $result->fetch_assoc();
    $response = [
        'latitude' => $row['latitude'],
        'longitude' => $row['longitude'],
    ];
} else {
    $response = ['error' => 'No location found'];
}

// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();

// ส่งข้อมูลกลับในรูปแบบ JSON
echo json_encode($response);
?>
