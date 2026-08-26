<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php';
$id=requireSme();$method=$_SERVER['REQUEST_METHOD'];
if($method==='GET'){$q=$pdo->prepare('SELECT * FROM inventory WHERE sme_id=? ORDER BY id DESC');$q->execute([$id]);echo json_encode($q->fetchAll());exit;}
$d=jsonInput();
if($method==='POST'){$pdo->prepare('INSERT INTO inventory(sme_id,product_name,quantity,reorder_level,unit_price) VALUES(?,?,?,?,?)')->execute([$id,trim($d['product_name']??''),(int)($d['quantity']??0),(int)($d['reorder_level']??0),(float)($d['unit_price']??0)]);echo json_encode(['success'=>true]);exit;}
if($method==='PUT'){$pdo->prepare('UPDATE inventory SET product_name=?,quantity=?,reorder_level=?,unit_price=? WHERE id=? AND sme_id=?')->execute([trim($d['product_name']??''),(int)($d['quantity']??0),(int)($d['reorder_level']??0),(float)($d['unit_price']??0),(int)($d['id']??0),$id]);echo json_encode(['success'=>true]);exit;}
if($method==='DELETE'){$item=(int)($_GET['id']??0);$pdo->prepare('DELETE FROM inventory WHERE id=? AND sme_id=?')->execute([$item,$id]);echo json_encode(['success'=>true]);exit;}
http_response_code(405);echo json_encode(['error'=>'Method not allowed']);
