const BASE_URL = 'http://localhost:5001';
const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  DOCUMENTOS: `${BASE_URL}/documentos`,
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
    async login(email, senha) {
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
  },

  documentos: {
    async listar() {
      return fetchWithConfig(ENDPOINTS.DOCUMENTOS);
    },

    async enviar(titulo, descricao) {
      const userId = api.auth.getUserId();

      if (!userId) {
        throw new APIError('Usuário não autenticado');
      }

      return fetchWithConfig(ENDPOINTS.DOCUMENTOS, {
        method: 'POST',
        body: JSON.stringify({
          titulo,
          descricao,
          userId,
          status: 'Pendente',
          dataCriacao: new Date().toISOString(),
        }),
      });
    },

    async atualizarStatus(id, status) {
      if (!id) {
        throw new APIError('ID do documento é obrigatório');
      }

      return fetchWithConfig(`${ENDPOINTS.DOCUMENTOS}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status,
          dataAtualizacao: new Date().toISOString(),
        }),
      });
    },

    async excluir(id) {
      return fetchWithConfig(`${ENDPOINTS.DOCUMENTOS}/${id}`, {
        method: 'DELETE',
      });
    },

    async buscarPorId(id) {
      if (!id) {
        throw new APIError('ID do documento é obrigatório');
      }

      return fetchWithConfig(`${ENDPOINTS.DOCUMENTOS}/${id}`);
    },
  },
};

export default api;

