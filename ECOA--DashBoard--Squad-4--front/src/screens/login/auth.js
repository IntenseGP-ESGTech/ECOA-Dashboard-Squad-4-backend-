const API_URL = 'http://localhost:3001'; // Backend

export const authenticate = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha: password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Falha na autenticação');
    }

    return {
      success: true,
      token: data.token,
    };

  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// 🔥 NOVO: Login pelo Google
export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
};
