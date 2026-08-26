<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php';
$id=requireSme();$st=$pdo->prepare('SELECT business_type FROM smes WHERE id=?');$st->execute([$id]);$type=$st->fetchColumn();
$sql='SELECT s.assessment_type,sc.dimension,sc.score,sc.level,r.priority_area,r.recommendation_text,r.priority FROM assessment_sessions s JOIN assessment_scores sc ON sc.session_id=s.id JOIN recommendation_rules r ON r.assessment_type=s.assessment_type AND r.dimension=sc.dimension AND r.classification=sc.level AND (r.business_type="ALL" OR r.business_type=?) WHERE s.sme_id=? AND s.id IN (SELECT MAX(id) FROM assessment_sessions WHERE sme_id=? GROUP BY assessment_type) ORDER BY r.priority, s.assessment_type, sc.dimension';
$q=$pdo->prepare($sql);$q->execute([$type,$id,$id]);echo json_encode($q->fetchAll());
