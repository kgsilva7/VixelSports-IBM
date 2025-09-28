<?php
session_start();
header('Content-Type: application/json');

include_once 'db_config.php';
include_once 'User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->username) && !empty($data->email) && !empty($data->password)) {
    
    // Validações básicas
    if(strlen($data->password) < 8) {
        echo json_encode(array(
            "success" => false,
            "message" => "A senha deve ter pelo menos 8 caracteres!"
        ));
        exit;
    }

    if(!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(array(
            "success" => false,
            "message" => "Email inválido!"
        ));
        exit;
    }

    $user->username = $data->username;
    $user->email = $data->email;
    $user->password = $data->password;

    // Verifica se username ou email já existem
    if($user->usernameExists()) {
        echo json_encode(array(
            "success" => false,
            "message" => "Username já está em uso!"
        ));
    } elseif($user->emailExists()) {
        echo json_encode(array(
            "success" => false,
            "message" => "Email já está cadastrado!"
        ));
    } else {
        // Tenta criar o usuário
        if($user->register()) {
            $_SESSION['user_id'] = $user->id;
            $_SESSION['username'] = $user->username;
            
            echo json_encode(array(
                "success" => true,
                "message" => "Usuário cadastrado com sucesso!",
                "user" => array(
                    "id" => $user->id,
                    "username" => $user->username
                )
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Erro ao cadastrar usuário!"
            ));
        }
    }
} else {
    echo json_encode(array(
        "success" => false,
        "message" => "Preencha todos os campos!"
    ));
}
?>