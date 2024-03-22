<?php

/**
 * This is a simple exceptionHandler which is called upon when an error 
 * occurs to provide more detailed and specific detail about the error
 * 
 * @author Ethan Warrander W20016240
 */
 
function exceptionHandler($e) {
   http_response_code(500);
   $output['message'] = "Internal Server Error";
   $output['details']['exception'] = $e->getMessage();
   $output['details']['file'] = $e->getFile();
   $output['details']['line'] = $e->getLine();
   echo json_encode($output);
   exit();
}