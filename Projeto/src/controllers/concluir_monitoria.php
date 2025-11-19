<?php

require_once __DIR__ . '/../utils/con_db.php';

$id = $_GET['id'];

if(!$id){
    header('Location: ../../pages/minhas_monitorias.php?mensagem=erro_id_nao_encontrado');
    exit;
}

$sql = 'UPDATE Monitoria SET Concluida = 1 WHERE ID_Monitoria = :id';
$stmt = $pdo->prepare($sql);
$stmt->bindParam('id', $id);
$stmt->execute();

if($stmt->rowCount() > 0){
    header('Location: ../../pages/minhas_monitorias.php?mensagem=conclusao_feita');
    exit;
}else {
    header('Location: ../../pages/minhas_monitorias.php?mensagem=erro_na_conclusao');
    exit;
}