const API_URL = 'http://localhost:3001'; // A URL base do seu backend

export const authenticate = async (email, password) => {
  try {
    // 1. Faz a chamada real para a API
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha: password }), // O backend espera 'senha'
    });

    // 2. Converte a resposta do backend para JSON
    const data = await response.json();

    // 3. Verifica se a resposta foi um sucesso (status 2xx)
    if (!response.ok) {
      // Se não foi, lança um erro com a mensagem que o backend enviou
      throw new Error(data.message || 'Falha na autenticação');
    }

    // 4. Se o login foi bem-sucedido, retorna o sucesso e o token
    return {
      success: true,
      token: data.token, // O backend envia o token
    };

  } catch (error) {
    // 5. Se qualquer coisa deu errado (rede, erro do backend), retorna o fracasso
    return {
      success: false,
      message: error.message,
    };
  }
};