import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [combinedFile, setCombinedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setCombinedFile(null);
      setError(null);
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleZipChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/zip' || file.type === 'application/x-zip-compressed' || file.name.endsWith('.zip'))) {
      setZipFile(file);
      setCombinedFile(null);
      setError(null);
    } else {
      setError('Please select a valid ZIP file');
    }
  };

  const combineFiles = async () => {
    if (!imageFile || !zipFile) {
      setError('Please select both files (image and ZIP)');
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
      setError('Error combining files');
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
        <div className="header">
          <div className="header-content">
            <h1>Zip Hider</h1>
            <p className="subtitle">Hide ZIP files inside images</p>
          </div>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <div className="upload-section">
          <div className="upload-box">
            <label htmlFor="image-upload" className="file-label">
              Select Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {imageFile && <p className="file-name">{imageFile.name}</p>}
          </div>

          <div className="upload-box">
            <label htmlFor="zip-upload" className="file-label">
              Select ZIP
            </label>
            <input
              id="zip-upload"
              type="file"
              accept=".zip,application/zip,application/x-zip-compressed"
              onChange={handleZipChange}
              className="file-input"
            />
            {zipFile && <p className="file-name">{zipFile.name}</p>}
          </div>
        </div>

        <div className="action-section">
          <button
            onClick={combineFiles}
            disabled={!imageFile || !zipFile || isProcessing}
            className="btn btn-primary"
          >
            {isProcessing ? 'Processing...' : 'Combine Files'}
          </button>

          {combinedFile && (
            <div className="result-section">
              <p className="success-message">Files combined successfully</p>
              <button onClick={downloadCombinedFile} className="btn btn-download">
                Download Image
              </button>
              <button onClick={reset} className="btn btn-secondary">
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="info-section">
          <h3>How it works</h3>
          <p>
            This application combines a ZIP file with an image, hiding the ZIP
            inside the image (similar to the Windows <code>copy/b</code> command).
          </p>
          <p>
            The resulting image can be opened normally, but it also contains
            the ZIP file which can be extracted by changing the extension to .zip.
          </p>
        </div>

        <div className="info-section">
          <h3>Privacy & Security</h3>
          <p>
            <strong>100% Client-Side Processing.</strong> All operations are performed
            locally in your browser. Nothing is uploaded to any server.
          </p>
          <p>
            No files are stored. No logs are kept. No tracking. No data collection.
            Everything is completely anonymous and private.
          </p>
        </div>

        <footer className="footer">
          <p>
            Made with love by <a href="https://github.com/Ismola" target="_blank" rel="noopener noreferrer">Ismola</a>
            {' • '}
            <a href="https://github.com/Ismola/zip-hider" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
