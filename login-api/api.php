<?php

/**
 * Global Configuration
 */

define('SECRET', '.SzKZJeqK(7rh-W'); 
define('USER_DATABASE', 'db/bloom_version1.sqlite');


// Display errors for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include exception handler
include 'config/exceptionHandler.php';
set_exception_handler('exceptionHandler');

// Include autoloader
include("config/autoloader.php");
spl_autoload_register("autoloader");

// Initialize response object
$response = new Response();

// Get the endpoint name from the request and convert to lowercase
$endpointName = strtolower(Request::endpointName());

try {
    // Route requests to the appropriate endpoint
    switch ($endpointName) {
        
        case '/otoken':
        case '/otoken/':
            $endpoint = new OrgToken();
            break;
        case '/vtoken':
        case '/vtoken/':
            $endpoint = new VolToken();
            break;
        case '/vregister':
        case '/vregister/':
            $endpoint = new VolRegister();
            break;
        case '/oregister':
        case '/oregister/':
            $endpoint = new OrgRegister();
            break;
        
        default:
            throw new ClientError(404);
    }
} catch (ClientError $e) {
    // Handle client errors
    $data = ['message' => $e->getMessage()];
    $endpoint = new Endpoint($data);
}

// Output JSON response
$data = $endpoint->getData();
$response->outputJSON($data);
