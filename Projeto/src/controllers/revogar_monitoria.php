<?php

require_once __DIR__ . '/../utils/con_db.php';

$id = $_GET['id'];

if(!$id){
    header('Location: ../../pages/minhas_monitorias.php?mensagem=id_inexistente');
}

$sql = 'UPDATE Monitoria SET Concluida = 0 WHERE ID_Monitoria = :id';
$stmt = $pdo->prepare($sql);
$stmt->bindParam('id', $id);
$stmt->execute();

if($stmt->rowCount() > 0){
    header('Location: ../../pages/minhas_monitorias.php?mensagem=revogar_monitoria_correta');
    exit;
} else {
    header('Location: ../../pages/minhas_monitorias.php?mensagem=erro_revogar_monitoria');
    exit;
}