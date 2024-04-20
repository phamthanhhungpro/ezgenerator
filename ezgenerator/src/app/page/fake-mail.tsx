import React, { useState } from 'react';

const FakeMail: React.FC = () => {
    const [numberEmail, setNumberEmail] = useState('10');
    const [listEmail, setListEmail] = useState('');

    async function generateMail() {
        const res = await fetch(`http://localhost:3000/api/emails/?nums=${numberEmail}`, {method: 'GET'});
        const dataFetch = await res.json();
        setListEmail(dataFetch.emails.join("\n"));
    }

    function changeNumberMail(event: any) {
        setNumberEmail(event.target.value);
      }
  return (
    <div className="card-body mb-4 mt-3">
        <h3 className="card-title pt-2 fs-2 text-center" id="displayUserName">Create List of Fake Emails</h3>
        <h3 className="card-title pt-2 pb-3 fs-4 bellowTitle text-center" id="displayUserName">Free Email List Generator</h3>
        <div className='row mt-2'>
            <div className='col-md-6'>
                <p>Simple Fake Email List Generator. Select how many email addresses you are looking for and click "generate".</p>
                <label className="form-label title-select-top">Number of Email to Generate</label>
                <input type="text" value={numberEmail} className="form-control mb-2" onChange={changeNumberMail}></input>
                <button type="submit" className="btn btn-primary" onClick={generateMail}>Generate Emails</button>
            </div>
            <div className='col-md-6'>
                <textarea className="form-control h-100" value={listEmail}>
                </textarea>
            </div>
        </div>
            
    </div>
  );
};

export default FakeMail;