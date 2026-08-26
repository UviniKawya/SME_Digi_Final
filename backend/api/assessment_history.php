<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php';
$id=requireSme();$st=$pdo->prepare('SELECT id,assessment_type,overall_score,level,created_at FROM assessment_sessions WHERE sme_id=? ORDER BY created_at DESC,id DESC');$st->execute([$id]);echo json_encode($st->fetchAll());
