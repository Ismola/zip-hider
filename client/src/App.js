import React, { useState } from 'react';
import './App.css';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [combinedFile, setCombinedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setCombinedFile(null);
      setError(null);
    } else {
      setError('Por favor, selecciona un archivo de imagen válido');
    }
  };

  const handleZipChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/zip' || file.type === 'application/x-zip-compressed' || file.name.endsWith('.zip'))) {
      setZipFile(file);
      setCombinedFile(null);
      setError(null);
    } else {
      setError('Por favor, selecciona un archivo ZIP válido');
    }
  };

  const combineFiles = async () => {
    if (!imageFile || !zipFile) {
      setError('Por favor, selecciona ambos archivos (imagen y ZIP)');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Read both files as ArrayBuffer
      const imageBuffer = await imageFile.arrayBuffer();
      const zipBuffer = await zipFile.arrayBuffer();

      // Combine the buffers (concatenate)
      const combinedBuffer = new Uint8Array(imageBuffer.byteLength + zipBuffer.byteLength);
      combinedBuffer.set(new Uint8Array(imageBuffer), 0);
      combinedBuffer.set(new Uint8Array(zipBuffer), imageBuffer.byteLength);

      // Create a blob from the combined buffer
      const blob = new Blob([combinedBuffer], { type: imageFile.type });

      // Create a file with the original image extension
      const fileExtension = imageFile.name.split('.').pop();
      const fileName = `hidden_${Date.now()}.${fileExtension}`;
      
      const file = new File([blob], fileName, { type: imageFile.type });
      setCombinedFile(file);
    } catch (error) {
      console.error('Error combining files:', error);
      setError('Error al combinar los archivos');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCombinedFile = () => {
    if (combinedFile) {
      const url = URL.createObjectURL(combinedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = combinedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const reset = () => {
    setImageFile(null);
    setZipFile(null);
    setCombinedFile(null);
    setError(null);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>🖼️ Zip Hider</h1>
        <p className="subtitle">Oculta archivos ZIP dentro de imágenes</p>

        {error && (
          <div className="error-message" role="alert">
            ⚠️ {error}
          </div>
        )}

        <div className="upload-section">
          <div className="upload-box">
            <label htmlFor="image-upload" className="file-label">
              📷 Seleccionar Imagen
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {imageFile && <p className="file-name">✅ {imageFile.name}</p>}
          </div>

          <div className="upload-box">
            <label htmlFor="zip-upload" className="file-label">
              📦 Seleccionar ZIP
            </label>
            <input
              id="zip-upload"
              type="file"
              accept=".zip,application/zip,application/x-zip-compressed"
              onChange={handleZipChange}
              className="file-input"
            />
            {zipFile && <p className="file-name">✅ {zipFile.name}</p>}
          </div>
        </div>

        <div className="action-section">
          <button
            onClick={combineFiles}
            disabled={!imageFile || !zipFile || isProcessing}
            className="btn btn-primary"
          >
            {isProcessing ? '⏳ Procesando...' : '🔗 Combinar Archivos'}
          </button>

          {combinedFile && (
            <div className="result-section">
              <p className="success-message">✅ Archivo combinado exitosamente!</p>
              <button onClick={downloadCombinedFile} className="btn btn-download">
                💾 Descargar Imagen con ZIP Oculto
              </button>
              <button onClick={reset} className="btn btn-secondary">
                🔄 Nuevo
              </button>
            </div>
          )}
        </div>

        <div className="info-section">
          <h3>ℹ️ Cómo funciona</h3>
          <p>
            Esta aplicación combina un archivo ZIP con una imagen, ocultando el ZIP
            dentro de la imagen (similar al comando <code>copy/b</code> de Windows).
          </p>
          <p>
            La imagen resultante se puede abrir normalmente, pero también contiene
            el archivo ZIP que puede extraerse cambiando la extensión a .zip.
          </p>
          <p>
            <strong>Todo el procesamiento se realiza en tu navegador.</strong> No se
            envían archivos a ningún servidor.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
