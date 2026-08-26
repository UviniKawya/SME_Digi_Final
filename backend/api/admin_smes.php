<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php'; requireAdmin();
echo json_encode($pdo->query('SELECT id,sme_name,owner_name,email,business_type,location,employees,years_operation,status,created_at FROM smes ORDER BY id DESC')->fetchAll());
