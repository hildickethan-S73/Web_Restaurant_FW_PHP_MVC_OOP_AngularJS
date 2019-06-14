<?php
/**
 * Standard process with object encoding for posts
 */
$method = $_SERVER['REQUEST_METHOD'];
$object = Favourites::getInstance();

$_POST['data'] = json_encode($_POST['data']);
include_once CONTROLLER_PATH.'ApiController.class.php';
echo json_encode($results);