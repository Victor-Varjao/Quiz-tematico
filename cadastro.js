function exibirFotoPerfil() {
    const perfilImg = document.getElementById("perfil");
    const perfilImgTabela = document.getElementById("perfilTabela");
    const nomeTabela = document.getElementById("nomeTabela");
    const emailTabela = document.getElementById("emailTabela");
    const generoTabela = document.getElementById("generoTabela");
    const generoMulher = document.getElementById("M").checked;
    const generoHomem = document.getElementById("H").checked;

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("psw").value;
    const confirmarSenha = document.getElementById("psw-repeat").value;

    if (generoMulher) {
        // Define a imagem de perfil para a mulher
        perfilImg.src = "imagens/img-mulher.png"; // Substitua o caminho da imagem pela imagem desejada para mulher
        generoTabela.textContent = "Mulher";
    } else if (generoHomem) {
        // Define a imagem de perfil para o homem
        perfilImg.src = "imagens/img-homem.png"; // Substitua o caminho da imagem pela imagem desejada para homem
        generoTabela.textContent = "Homem";
    } else {
        // Se nenhum gênero for selecionado, exibir alerta
        alert("Por favor, selecione um gênero.");
        return; // Encerra a função sem continuar o processamento
    }

    if (senha !== confirmarSenha) {
        // Se a senha e a confirmação de senha não coincidirem, exibir alerta
        alert("As senhas não coincidem. Por favor, insira novamente.");
        return; // Encerra a função sem continuar o processamento
    }

    // Exibe a imagem de perfil
    perfilImg.style.display = "inline";
    document.getElementById("tabela").style.display = "block";

    // Preenche a tabela com as informações digitadas pelo usuário
    nomeTabela.textContent = nome;
    emailTabela.textContent = email;
}
