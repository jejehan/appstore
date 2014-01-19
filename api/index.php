<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->post('/user', 'addUser');

$app->run();

function addUser() {
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	try {
		echo '{"user": ' . json_encode($user) . '}';
		echo json_encode($user);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function getConnection() {
	$dbhost="toptotoe-boutique.com";
	$dbuser="toptoto1_prest71";
	$dbpass="P8uzo51nS4";
	$dbname="toptoto1_prest71";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>