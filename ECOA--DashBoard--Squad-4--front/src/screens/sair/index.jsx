import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ArrowLeft, AlertTriangle } from "lucide-react";
import './sair.css';

// 1. Adiciona { setIsAuthenticated } aqui
function Sair({ setIsAuthenticated }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Limpar tokens
      localStorage.removeItem('authToken');
      
      // 2. ADICIONA ISTO: Atualizar o estado global para false
      if (setIsAuthenticated) {
        setIsAuthenticated(false);
      }
      
      // Redirecionar para login
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="dashboard-background">
      <div className="sair-container">
        {/* ... (resto do código visual mantém-se igual) */}
        
        <div className="sair-content">
          {/* ... */}
          
          <div className="sair-buttons">
            <Link to="/dashboard">
              <button className="sair-button cancel-button">
                <ArrowLeft size={16} /> Cancelar
              </button>
            </Link>
            <button 
              className="sair-button confirm-button"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "Saindo..." : (
                <>
                  <LogOut size={16} /> Confirmar Saída
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sair;