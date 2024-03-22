<?php

namespace App\EndpointController;

class NewPost extends Endpoint
{
    protected $allowedParams = [];

    public function __construct()
    {
        switch(\App\Request::method()) { 
            case 'POST':
            case 'PUT':
                $data = $this->addNewPost();
                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }

    private function addNewPost()
    {
        $requiredParams = ['title', 'description', 'location', 'endDate', 'positions', 'type'];
        $requestData = \App\Request::params();
        foreach ($requiredParams as $param) {
            if (!isset($requestData[$param])) {
                throw new \App\ClientError(422);
            }
        }

        // Extract form data and sanitize
        $title = htmlspecialchars(\App\REQUEST::params()['title']);
        $description = htmlspecialchars(\App\REQUEST::params()['description']);
        $location = htmlspecialchars(\App\REQUEST::params()['location']);
        $endDate = htmlspecialchars(\App\REQUEST::params()['endDate']);
        $positions = htmlspecialchars(\App\REQUEST::params()['positions']);
        $type = htmlspecialchars(\App\REQUEST::params()['type']);

        // Prepare SQL query with parameter binding
        $sql = "INSERT INTO Projects (title, description, location, endDate, positions, type) 
                VALUES (:title, :description, :location, :endDate, :positions, :type)";
        
        // Define SQL parameters
        $sqlParams = [
            ':title' => $title,
            ':description' => $description,
            ':location' => $location,
            ':endDate' => $endDate,
            ':positions' => $positions,
            ':type' => $type
        ];

        // Execute SQL query
        $dbConn = new \App\Database(APP_DATABASE);
        $data = $dbConn->executeSQL($sql, $sqlParams);

        return[];
    }
}