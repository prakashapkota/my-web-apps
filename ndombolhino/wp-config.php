<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clefs secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur 
 * {@link http://codex.wordpress.org/fr:Modifier_wp-config.php Modifier
 * wp-config.php}. C'est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d'installation. Vous n'avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define('DB_NAME', 'db_ndombolhino');

/** Utilisateur de la base de données MySQL. */
define('DB_USER', 'root');

/** Mot de passe de la base de données MySQL. */
define('DB_PASSWORD', '');

/** Adresse de l'hébergement MySQL. */
define('DB_HOST', 'localhost');

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define('DB_CHARSET', 'utf8');

/** Type de collation de la base de données. 
  * N'y touchez que si vous savez ce que vous faites. 
  */
define('DB_COLLATE', '');

/**#@+
 * Clefs uniques d'authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant 
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n'importe quel moment, afin d'invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'bZ)PS0OeF*9Jb|wW+CX)QuDuR7|N0:V-(q]Xi>EM``&1wa!m]4K7]|pCot/+nxP*');
define('SECURE_AUTH_KEY',  '}>oz3S9!5.b+ej)m/t?9gf7;-j*3-=MYq>[0~?<*RTEIXF2dj}QgdCw~SXvm>C{8');
define('LOGGED_IN_KEY',    '-`HNx~[ay~fD2lFYm(u|3>F)Aw?.MHLm,]+C]:$)`^rEe|DJp,Xot)Tj45$17yIu');
define('NONCE_KEY',        '4c~d7Q~ $m*?I0V*o~2a?bT9rTCk|G$o/OKT6(6p1R]DlTE{%D(o^y-H+u?jp^P ');
define('AUTH_SALT',        'Z$~7_K?:.wBj,L}8``t8|Gj&25[w&L,+,[-8ln WrB[+=6zXN-^P]W]D0lR58Ga.');
define('SECURE_AUTH_SALT', '^s.l06!cEECZi,iJl?opC5+u!TS~@<5h-GD*l#U8d-1bBm;z|@Q|3A-5BN6Vh#mx');
define('LOGGED_IN_SALT',   'G`3}-0O?+DjYT<J=_vM[~( |VpZD7&Z-/dqhRT.O0-}<8m0YG*v(9+2vUhLAkab0');
define('NONCE_SALT',       'J*d%J^ez-L$>79oHTmu@.XnQ(|-&Ev;Dy:1Fs|[AiD HWQ^`oK.6XNfJ+[n6eTl7');
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique. 
 * N'utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés!
 */
$table_prefix  = 'wp_';

/** 
 * Pour les développeurs : le mode deboguage de WordPress.
 * 
 * En passant la valeur suivante à "true", vous activez l'affichage des
 * notifications d'erreurs pendant votre essais.
 * Il est fortemment recommandé que les développeurs d'extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de 
 * développement.
 */ 
define('WP_DEBUG', false); 

/* C'est tout, ne touchez pas à ce qui suit ! Bon blogging ! */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');