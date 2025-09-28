<?php
session_start();
header('Content-Type: application/json');

if(isset($_SESSION['user_id'])) {
    echo json_encode(array(
        "logged_in" => true,
        "user" => array(
            "id" => $_SESSION['user_id'],
            "username" => $_SESSION['username']
        )
    ));
} else {
    echo json_encode(array("logged_in" => false));
}
?>