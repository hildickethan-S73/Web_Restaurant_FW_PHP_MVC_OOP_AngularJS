<?php
include(UTILS_PATH . "upload.inc.php");

/**
 * Upload image function
 */
if ((isset($_GET["upload"])) && ($_GET["upload"])){
  $result_prodpic = upload_files();
  $_SESSION['result_prodpic'] = $result_prodpic;
  echo json_encode($result_prodpic);
}

/**
 * Delete avatar function
 */
if ((isset($_GET["avatar"])) && ($_GET["avatar"])){
  $_SESSION['result_prodpic'] = array();
  $result = remove_files();
  echo json_encode($result);
}