<?php

/**
 * Endpoint is the parent class of all other endpoints
 * 
 * This class provides common functionality and properties for all of 
 * the endpoints. It contains a constructor and functions to set and get 
 * the data from an endpoint. It also contains a function to check if
 * there are set paramaters that are allowed for the endpoint and if not
 * then it sets it to the default set in this class
 * 
 * @author Ethan Warrander W20016240
 */

namespace App\EndpointController;
 
class Endpoint 
{
    private $data;

    protected $allowedParams = [];
 
    public function __construct($data = ["message" => []])
    {
        $this->setData($data);
    }
 
    public function setData($data)
    {
        $this->data = $data;
    }
 
    public function getData()
    {
        return $this->data;
    }
 
    protected function checkAllowedParams()
    {
        foreach (\App\Request::params() as $key => $value) 
        {
            if (!in_array($key, $this->allowedParams))
            {
                throw new \App\ClientError(422);
            }
        }
    }
}