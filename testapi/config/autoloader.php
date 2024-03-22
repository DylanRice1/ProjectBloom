<?php

/**
 * Autoloader is used to autoload classes in PHP
 * 
 * This autoloader takes a class name, then constructs the filename from 
 * the class name. After this it checks the readability of the file and
 * throws an error if it is not readable
 * 
 * @author Ethan Warrander W20016240
 */

function autoloader($className) {
    $filename = $className . ".php";
    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
    
    if (!is_readable($filename)) {
        throw new Exception("File '$filename' not found or not readable");
    }
    require $filename;
}
