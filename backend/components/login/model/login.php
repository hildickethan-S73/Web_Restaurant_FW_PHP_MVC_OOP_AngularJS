<?php
$method = $_SERVER['REQUEST_METHOD'];
$object = Login::getInstance();
include_once LOGIN_UTILS_PATH.'JWT.php';
use Firebase\JWT\JWT;
$secret = 'jordilg13';

// $JWT = JWT::decode($JWT,'secret',array('HS256'));
// debugPHP($JWT);
if ($method == 'POST'){
    if (isset($_GET['register']) && $_GET['register']){
        debugPHP($_POST['data']);
        unset($_POST['data']['password2']);
        $_POST['data']['password']=password_hash($_POST['data']['password'],PASSWORD_BCRYPT);
        $_POST['data'] = json_encode($_POST['data']);
        include_once CONTROLLER_PATH.'ApiController.class.php';

        // send verification email
        // if ($results){
        //     // JWT
        //     $payload = array(
        //         "message" => 'raulojeda22',
        //         "exp" => time()+20
        //     );
        //     $token = JWT::encode($payload,$secret);
        //     $_SESSION['emailtoken'] = $token;
            
        // }
        echo json_encode($results);
    }

    if (isset($_GET['email']) && $_GET['email']){
        include_once UTILS_PATH.'mail.inc.php';

        $mailgundata = parse_ini_file(INI_PATH.'mailgun.ini');
        $results = send_email($_POST['email'], $mailgundata, 'recover');
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
                $payload = array(
                    "message" => 'login',
                    "exp" => time()+20
                );
                $_SESSION['user']=$results;
                $_SESSION['user']['token'] = JWT::encode($payload,$secret);
                echo json_encode($_SESSION['user']);
            } else {
                echo 'badpw';
            }
        } else {
            echo 'nouser';
        }
    }

    if (isset($_GET['check']) && $_GET['check']){
        if (isset($_SESSION['user'])){
            echo json_encode($_SESSION['user']);
        } else {
            echo json_encode('notlogged');
        }
    }

    if (isset($_GET['activity']) && $_GET['activity']){
        if (isset($_SESSION['user'])){
            if (isset($_SESSION["time"])){  
                // error_log(print_r($_SESSION["time"],1));
                if((time() - $_SESSION["time"]) >= 1200){ //seconds
                    echo true; 
                    exit();
                }
            }
        }
    }
    // cringe
    if (isset($_GET['request']) && $_GET['request']){
        unset($_GET['request']);
        include_once CONTROLLER_PATH.'ApiController.class.php';
        echo json_encode($results);
    }

} else if ($method == 'DELETE'){
    if (isset($_GET['logout']) && $_GET['logout']){
        if (isset($_SESSION['user'])){
            unset($_SESSION['user']);
            session_destroy();
        } 
    }
}



// include_once CONTROLLER_PATH.'ApiController.class.php';
// echo json_encode($results);