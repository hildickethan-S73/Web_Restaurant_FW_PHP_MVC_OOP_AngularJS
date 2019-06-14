<?php
/**
 * Save data to go from shop to details
 */
// to details
if (isset($_GET['savedetails']) && $_GET['savedetails']){
    $_SESSION['to_details'] = $_POST;
}

/**
 * Loads details
 */
if (isset($_GET['details']) && $_GET['details']){
    echo json_encode($_SESSION['to_details']);
}

/**
 * Save data to go from home search to shop
 */
// to shop
if (isset($_GET['savesearch']) && $_GET['savesearch']){
    $_SESSION['to_shop'] = $_POST;
}

/**
 * 
 */
if (isset($_GET['getsearch']) && $_GET['getsearch']){
    if (isset($_SESSION['to_shop']) && $_SESSION['to_shop']){
        echo json_encode($_SESSION['to_shop']);
        
        $_SESSION['to_shop'] = "";
        unset($_SESSION['to_shop']);
    }
    else
        echo false;
}