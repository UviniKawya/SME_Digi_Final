<?php

require_once '../config/cors.php';
require_once '../config/db.php';
require_once '../config/auth.php';

$id = requireSme();

$method = $_SERVER['REQUEST_METHOD'];


/* =========================================
   GET INVENTORY
========================================= */

if ($method === 'GET') {

    $q = $pdo->prepare(
        'SELECT
            id,
            product_name,
            category,
            quantity,
            unit,
            reorder_level,
            unit_price,
            created_at
         FROM inventory
         WHERE sme_id = ?
         ORDER BY id DESC'
    );

    $q->execute([$id]);

    echo json_encode($q->fetchAll());

    exit;
}


/* Read JSON input */

$d = jsonInput();


/* =========================================
   ADD INVENTORY ITEM
========================================= */

if ($method === 'POST') {

    $productName =
        trim($d['product_name'] ?? '');

    $category =
        trim($d['category'] ?? 'Other');

    $quantity =
        (float)($d['quantity'] ?? 0);

    $unit =
        trim($d['unit'] ?? 'pcs');

    $reorderLevel =
        (float)($d['reorder_level'] ?? 0);

    $unitPrice =
        (float)($d['unit_price'] ?? 0);


    if ($productName === '') {

        http_response_code(400);

        echo json_encode([
            'error' => 'Item name is required'
        ]);

        exit;
    }


    $st = $pdo->prepare(
        'INSERT INTO inventory
        (
            sme_id,
            product_name,
            category,
            quantity,
            unit,
            reorder_level,
            unit_price
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)'
    );


    $st->execute([
        $id,
        $productName,
        $category,
        $quantity,
        $unit,
        $reorderLevel,
        $unitPrice
    ]);


    echo json_encode([
        'success' => true
    ]);

    exit;
}


/* =========================================
   UPDATE INVENTORY ITEM
========================================= */

if ($method === 'PUT') {

    $itemId =
        (int)($d['id'] ?? 0);

    $productName =
        trim($d['product_name'] ?? '');

    $category =
        trim($d['category'] ?? 'Other');

    $quantity =
        (float)($d['quantity'] ?? 0);

    $unit =
        trim($d['unit'] ?? 'pcs');

    $reorderLevel =
        (float)($d['reorder_level'] ?? 0);

    $unitPrice =
        (float)($d['unit_price'] ?? 0);


    if ($itemId <= 0 || $productName === '') {

        http_response_code(400);

        echo json_encode([
            'error' => 'Valid item details are required'
        ]);

        exit;
    }


    $st = $pdo->prepare(
        'UPDATE inventory
         SET
            product_name = ?,
            category = ?,
            quantity = ?,
            unit = ?,
            reorder_level = ?,
            unit_price = ?
         WHERE id = ?
           AND sme_id = ?'
    );


    $st->execute([
        $productName,
        $category,
        $quantity,
        $unit,
        $reorderLevel,
        $unitPrice,
        $itemId,
        $id
    ]);


    echo json_encode([
        'success' => true
    ]);

    exit;
}


/* =========================================
   DELETE INVENTORY ITEM
========================================= */

if ($method === 'DELETE') {

    $itemId =
        (int)($_GET['id'] ?? 0);


    $st = $pdo->prepare(
        'DELETE FROM inventory
         WHERE id = ?
           AND sme_id = ?'
    );


    $st->execute([
        $itemId,
        $id
    ]);


    echo json_encode([
        'success' => true
    ]);

    exit;
}


/* =========================================
   INVALID METHOD
========================================= */

http_response_code(405);

echo json_encode([
    'error' => 'Method not allowed'
]);