<?php
include_once UTILS_PATH.'mail.inc.php';

if (isset($_GET['email'])){
    $mailgundata = parse_ini_file(INI_PATH.'mailgun.ini');
    $results = send_email($_POST, $mailgundata, 'contact');
} else {
    $results = 'no get';
}

echo json_encode($results);
