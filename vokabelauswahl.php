<?php

header("content-type: text/javascript");

include_once("config/defines.inc.php");

$conn = mysql_connect(DB_HOST, DB_USER, DB_PWD)
    or die("no connection..." . DB_HOST . "_" . DB_USER);

mysql_select_db('latein', $conn)
    or die("no db");


if ( $_GET['action'] == 'lektionen' ) {
    
    $sql = "Select distinct Lektion from vokabel where Lektion like 'I-%' and Lektion not like '%\\r' and Lektion not like '%\\/%' order by Lektion";
    
    $rs = mysql_query($sql, $conn)
        or die($sql . " failed");
    
    $a_lektionen = array();
    
    while ($row = mysql_fetch_assoc($rs)) {
        $a_lektionen[] = substr($row['Lektion'], 2);
    }
    sort($a_lektionen);
   
    
    echo  $_GET['callback']. '(' . json_encode($a_lektionen) . ');';
    
} else if ( $_GET['action'] == 'auswahl' ) {
   $lektion = $_GET['lektion'];
   
   $sql = "Select Latein, Deutsch from vokabel where Lektion like 'I-$lektion%' ";
    
   $rs = mysql_query($sql, $conn)
      or die($sql . " failed");
    
   $a_vokabel = array();
    
   while ($row = mysql_fetch_assoc($rs)) {
      $row['Deutsch'] = iconv("ISO-8859-1","UTF-8",$row['Deutsch']);
      $a_vokabel[] = $row;
      #print_r($row);
   }
   
    
    echo  $_GET['callback']. '(' . json_encode($a_vokabel) . ');';

}




?>