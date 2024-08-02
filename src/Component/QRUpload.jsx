import React, { useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import './QRUpload.css'; // Import the CSS file

function QRUpload() {
  const [result, setResult] = useState('');
  const [isWebcamActive, setIsWebcamActive] = useState(false);
 
  const handleError = (err) => {
    console.error(err);
  };

  const toggleWebcam = () => {
    setIsWebcamActive((prev) => !prev);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
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

  return (
    <div className="qr-upload-container">
      <h1>QR Code Reader</h1>
      <button onClick={toggleWebcam}>
        {isWebcamActive ? 'Stop Webcam' : 'Start Webcam'}
      </button>
      {isWebcamActive && (
        <div className="webcam-container">
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            onUserMediaError={handleError}
            videoConstraints={{
              facingMode: 'environment',
            }}
          >
            {({ getScreenshot }) => (
              <button
                className="capture-button"
                onClick={() => {
                  const screenshot = getScreenshot();
                  if (screenshot) {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const image = new Image();
                    image.onload = () => {
                      canvas.width = image.width;
                      canvas.height = image.height;
                      context.drawImage(image, 0, 0);
                      const imageData = context.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                      );
                      const code = jsQR(imageData.data, imageData.width, imageData.height);
                      if (code) {
                        setResult(code.data);
                      } else {
                        alert('No QR code found.');
                      }
                    };
                    image.src = screenshot;
                  }
                }}
              >
                Capture
              </button>
            )}
          </Webcam>
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <p>Result: {result}</p>
    </div>
  );
}

export default QRUpload;
