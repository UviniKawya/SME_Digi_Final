<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php'; requireAdmin();
$smeId=(int)($_GET['sme_id']??0);$sql='SELECT a.id,s.sme_name,s.business_type,a.assessment_type,a.overall_score,a.level,a.created_at FROM assessment_sessions a JOIN smes s ON s.id=a.sme_id';$params=[];if($smeId>0){$sql.=' WHERE a.sme_id=?';$params[]=$smeId;}$sql.=' ORDER BY a.id DESC';$q=$pdo->prepare($sql);$q->execute($params);echo json_encode($q->fetchAll());
