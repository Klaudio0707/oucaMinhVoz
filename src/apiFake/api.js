// Busca a URL do backend do arquivo de ambiente
const BASE_URL = process.env.REACT_APP_API_URL || "https://api-ouca.onrender.com";


// Define os endpoints da API
const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  FORMULARIOS: `${BASE_URL}/formularios`,
  FICHA_INSCRICAO: `${BASE_URL}/fichaInscricao`,
  SERVICOS: `${BASE_URL}/servicos`, // Endpoint para serviços
  FORMULARIOS_APROVADOS: `${BASE_URL}/formularios/aprovados`,
  FORMULARIOS_REJEITADOS: `${BASE_URL}/formularios/rejeitados`,
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
    this.name = 'APIError';
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
    throw new APIError(data.message || 'Erro na requisição', response.status);
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
        const response = await fetchWithConfig(`${ENDPOINTS.USERS}/login`, {
          method: 'POST',
          body: JSON.stringify({ email, senha }),
        });

        const { token, user } = response;

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
        method: 'PUT',
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

    async getEmpresasAprovadas() {
      return fetchWithConfig(ENDPOINTS.FORMULARIOS_APROVADOS);
    },

    async getEmpresasRejeitadas() {
      return fetchWithConfig(ENDPOINTS.FORMULARIOS_REJEITADOS);
    },
  },

  fichaInscricao: {
    async criar(dadosFicha) {
      return fetchWithConfig(ENDPOINTS.FICHA_INSCRICAO, {
        method: 'POST',
        body: JSON.stringify(dadosFicha),
      });
    },
  },

  servicos: {
    async listar() {
      return fetchWithConfig(ENDPOINTS.SERVICOS);
    },

    async criar(dadosServico) {
      return fetchWithConfig(ENDPOINTS.SERVICOS, {
        method: 'POST',
        body: JSON.stringify(dadosServico),
      });
    },

    async atualizar(id, dadosAtualizados) {
      if (!id) {
        throw new APIError('ID do serviço é obrigatório');
      }

      return fetchWithConfig(`${ENDPOINTS.SERVICOS}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dadosAtualizados),
      });
    },

    async excluir(id) {
      if (!id) {
        throw new APIError('ID do serviço é obrigatório');
      }

      return fetchWithConfig(`${ENDPOINTS.SERVICOS}/${id}`, {
        method: 'DELETE',
      });
    },
  },
};

export default api;
