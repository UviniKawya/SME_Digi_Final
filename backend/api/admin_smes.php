<?php

require_once '../config/cors.php';
require_once '../config/db.php';
require_once '../config/auth.php';

requireAdmin();

$method = $_SERVER['REQUEST_METHOD'];

/* =========================================================
   GET SMES / GET SINGLE SME DETAILS
========================================================= */
if ($method === 'GET') {

    // Get single SME
    if (isset($_GET['id']) && (int)$_GET['id'] > 0) {

        $st = $pdo->prepare(
            'SELECT
                id,
                sme_name,
                owner_name,
                email,
                business_type,
                location,
                employees,
                years_operation,
                status,
                approval_status,
                created_at
             FROM smes
             WHERE id = ?'
        );

        $st->execute([(int)$_GET['id']]);
        $sme = $st->fetch();

        if (!$sme) {
            http_response_code(404);
            echo json_encode(['error' => 'SME not found']);
            exit;
        }

        echo json_encode($sme);
        exit;
    }

    // List all SMEs
    $query = 'SELECT
                id,
                sme_name,
                owner_name,
                email,
                business_type,
                location,
                employees,
                years_operation,
                status,
                approval_status,
                created_at
              FROM smes
              ORDER BY id DESC';

    $smes = $pdo->query($query)->fetchAll();

    echo json_encode($smes);
    exit;
}


/* =========================================================
   HANDLE ACTIONS: APPROVE / REJECT / UPDATE SME
========================================================= */
if ($method === 'POST' || $method === 'PUT') {

    $d = jsonInput();

    $action = trim($d['action'] ?? '');
    $id = (int)($d['id'] ?? 0);

    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Valid SME ID is required']);
        exit;
    }

    // Verify SME exists
    $check = $pdo->prepare(
        'SELECT id, status, approval_status
         FROM smes
         WHERE id = ?'
    );

    $check->execute([$id]);
    $existing = $check->fetch();

    if (!$existing) {
        http_response_code(404);
        echo json_encode(['error' => 'SME record not found']);
        exit;
    }


    /* =====================================================
       ACTION: APPROVE
    ===================================================== */
    if ($action === 'approve') {

        $st = $pdo->prepare(
            'UPDATE smes
             SET approval_status = "Approved"
             WHERE id = ?'
        );

        $st->execute([$id]);

        echo json_encode([
            'success' => true,
            'message' => 'SME registration approved successfully'
        ]);

        exit;
    }


    /* =====================================================
       ACTION: REJECT
    ===================================================== */
    if ($action === 'reject') {

        $st = $pdo->prepare(
            'UPDATE smes
             SET approval_status = "Rejected"
             WHERE id = ?'
        );

        $st->execute([$id]);

        echo json_encode([
            'success' => true,
            'message' => 'SME registration rejected'
        ]);

        exit;
    }


    /* =====================================================
       ACTION: UPDATE / EDIT SME
    ===================================================== */
    if ($action === 'update' || $method === 'PUT') {

        $smeName = trim($d['sme_name'] ?? '');
        $ownerName = trim($d['owner_name'] ?? '');
        $email = strtolower(trim($d['email'] ?? ''));
        $businessType = trim($d['business_type'] ?? '');
        $location = trim($d['location'] ?? 'Urban');

        $employees = (int)($d['employees'] ?? 1);
        $yearsOperation = (int)($d['years_operation'] ?? 0);

        $approvalStatus = trim(
            $d['approval_status'] ?? $existing['approval_status']
        );


        if ($smeName === '' || $ownerName === '' || $email === '') {

            http_response_code(400);

            echo json_encode([
                'error' => 'Business name, owner name, and email are required'
            ]);

            exit;
        }


        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

            http_response_code(400);

            echo json_encode([
                'error' => 'Invalid email address format'
            ]);

            exit;
        }


        // Check if email belongs to another SME
        $emailCheck = $pdo->prepare(
            'SELECT id
             FROM smes
             WHERE email = ?
             AND id != ?'
        );

        $emailCheck->execute([$email, $id]);

        if ($emailCheck->fetch()) {

            http_response_code(409);

            echo json_encode([
                'error' => 'Email is already in use by another SME'
            ]);

            exit;
        }


        // Validate business type
        $validTypes = [
            'Retail',
            'Manufacturing',
            'Services',
            'Agriculture',
            'Industry'
        ];

        if (!in_array($businessType, $validTypes, true)) {

            http_response_code(400);

            echo json_encode([
                'error' => 'Invalid business type selected'
            ]);

            exit;
        }


        // Validate location
        $validLocations = [
            'Urban',
            'Rural'
        ];

        if (!in_array($location, $validLocations, true)) {
            $location = 'Urban';
        }


        // Validate approval status
        $validApprovalStatuses = [
            'Pending',
            'Approved',
            'Rejected'
        ];

        if (!in_array($approvalStatus, $validApprovalStatuses, true)) {
            $approvalStatus = $existing['approval_status'];
        }


        // Update SME
        $st = $pdo->prepare(
            'UPDATE smes
             SET sme_name = ?,
                 owner_name = ?,
                 email = ?,
                 business_type = ?,
                 location = ?,
                 employees = ?,
                 years_operation = ?,
                 approval_status = ?
             WHERE id = ?'
        );


        $st->execute([
            $smeName,
            $ownerName,
            $email,
            $businessType,
            $location,
            max(1, $employees),
            max(0, $yearsOperation),
            $approvalStatus,
            $id
        ]);


        echo json_encode([
            'success' => true,
            'message' => 'SME information updated successfully'
        ]);

        exit;
    }


    http_response_code(400);

    echo json_encode([
        'error' => 'Invalid action specified'
    ]);

    exit;
}


http_response_code(405);

echo json_encode([
    'error' => 'Method not allowed'
]);