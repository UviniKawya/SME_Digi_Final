<?php

require_once '../config/cors.php';
require_once '../config/db.php';
require_once '../config/auth.php';

$method = $_SERVER['REQUEST_METHOD'];


/* =====================================================
   GET - any authenticated user (SME or Admin)
===================================================== */

if ($method === 'GET') {

    $isSme   = !empty($_SESSION['sme_id']);
    $isAdmin = !empty($_SESSION['admin_id']);

    if (!$isSme && !$isAdmin) {
        http_response_code(401);
        echo json_encode(['error' => 'Login required']);
        exit;
    }

    $rows = $pdo->query(
        'SELECT id, title, message, created_at, updated_at
         FROM announcements
         ORDER BY created_at DESC'
    )->fetchAll();

    echo json_encode($rows);
    exit;
}


/* =====================================================
   POST - Admin: create announcement
===================================================== */

if ($method === 'POST') {

    requireAdmin();

    $data = jsonInput();

    $title   = trim($data['title']   ?? '');
    $message = trim($data['message'] ?? '');

    if ($title === '' || $message === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Title and message are required']);
        exit;
    }

    $st = $pdo->prepare(
        'INSERT INTO announcements (title, message)
         VALUES (?, ?)'
    );

    $st->execute([$title, $message]);

    $id = (int)$pdo->lastInsertId();

    $row = $pdo->prepare(
        'SELECT id, title, message, created_at, updated_at
         FROM announcements WHERE id = ?'
    );
    $row->execute([$id]);

    echo json_encode($row->fetch());
    exit;
}


/* =====================================================
   PUT - Admin: edit announcement
===================================================== */

if ($method === 'PUT') {

    requireAdmin();

    $data = jsonInput();

    $id      = (int)($data['id']      ?? 0);
    $title   = trim($data['title']   ?? '');
    $message = trim($data['message'] ?? '');

    if ($id === 0 || $title === '' || $message === '') {
        http_response_code(400);
        echo json_encode(['error' => 'id, title and message are required']);
        exit;
    }

    $st = $pdo->prepare(
        'UPDATE announcements
         SET title = ?, message = ?, updated_at = NOW()
         WHERE id = ?'
    );

    $st->execute([$title, $message, $id]);

    if ($st->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Announcement not found']);
        exit;
    }

    $row = $pdo->prepare(
        'SELECT id, title, message, created_at, updated_at
         FROM announcements WHERE id = ?'
    );
    $row->execute([$id]);

    echo json_encode($row->fetch());
    exit;
}


/* =====================================================
   DELETE - Admin: remove announcement
===================================================== */

if ($method === 'DELETE') {

    requireAdmin();

    $id = (int)($_GET['id'] ?? 0);

    if ($id === 0) {
        http_response_code(400);
        echo json_encode(['error' => 'id is required']);
        exit;
    }

    $st = $pdo->prepare(
        'DELETE FROM announcements WHERE id = ?'
    );

    $st->execute([$id]);

    if ($st->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Announcement not found']);
        exit;
    }

    echo json_encode(['success' => true]);
    exit;
}


/* =====================================================
   METHOD NOT ALLOWED
===================================================== */

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);

