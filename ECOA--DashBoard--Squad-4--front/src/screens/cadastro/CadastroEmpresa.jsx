import React, { useState } from 'react'; // Importe o useState
import Botao from "../../componentes/botao/Botao";

// A URL base da sua API no backend
const API_URL = 'http://localhost:3001';

export default function CadastroEmpresa() {
    // 1. Estados para cada campo do formulário
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    // Estado para exibir mensagens de sucesso ou erro para o usuário
    const [mensagem, setMensagem] = useState('');

    // 2. Função que lida com o envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página
        setMensagem(''); // Limpa mensagens anteriores

        // Validação simples no frontend
        if (senha !== confirmaSenha) {
            setMensagem("Erro: As senhas não conferem!");
            return;
        }

        // 3. Usando a API fetch para enviar a requisição
        try {
            const response = await fetch(`${API_URL}/register/empresa`, {
                method: 'POST', // O método HTTP para criar um novo recurso
                headers: {
                    // Informa ao backend que estamos enviando dados em formato JSON
                    'Content-Type': 'application/json',
                },
                // Converte o objeto JavaScript com os dados para uma string JSON
                body: JSON.stringify({
                    cnpj: cnpj,
                    email: email,
                    nomeSocial: nomeSocial,
                    senha: senha,
                }),
            });

            const data = await response.json(); // Converte a resposta do backend para um objeto JS

            if (!response.ok) {
                // Se a resposta do servidor for um erro (status 4xx ou 5xx)
                throw new Error(data.message || 'Ocorreu um erro ao cadastrar.');
            }

            // Se tudo deu certo, exibe a mensagem de sucesso do backend
            setMensagem(data.message);
            
            // Opcional: Limpar os campos do formulário após o sucesso
            setCnpj('');
            setEmail('');
            setNomeSocial('');
            setSenha('');
            setConfirmaSenha('');

        } catch (error) {
            // Captura erros de rede ou os erros lançados acima
            setMensagem(error.message);
        }
    };

    return (
        <form className="form-cadastro" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="cnpj">CNPJ</label>
                {/* Conectamos cada input ao seu respectivo estado */}
                <input
                    type="text"
                    id="cnpj"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">E-mail Corporativo</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="nomeSocial">Nome Social</label>
                <input
                    type="text"
                    id="nomeSocial"
                    value={nomeSocial}
                    onChange={(e) => setNomeSocial(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="senha">Defina sua Senha</label>
                <input
                    type="password"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="confirmaSenha">Confirme sua Senha</label>
                <input
                    type="password"
                    id="confirmaSenha"
                    value={confirmaSenha}
                    onChange={(e) => setConfirmaSenha(e.target.value)}
                    required
                />
            </div>

            {/* Renderiza a mensagem de feedback para o usuário */}
            {mensagem && <p style={{ color: 'white', marginTop: '15px' }}>{mensagem}</p>}
            
            <br />
            <Botao nome="Cadastrar" tipo="submit" />
        </form>
    );
}