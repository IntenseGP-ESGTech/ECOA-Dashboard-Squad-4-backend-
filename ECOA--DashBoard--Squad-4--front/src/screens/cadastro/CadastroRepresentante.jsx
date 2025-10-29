import React, { useState } from 'react';
import Botao from "../../componentes/botao/Botao";

const API_URL = 'http://localhost:3001';

export default function CadastroRepresentante() {
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMensagem('');

        if (senha !== confirmaSenha) {
            setMensagem("Erro: As senhas não conferem!");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register/representante`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cpf, email, nomeCompleto, senha }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            setMensagem(data.message);
            setCpf('');
            setEmail('');
            setNomeCompleto('');
            setSenha('');
            setConfirmaSenha('');

        } catch (error) {
            setMensagem(error.message);
        }
    };

    return (
        <form className="form-cadastro" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="cpf">CPF</label>
                <input type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="emailRep">E-mail Institucional</label>
                <input type="email" id="emailRep" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="nomeCompleto">Nome Completo</label>
                <input type="text" id="nomeCompleto" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="senhaRep">Defina sua Senha</label>
                <input type="password" id="senhaRep" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="confirmaSenhaRep">Confirme sua Senha</label>
                <input type="password" id="confirmaSenhaRep" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} required />
            </div>

            {mensagem && <p style={{ color: 'white', marginTop: '15px' }}>{mensagem}</p>}
            <br />
            <Botao nome="Cadastrar" tipo="submit" />
        </form>
    );
}