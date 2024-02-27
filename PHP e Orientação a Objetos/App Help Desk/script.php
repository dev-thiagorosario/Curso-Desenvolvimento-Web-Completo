<?php
// Variável que verifica se a autenticação foi realizada
$usuario_autenticado = false;

// Usuários do sistema
$usuarios_app = array(
    array('email' => 'adm@teste.com.br', 'senha' => '123456'),
    array('email' => 'user@teste.com.br', 'senha' => 'abcd'),
);

// Verifica se o formulário foi submetido via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifica se os campos de email e senha foram preenchidos
    if (isset($_POST['email']) && isset($_POST['senha'])) {
        $email_digitado = $_POST['email'];
        $senha_digitada = $_POST['senha'];

        foreach ($usuarios_app as $user) {
            if ($user['email'] == $email_digitado && $user['senha'] == $senha_digitada) {
                $usuario_autenticado = true;
                break; // Usuário encontrado, não é necessário continuar o loop
            }
        }

        if ($usuario_autenticado) {
            echo 'Usuário autenticado';
        } else {
            echo 'Erro na autenticação';
        }
    } else {
        echo 'Campos de email e senha não preenchidos';
    }
}
?>