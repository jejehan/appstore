<?php
require 'Slim/Slim.php';

define('DEBUG', false);
define('PS_SHOP_PATH', 'http://toptotoe-boutique.com/');
define('PS_WS_AUTH_KEY', 'QZP8ZRO1COQMU24TGRD3O8UG27WFU4JG');
define('_COOKIE_KEY_', 'okqlkzuhrt64zeb891umpsolelyzdl5znzrxdtu1t9rl8miyjzqrw0mh');
define('_PS_MYSQL_REAL_ESCAPE_STRING_', function_exists('mysql_real_escape_string'));
if (!defined('_PS_MAGIC_QUOTES_GPC_'))
    define('_PS_MAGIC_QUOTES_GPC_', get_magic_quotes_gpc());

require 'lib/PSWebServiceLibrary.php';

$app = new Slim();

$app->post('/user', 'addUser');
$app->get('/auth', 'auth');
$app->post('/login', 'login');


$app->run();

function addUser() {
    try {
        $webService = new PrestaShopWebservice(PS_SHOP_PATH, PS_WS_AUTH_KEY, DEBUG);
        $opt        = array(
            'resource' => 'customers'
        );
        $xml        = $webService->get(array(
            'url' => PS_SHOP_PATH . '/api/customers?schema=blank'
        ));
        $resources  = $xml->children()->children();
    }
    catch (PrestaShopWebserviceException $e) {
        // Here we are dealing with errors
        $trace = $e->getTrace();
        if ($trace[0]['args'][0] == 404)
            echo 'Bad ID';
        else if ($trace[0]['args'][0] == 401)
            echo 'Bad auth key';
        else
            echo 'Other error';
    }
    
    if (count($_POST) > 0) {
        // Here we have XML before update, lets update XML
        foreach ($resources as $nodeKey => $node) {
            if ($nodeKey == "firstname" || $nodeKey == "lastname" || $nodeKey == "email" || $nodeKey == "passwd")
                $resources->$nodeKey = $_POST[$nodeKey];
        }
        try {
            $opt            = array(
                'resource' => 'customers'
            );
            $opt['postXml'] = $xml->asXML();
            $xml            = $webService->add($opt);
            echo "Successfully added.";
        }
        catch (PrestaShopWebserviceException $ex) {
            // Here we are dealing with errors
            $trace = $ex->getTrace();
            if ($trace[0]['args'][0] == 404)
                echo 'Bad ID';
            else if ($trace[0]['args'][0] == 401)
                echo 'Bad auth key';
            else
                echo 'Other error<br />' . $ex->getMessage();
        }
    }
}

function auth() {

    if (isset($_SESSION['isLogin'])) {
        $user = array(
            "id" => $_SESSION['id'],
            "firstname" => $_SESSION['firstname'],
			"lastname" => $_SESSION['lastname'],
			"email" => $_SESSION['email'],
            "isLogin" => $_SESSION['isLogin']
        );
        $data_login = json_encode($user);
		echo  $data_login;
    } else {
         $pesan = array(
             "view"=>"login"
         );
         $data_login = json_encode($pesan);
		 echo  $data_login;
    }
}

function login() {
    if (!empty($_POST['email']) && !empty($_POST['password'])) {
        $userPasswd = encrypt(_COOKIE_KEY_ . $_POST['password']);
        $isdata     = getData($_POST['email']);
        
        $passwd = $isdata['passwd'];
        
        if ($passwd != "") {
            if ($userPasswd == $passwd) {
                $user = array(
                    "id" => $isdata['id'],
                    "firstname" => $isdata['firstname'],
                    "lastname" => $isdata['lastname'],
                    "email" => $_POST['email'],
                    "isLogin" => 1,
					"view"=>"myaccount"
                );
                
				$_SESSION['id']			= $isdata['id'];
				$_SESSION['firstname']  = $isdata['firstname'];
				$_SESSION['lastname']   = $isdata['lastname'];
				$_SESSION['email']      = $_POST['email'];
				$_SESSION['isLogin']    = 1;
				
                $data_login = json_encode($user);
            } else {
                $pesan      = array(
                    "error" => array(
                        "text" => "Password salah"
                    )
                );
                $data_login = json_encode($pesan);
            }
        } else {
            $pesan      = array(
                "error" => array(
                    "text" => "Email Belum Terdaftar"
                )
            );
            $data_login = json_encode($pesan);
        }
        
    } else {
        $pesan      = array(
            "error" => array(
                "text" => "Username and Password tidak boleh kosong.",
                "view" => "login"
            )
        );
        $data_login = json_encode($pesan);
    }
    
    echo $data_login;
}

function getData($email) {
    try {
        $webService = new PrestaShopWebservice(PS_SHOP_PATH, PS_WS_AUTH_KEY, DEBUG);
        $opt        = array(
            'resource' => 'customers',
            'display' => '[id,passwd,lastname,firstname]',
            'filter[email]' => $email
        );
        $xml        = $webService->get($opt);
        
        $resources = $xml->children()->children();
    }
    catch (PrestaShopWebserviceException $e) {
        // Here we are dealing with errors
        $trace = $e->getTrace();
        if ($trace[0]['args'][0] == 404)
            echo 'Bad ID';
        else if ($trace[0]['args'][0] == 401)
            echo 'Bad auth key';
        else
            echo 'Other error ' . $e->getMessage();
    }
    
    if (isset($resources)) {
        foreach ($resources as $key => $resource) {
            $data = array(
                "id" => (int) $resource->id,
                "lastname" => (string) $resource->lastname,
                "firstname" => (string) $resource->firstname,
                "passwd" => (string) $resource->passwd
            );
        }
    }
    
    if (!isset($data)) {
        $data = array(
            "id" => "",
            "lastname" => "",
            "firstname" => "",
            "passwd" => ""
        );
    }
    
    return $data;
}

function logout() {
    
}

/*** Convert \n to 
 * @param string $string String to transform* @return string New string*/
function nl2br2($string) {
    return str_replace(array(
        "\r\n",
        "\r",
        "\n"
    ), '
', $string);
}

/* Sanitize data which will be injected into SQL query** @param string $string SQL data which will be injected into SQL query* @param boolean $htmlOK Does data contain HTML code ? (optional)* @return string Sanitized data*/
function pSQL($string, $htmlOK = false) {
    if (_PS_MAGIC_QUOTES_GPC_)
        $string = stripslashes($string);
    if (!is_numeric($string)) {
        $string = _PS_MYSQL_REAL_ESCAPE_STRING_ ? mysql_real_escape_string($string) : addslashes($string);
        if (!$htmlOK)
            $string = strip_tags(nl2br2($string));
    }
    //echo "->" . $string . "";
    return $string;
}

/*** Encrypt password** @param object $object Object to display*/
function encrypt($passwd) {
    return md5(pSQL($passwd));
}


function getConnection() {
    $dbhost = "toptotoe-boutique.com";
    $dbuser = "toptoto1_prest71";
    $dbpass = "P8uzo51nS4";
    $dbname = "toptoto1_prest71";
    $dbh    = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}

?>