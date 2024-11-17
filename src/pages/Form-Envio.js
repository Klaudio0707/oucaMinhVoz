import React, { useState, useEffect } from 'react';
import { Upload, File, FileText, Image, X, AlertCircle } from 'lucide-react';
import api from '../apiFake/api';

function EnviarDocumento() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [preview, setPreview] = useState('');
  const [documentos, setDocumentos] = useState([]);

  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

  useEffect(() => {
    carregarDocumentos();
  }, []);

  const carregarDocumentos = async () => {
    try {
      const docs = await api.documentos.listar();
      setDocumentos(docs);
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
    }
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return <Image className="h-6 w-6" />;
    if (type?.includes('pdf')) return <File className="h-6 w-6" />;
    return <FileText className="h-6 w-6" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const validarArquivo = (file) => {
    if (!file) return 'Selecione um arquivo';
    if (file.size > MAX_FILE_SIZE) return 'O arquivo deve ter no máximo 1MB';
    return '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setErro('');
    
    const errorMessage = validarArquivo(file);
    if (errorMessage) {
      setErro(errorMessage);
      setArquivo(null);
      setPreview('');
      return;
    }

    setArquivo(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!arquivo) {
      setErro('Selecione um arquivo');
      return;
    }

    setLoading(true);
    setErro('');

    try {
      await api.documentos.enviar(titulo, descricao, arquivo);
      
      // Recarregar lista de documentos
      await carregarDocumentos();

      // Limpar formulário
      setTitulo('');
      setDescricao('');
      setArquivo(null);
      setPreview('');
      alert('Documento registrado com sucesso!');
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Enviar Documento</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulário */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Título do documento"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Descrição do documento"
                rows="3"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Arquivo (máx. 1MB)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload um arquivo</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt,image/*"
                      />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX, TXT ou imagens até 1MB
                  </p>
                </div>
              </div>
            </div>

            {/* Preview do arquivo */}
            {arquivo && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getFileIcon(arquivo.type)}
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-900">{arquivo.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(arquivo.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setArquivo(null);
                      setPreview('');
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 max-h-40 rounded-md"
                  />
                )}
              </div>
            )}

            {/* Mensagem de erro */}
            {erro && (
              <div className="mt-4 p-4 bg-red-50 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-sm text-red-600">{erro}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !arquivo}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${loading || !arquivo 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
            >
              {loading ? 'Enviando...' : 'Enviar Documento'}
            </button>
          </form>
        </div>

        {/* Lista de Documentos */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Documentos Registrados</h3>
          <div className="space-y-4">
            {documentos.map((doc) => (
              <div key={doc.id} className="p-4 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  {getFileIcon(doc.tipoArquivo)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{doc.titulo}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(doc.dataCriacao).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {doc.nomeArquivo} - {formatFileSize(doc.tamanhoArquivo)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Status: {doc.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {documentos.length === 0 && (
              <p className="text-sm text-gray-500 justify-center">Nenhum documento registrado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnviarDocumento;