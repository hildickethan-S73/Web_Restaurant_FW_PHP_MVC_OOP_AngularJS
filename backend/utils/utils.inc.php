<?php

function debugPHP($array){
    error_log(print_r($array,1));
}
