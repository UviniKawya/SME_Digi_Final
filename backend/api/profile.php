<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php';
$id=requireSme();
if($_SERVER['REQUEST_METHOD']==='GET'){
 $st=$pdo->prepare('SELECT id,sme_name,owner_name,email,business_type,location,employees,years_operation,status,created_at FROM smes WHERE id=?'); $st->execute([$id]); echo json_encode($st->fetch()); exit;
}
if($_SERVER['REQUEST_METHOD']==='PUT'){
 $d=jsonInput(); $types=['Retail','Manufacturing','Services','Agriculture'];
 if(!in_array($d['business_type']??'', $types,true)){http_response_code(400);echo json_encode(['error'=>'Invalid business type']);exit;}
 $pdo->prepare('UPDATE smes SET sme_name=?,owner_name=?,business_type=?,location=?,employees=?,years_operation=? WHERE id=?')->execute([trim($d['sme_name']??''),trim($d['owner_name']??''),$d['business_type'],$d['location']??'Urban',(int)($d['employees']??0),(int)($d['years_operation']??0),$id]); echo json_encode(['success'=>true]); exit;
}
http_response_code(405); echo json_encode(['error'=>'Method not allowed']);
