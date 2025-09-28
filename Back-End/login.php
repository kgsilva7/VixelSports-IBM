<?php
session_start();
header('Content-Type: application/json');

// Inclui arquivos de configuração
include_once 'db_config.php';
include_once 'User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

// Recebe dados do POST
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->username) && !empty($data->password)) {
    $user->username = $data->username;
    $user->password = $data->password;

    if($user->login()) {
        $_SESSION['user_id'] = $user->id;
        $_SESSION['username'] = $user->username;
        
        echo json_encode(array(
            "success" => true,
            "message" => "Login realizado com sucesso!",
            "user" => array(
                "id" => $user->id,
                "username" => $user->username
            )
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "message" => "Usuário ou senha incorretos!"
        ));
    }
} else {
    echo json_encode(array(
        "success" => false,
        "message" => "Preencha todos os campos!"
    ));
}
?>