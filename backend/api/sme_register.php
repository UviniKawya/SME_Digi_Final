<?php

require_once '../config/cors.php';
require_once '../config/db.php';
require_once '../config/auth.php';

$d = jsonInput();

$required = [
    'sme_name',
    'owner_name',
    'email',
    'password',
    'business_type',
    'location',
    'employees',
    'years_operation'
];

foreach ($required as $field) {
    if (!isset($d[$field]) || trim((string)$d[$field]) === '') {
        http_response_code(400);

        echo json_encode([
            'error' => 'Please complete all required fields'
        ]);

        exit;
    }
}

$types = [
    'Retail',
    'Manufacturing',
    'Services',
    'Agriculture',
    'Industry'
];

if (!in_array($d['business_type'], $types, true)) {
    http_response_code(400);

    echo json_encode([
        'error' => 'Invalid business type'
    ]);

    exit;
}

$email = strtolower(trim($d['email']));

$check = $pdo->prepare(
    'SELECT id FROM smes WHERE email = ?'
);

$check->execute([$email]);

if ($check->fetch()) {
    http_response_code(409);

    echo json_encode([
        'error' => 'Email is already registered'
    ]);

    exit;
}

$st = $pdo->prepare(
    'INSERT INTO smes
    (
        sme_name,
        owner_name,
        email,
        password_hash,
        business_type,
        location,
        employees,
        years_operation,
        status,
        approval_status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, "Active", "Pending")'
);

$st->execute([
    trim($d['sme_name']),
    trim($d['owner_name']),
    $email,
    password_hash($d['password'], PASSWORD_DEFAULT),
    $d['business_type'],
    $d['location'],
    (int)$d['employees'],
    (int)$d['years_operation']
]);

echo json_encode([
    'success' => true,
    'status' => 'Pending',
    'message' => 'Registration submitted. Your account is pending administrator approval.'
]);