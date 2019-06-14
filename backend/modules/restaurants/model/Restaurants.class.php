<?php
/**
 * Restaurants class extending off ModelController
 * Specifies the table name and has it's own instance
 */
class Restaurants extends ModelController{
    protected $tableName='restaurants';
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