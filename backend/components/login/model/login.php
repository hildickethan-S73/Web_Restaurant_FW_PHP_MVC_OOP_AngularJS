<?php
$method = $_SERVER['REQUEST_METHOD'];
$object = Login::getInstance();
include_once LOGIN_UTILS_PATH.'JWT.php';
include_once LOGIN_UTILS_PATH.'BeforeValidException.php';
include_once LOGIN_UTILS_PATH.'ExpiredException.php';
include_once LOGIN_UTILS_PATH.'SignatureInvalidException.php';
use Firebase\JWT\JWT;

$secret = parse_ini_file(INI_PATH.'jwt.ini');
$secret = $secret['secret'];

// whole file really needs code clean up
// theres literally the same code 3 times

if ($method == 'POST'){
    if (isset($_GET['register']) && $_GET['register']){
        unset($_POST['data']['password2']);
        $_POST['data']['password']=password_hash($_POST['data']['password'],PASSWORD_BCRYPT);
        $emaildata = $_POST['data'];
        // JWT
        $payload = array(
            "message" => $emaildata['username'],
            "exp" => time()+(60 * 30) // 30 minutes
        );
        $emaildata['token'] = JWT::encode($payload,$secret);

        $_POST['data'] = json_encode($_POST['data']);
        include_once CONTROLLER_PATH.'ApiController.class.php';

        include_once UTILS_PATH.'mail.inc.php';
        $mailgundata = parse_ini_file(INI_PATH.'mailgun.ini');
        $results = send_email($emaildata, $mailgundata, 'activation');

        echo json_encode($results);
    }

    if (isset($_GET['recoveremail']) && $_GET['recoveremail']){
        include_once UTILS_PATH.'mail.inc.php';

        $mailgundata = parse_ini_file(INI_PATH.'mailgun.ini');
        $results = send_email($_POST['email'], $mailgundata, 'recover');
        echo json_encode($results);
    } 
    
    if (isset($_GET['sendemail']) && $_GET['sendemail']){
        unset($_GET['sendemail']);
        $emaildata = $_POST['data'];

        // JWT
        $payload = array(
            "message" => $emaildata['username'],
            "exp" => time()+ (60 * 30) // 30 minutes
        );
        $emaildata['token'] = JWT::encode($payload,$secret);
        // debugPHP($emaildata['token']);
        include_once UTILS_PATH.'mail.inc.php';
        $mailgundata = parse_ini_file(INI_PATH.'mailgun.ini');
        $results = send_email($emaildata, $mailgundata, 'activation');

        echo json_encode($results);
    } 

    if (isset($_GET['recoverPW']) && $_GET['recoverPW']){
        unset($_GET['recoverPW']);
        $emaildata = $_POST['data'];

        // JWT
        $payload = array(
            "message" => $emaildata['username'],
            "exp" => time()+ (60 * 30) // 30 minutes
        );
        $emaildata['token'] = JWT::encode($payload,$secret);
        // debugPHP($emaildata['token']);

        include_once UTILS_PATH.'mail.inc.php';
        $mailgundata = parse_ini_file(INI_PATH.'mailgun.ini');
        $results = send_email($emaildata, $mailgundata, 'recover');

        echo json_encode($results);
    } 
} else if ($method == 'GET'){
    if (isset($_GET['login']) && $_GET['login']){
        unset($_GET['login']);
        $loginpassword = $_GET['password'];
        unset($_GET['password']);
        include_once CONTROLLER_PATH.'ApiController.class.php';
        
        if($results){
            if(password_verify($loginpassword,$results[0]->password)){
                // JWT
                $_SESSION['user']=$results[0];
                $payload = array(
                    "message" => $_SESSION['user']->username,
                    "exp" => time()+(60*30)
                );
                $_SESSION['user']->token = JWT::encode($payload,$secret);
                $_SESSION['user']->password = "";
                echo json_encode($_SESSION['user']);
            } else {
                echo 'badpw';
            }
        } else {
            echo 'nouser';
        }
    } else if (isset($_GET['check']) && $_GET['check']){
        if (isset($_SESSION['user'])){
            echo json_encode($_SESSION['user']);
        } else {
            echo 'notlogged';
        }
    } else if (isset($_GET['activity']) && $_GET['activity']){
        if (isset($_SESSION['user'])){
            if (isset($_SESSION["time"])){  
                // error_log(print_r($_SESSION["time"],1));
                if((time() - $_SESSION["time"]) >= 1200){ //seconds
                    echo true; 
                    exit();
                }
            }
        }
    } else if (isset($_GET['request']) && $_GET['request']){
        unset($_GET['request']);
        include_once CONTROLLER_PATH.'ApiController.class.php';
        echo json_encode($results);

    } else {
        include_once CONTROLLER_PATH.'ApiController.class.php';
        echo json_encode($results);
    }

} else if ($method == 'DELETE'){
    if (isset($_GET['logout']) && $_GET['logout']){
        if (isset($_SESSION['user'])){
            unset($_SESSION['user']);
            session_destroy();
            if (!isset($_SESSION['user'])){
                echo "success";
            } 
        } 
    }
} else if ($method == 'PUT'){
    if (isset($_GET['enableaccount']) && $_GET['enableaccount']){
        unset($_GET['enableaccount']);
        $token = $_POST['data']['token'];
        unset($_POST['data']['token']);
    
        try {
            $checktoken = JWT::decode($token,$secret,array('HS256'));
        } catch(Exception $e) {
            $results = $e->getMessage();      
        }
        if(!isset($results)){
            if ($checktoken->message == $_GET['username'])
                include_once CONTROLLER_PATH.'ApiController.class.php';
            else 
                $results = 'Username mismatch with token';
        }
        echo json_encode($results);
    } else {
        $token = $_POST['data']['token'];
        unset($_POST['data']['token']);

        try {
            $checktoken = JWT::decode($token,$secret,array('HS256'));
        } catch(Exception $e) {
            $results = $e->getMessage();      
        }
        if(!isset($results)){
            if ($checktoken->message == $_GET['username']){
                if (isset($_POST['data']['password'])){
                    $_POST['data']['password']=password_hash($_POST['data']['password'],PASSWORD_BCRYPT);
                }
                foreach ($_POST['data'] as $key => $value) {
                    $_SESSION['user']->$key = $value;
                    // debugPHP($_SESSION['user']);
                }
                include_once CONTROLLER_PATH.'ApiController.class.php';
                if ($results === true) {
                    // JWT update token
                    $payload = array(
                        "message" => $_SESSION['user']->username,
                        "exp" => time()+(60*30)
                    );
                    $_SESSION['user']->token = JWT::encode($payload,$secret);
                    $_SESSION['user']->password = "";
                    $results = array('token' => $_SESSION['user']->token);
                }
            } else 
                $results = 'Unauthorized token';
        }
        echo json_encode($results);
    }   
}