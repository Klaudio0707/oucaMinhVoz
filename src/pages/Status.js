import React, { useState, useEffect } from 'react';

function StatusDocumentos() {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const fetchDocumentos = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/documentos/:empresaId', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setDocumentos(data);
    };
    fetchDocumentos();
  }, []);

  return (
    <div>
      <h2>Status dos Documentos</h2>
      {documentos.map((doc) => (
        <div key={doc._id}>
          <h3>{doc.titulo}</h3>
          <p>Status: {doc.status}</p>
          <p>{doc.descricao}</p>
        </div>
      ))}
    </div>
  );
}

export default StatusDocumentos;