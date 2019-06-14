<?php
/**
 * Favourites class extending off ModelController
 * Specifies table name and has it's own instance
 */
class Favourites extends ModelController{
    protected $tableName='favourites';
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