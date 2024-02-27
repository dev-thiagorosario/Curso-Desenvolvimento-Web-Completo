<?php
require_once "validador_acesso.php";

    session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $titulo = $_POST["titulo"];
    $categoria = $_POST["categoria"];
    $descricao = $_POST["descricao"];

    if (empty($titulo) || empty($categoria) || empty($descricao)) {
        echo "Por favor, preencha todos os campos.";
        exit;
    }

    $dadosChamado = $titulo . '#' . $categoria . '#' . $descricao . PHP_EOL;

    $arquivo = fopen("chamados.txt", "a");

    if ($arquivo) {
        fwrite($arquivo, $dadosChamado);
        fclose($arquivo);
        echo "Chamado registrado com sucesso!";
    } else {
        echo "Erro ao abrir o arquivo para registro do chamado.";
    }
} else {
    header("Location: home.php");
}
?>
