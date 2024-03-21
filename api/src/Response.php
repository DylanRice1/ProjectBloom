<?php

/**
 * Class Response
 *
 * Represents an HTTP response and provides methods for outputting JSON data.
 * 
 * @author Dhruv Thota
 */
class Response
{
    /**
     * Response constructor.
     *
     * Initializes the response by setting the necessary headers.
     * If the request method is "OPTIONS," the script exits immediately.
     */
    public function __construct()
    {
        $this->outputHeaders();

        if (Request::method() == "OPTIONS") {
            exit();
        }
    }

    /**
     * Set the required HTTP headers for a JSON response.
     *
     * - Content-Type: application/json
     * - Access-Control-Allow-Origin: *
     * - Access-Control-Allow-Methods: GET, POST, OPTIONS
     * - Access-Control-Allow-Headers: Authorization, Content-Type
     */
    private function outputHeaders()
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
    }

    /**
     * Output JSON data as the response.
     *
     * If the provided data is empty, sets the HTTP response code to 204 (No Content).
     *
     * @param array $data The data to be output as JSON.
     */
    public function outputJSON($data)
    {
        if (empty($data)) {
            http_response_code(204);
        } else {
            echo json_encode($data);
        }
    }
}
