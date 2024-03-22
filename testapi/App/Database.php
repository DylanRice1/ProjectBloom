<?php

namespace App;

/**
 * Database is a class that contains properties relating to the database
 * 
 * The Database class contains 3 properties for the database. These are 
 * the filename which is where the database is stored, the connection which
 * is how the website will connect to the database, and the result which is 
 * whether the connection was successful or not. This class will be used in
 * each of the Endpoints so they can connect to the database to retrieve or
 * write data
 * 
 * @author Ethan Warrander W20016240
 */

 class Database 
 {
     private $dbConnection;
   
     public function __construct($dbName) 
     {
         $this->setDbConnection($dbName);  
     }
  
     private function setDbConnection($dbName) 
     {
         try 
         { 
             $this->dbConnection = new \PDO('sqlite:'.$dbName);
             $this->dbConnection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
         } 
         catch( \PDOException $e ) 
         {
             $error['message'] = "Database Connection Error";
             $error['details'] = $e->getMessage();
             echo json_encode($error);
             exit(); 
         }
     }
     
     public function executeSQL($sql, $params=[])
     { 
         $stmt = $this->dbConnection->prepare($sql);
         $stmt->execute($params);
         return $stmt->fetchAll(\PDO::FETCH_ASSOC);
     }
}