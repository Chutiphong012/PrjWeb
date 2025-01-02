<?php
// ตั้งค่าการเชื่อมต่อฐานข้อมูล MySQL
$host = "localhost";
$username = "root";
$password = "";
$dbname = "nextjs_db";

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli($host, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อฐานข้อมูล
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ตั้งค่า CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// ตรวจสอบคำขอ POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    $email = $data['email'];
    $password = $data['password'];

    // ค้นหาผู้ใช้จากฐานข้อมูล
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    // ตรวจสอบรหัสผ่าน
    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(["message" => "เข้าสู่ระบบสำเร็จ"]);
    } else {
        echo json_encode(["message" => "อีเมลหรือรหัสผ่านไม่ถูกต้อง"]);
    }

    $stmt->close();
}

$conn->close();
?>
