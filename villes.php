<?php
include('config/config.php');
header('content-type:application/json');

try{
    $dbh = new PDO(DB_SGBD.':host='.DB_SGBD_URL.';dbname='.DB_DATABASE.';charset='.DB_CHARSET, DB_USER, DB_PASS);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $cp = $_GET['cp'];
    $sth = $dbh->prepare('
    SELECT * 
    FROM villes_france_free
    WHERE ville_code_postal LIKE :cp
    ');
    $sth->bindValue(':cp', $cp.'%', PDO::PARAM_STR);
    $sth->execute();
    $result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}
catch(PDOExecption $e)
{
    echo 'Une erreur s\'est produite : '.$e->getMessage();
}

?>