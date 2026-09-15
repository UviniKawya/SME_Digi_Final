<?php

require_once '../config/cors.php';
require_once '../config/db.php';
require_once '../config/auth.php';

/* Get logged-in SME ID */
$id = requireSme();

/* Get assessment type from frontend */
$assessment = $_GET['assessment_type'] ?? '';

$allowed = [
    'Readiness',
    'Barrier',
    'Performance'
];

/* Validate assessment type */
if (!in_array($assessment, $allowed, true)) {
    http_response_code(400);

    echo json_encode([
        'error' => 'Valid assessment_type required'
    ]);

    exit;
}


/* =========================================
   GET THE SME BUSINESS TYPE
========================================= */

$st = $pdo->prepare(
    'SELECT business_type
     FROM smes
     WHERE id = ?'
);

$st->execute([$id]);

$businessType = $st->fetchColumn();

if (!$businessType) {
    http_response_code(404);

    echo json_encode([
        'error' => 'SME account not found'
    ]);

    exit;
}


/* =========================================
   GET QUESTIONS

   ALL = common question
   businessType = SME-specific questions

   Example Retail:
   1 common + 2 Retail questions
========================================= */

$q = $pdo->prepare(
    'SELECT
        id,
        dimension,
        question_text,
        business_type,
        is_common,
        display_order

     FROM assessment_questions

     WHERE assessment_type = ?
       AND active = 1
       AND (
            business_type = "ALL"
            OR business_type = ?
       )

     ORDER BY
        dimension,
        is_common DESC,
        display_order,
        id'
);

$q->execute([
    $assessment,
    $businessType
]);


/* =========================================
   GROUP QUESTIONS BY DIMENSION
========================================= */

$out = [];

foreach ($q->fetchAll() as $row) {

    $dimension = $row['dimension'];

    if (!isset($out[$dimension])) {
        $out[$dimension] = [];
    }

    $out[$dimension][] = $row;
}


/* =========================================
   RETURN QUESTIONS TO REACT FRONTEND
========================================= */

echo json_encode($out);