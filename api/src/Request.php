<?php
/**
 * Abstract class to get information about the http request.
 * 
 * The methods in this class are static so they can be called
 * without creating an instance of the class. This will be useful
 * for the endpoint classes.
 * 
 * @author Dhruv Thota
 */
abstract class Request 
{
    public static function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }
 
    /**
     * endpointName
     * 
     * Return the name of the requested endpoint. 
     * .
     */
    public static function endpointName()
    {
        $url = $_SERVER["REQUEST_URI"];
        $path = parse_url($url)['path'];
        //return str_replace("/week4", "", $path);
        return str_replace("/coursework/api", "", $path);
    }
 
    public static function getBearerToken()
    {
        // Get all headers from the http request
        $allHeaders = getallheaders();
        $authorizationHeader = "";
        
        if (array_key_exists('Authorization', $allHeaders)) {
          $authorizationHeader = $allHeaders['Authorization'];
        } elseif (array_key_exists('authorization', $allHeaders)) {
          $authorizationHeader = $allHeaders['authorization'];
        }
        // 4. Check if there is a Bearer token in the header
        if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
          throw new ClientError(401);
        }

        // 5. Extract the JWT from the header (by cutting the text 'Bearer ')
        $jwt = trim(substr($authorizationHeader, 7));

        return $jwt;
    }
    public static function params()
    {
        return $_REQUEST;
    }
    
}