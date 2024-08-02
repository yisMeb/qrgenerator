import React, {useState} from 'react'
import FormComponent from './Component/formComponent';
import QRComponent from './Component/QRComponent';


function App() {
  const [qrValue,setQrValue]= useState('');

  const handleForm=(data)=>{
    const Mydata = `Name: ${data.name}, Email: ${data.email}, Phone: ${data.phone}`;
    setQrValue(Mydata);
  };
  return (
    <div className='container'>
    <h2>QR generator</h2>
    <div className='form-qr-container'>
      <FormComponent onSubmit={handleForm} />
      {qrValue && (
        <div className='qr-container'>
          <QRComponent value={qrValue} />
        </div>
      )}
    </div>
  </div>
  );
}

export default App;
