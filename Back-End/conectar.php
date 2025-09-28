<?php
// conectar.php

class Conectar extends PDO 
{
    private static $instancia; 
private $query;
private $host = "127.0.0.1";
private $usuario = "root";
private $senha = "";
private $db = "produtosvixel";

public function __construct()
{
    parent::__construct("mysql:host=$this->host;dbname=$this->db","$this->usuario", "$this->senha");
}

public static function getInstancia()
{
    if (!isset(self::$instacia))
    {
        try {
            self::$instacia = new Conectar();
            echo 'Conectado com sucesso';

        } catch (Exception $e) {
       echo 'Erro ao conectar '   ;
       exit();  
        }
    }
    return self::$instacia;
}
public function sql ($query)
{
    $this->getInstancia();
    $this-> query = $query;
    $stmt = $pdo->prepare($this->query);
$stmt -> execute();
$pdo = null;

}
}

?>
