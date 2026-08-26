<?php
function jsonInput(): array {
    $data = json_decode(file_get_contents('php://input'), true);
    return is_array($data) ? $data : [];
}
function requireSme(): int {
    if (empty($_SESSION['sme_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Please login as an SME to access this feature']);
        exit;
    }
    return (int)$_SESSION['sme_id'];
}
function requireAdmin(): int {
    if (empty($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Please login as an administrator to access this feature']);
        exit;
    }
    return (int)$_SESSION['admin_id'];
}
function levelFor(float $score): string {
    if ($score <= 2.60) return 'Low';
    if ($score <= 3.40) return 'Moderate';
    return 'High';
}
