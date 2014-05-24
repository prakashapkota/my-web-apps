-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Sam 24 Mai 2014 à 16:41
-- Version du serveur: 5.1.44
-- Version de PHP: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `livredor`
--

-- --------------------------------------------------------

--
-- Structure de la table `livre`
--

CREATE TABLE IF NOT EXISTS `livre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Contenu de la table `livre`
--

INSERT INTO `livre` (`id`, `username`, `message`) VALUES
(28, 'aze', 'azeazeaz'),
(29, 'aazbaizbeiazbaizbe', 'azoeha^zebazieba eahze Ã¢zheÃ¢hz Ãªhazep Ã§ahzepa zeagzepiaz epahe azeÃ§haz e'),
(30, 'new aze', 'hahzieabzegao zegpazg eoazega zeaze'),
(27, 'azeazeÃ©Ã©Ã©Ã©', 'Ã©Ã©Ã©Ã©'),
(19, 'Prakash', 'Ultime text');
