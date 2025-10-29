import React, { useState } from 'react';
import Botao from "../../componentes/botao/Botao";

const API_URL = 'http://localhost:3001';

export default function CadastroFilial() {
    const [cnpj, setCnpj] = useState('');
    const [codigoUnidade, setCodigoUnidade] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
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
            const response = await fetch(`${API_URL}/register/filial`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cnpj, codigoUnidade, nomeSocial, senha }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setMensagem(data.message);
            setCnpj('');
            setCodigoUnidade('');
            setNomeSocial('');
            setSenha('');
            setConfirmaSenha('');

        } catch (error) {
            setMensagem(error.message);
        }
    };

    return (
        <form className="form-cadastro" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="cnpjFilial">CNPJ</label>
                <input type="text" id="cnpjFilial" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="codigoUnidade">Código da Unidade</label>
                <input type="text" id="codigoUnidade" value={codigoUnidade} onChange={(e) => setCodigoUnidade(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="nomeSocialFilial">Nome Social</label>
                <input type="text" id="nomeSocialFilial" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="senhaFilial">Defina sua Senha</label>
                <input type="password" id="senhaFilial" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="confirmaSenhaFilial">Confirme sua Senha</label>
                <input type="password" id="confirmaSenhaFilial" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} required />
            </div>
            
            {mensagem && <p style={{ color: 'white', marginTop: '15px' }}>{mensagem}</p>}
            <br />
            <Botao nome="Cadastrar" tipo="submit" />
        </form>
    );
}