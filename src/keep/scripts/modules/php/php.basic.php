<?php
/***
 * Create the php.basic.js using the current version of the php.js into the bower components
 *
 */
$strFileName = "php.basic.js";
$strPhpJsPath = "../../../public/bower_components/phpjs/";
$objPackage = json_decode( file_get_contents( $strPhpJsPath . "package.json" ) );
$strFileContent = '
/**
 * File created automatically based on the php.js project, version ' . $objPackage->version . '
 * @author ' . $objPackage->author . '
 * @link ' . $objPackage->homepage . '
 */
php = {};
php.require             = ' . file_get_contents( $strPhpJsPath . "experimental/language/require.js") . ';
php.require_once        = ' . file_get_contents( $strPhpJsPath . "experimental/language/require.js") . ';
php.file_get_contents   = ' . file_get_contents( $strPhpJsPath . "functions/filesystem/file_get_contents.js") . ';
php.file_exists         = ' . file_get_contents( $strPhpJsPath . "experimental/filesystem/file_exists.js") . ';
php.implode             = ' . file_get_contents( $strPhpJsPath . "functions/strings/implode.js") . ';
php.explode             = ' . file_get_contents( $strPhpJsPath . "functions/strings/explode.js") . ';
php.array_keys          = ' . file_get_contents( $strPhpJsPath . "functions/array/array_keys.js") . ';
php.in_array            = ' . file_get_contents( $strPhpJsPath . "functions/array/in_array.js") . ';
php.sort                = ' . file_get_contents( $strPhpJsPath . "functions/array/sort.js") . ';
php.method_exists       = ' . file_get_contents( $strPhpJsPath . "experimental/classobj/method_exists.js") . ';
php.is_object           = ' . file_get_contents( $strPhpJsPath . "functions/var/is_object.js") . ';
';
file_put_contents( $strFileName, $strFileContent );
?>