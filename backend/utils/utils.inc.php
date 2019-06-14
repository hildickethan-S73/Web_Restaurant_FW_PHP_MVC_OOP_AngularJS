<?php

/**
 * Shortcut function to debug in php's error log
 *
 * @param array $array
 * @return void
 */
function debugPHP($array){
    error_log(print_r($array,1));
}
