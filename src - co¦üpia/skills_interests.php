<?php
// RetrieveSkillsAndInterests.php

require 'db_connection.php'; // Include the database connection

header('Content-Type: application/json');

try {
    // Fetch skills
    $skillsStmt = $pdo->prepare("SELECT name FROM skills");
    $skillsStmt->execute();
    $skills = $skillsStmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch interests
    $interestsStmt = $pdo->prepare("SELECT name FROM interests");
    $interestsStmt->execute();
    $interests = $interestsStmt->fetchAll(PDO::FETCH_ASSOC);

    // Return as JSON
    echo json_encode([
        'skills' => $skills,
        'interests' => $interests,
    ]);
} catch (PDOException $e) {
    // If there is an error, return a JSON with the error message
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}
?>