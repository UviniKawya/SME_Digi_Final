<?php

require_once '../config/cors.php';
require_once '../config/db.php';
require_once '../config/auth.php';

requireAdmin();

/* ==============================
   SME REGISTRATION REPORT
============================== */

$smes = $pdo->query(
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
     ORDER BY created_at DESC'
)->fetchAll();


/* ==============================
   SME SUMMARY
============================== */

$totalSmes = (int)$pdo
    ->query('SELECT COUNT(*) FROM smes')
    ->fetchColumn();

$pendingSmes = (int)$pdo
    ->query(
        'SELECT COUNT(*) FROM smes
         WHERE approval_status = "Pending"'
    )
    ->fetchColumn();

$approvedSmes = (int)$pdo
    ->query(
        'SELECT COUNT(*) FROM smes
         WHERE approval_status = "Approved"'
    )
    ->fetchColumn();

$rejectedSmes = (int)$pdo
    ->query(
        'SELECT COUNT(*) FROM smes
         WHERE approval_status = "Rejected"'
    )
    ->fetchColumn();


/* ==============================
   ASSESSMENT SUMMARY
============================== */

$assessmentSummary = $pdo->query(
    'SELECT
        assessment_type,
        COUNT(*) AS total
     FROM assessment_sessions
     GROUP BY assessment_type'
)->fetchAll();


$totalAssessments = (int)$pdo
    ->query(
        'SELECT COUNT(*) FROM assessment_sessions'
    )
    ->fetchColumn();


/* ==============================
   RESPONSE
============================== */

echo json_encode([
    'sme_summary' => [
        'total' => $totalSmes,
        'pending' => $pendingSmes,
        'approved' => $approvedSmes,
        'rejected' => $rejectedSmes
    ],

    'smes' => $smes,

    'assessment_summary' => $assessmentSummary,

    'total_assessments' => $totalAssessments
]);