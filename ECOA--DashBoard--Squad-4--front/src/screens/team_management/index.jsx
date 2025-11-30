import { useState, useEffect } from "react";
import { ArrowLeft, UserPlus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import './team_management.css';

const API_URL = 'http://localhost:3001/team';

function TeamManagement() {
  // 1. Definição dos Estados
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    email: '',
    telefone: ''
  });

  // 2. Carregar dados ao abrir a página
  useEffect(() => {
    fetchMembers();
  }, []);

  // --- Função Auxiliar de Segurança (Envia o Token) ---
  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('authToken'); // Recupera o token de login
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      'Authorization': `Bearer ${token}` // Anexa o token ao cabeçalho
    };

    const response = await fetch(url, { ...options, headers });
    
    // Se o token for inválido ou expirado (Erro 401 ou 403)
    if (response.status === 401 || response.status === 403) {
      alert("Sessão expirada ou sem permissão. Por favor, faça login novamente.");
      localStorage.removeItem('authToken'); // Limpa o token inválido
      window.location.href = '/login'; // Redireciona para o login
      return null;
    }
    return response;
  };

  // --- Ação de Listar (READ) com Ordenação ---
  const fetchMembers = async () => {
    try {
      const response = await authFetch(API_URL);
      if (response) {
        const data = await response.json();
        
        // Garante que é um array antes de tentar ordenar
        let memberList = Array.isArray(data) ? data : [];

        // Ordena a lista pelo domínio do e-mail (parte depois do @)
        memberList.sort((a, b) => {
          const domainA = a.email_institucional ? a.email_institucional.split('@')[1] : '';
          const domainB = b.email_institucional ? b.email_institucional.split('@')[1] : '';

          if (domainA < domainB) return -1;
          if (domainA > domainB) return 1;
          return 0;
        });

        setMembers(memberList);
      }
    } catch (error) {
      console.error("Erro ao buscar equipa:", error);
    }
  };

  // --- Ação de Adicionar (CREATE) ---
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await authFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      
      if (response && response.ok) {
        alert("Membro adicionado com sucesso!");
        setFormData({ nome: '', cargo: '', email: '', telefone: '' }); // Limpa o formulário
        fetchMembers(); // Atualiza a tabela
      } else if (response) {
        const err = await response.json();
        // Mostra erro se o backend bloquear (ex: domínio diferente)
        alert("Erro: " + (err.message || "Erro desconhecido"));
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    }
  };

  // --- Ação de Remover (DELETE) ---
  const handleDelete = async (id) => {
    if(!window.confirm("Tem a certeza que deseja remover este membro?")) return;

    try {
      const response = await authFetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (response && response.ok) {
        fetchMembers(); // Atualiza a lista removendo o item
      } else {
        alert("Erro ao remover membro.");
      }
    } catch (error) {
      console.error("Erro ao remover:", error);
    }
  };

  return (
    <div className="dashboard-background">
      <div className="dashboard-container">
        {/* Cabeçalho */}
        <header className="navbar w3-card">
          <div className="navbar-left">
            <div className="logo">
              <img src="../../assets/logo.png" alt="Logo" />
            </div>
          </div>
          <div className="navbar-right">
            <h2 className="w3-text-white">Team Management</h2>
          </div>
        </header>

        <main className="main-content">
          <div className="content-overlay">
            <div className="content-container">
              
              <div className="team-header">
                <div className="team-title">Gerenciamento de Equipe</div>
                <Link to="/dashboard">
                  <button className="back-button w3-button">
                    <ArrowLeft size={20} /> Voltar
                  </button>
                </Link>
              </div>

              {/* Tabela de Visualização (Read & Delete) */}
              <div className="w3-card w3-container" style={{ marginBottom: '30px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <h3>Membros da Equipe</h3>
                <div className="w3-responsive">
                  <table className="w3-table w3-striped w3-hoverable" style={{color: 'white'}}>
                    <thead>
                      <tr className="w3-text-white">
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.length > 0 ? (
                        members.map((member) => (
                          <tr key={member.id}>
                            <td>{member.nome}</td>
                            <td>{member.cargo}</td>
                            {/* Nota: O backend devolve 'email_institucional' */}
                            <td>{member.email_institucional}</td>
                            <td>{member.telefone}</td>
                            <td>
                              <button 
                                onClick={() => handleDelete(member.id)}
                                className="w3-button w3-red w3-round-small"
                                style={{padding: '5px 10px'}}
                                title="Remover"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="w3-center" style={{padding: '20px'}}>
                            Nenhum membro encontrado.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Formulário de Cadastro (Create) */}
              <div className="w3-card w3-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingBottom: '20px' }}>
                <h3>Adicionar Novo Membro</h3>
                <form className="w3-container" onSubmit={handleAddMember}>
                  <div className="w3-row-padding" style={{ margin: '8px -16px' }}>
                    <div className="w3-half">
                      <input 
                        className="w3-input w3-border" 
                        type="text" 
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        required
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }} 
                      />
                    </div>
                    <div className="w3-half">
                      <input 
                        className="w3-input w3-border" 
                        type="text" 
                        placeholder="Cargo"
                        value={formData.cargo}
                        onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }} 
                      />
                    </div>
                  </div>
                  <div className="w3-row-padding" style={{ margin: '8px -16px' }}>
                    <div className="w3-half">
                      <input 
                        className="w3-input w3-border" 
                        type="email" 
                        placeholder="Email Institucional" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }} 
                      />
                    </div>
                    <div className="w3-half">
                      <input 
                        className="w3-input w3-border" 
                        type="tel" 
                        placeholder="Telefone" 
                        value={formData.telefone}
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }} 
                      />
                    </div>
                  </div>
                  <button type="submit" className="w3-button w3-block" style={{ backgroundColor: '#ffc107', color: '#1e2d56', marginTop: '16px', fontWeight: 'bold' }}>
                    <UserPlus size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Adicionar Membro
                  </button>
                </form>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeamManagement;