<?php

namespace App;

/**
 * Response sets up the headers and outputs the data variable
 * 
 * Response contains a method that sets the headers to a set value
 * which is defined within the method. This method is called on startup.
 * There is also the outputJSON function which outputs the value of the 
 * data variable in a JSON format
 * 
 * @author Ethan Warrander W20016240
 */

 class Response
 {
  
     public function __construct()
     {
         $this->outputHeaders();

         if(Request::method() === 'OPTIONS')
         {
            http_response_code(204);
            exit();
         }
     }
     
     private function outputHeaders()
     {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
     }
  
     public function outputJSON($data)
     {
        if (empty($data)) {
            http_response_code(204);
        }

         echo json_encode($data);
         
     }
  
 }