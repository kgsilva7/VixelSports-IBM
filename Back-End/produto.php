<?php

class Produto
{
private $id_produto;
private $nome;
private $categoria;
private $tamanho;
private $cor;
private $preco;
private $quantidade_estoque;
private $descricao;
private $genero;
private $id_fornecedor;

private $conn;

public function getid_produto() {

    return $this->id_produto;
}

public function setId ($id_produto) { 
    $this->id_produto = $id_produto; }

public function getnome() {

    return $this->nome;
}

public function setNome ($nome) { 
    $this->nome = $nome; }

public function getcategoria() {

    return $this->categoria;
}

public function setCategoria ($categoria) { 
    $this->categoria = $categoria; }

public function gettamanho() {

    return $this->tamanho;
}

public function setTamanho ($tamanho) { 
    $this->tamanho = $tamanho; }

public function getcor() {

    return $this->cor;
}

public function setCor ($cor) { 
    $this->cor = $cor; }

public function getpreco() {

    return $this->preco;
}

public function setPreco ($preco) { 
    $this->preco = $preco; }

public function getquantidade_estoque() {

    return $this->quantidade_estoque;
}

public function setQuantidade_estoque ($quantidade_estoque) { 
    $this->quantidade_estoque = $quantidade_estoque; }

public function getdescricao() {

    return $this->descricao;
}

public function setDescricao ($descricao) { 
    $this->descricao = $descricao; }

public function getgenero() {

    return $this->genero;
}

public function setGenero ($genero) { 
    $this->genero = $genero; }

public function getid_fornecedor() {

    return $this->id_fornecedor;
}

public function setId_fornecedor ($id_fornecedor) { 
    $this->id_fornecedor = $id_fornecedor; }
}
?>