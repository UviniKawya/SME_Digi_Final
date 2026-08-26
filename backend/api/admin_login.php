<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php';
$d=jsonInput();
$st=$pdo->prepare('SELECT * FROM admins WHERE email=?'); $st->execute([strtolower(trim($d['email']??''))]); $u=$st->fetch();
if(!$u || !password_verify($d['password']??'',$u['password_hash'])){http_response_code(401);echo json_encode(['error'=>'Invalid email or password']);exit;}
session_regenerate_id(true); $_SESSION['admin_id']=(int)$u['id']; unset($_SESSION['sme_id']); unset($u['password_hash']); echo json_encode(['success'=>true,'admin'=>$u]);
