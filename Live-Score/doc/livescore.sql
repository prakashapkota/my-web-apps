-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Sam 24 Mai 2014 à 16:39
-- Version du serveur: 5.1.44
-- Version de PHP: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `livescore`
--

-- --------------------------------------------------------

--
-- Structure de la table `match`
--

CREATE TABLE IF NOT EXISTS `match` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `localteam` varchar(50) NOT NULL,
  `vsteam` varchar(50) NOT NULL,
  `localscore` int(11) NOT NULL,
  `vsscore` int(11) NOT NULL,
  `matchDate` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Contenu de la table `match`
--

INSERT INTO `match` (`id`, `localteam`, `vsteam`, `localscore`, `vsscore`, `matchDate`) VALUES
(1, 'Bobigny', 'Drancy', 4, 3, '2013-05-07'),
(2, 'PSG', 'Marseille', 5, 0, '2013-05-21'),
(20, 'Nepal', 'India', 2, 0, '2013-06-19');
