<?php
/**
 * Extends off ControllerCore to serve as a generic Object
 * to extend off
 */
class ModelController extends ControllerCore{
    private $_instance;

    protected function __construct(){
    }

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
     * Build and run a GET query
     *
     * @param array $data
     * @return array
     */
    public function GET($data){
        $query=$this->buildGetQuery($data);
        return $this->runQuery($query);
    }

    /**
     * Build and run a POST query
     *
     * @param object $data
     * @return array
     */
    public function POST($data){
        $query=$this->buildPostQuery($data);
        return $this->runQuery($query);
    }
    
    /**
     * Build and run a PUT query
     *
     * @param array $data
     * @return array
     */
    public function PUT($data){
        $query=$this->buildPutQuery($data);
        return $this->runQuery($query);
    }
    
    /**
     * Build and run a DELETE query
     *
     * @param array $data
     * @return array
     */
    public function DELETE($data){
        $query=$this->buildDeleteQuery($data);        
        return $this->runQuery($query);
    }
}