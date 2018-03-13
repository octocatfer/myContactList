<?php
define('HOST', 'localhost');
define('USER', 'root');
define('PASS', '');
define('DBNAME', 'directorio');
define('CHARSET', 'utf8');

$dsn = 'mysql:host=' . HOST . ';dbname=' . DBNAME . ';charset=' . CHARSET;
$db = new PDO($dsn, USER, PASS);
