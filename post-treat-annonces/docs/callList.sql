-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Dim 25 Mai 2014 à 17:34
-- Version du serveur: 5.1.44
-- Version de PHP: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `callList`
--

-- --------------------------------------------------------

--
-- Structure de la table `calldata`
--

CREATE TABLE IF NOT EXISTS `calldata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` varchar(4000) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin AUTO_INCREMENT=17 ;

--
-- Contenu de la table `calldata`
--


-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `calldataId` int(11) NOT NULL,
  `comment` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `comments`
--

INSERT INTO `comments` (`id`, `calldataId`, `comment`) VALUES
(5, 11, 'Ã©Ã©Ã©'),
(4, 11, 'I like it'),
(6, 11, ''),
(7, 11, '');
