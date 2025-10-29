import React, { useState } from 'react';
import Botao from "../../componentes/botao/Botao";

const API_URL = 'http://localhost:3001';

export default function CadastroFuncionario() {
    const [email, setEmail] = useState('');
    const [matricula, setMatricula] = useState('');
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
            const response = await fetch(`${API_URL}/register/funcionario`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, matricula, senha }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            setMensagem(data.message);
            setEmail('');
            setMatricula('');
            setSenha('');
            setConfirmaSenha('');

        } catch (error) {
            setMensagem(error.message);
        }
    };

    return (
        <form className="form-cadastro" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="emailFunc">E-mail Institucional</label>
                <input type="email" id="emailFunc" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="matricula">Matrícula</label>
                <input type="text" id="matricula" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="senhaFunc">Defina sua Senha</label>
                <input type="password" id="senhaFunc" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="confirmaSenhaFunc">Confirme sua Senha</label>
                <input type="password" id="confirmaSenhaFunc" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} required />
            </div>
            
            {mensagem && <p style={{ color: 'white', marginTop: '15px' }}>{mensagem}</p>}
            <br />
            <Botao nome="Cadastrar" tipo="submit" />
        </form>
    );
}