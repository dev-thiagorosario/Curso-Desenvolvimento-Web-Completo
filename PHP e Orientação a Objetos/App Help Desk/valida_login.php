<?php
session_start();

// Variável que verifica se a autenticação foi realizada
$usuario_autenticado = false;
$usuario_id = null;
$usuario_perfil_id = null; // Inicialize $usuario_perfil_id como null

// Usuários do sistema
$usuarios_app = array(
    array('id' => 1, 'email' => 'adm@teste.com.br', 'senha' => '123456', 'perfil_id' => 1),
    array('id' => 2, 'email' => 'user@teste.com.br', 'senha' => 'abcd', 'perfil_id' => 2),
    array('id' => 3, 'email' => 'jose@teste.com.br', 'senha' => 'abcd', 'perfil_id' => 3),
    array('id' => 4, 'email' => 'maria@teste.com.br', 'senha' => 'abcd', 'perfil_id' => 4),
    array('id' => 5, 'email' => 'duga@teste.com.br', 'senha' => 'abcd', 'perfil_id' => 5),
);

// Verifica se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    foreach ($usuarios_app as $user) {
        if ($user['email'] == $email && $user['senha'] == $senha) {
            $usuario_autenticado = true;
            $usuario_id = $user['id'];
            $usuario_perfil_id = $user['perfil_id']; // Certifique-se de que esta linha está presente
            break; 
        }
    }
    
    if ($usuario_autenticado) {
        $_SESSION['autenticado'] = 'SIM';
        $_SESSION['id'] = $usuario_id;
        $_SESSION['perfil_id'] = $usuario_perfil_id; // Atribua perfil_id à sessão aqui
        header('Location: home.php');
        exit; 
    } else {
        $_SESSION['autenticado'] = 'NÃO';
        header('Location: index.php?login=erro'); 
        exit; 
    }
}
?>
