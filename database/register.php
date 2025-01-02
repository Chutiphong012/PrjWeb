<?php
// 1. ตั้งค่าการเชื่อมต่อกับฐานข้อมูล MySQL
$host = "localhost";
$username = "root";
$password = "";
$dbname = "register_db";

$conn = new mysqli('localhost', 'root', '', 'nextjs_db');

// 2. ตรวจสอบการเชื่อมต่อฐานข้อมูล
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 3. ตั้งค่า CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// 4. ตรวจสอบคำขอ POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    $username = $data['username'];
    $email = $data['email'];
    $password = $data['password'];
    $latitude = $data['latitude'];
    $longitude = $data['longitude'];

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (username, email, password, latitude, longitude) 
            VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $username, $email, $hashedPassword, $latitude, $longitude);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User registered successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
