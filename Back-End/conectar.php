<?php
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
        try {
            parent::__construct("mysql:host=$this->host;dbname=$this->db", $this->usuario, $this->senha);
            $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'Erro na conexão: ' . $e->getMessage();
            exit();
        }
    }
    public static function getInstancia()
    {
        if (!isset(self::$instancia)) {
            try {
                self::$instancia = new Conectar();
            } catch (Exception $e) {
                echo 'Erro ao conectar: ' . $e->getMessage();
                exit();  
            }
        }
        return self::$instancia;
    }
    public function sql($query, $params = [])
    {
        try {
            $stmt = self::getInstancia()->prepare($query);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            echo 'Erro na consulta: ' . $e->getMessage();
            return false;
        }
    }
}
?>
