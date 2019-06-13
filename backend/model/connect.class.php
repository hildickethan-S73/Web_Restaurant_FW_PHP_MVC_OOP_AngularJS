<?php
	/**
	 * Connect class to DB
	 */
	class connect{
		/**
		 * Establishes connection to the MySql DB
		 * Credentials loaded via .ini file
		 *
		 * @return object
		 */
		public static function con(){
			$credentials = parse_ini_file(INI_PATH.'db.ini');
			
			$host = $credentials['host'];  
    		$user = $credentials['user'];                     
    		$pass = $credentials['pass'];                             
    		$db = $credentials['db'];                      
    		$port = $credentials['port'];
    		
    		$connection = mysqli_connect($host, $user, $pass, $db, $port)or die(mysql_error());
			return $connection;
		}
		/**
		 * Closes connection to the MySql DB
		 *
		 * @param object $connection
		 * @return void
		 */
		public static function close($connection){
			mysqli_close($connection);
		}
	}