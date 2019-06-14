<?php
/**
 * Login class extending off ModelController
 * Specifies table name and has it's own instance
 */
class Login extends ModelController{
    protected $tableName='users';
    private static $instance;
    
    protected function __construct(){
        parent::__construct();
    }
    public static function getInstance(){
        if (!(self::$instance instanceof self))
            self::$instance = new self();
        return self::$instance;
    }
}