<?php

use CommandString\Router\Environment as Env;
use CommandString\Router\Router;

require_once "../private/vendor/autoload.php";

//##################//
//   SETUP ROUTER   //
//##################//
$router = new Router();
$router->setNamespace("Router\Routes");

//#######################//
//   SETUP ENVIRONMENT   //
//#######################//
$env = new Env(false);

//################//
//   SETUP TWIG   //
//################//
$env->twig = new \Twig\Environment((new \Twig\Loader\FilesystemLoader("../private/views")), [
    "cache" => ($env->cache_templates === true) ? "../private/cache" : false
]);

require_once "../private/routes/Routes.php";
