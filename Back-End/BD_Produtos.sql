-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26/09/2025 às 04:52
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


--
-- Banco de dados: `produtosvixel`
--
CREATE DATABASE IF NOT EXISTS `produtosvixel` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `produtosvixel`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `id_produto` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `tamanho` varchar(10) NOT NULL,
  `cor` varchar(25) NOT NULL,
  `preco` float NOT NULL,
  `quantidade_estoque` int(11) NOT NULL,
  `descricao` varchar(50) NOT NULL,
  `genero` char(1) NOT NULL,
  `id_fornecedor` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`id_produto`, `nome`, `categoria`, `tamanho`, `cor`, `preco`, `quantidade_estoque`, `descricao`, `genero`, `id_fornecedor`) VALUES
(1, 'Camiseta Básica', 'Roupas', 'M', 'Preta', 74.9, 50, 'Camiseta de algodão confortável', 'U', 1),
(2, 'Camiseta Estampada', 'Roupas', 'G', 'Branca', 49.9, 35, 'Camiseta com estampa moderna', 'M', 1),
(3, 'Camiseta Dry Fit', 'Roupas', 'M', 'Preto', 74.9, 20, 'Camiseta Dry Fit de alta qualidade', 'M', 2),
(4, 'Calça Legging Fitnes', 'Roupas', '38', 'Preta', 89.9, 45, 'Calça Legging Fitnes ajustada', 'F', 2),
(5, 'Tênis Esportivo', 'Calçados', '41', 'Branco', 199.9, 25, 'Jogger com bolsos laterais e tecido premium', 'U', 3),
(6, 'Tênis Casual', 'Calçados', '39', 'Preto', 319.9, 15, 'Tênis casual para o dia a dia', 'F', 3),
(7, 'Top Esportivo', 'Roupas', 'M', 'branco', 119.9, 18, 'Top Esportivo confortavel', 'F', 4),
(8, 'Jaqueta Corta-Vento', 'Roupas', 'G', 'Vermelha', 259.9, 12, 'Corta-vento leve e resistente', 'M', 4),
(9, 'Tênis de Corrida', 'Roupas', '40', 'Azul', 169.9, 35, 'Tênis com amortecimento para corrida', 'M', 5),
(10, 'Saia Midi', 'Roupas', 'P', 'Preta', 79.9, 22, 'Saia midi elegante', 'F', 5),
(11, 'Boné Aba Curva', 'Acessórios', 'Único', 'Azul Marinho', 169.9, 35, 'Boné com ajuste traseiro', 'U', 6),
(12, 'Mochila Escolar', 'Acessórios', 'Único', 'Cinza', 149.9, 60, 'Mochila resistente com compartimentos', 'U', 6),
(13, 'Relógio Digital', 'Acessórios', 'Único', 'Prata', 249.9, 8, 'Boné leve com proteção UV e ajuste traseiro', 'U', 7),
(14, 'Sandália Rasteira', 'Calçados', '37', 'Bege', 64.9, 16, 'Sandália rasteira confortável', 'F', 3),
(15, 'Bota Couro', 'Calçados', '42', 'Marrom', 259.9, 15, 'Bota de couro legítimo', 'M', 3),
(16, 'Camiseta Esportiva Manga Longa', 'Roupas Esportivas', 'G', 'Cinza', 89.9, 25, 'Camiseta dry fit com manga longa para corrida', 'U', 1),
(17, 'Bermuda Fitness Masculina', 'Roupas Esportivas', 'M', 'Preta', 79.9, 30, 'Bermuda de poliéster leve e resistente', 'M', 1),
(18, 'Bermuda Ciclismo', 'Roupas Esportivas', 'G', 'Azul', 129.9, 18, 'Bermuda acolchoada para ciclismo', 'M', 2),
(19, 'Top Fitness Alto Suporte', 'Roupas Esportivas', 'P', 'Roxo', 89.9, 20, 'Top esportivo de alta sustentação', 'F', 2),
(20, 'Legging Esportiva Estampada', 'Roupas Esportivas', 'M', 'Colorida', 119.9, 22, 'Legging estampada com tecido de compressão', 'F', 2),
(21, 'Tênis Trail Running', 'Calçados Esportivos', '42', 'Verde Musgo', 349.9, 12, 'Tênis para trilha com solado antiderrapante', 'U', 3),
(22, 'Tênis Basquete', 'Calçados Esportivos', '43', 'Preto e Vermelho', 399.9, 10, 'Tênis de cano alto para basquete', 'M', 3),
(23, 'Tênis Skate', 'Calçados Esportivos', '40', 'Azul Marinho', 289.9, 14, 'Tênis resistente para prática de skate', 'U', 3),
(24, 'Chuteira Campo', 'Calçados Esportivos', '42', 'Amarela', 269.9, 15, 'Chuteira de campo com travas altas', 'M', 3),
(25, 'Top Fitness Básico', 'Roupas Esportivas', 'M', 'Branco', 59.9, 25, 'Top básico para treinos leves', 'F', 2),
(26, 'Agasalho Esportivo', 'Roupas Esportivas', 'G', 'Preto', 229.9, 8, 'Conjunto de agasalho esportivo com zíper', 'U', 4),
(27, 'Caneleira Esportiva', 'Acessórios Esportivos', 'Único', 'Preta', 39.9, 40, 'Caneleira com proteção para futebol', 'U', 6),
(28, 'Faixa de Cabeça Esportiva', 'Acessórios Esportivos', 'Único', 'Vermelha', 29.9, 35, 'Faixa para absorção de suor', 'U', 6),
(29, 'Garrafa Squeeze 1L', 'Acessórios Esportivos', 'Único', 'Transparente', 49.9, 50, 'Garrafa prática para hidratação em treinos', 'U', 7),
(30, 'Bolsa Esportiva', 'Acessórios Esportivos', 'Único', 'Azul', 159.9, 15, 'Bolsa espaçosa para academia e esportes', 'U', 7);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id_produto`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- Banco de dados: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
