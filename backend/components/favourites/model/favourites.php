<?php
$method = $_SERVER['REQUEST_METHOD'];
$object = Favourites::getInstance();

include_once CONTROLLER_PATH.'ApiController.class.php';
echo json_encode($results);