<?php
include(UTILS_PATH . "upload.inc.php");

if ((isset($_GET["upload"])) && ($_GET["upload"])){
  $result_prodpic = upload_files();
  $_SESSION['result_prodpic'] = $result_prodpic;
  echo json_encode($result_prodpic);
}

if ((isset($_GET["delete"])) && ($_GET["delete"])){
  $_SESSION['result_prodpic'] = array();
  $result = remove_files();
  if($result === true){
    echo json_encode(array("res" => true));
  }else{
    echo json_encode(array("res" => false));
  }
  //echo json_decode($result);
}