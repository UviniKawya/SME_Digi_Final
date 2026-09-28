<?php
require_once '../config/cors.php';
require_once '../config/db.php';
require_once '../config/auth.php';

$id = requireSme();

$st = $pdo->prepare('SELECT business_type FROM smes WHERE id=?');
$st->execute([$id]);
$type = $st->fetchColumn();

$sql = '
SELECT
    s.id AS session_id,
    s.assessment_type,
    s.overall_score,
    s.level AS overall_level,
    s.created_at,
    sc.dimension,
    sc.score,
    sc.level,
    r.priority_area,
    r.recommendation_text,
    r.priority
FROM assessment_sessions s
JOIN assessment_scores sc
    ON sc.session_id = s.id
JOIN recommendation_rules r
    ON r.assessment_type = s.assessment_type
    AND r.dimension = sc.dimension
    AND r.classification = sc.level
    AND (r.business_type = "ALL" OR r.business_type = ?)
WHERE s.sme_id = ?
ORDER BY s.created_at DESC, s.id DESC, r.priority ASC, sc.dimension ASC
';

$q = $pdo->prepare($sql);
$q->execute([$type, $id]);

echo json_encode($q->fetchAll());