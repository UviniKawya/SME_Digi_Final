<?php

require_once '../config/cors.php';
require_once '../config/db.php';
require_once '../config/auth.php';

$id = requireSme();


/* =====================================================
   SME PROFILE
===================================================== */

$p = $pdo->prepare(
    'SELECT
        id,
        sme_name,
        owner_name,
        email,
        business_type,
        location,
        employees,
        years_operation
     FROM smes
     WHERE id = ?'
);

$p->execute([$id]);

$profile = $p->fetch();


/* =====================================================
   LATEST ASSESSMENT RESULTS
===================================================== */

$latest = [];

$dimensions = [
    'Readiness' => [],
    'Barrier' => [],
    'Performance' => []
];

foreach (['Readiness', 'Barrier', 'Performance'] as $type) {

    $q = $pdo->prepare(
        'SELECT
            id,
            overall_score,
            level,
            created_at
         FROM assessment_sessions
         WHERE sme_id = ?
           AND assessment_type = ?
         ORDER BY id DESC
         LIMIT 1'
    );

    $q->execute([
        $id,
        $type
    ]);

    $session = $q->fetch();

    if ($session) {

        $latest[$type] = [
            'overall_score' => (float)$session['overall_score'],
            'level' => $session['level'],
            'created_at' => $session['created_at']
        ];


        /* Get dimension scores for this assessment */

        $dimensionQuery = $pdo->prepare(
            'SELECT
                dimension,
                score,
                level
             FROM assessment_scores
             WHERE session_id = ?
             ORDER BY id ASC'
        );

        $dimensionQuery->execute([
            $session['id']
        ]);

        foreach ($dimensionQuery->fetchAll() as $row) {

            $dimensions[$type][] = [
                'dimension' => $row['dimension'],
                'score' => (float)$row['score'],
                'level' => $row['level']
            ];
        }

    } else {

        $latest[$type] = null;
    }
}


/* =====================================================
   RECENT ASSESSMENT HISTORY
===================================================== */

$historyQuery = $pdo->prepare(
    'SELECT
        assessment_type,
        overall_score,
        level,
        created_at
     FROM assessment_sessions
     WHERE sme_id = ?
     ORDER BY id DESC
     LIMIT 6'
);

$historyQuery->execute([$id]);

$assessmentHistory = $historyQuery->fetchAll();

foreach ($assessmentHistory as &$row) {
    $row['overall_score'] = (float)$row['overall_score'];
}


/* =====================================================
   INVENTORY SUMMARY
===================================================== */

$inventoryQuery = $pdo->prepare(
    'SELECT
        COUNT(*) AS total_products,
        COALESCE(
            SUM(quantity * unit_price),
            0
        ) AS inventory_value,
        COALESCE(
            SUM(
                CASE
                    WHEN quantity <= reorder_level
                    THEN 1
                    ELSE 0
                END
            ),
            0
        ) AS low_stock_count
     FROM inventory
     WHERE sme_id = ?'
);

$inventoryQuery->execute([$id]);

$inventorySummary = $inventoryQuery->fetch();


/* Low stock items */

$lowStockQuery = $pdo->prepare(
    'SELECT
        id,
        product_name,
        quantity,
        reorder_level,
        unit_price
     FROM inventory
     WHERE sme_id = ?
       AND quantity <= reorder_level
     ORDER BY quantity ASC
     LIMIT 5'
);

$lowStockQuery->execute([$id]);

$lowStockItems = $lowStockQuery->fetchAll();


/* =====================================================
   SALES SUMMARY
===================================================== */

$salesQuery = $pdo->prepare(
    'SELECT
        COUNT(*) AS sales_count,
        COALESCE(
            SUM(amount),
            0
        ) AS total_sales
     FROM sales
     WHERE sme_id = ?'
);

$salesQuery->execute([$id]);

$salesSummary = $salesQuery->fetch();


/* =====================================================
   RECENT SALES
===================================================== */

$recentSalesQuery = $pdo->prepare(
    'SELECT
        id,
        amount,
        sale_date
     FROM sales
     WHERE sme_id = ?
     ORDER BY id DESC
     LIMIT 5'
);

$recentSalesQuery->execute([$id]);

$recentSales = $recentSalesQuery->fetchAll();

foreach ($recentSales as &$sale) {
    $sale['amount'] = (float)$sale['amount'];
}


/* =====================================================
   MONTHLY SALES FOR CHART
   LAST 6 MONTHS
===================================================== */

/* =====================================================
   MONTHLY SALES FOR CHART
   LAST 6 MONTHS
===================================================== */

$weeklySalesQuery = $pdo->prepare(
    'SELECT
        YEARWEEK(sale_date, 1) AS week_key,
        CONCAT(
            "Week ",
            WEEK(sale_date, 1)
        ) AS week,
        SUM(amount) AS total
     FROM sales
     WHERE sme_id = ?
       AND sale_date IS NOT NULL
       AND sale_date >= DATE_SUB(
            CURDATE(),
            INTERVAL 8 WEEK
       )
     GROUP BY
        YEARWEEK(sale_date, 1),
        WEEK(sale_date, 1)
     ORDER BY week_key ASC'
);

$weeklySalesQuery->execute([$id]);

$weeklySales = $weeklySalesQuery->fetchAll();

foreach ($weeklySales as &$week) {
    $week['total'] = (float)$week['total'];
}
/* =====================================================
   RETURN DASHBOARD DATA
===================================================== */

echo json_encode([
    'profile' => $profile,

    'latest' => $latest,

    'dimensions' => $dimensions,

    'assessment_history' => $assessmentHistory,

    'inventory' => [
        'total_products' =>
            (int)$inventorySummary['total_products'],

        'inventory_value' =>
            (float)$inventorySummary['inventory_value'],

        'low_stock_count' =>
            (int)$inventorySummary['low_stock_count'],

        'low_stock_items' =>
            $lowStockItems
    ],

    'sales' => [
        'sales_count' =>
            (int)$salesSummary['sales_count'],

        'total_sales' =>
            (float)$salesSummary['total_sales'],

        'recent_sales' =>
            $recentSales,
'weekly_sales' => $weeklySales
    ]
]);