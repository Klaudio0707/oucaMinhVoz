const BASE_URL = 'http://localhost:5001';
const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  FORMULARIOS: `${BASE_URL}/formularios`,
};

// Configuração padrão para requisições
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Classe para gerenciar erros personalizados da API
class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.nameUser = 'APIError';
    this.status = status;
  }
}

// Utilitários para gerenciamento de `localStorage`
const storage = {
  setItem(key, value) {
    localStorage.setItem(key, value);
  },

  getItem(key) {
    return localStorage.getItem(key);
  },

  removeItem(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

// Handler para processar respostas da API
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new APIError(
      data.message || 'Erro na requisição',
      response.status
    );
  }

  return data;
};

// Função base para fazer requisições
const fetchWithConfig = async (url, options = {}) => {
  try {
    const token = storage.getItem('token');

    const config = {
      ...options,
      headers: {
        ...CONFIG.headers,
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error instanceof APIError ? error : new APIError(error.message);
  }
};

// API principal
const api = {
  auth: {
    async login(email, senha, nomeEmpresa, nomeRepresentante) {
      try {
        const response = await fetchWithConfig(`${ENDPOINTS.USERS}`, {
          method: 'GET',
        });

        const user = response.find(
          (user) => user.email === email && user.senha === senha
        );

        if (!user) {
          throw new APIError('Email ou senha inválidos');
        }

        // Simula geração de token e autenticação
        const token = `fake-token-${Date.now()}`;
        storage.setItem('token', token);
        storage.setItem('userId', user.id);

        return { token, user };
      } catch (error) {
        throw new APIError(`Erro no login: ${error.message}`);
      }
    },

    logout() {
      storage.clear();
    },

    getUserId() {
      return storage.getItem('userId');
    },

    getToken() {
      return storage.getItem('token');
    },

    isAuthenticated() {
      return Boolean(this.getToken());
    },
  },

  users: {
    async get() {
      const userId = api.auth.getUserId();

      if (!userId) {
        throw new APIError('Usuário não autenticado');
      }

      return fetchWithConfig(`${ENDPOINTS.USERS}/${userId}`);
    },

    async listar() {
      return fetchWithConfig(ENDPOINTS.USERS);
    },

    async cadastrar(userData) {
      return fetchWithConfig(ENDPOINTS.USERS, {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },
  },

  formularios: {
    async listar() {
      return fetchWithConfig(ENDPOINTS.FORMULARIOS);
    },

    async criar(dadosFormulario) {
      return fetchWithConfig(ENDPOINTS.FORMULARIOS, {
        method: 'POST',
        body: JSON.stringify(dadosFormulario),
      });
    },

    async atualizar(id, dadosAtualizados) {
      if (!id) {
        throw new APIError('ID do formulário é obrigatório');
      }

      return fetchWithConfig(`${ENDPOINTS.FORMULARIOS}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(dadosAtualizados),
      });
    },

    async excluir(id) {
      return fetchWithConfig(`${ENDPOINTS.FORMULARIOS}/${id}`, {
        method: 'DELETE',
      });
    },

    async buscarPorId(id) {
      if (!id) {
        throw new APIError('ID do formulário é obrigatório');
      }

      return fetchWithConfig(`${ENDPOINTS.FORMULARIOS}/${id}`);
    },
  },
};

export default api;

