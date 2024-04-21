import React, { useState } from 'react';
export interface validateModel{
    isValid: string;
}

const FakeCreditCardValidator: React.FC = () => {
    const [card, setCard] = useState('');
    const [validateResult, setValidateResult] = useState<validateModel>();

    function changeCard(event: any) {
        const inputValue = event.target.value.replace(/\D/g, ""); // Lọc ra chỉ số
        const formattedValue = inputValue.replace(/(\d{4})/g, "$1 "); // Thêm dấu cách sau mỗi nhóm 4 chữ số
        setCard(formattedValue);
    }

    async function validateCard() {
        const res = await fetch(`http://localhost:3000/api/validate-card/?cardNumber=${card.replaceAll(' ', '')}`, {method: 'GET'});
        const dataFetch = await res.json();
        setValidateResult(dataFetch);
    }

    return (
        <div className="card-body mb-4 mt-3">
            <h1 className="card-title fs-2 text-center border-bottom-title pb-2"> Fake Credit Card Validator</h1>
            <p className="lead mb-3">
                Validating credit card numbers involve the use of a formula known as the Luhn algorithm, and we also check if
                the card is identified with a card issuing institution by looking at the first few digits known as the
                bank identification number (BIN).
            </p>
            <p className="mb-3">
                To create fake credit card numbers for testing, visit the fake credit card generator <a href="/tools/fake-credit-card-generator">here</a>.
                Visit our other tools like the <a href="/identity">identity generator</a> that creates fake identities.
            </p>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                    <div className="card-body">
                    <input type="hidden" name="_token" value="CLcYhdcTavxNGJWii8V0D4BTsB1ACTUBps14Id5N"></input>
                        <div className="form-group text-center mb-3">
                            <label>Validate Credit Card Number</label>
                            <input className="form-control form-control-lg" value={card} onChange={changeCard} type="text" placeholder="3458 8306 1287 283"></input>
                        </div>
                        <button className="btn btn-primary" onClick={validateCard} id="submit">Submit</button>
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Luhn Algorithm: </h4>
                    <p id="luhn_check">
                    This credit card number passed the luhn algorithm check.
                    </p>
                    <h4>Major Industry Identifier: </h4>
                    <p id="major_industry">
                    The major industry for this card does not exist.
                    </p>
                    <h4>Bank Identification Number: </h4>
                    <p id="issuer-id">
                    There is no institution that matches the first few digits of your card number.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FakeCreditCardValidator;