<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php';
$id=requireSme();
$p=$pdo->prepare('SELECT id,sme_name,owner_name,email,business_type,location,employees,years_operation FROM smes WHERE id=?');$p->execute([$id]);$profile=$p->fetch();
$latest=[];foreach(['Readiness','Barrier','Performance'] as $t){$q=$pdo->prepare('SELECT overall_score,level,created_at FROM assessment_sessions WHERE sme_id=? AND assessment_type=? ORDER BY id DESC LIMIT 1');$q->execute([$id,$t]);$latest[$t]=$q->fetch()?:null;}
$q=$pdo->prepare('SELECT COUNT(*) FROM inventory WHERE sme_id=? AND quantity<=reorder_level');$q->execute([$id]);$low=(int)$q->fetchColumn();
echo json_encode(['profile'=>$profile,'latest'=>$latest,'low_stock_count'=>$low]);
