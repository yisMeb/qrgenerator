import React, { useState, useRef } from 'react';
import jsQR from 'jsqr';
import { FaCamera } from "react-icons/fa";

function QRUpload() {
  const [result, setResult] = useState('');
  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const maxDimension = 600;
        const scale = Math.min(maxDimension / image.width, maxDimension / image.height);
        canvas.width = image.width * scale;
        canvas.height = image.height * scale;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setResult(code.data);
        } else {
          alert('No QR code found.');
        }
      };
    };

    reader.readAsDataURL(file);
  };

  const handleCameraButtonClick = () => {
    cameraInputRef.current.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    processFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="qr-upload-container">
      <h1>QR Code Reader</h1>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        ref={cameraInputRef}
        style={{ display: 'none' }}
      />
      <button className='picbtn' onClick={handleCameraButtonClick}><FaCamera style={{fontSize:'26px'}}/></button>
      
      <div 
        className="drop-area" 
        ref={dropAreaRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Drag & Drop or 
        <label className="upload-label">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            ref={fileInputRef} 
            style={{ display: 'none' }}
          />
          <span className='uppic'>Upload picture</span>
        </label>
      </div>
      <p>{result}</p>
    </div>
  );
}

export default QRUpload;
