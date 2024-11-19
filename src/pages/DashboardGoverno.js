import React, { useState, useEffect } from 'react';

function GovernoDashboard() {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const fetchDocumentos = async () => {
      const response = await fetch('http://localhost:5001/documentos');
      const data = await response.json();
      setDocumentos(data);
    };
    fetchDocumentos();
  }, []);

  return (
    <div>
      <h2>Documentos Submetidos</h2>
      {documentos.map((doc) => (
        <div key={doc._id}>
          <h3>{doc.titulo}</h3>
          <p>Empresa: {doc.empresaId}</p>
          <p>Status: {doc.status}</p>
          <p>{doc.descricao}</p>
          {/* Botão para alterar o status do documento */}
        </div>
      ))}
    </div>
  );
}

export default GovernoDashboard;