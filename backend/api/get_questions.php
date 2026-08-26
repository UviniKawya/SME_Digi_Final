<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php';
$id=requireSme();
$assessment=$_GET['assessment_type']??''; $allowed=['Readiness','Barrier','Performance'];
if(!in_array($assessment,$allowed,true)){http_response_code(400);echo json_encode(['error'=>'Valid assessment_type required']);exit;}
$st=$pdo->prepare('SELECT business_type FROM smes WHERE id=?');$st->execute([$id]);$type=$st->fetchColumn();
$q=$pdo->prepare('SELECT id,dimension,question_text,business_type FROM assessment_questions WHERE assessment_type=? AND active=1 AND (business_type="ALL" OR business_type=?) ORDER BY dimension,is_common DESC,display_order,id');
$q->execute([$assessment,$type]);$out=[];foreach($q->fetchAll() as $r){$out[$r['dimension']][]=$r;} echo json_encode($out);
