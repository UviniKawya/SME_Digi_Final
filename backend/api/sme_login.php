<?php
require_once '../config/cors.php';
require_once '../config/db.php';
require_once '../config/auth.php';
$d = jsonInput();
$email = strtolower(trim($d['email'] ?? ''));
$password = $d['password'] ?? '';

if ($email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Please enter email and password']);
    exit;
}

$st = $pdo->prepare('SELECT * FROM smes WHERE email=?');
$st->execute([$email]);
$u = $st->fetch();

if (!$u || !password_verify($password, $u['password_hash'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid email or password']);
    exit;
}

if ($u['approval_status'] === 'Pending') {
    http_response_code(403);
    echo json_encode(['error' => 'Your account is pending administrator approval.']);
    exit;
}

if ($u['approval_status'] === 'Rejected') {
    http_response_code(403);
    echo json_encode(['error' => 'Your registration has been rejected by the administrator.']);
    exit;
}

if ($u['approval_status'] !== 'Approved') {
    http_response_code(403);
    echo json_encode(['error' => 'Your account is not approved to access the system.']);
    exit;
}

if ($u['status'] !== 'Active') {
    http_response_code(403);
    echo json_encode(['error' => 'Your account is inactive.']);
    exit;
}

session_regenerate_id(true);
$_SESSION['sme_id'] = (int)$u['id'];
unset($_SESSION['admin_id']);
unset($u['password_hash']);
echo json_encode(['success' => true, 'sme' => $u]);
