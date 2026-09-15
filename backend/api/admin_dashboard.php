<?php

require_once '../config/cors.php';
require_once '../config/db.php';
require_once '../config/auth.php';

requireAdmin();


/* =============================
   BASIC COUNTS
============================= */

$totalSmes = (int)$pdo
    ->query('SELECT COUNT(*) FROM smes')
    ->fetchColumn();

$activeSmes = (int)$pdo
    ->query('SELECT COUNT(*) FROM smes WHERE status="Active"')
    ->fetchColumn();

$totalAssessments = (int)$pdo
    ->query('SELECT COUNT(*) FROM assessment_sessions')
    ->fetchColumn();


/* =============================
   AVERAGE ASSESSMENT SCORES
============================= */

$averageScores = [];

foreach (['Readiness','Barrier','Performance'] as $type) {

    $q = $pdo->prepare(
        'SELECT AVG(overall_score)
         FROM assessment_sessions
         WHERE assessment_type=?'
    );

    $q->execute([$type]);

    $value = $q->fetchColumn();

    $averageScores[$type] =
        $value !== null
        ? round((float)$value, 2)
        : 0;
}


/* =============================
   SMEs BY BUSINESS TYPE
============================= */

$industries = $pdo->query(
    'SELECT
        business_type,
        COUNT(*) AS count
     FROM smes
     GROUP BY business_type
     ORDER BY count DESC'
)->fetchAll();


/* =============================
   SMEs BY LOCATION
============================= */

$locations = $pdo->query(
    'SELECT
        location,
        COUNT(*) AS count
     FROM smes
     GROUP BY location'
)->fetchAll();


/* =============================
   ASSESSMENT LEVEL DISTRIBUTION
============================= */

function getLevels(PDO $pdo, string $type): array {

    $q = $pdo->prepare(
        'SELECT
            level,
            COUNT(*) AS count
         FROM assessment_sessions
         WHERE assessment_type=?
         GROUP BY level'
    );

    $q->execute([$type]);

    return $q->fetchAll();
}

$readinessLevels = getLevels($pdo, 'Readiness');
$barrierLevels = getLevels($pdo, 'Barrier');
$performanceLevels = getLevels($pdo, 'Performance');


/* =============================
   ASSESSMENT TYPE COUNTS
============================= */

$assessmentTypes = $pdo->query(
    'SELECT
        assessment_type,
        COUNT(*) AS count
     FROM assessment_sessions
     GROUP BY assessment_type'
)->fetchAll();


/* =============================
   RECENT SMEs
============================= */

$recentSmes = $pdo->query(
    'SELECT
        id,
        sme_name,
        owner_name,
        business_type,
        location,
        status,
        created_at
     FROM smes
     ORDER BY id DESC
     LIMIT 5'
)->fetchAll();


/* =============================
   RECENT ASSESSMENTS
============================= */

$recentAssessments = $pdo->query(
    'SELECT
        a.id,
        s.sme_name,
        s.business_type,
        a.assessment_type,
        a.overall_score,
        a.level,
        a.created_at
     FROM assessment_sessions a
     INNER JOIN smes s
        ON s.id = a.sme_id
     ORDER BY a.id DESC
     LIMIT 6'
)->fetchAll();


/* =============================
   INVENTORY SUMMARY
============================= */

$totalProducts = (int)$pdo
    ->query('SELECT COUNT(*) FROM inventory')
    ->fetchColumn();

$lowStock = (int)$pdo
    ->query(
        'SELECT COUNT(*)
         FROM inventory
         WHERE quantity <= reorder_level'
    )
    ->fetchColumn();


/* =============================
   SALES SUMMARY
============================= */

$totalSales = (float)$pdo
    ->query(
        'SELECT COALESCE(SUM(amount),0)
         FROM sales'
    )
    ->fetchColumn();

$totalSalesRecords = (int)$pdo
    ->query('SELECT COUNT(*) FROM sales')
    ->fetchColumn();


/* =============================
   RETURN DATA
============================= */

echo json_encode([

    'total_smes' => $totalSmes,

    'active_smes' => $activeSmes,

    'total_assessments' => $totalAssessments,

    'average_scores' => $averageScores,

    'industries' => $industries,

    'locations' => $locations,

    'readiness_levels' => $readinessLevels,

    'barrier_levels' => $barrierLevels,

    'performance_levels' => $performanceLevels,

    'assessment_types' => $assessmentTypes,

    'recent_smes' => $recentSmes,

    'recent_assessments' => $recentAssessments,

    'inventory' => [
        'total_products' => $totalProducts,
        'low_stock' => $lowStock
    ],

    'sales' => [
        'total_sales' => $totalSales,
        'sales_records' => $totalSalesRecords
    ]
]);