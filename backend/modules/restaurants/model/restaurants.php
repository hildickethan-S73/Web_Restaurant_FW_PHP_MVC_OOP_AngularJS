<?php
/**
 * This is the standard model to handle queries
 */
$method = $_SERVER['REQUEST_METHOD'];

$object = Restaurants::getInstance();

include_once CONTROLLER_PATH.'ApiController.class.php';

echo json_encode($results);