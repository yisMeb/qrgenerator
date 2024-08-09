import React, {useState} from 'react'
import FormComponent from './Component/formComponent';
import QRComponent from './Component/QRComponent';
import QRUpload from './Component/QRUpload';


function App() {
  const [qrValue,setQrValue]= useState('');
  
  const handleForm=(data)=>{ 
    
    const Mydata = `Name: ${data.name}\n Email: ${data.email}\n Phone: ${data.phone}`;
    setQrValue(Mydata);
  };

  return (
    <div className='container'>
    <h2>QR generator</h2>
    <div className='qrcontainer'>
      <FormComponent onSubmit={handleForm} />
      {qrValue && (
        <div className='qrInnercont'>
          <QRComponent value={qrValue} />
        </div>
      )}
    </div>
    <div>
      <QRUpload/>
    </div>
  </div>
  );
}

export default App;
