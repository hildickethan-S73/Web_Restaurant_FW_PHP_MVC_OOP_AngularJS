<?php
include_once UTILS_PATH.'mail.inc.php';

if (isset($_GET['email'])){
    $mailgundata = parse_ini_file(INI_PATH.'mailgun.ini');
    $results = send_email($_POST, $mailgundata, 'contact');
} else {
    $results = false;
}

echo json_encode($results);
