<?php
session_start();
require 'Slim/Slim.php';

$app = new Slim();

$app->post('/user', 'addUser');
$app->get('/auth', 'getAuth');
$app->post('/auth', 'auth');


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

function auth(){
	if(!empty($_POST['email']) && !empty($_POST['password'])) {
       
        if($_POST['email'] == 'admin' && $_POST['password'] == '123') {
            $user = array("username"=>"jehan", "email"=>"jehan@zeihanaulia.com", "isLogin"=>1);
            $_SESSION['user'] = $user;
            echo json_encode($user);
        }
        else {
        	$error = array("error"=> array("text"=>"Password salah"));
        	echo json_encode($error);
        }
    }
    else {
	$error = array("error"=> array("text"=>"Username and Password tidak boleh kosong."));
        echo json_encode($error);
    }
}

function getAuth(){
	try {
		echo $_SESSION["auth"];
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