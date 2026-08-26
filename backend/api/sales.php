<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php';
$id=requireSme();$method=$_SERVER['REQUEST_METHOD'];
if($method==='GET'){$q=$pdo->prepare('SELECT * FROM sales WHERE sme_id=? ORDER BY created_at DESC,id DESC');$q->execute([$id]);$rows=$q->fetchAll();$total=array_sum(array_map(fn($r)=>(float)$r['amount'],$rows));echo json_encode(['sales'=>$rows,'total'=>round($total,2)]);exit;}
$d=jsonInput();
if($method==='POST'){$amount=(float)($d['amount']??0);if($amount<=0){http_response_code(400);echo json_encode(['error'=>'Sale amount must be greater than zero']);exit;}$pdo->prepare('INSERT INTO sales(sme_id,amount) VALUES(?,?)')->execute([$id,$amount]);echo json_encode(['success'=>true]);exit;}
if($method==='DELETE'){$sale=(int)($_GET['id']??0);$pdo->prepare('DELETE FROM sales WHERE id=? AND sme_id=?')->execute([$sale,$id]);echo json_encode(['success'=>true]);exit;}
http_response_code(405);echo json_encode(['error'=>'Method not allowed']);
