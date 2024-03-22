<?php

/**
 * This endpoint is used to provide data about the developer
 * 
 * This endpoint does not connect to a database to retrieve 
 * information, the data is manually entered in this endpoint, which
 * in this case is the name and ID of the developer of the code
 * 
 * @author Ethan Warrander W20016240
 */

namespace App\EndpointController;
 
class Developer extends Endpoint
{
    protected $allowedParams = [];
 
 
    public function __construct()
    {
        switch(\App\Request::method()) {
            case 'GET':
                $this->checkAllowedParams();
                $data['id'] = "W20016240";
                $data['name'] = "Ethan Warrander";
                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }
}
