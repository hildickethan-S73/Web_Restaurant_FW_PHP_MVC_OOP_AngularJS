<?php
$method = $_SERVER['REQUEST_METHOD'];
$object = Cart::getInstance();

// I dont like all the object and request resetting but it's how the framework is built
if ($method == 'POST'){
    /**
     * Checkout process
     */
    if (isset($_GET['checkout'])){
        unset($_GET['checkout']);
        // include_once CONTROLLER_PATH.'ApiController.class.php';
        $restaurants = $_POST['data']['cart'];
        $_POST['data'] = "";

        // pid = purchase id
        // get latest pid, makeshift get request from server to itself
        $method = "GET";
        $_GET['orderbydesc']="pid";
        $_GET['limit']=1;
        include CONTROLLER_PATH.'ApiController.class.php';
        
        $pid = ($results[0]->pid)+1;
        $uid = $_SESSION['user']->id;

        // reset our GET request
        unset($_GET['orderbydesc']);
        unset($_GET['limit']);
        
        foreach ($restaurants as $key => $value) {
            $method = "GET";
            $object = Restaurants::getInstance();
            $_GET['id']=$value['id'];
            include CONTROLLER_PATH.'ApiController.class.php';
            unset($_GET['id']);
            $price = $results[0]->price;

            // reset our request to be a POST
            $method = "POST";
            $object = Cart::getInstance();
    
            $_POST['data']['pid'] = $pid;
            $_POST['data']['uid'] = $uid;
            $_POST['data']['rid'] = $value['id'];
            $_POST['data']['price'] = $price;
            $_POST['data']['quantity'] = $value['quantity'];
            $_POST['data'] = json_encode($_POST['data']);
            
            include CONTROLLER_PATH.'ApiController.class.php';
            $_POST['data'] = json_decode($_POST['data'],true);

            // no checking if all results were done correctly
            // should be transaction too
            echo json_encode($results);
        }
        
    }
} else {
    /**
     * For regular query handling
     * usually just GETs
     */
    include_once CONTROLLER_PATH.'ApiController.class.php';
    echo json_encode($results);
}