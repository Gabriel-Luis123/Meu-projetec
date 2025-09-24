<?php
    require_once "../util/con_db.php";
    
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $registro = $_POST['registro'];
        $senha = $_POST['senha'];

        $sql_check = 'SELECT Senha FROM Aluno WHERE Registro_Academico = :registro';
        $stmt_check = $pdo->prepare($sql_check);
        $stmt_check->bindParam(':registro', $registro);

        try {
            $stmt_check->execute();
            $resultado = $stmt_check->fetch(PDO::FETCH_ASSOC);

            if($resultado) {
                if($senha === $resultado['Senha']){
                    $_SESSION['username'] = $registro;
                    header('Location: inicial.php');
                    exit;
                } else{
                    echo "Senha incorreta!";
                    header('Location: login.php');
                    exit;
                }
            }
        } catch(PDOExcpetion $e){
            echo "Erro no statement check: " . $e->getMessage();
        }

    }