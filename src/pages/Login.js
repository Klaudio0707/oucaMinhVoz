const BASE_URL = 'http://localhost:5001';
const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  DOCUMENTOS: `${BASE_URL}/documentos`
};

// Configuração padrão para requisições
const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// Classe para gerenciar erros personalizados da API
class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'APIError';
    this.status = status || 500;
  }
}

// Utilitários para storage
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
  }
};

// Handler de respostas da API
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new APIError(errorText || response.statusText, response.status);
  }
  return response.json();
};

// Função base para requisições
const fetchWithConfig = async (url, options = {}) => {
  try {
    const token = storage.getItem('token');
    const config = {
      ...options,
      headers: {
        ...CONFIG.headers,
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    if (error.status === 401) {
      // Token expirado ou inválido
      Login.auth.logout();
      console.error('Sessão expirada, faça login novamente.');
    }
    throw error instanceof APIError ? error : new APIError(error.message);
  }
};

// Mensagens de erro
const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Credenciais inválidas',
  NOT_AUTHENTICATED: 'Usuário não autenticado',
  ID_REQUIRED: 'ID é obrigatório',
};

// Módulo de login e gerenciamento de documentos
const Login = {
  auth: {
    async login(email, senha) {
      try {
        const users = await fetchWithConfig(ENDPOINTS.USERS);
        const user = users.find(user => user.email === email && user.senha === senha);

        if (user) {
          storage.setItem('token', 'token-simulado');
          storage.setItem('userId', user.id);
          return { success: true, user };
        } else {
          throw new APIError(ERROR_MESSAGES.LOGIN_FAILED, 401);
        }
      } catch (error) {
        throw new APIError(`Erro no login: ${error.message}`, error.status);
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
    }
  },
  documentos: {
    async listar() {
      return fetchWithConfig(ENDPOINTS.DOCUMENTOS);
    },
    async enviar(titulo, descricao) {
      const userId = Login.auth.getUserId();
      if (!userId) throw new APIError(ERROR_MESSAGES.NOT_AUTHENTICATED, 403);

      return fetchWithConfig(ENDPOINTS.DOCUMENTOS, {
        method: 'POST',
        body: JSON.stringify({
          titulo,
          descricao,
          userId,
          status: 'Pendente',
          dataCriacao: new Date().toISOString()
        })
      });
    },
    async atualizarStatus(id, status) {
      if (!id) throw new APIError(ERROR_MESSAGES.ID_REQUIRED, 400);

      return fetchWithConfig(`${ENDPOINTS.DOCUMENTOS}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status,
          dataAtualizacao: new Date().toISOString()
        })
      });
    },
    async excluir(id) {
      if (!id) throw new APIError(ERROR_MESSAGES.ID_REQUIRED, 400);

      return fetchWithConfig(`${ENDPOINTS.DOCUMENTOS}/${id}`, {
        method: 'DELETE'
      });
    },
    async buscarPorId(id) {
      if (!id) throw new APIError(ERROR_MESSAGES.ID_REQUIRED, 400);

      return fetchWithConfig(`${ENDPOINTS.DOCUMENTOS}/${id}`);
    }
  }
};

export default Login;

