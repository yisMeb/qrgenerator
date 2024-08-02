import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

function QRUpload() {
  const [result, setResult] = useState('');
  const [isWebcamActive, setIsWebcamActive] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      setIsWebcamActive(false);
    }
  };

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
    <div>
      <h1>QR Code Reader</h1>
      <button onClick={toggleWebcam}>
        {isWebcamActive ? 'Stop Webcam' : 'Start Webcam'}
      </button>
      {isWebcamActive && (
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
              onClick={() => {
                const screenshot = getScreenshot();
                if (screenshot) {
                  handleScan(screenshot);
                }
              }}
            >
              Capture
            </button>
          )}
        </Webcam>
      )}
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <p>Result: {result}</p>
    </div>
  );
}

export default QRUpload;
