<?php

define('LARAVEL_START', microtime(true));
defined('DS') or define('DS', DIRECTORY_SEPARATOR);
defined('ZERO') or define('ZERO',0);
if(!file_exists( __DIR__.'/../vendor/autoload.php')){
    require_once __DIR__.'/../public/composer.php';die;
}
/*
|--------------------------------------------------------------------------
| Register The Composer Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader
| for our application. We just need to utilize it! We'll require it
| into the script here so we do not have to manually load any of
| our application's PHP classes. It just feels great to relax.
|
*/

require __DIR__.'/../vendor/autoload.php';
require __DIR__.'/../app/Plugins/vendor/autoload.php';
