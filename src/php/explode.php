<pre>
<?php
$handle = @fopen("php.js", "r");
$arrFunction = array();
if ($handle) {
    while (($buffer = fgets($handle, 8000)) !== false) {
	print $buffer;
	$arrWords = explode( " " , $buffer );
	$strFirstWord = ( $arrWords[0] );	
	if( sizeof( $arrFunction ) > 0 && $strFirstWord !== "" && strpos(  $strFirstWord , "php." ) === 0 )
	{
		$arrWords = explode( " " , $arrFunction[0] );
		$strFirstWord = ( $arrWords[0] );	
		print " First Word <strong>($strFirstWord)</strong><br/>\n";
		print " pos = " . strpos(  $strFirstWord , "php." );			
		{
			$strFileName = $strFirstWord . ".js";
			$strFunction = implode( "" , $arrFunction );
			print "<h1>$strFileName</h1><br/>\n";
			print $strFunction;
			file_put_contents( $strFileName , $strFunction );
			$strCaller = 
"
$strFirstWord = function (arg) { 
    php.require_once( php.path + '$strFirstWord.js' ); 
    return php.call_user_func_array( $strFirstWord , arguments );
} 
";
			file_put_contents( "php.caller.js" , $strCaller , FILE_APPEND );
			$arrFunction = array();
			$arrFunction[] = $buffer;			
		}
	} 
	else
	{
        	$arrFunction[] = $buffer;
	}
    }
    if (!feof($handle)) {
        throw new Exception( "Error: unexpected fgets() fail\n" );
    }
    fclose($handle);
}
