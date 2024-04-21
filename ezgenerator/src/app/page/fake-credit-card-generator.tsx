import React, { useState } from 'react';

const FakeCreditCardGenerator: React.FC = () => {
    const [cardType, setCardType] = useState('visa');
    const [nums, setNums] = useState(1);
    const [jsonCard, setJsonCard] = useState('');
    function changeCardType(event: any) {
        setCardType(event.target.value);
    }

    function changeNums(event: any) {
        setNums(event.target.value);
    }

    async function generateCCG() {
        const res = await fetch(`https://ezgenerator.onrender.com/api/generate-card/?type=${cardType}&nums=${nums}`, {method: 'GET'});
        const dataFetch = await res.json();
        setJsonCard(JSON.stringify(dataFetch, undefined, 4));
    }

    return (
        <div className="card-body mb-4 mt-3">
            <h1 className="card-title fs-2 text-center border-bottom-title pb-2"> Fake Credit Card Generator</h1>
            <p className="lead">
                Generating credit card numbers involve a mathematical formula known as the Luhn algorithm or the
                MOD 10 algorithm.
            </p>
            <p className="mb-3">
                To validate the generated fake credit cards, visit the fake credit card validator <a href="/tools/fake-credit-card-validator">here</a>.
                Visit our other tools like the <a href="/identity">identity generator</a> that creates fake identities.
            </p>
            <h2 className='fs-5 titleFCCG'>What makes a Credit Card Number valid?</h2>
            <p className="mb-3">
                A valid credit card is composed of several parts.
                The first few digits of the credit card number (usually up to six digits) are known as the identification number (IIN) or the bank identification number (BIN).
                The next two parts are the individual account identification number and a single digit checksum in that order.
                The single digit checksum is used to validate the credit card number to prevent any errors and is also the resulting number when
                using the Luhn algorithm.
            </p>
            <h2 className='fs-5 titleFCCG'>What are the Fake Credit Cards for?</h2>
            <p className="mb-5">
                Developers would use fake credit card generators to generate fake data to test their software or websites.
                One example that this tool would be useful for is testing the <a href="https://stripe.com/">stripe</a> API.
            </p>
            <label className="form-label title-select-top">Choose Card Type:</label>
            <select className="form-select" aria-label="Random" value={cardType} onChange={changeCardType}>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="american express">American Express</option>
                <option value="discover">Discover</option>
                <option value="jcb">JCB</option>
            </select>
            <label className="form-label title-select-top">How many credits cards to generate?</label>
            <input type="number" className="form-control" min="1" max="50" value={nums} onChange={changeNums}></input>
            <small id="numberGen" className="form-text text-muted">Number from 1 - 50</small>
            <br></br>
            <button type="submit" className="btn btn-primary mt-3" onClick={generateCCG}>Submit</button>
            <h2 className="card-title fs-2 text-center">RESULTS</h2>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-json" type="button" role="tab" aria-controls="nav-home" aria-selected="true">JSON</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-table" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Table</button>
                </div>
            </nav>
            <div className="tab-content " id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-json" role="tabpanel" aria-labelledby="nav-home-tab">
                    <p>
                        <textarea className="form-control h-100" value={jsonCard}></textarea>
                    </p>
                </div>
                <div className="tab-pane fade" id="nav-table" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
            </div>
        </div>
    );
};

export default FakeCreditCardGenerator;