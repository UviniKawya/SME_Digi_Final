<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php';
$d=jsonInput();
if (trim($d['name']??'')==='' || trim($d['email']??'')==='' || ($d['password']??'')==='') { http_response_code(400); echo json_encode(['error'=>'Name, email and password are required']); exit; }
$email=strtolower(trim($d['email']));
$st=$pdo->prepare('SELECT id FROM admins WHERE email=?'); $st->execute([$email]);
if($st->fetch()){http_response_code(409);echo json_encode(['error'=>'Admin email is already registered']);exit;}
$pdo->prepare('INSERT INTO admins(name,email,password_hash) VALUES(?,?,?)')->execute([trim($d['name']),$email,password_hash($d['password'],PASSWORD_DEFAULT)]);
echo json_encode(['success'=>true]);
