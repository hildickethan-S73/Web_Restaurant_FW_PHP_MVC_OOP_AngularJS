<?php
/**
 * This file is what processes the data
 * received from JS and turns it into a
 * function with the current object
 */
if ($method=='GET'||$method=='DELETE'){
    $data=$_GET;
    $results = [];
    $response = $object->$method($data);
    if ($method=='DELETE'){
        if ($response){
            $results=$response;
        } else {
            header('HTTP/1.0 400 Bad Request');
            die();
        }
    } else {
        if ($response){
            foreach ($response as $row){
                foreach ($row as &$element){
                    $element=utf8_encode($element);
                }
                $results[]=(object)$row;
            }
        } else {
            header('HTTP/1.0 400 Bad Request');
            die();
        }
    }
} else if ($method=='POST'){
    $data=json_decode($_POST['data']);
    $response = $object->$method($data);
    if ($response){
        $results=$response;
    } else {
        header('HTTP/1.0 400 Bad Request');
        die();
    }
} else if ($method=='PUT'){
    // parse_str(file_get_contents("php://input"),$post_vars);
    // debugPHP($_POST['data']);
    $data = [$_GET, $_POST['data']];
    // error_log(print_r($data,1));
    $response = $object->$method($data);
    if ($response){
        $results=$response;
    } else {
        header('HTTP/1.0 400 Bad Request');
        die();
    }    
} else {
    header('HTTP/1.0 400 Bad Request');
    die();
}