<?php

require_once '../config/cors.php';
require_once '../config/db.php';
require_once '../config/auth.php';

$id = requireSme();
$method = $_SERVER['REQUEST_METHOD'];


/* ============================
   GET SALES
============================ */

if ($method === 'GET') {

    $q = $pdo->prepare(
        'SELECT
            id,
            product_name,
            quantity,
            unit_price,
            amount,
            payment_method,
            sale_date,
            created_at
         FROM sales
         WHERE sme_id = ?
         ORDER BY COALESCE(sale_date, DATE(created_at)) DESC, id DESC'
    );

    $q->execute([$id]);

    $rows = $q->fetchAll();

    $total = 0;
    $todayTotal = 0;

    // Sri Lanka timezone
    date_default_timezone_set('Asia/Colombo');

    $today = date('Y-m-d');


    foreach ($rows as &$row) {

        $row['quantity'] =
            (float)$row['quantity'];

        $row['unit_price'] =
            (float)$row['unit_price'];

        $row['amount'] =
            (float)$row['amount'];


        /* Total Sales */

        $total +=
            (float)$row['amount'];


        /* Today's Sales */

        if (!empty($row['sale_date'])) {

            $recordDate =
                $row['sale_date'];

        } else {

            $recordDate =
                date(
                    'Y-m-d',
                    strtotime($row['created_at'])
                );
        }


        if ($recordDate === $today) {

            $todayTotal +=
                (float)$row['amount'];
        }
    }


    echo json_encode([
        'sales' => $rows,
        'total' => round($total, 2),
        'count' => count($rows),
        'today_total' => round($todayTotal, 2)
    ]);

    exit;
}


/* ============================
   READ REQUEST BODY
============================ */

$d = jsonInput();


/* ============================
   ADD SALE
============================ */

if ($method === 'POST') {

    $productName =
        trim($d['product_name'] ?? '');

    $quantity =
        (float)($d['quantity'] ?? 0);

    $unitPrice =
        (float)($d['unit_price'] ?? 0);

    $paymentMethod =
        trim($d['payment_method'] ?? 'Cash');

    $saleDate =
        trim($d['sale_date'] ?? '');


    if (
        $productName === '' ||
        $quantity <= 0 ||
        $unitPrice < 0
    ) {

        http_response_code(400);

        echo json_encode([
            'error' =>
                'Please enter valid sale details'
        ]);

        exit;
    }


    $amount =
        $quantity * $unitPrice;


    $st = $pdo->prepare(
        'INSERT INTO sales
        (
            sme_id,
            product_name,
            quantity,
            unit_price,
            amount,
            payment_method,
            sale_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)'
    );


    $st->execute([
        $id,
        $productName,
        $quantity,
        $unitPrice,
        $amount,
        $paymentMethod,
        $saleDate !== ''
            ? $saleDate
            : null
    ]);


    echo json_encode([
        'success' => true
    ]);

    exit;
}


/* ============================
   UPDATE SALE
============================ */

if ($method === 'PUT') {

    $saleId =
        (int)($d['id'] ?? 0);

    $productName =
        trim($d['product_name'] ?? '');

    $quantity =
        (float)($d['quantity'] ?? 0);

    $unitPrice =
        (float)($d['unit_price'] ?? 0);

    $paymentMethod =
        trim($d['payment_method'] ?? 'Cash');

    $saleDate =
        trim($d['sale_date'] ?? '');


    if (
        $saleId <= 0 ||
        $productName === '' ||
        $quantity <= 0 ||
        $unitPrice < 0
    ) {

        http_response_code(400);

        echo json_encode([
            'error' =>
                'Please enter valid sale details'
        ]);

        exit;
    }


    $amount =
        $quantity * $unitPrice;


    $st = $pdo->prepare(
        'UPDATE sales
         SET
            product_name = ?,
            quantity = ?,
            unit_price = ?,
            amount = ?,
            payment_method = ?,
            sale_date = ?
         WHERE id = ?
           AND sme_id = ?'
    );


    $st->execute([
        $productName,
        $quantity,
        $unitPrice,
        $amount,
        $paymentMethod,
        $saleDate !== ''
            ? $saleDate
            : null,
        $saleId,
        $id
    ]);


    echo json_encode([
        'success' => true
    ]);

    exit;
}


/* ============================
   DELETE SALE
============================ */

if ($method === 'DELETE') {

    $saleId =
        (int)($_GET['id'] ?? 0);


    if ($saleId <= 0) {

        http_response_code(400);

        echo json_encode([
            'error' => 'Invalid sale ID'
        ]);

        exit;
    }


    $st = $pdo->prepare(
        'DELETE FROM sales
         WHERE id = ?
           AND sme_id = ?'
    );


    $st->execute([
        $saleId,
        $id
    ]);


    echo json_encode([
        'success' => true
    ]);

    exit;
}


http_response_code(405);

echo json_encode([
    'error' => 'Method not allowed'
]);