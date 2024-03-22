<?php

/**
 * Router is used to simplify URLs for the endpoints
 * 
 * Router uses a switch case so that when after an endpoint path has been
 * passed to this function from a request it uses a switch case to allow
 * a simplified URL when calling an endpoint to provide clean URLs
 * 
 * @author Ethan Warrander W20016240
 */
 
namespace App;
 
abstract class Router
{
    public static function routeRequest()
    {
        try
        {
            switch (Request::endpointName()) {
                case '/':
                case '/developer':
                case '/developer/':
                    $endpoint = new \App\EndpointController\Developer();
                    break;
                case '/newpost':
                case '/newpost/':
                    $endpoint = new \App\EndpointController\NewPost();
                    break;
                case '/projects':
                case '/projects/':
                    $endpoint = new \App\EndpointController\Projects();
                    break;
            }
        } catch (ClientError $e) {
            $data = ['message' => $e->getMessage()];
            $endpoint = new \App\EndpointController\Endpoint($data);
        }
 
        return $endpoint;
    }
}