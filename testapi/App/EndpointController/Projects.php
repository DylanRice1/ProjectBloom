<?php

namespace App\EndpointController;
 
class Projects extends Endpoint
{
    protected $allowedParams = ["page", "type"];
    private $sql = "SELECT title, description, location, endDate, positions, type
                    FROM Projects";
    private $sqlParams = [];
 
    public function __construct()
    {
        switch(\App\Request::method()) {
            case 'GET':
                $this->checkAllowedParams();
                $this->buildSQL();
                $dbConn = new \App\Database(APP_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams); 
                break;
            default:
                throw new \App\ClientError(405);
        }
 
        parent::__construct($data);
    }
 
 
    private function buildSQL()
    {
        $where = false;

        if (isset(\App\Request::params()['type'])) 
        {
            if (\App\Request::params()['type'] !== 'All') {
                $this->sql .= ($where) ? " AND" : " WHERE";
                $where = true;
                $this->sql .= " LOWER(type) LIKE LOWER(:type)";
                $this->sqlParams[":type"] = \App\Request::params()['type'];
            }
        }

        if (isset(\App\Request::params()['page'])) 
        {
            if (!is_numeric(\App\REQUEST::params()['page'])) {
                throw new \App\ClientError(422);
            }
            
            $this->sql .= " LIMIT 10 OFFSET 10 * (:page-1)";
            $this->sqlParams[":page"] = \App\Request::params()['page'];
        }
 
    }
}