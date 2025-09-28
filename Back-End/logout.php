<?php
session_start();
session_unset();
session_destroy();

echo json_encode(array("success" => true, "message" => "Logout realizado!"));
?>