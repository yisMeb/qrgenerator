import React from 'react';
import QRCode  from 'qrcode.react';
 
 function QRComponent({value}) {
   return (
     <div className='qrcomponent'>
        <h3>QR</h3>
        <QRCode value={value}/>
     </div>
   );
 }
 
 export default QRComponent
 
