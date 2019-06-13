<?php
/**
 * FrontController is a class that loads the backend
 * via url in order to have pretty urls in our requests
 */
class FrontController {
    static $_instance;

    /**
     * Gets instance of self to not create 
     * multiple instances of the same object
     *
     * @return self
     */
    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    /**
     * Replaces the server url with the local file path
     * and runs the main function
     *
     * @return void
     */
    public function FrontController(){
        $this->uri=$_SERVER['REQUEST_URI'];
        $this->uri=str_replace('/angularjs/backend/',"",$this->uri);

        $this->run();
    }

    /**
     * Stores an array of allowed pages for backend queries
     *
     * @return array
     */
    private function getAllowedPages(){
        $allowedPages=array(
            'home',
            'restaurants',
            'contact',
            'shop',
            'details',
            'login',
            'profile',
            'cart',
            'favourites'
        );
        return $allowedPages;
    }
    
    /**
     * Loads the file in the specified route
     *
     * @param string $module
     * @param string $folder
     * @param string $filename
     * @param sring $extension
     * @return void
     */
    private function loadFiles($module,$folder,$filename,$extension){
        if (file_exists(COMPONENTS_PATH.$module.$folder.$filename.$extension)) {
            include_once COMPONENTS_PATH.$module.$folder.$filename.$extension;
        } else {
            include_once MODULES_PATH.$module.$folder.$filename.$extension;
        }
    }

    /**
     * Updates current time if user is logged in
     * Not in use since AngularJS was implemented
     *
     * @param string $uri
     * @return void
     */
    private function updateTime($uri){
        if (isset($_SESSION["user"])) {
            if (!(isset($uri[2]) && $uri[2] == 'activity-true'))
                $_SESSION["time"] = time();
        }
    }


    /**
     * Main run function of the class
     * Uses the url to load an object and run
     * a query with that it
     *
     * @return void
     */
    public function run(){
        session_start();
        $allowedPages=$this->getAllowedPages();
        
        $this->uri=rtrim($this->uri, '/');
        $cutUrl=explode('/',$this->uri);
        $this->updateTime($cutUrl);

        $_POST = json_decode(file_get_contents('php://input'),true); // true makes it parse as an array
        
        if (isset($cutUrl[0]) && $cutUrl[0]=='api') {
            if (in_array($cutUrl[1],$allowedPages)){
                $getParams=array_slice($cutUrl,2);
                foreach ($getParams as $getParam){
                    $params = explode('-',$getParam);
                    $_GET[$params[0]]=$params[1];
                }
                $this->loadFiles($cutUrl[1],'/model/',$cutUrl[1],'.php');
            } else {
                header('HTTP/1.0 404 Not found');
            }
        } 
        // angularjs does this now
        // else {
        //     include_once VIEW_PATH_INC . 'top_page.html';
        //     include_once VIEW_PATH_INC . 'header.html';
        //     include_once LOGIN_VIEW_PATH . 'login.html';

        //     if (in_array($this->uri,$allowedPages)){
        //         if ($cutUrl[0] == 'details'){
        //             $this->loadFiles('shop','/view/',$cutUrl[0],'.html');
        //         } else {
        //             $this->loadFiles('frontend/modules/'.$cutUrl[0],'/view/',$cutUrl[0],'.html');
        //         }
        //     } else if($this->uri==""||$this->uri=="/"){
        //         include_once "frontend/modules/home/view/home.html";
        //     } else {
        //         include_once "404.html";
        //     }

        //     include_once VIEW_PATH_INC . 'footer.html';
        // }
    }
}
?>