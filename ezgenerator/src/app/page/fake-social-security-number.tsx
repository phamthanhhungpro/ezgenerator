import React, { useState } from 'react';

const FakeSocialSecurityNumber: React.FC = () => {
    const [year, setYear] = useState('');
    const [state, setState] = useState('');
    const [dataSSN, setDataSSN] = useState<any>('');

    function changeState(event: any) {
        setState(event.target.value);
    }

    function changeYear(event: any) {
        setYear(event.target.value);
    }

    async function generateSSN() {
        const res = await fetch(`https://ezgenerator.onrender.com//api/ssn`, {method: 'GET'});
        const dataFetch = await res.json();
        setDataSSN(dataFetch.data);
    }

    return (
        <div className='card-body mb-4 mt-3'>
            <h1 className="card-title fs-2 text-center border-bottom-title pb-2"> Social Security Number Generator</h1>
            <p className="lead">
                Our Fake SSN Generator allows you to create a fake Social Security number that will
                pass rudimentary social security number checkers such as
                <a href="https://www.ssn-check.org" target="_blank">ssn-check.org</a> and
                <a href="https://www.ssn-verify.com" target="_blank">ssn-verify.com</a>.
            </p>
            <div className="card bg-light my-3">
                <div className="card-body">
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>State</label>
                            <select value={state} onChange={changeState} className="form-control">
                                <option value="">All state</option>
                                <option value="alabama">Alabama</option>
                                <option value="alaska">Alaska</option>
                                <option value="arizona">Arizona</option>
                                <option value="arkansas">Arkansas</option>
                                <option value="california">California</option>
                                <option value="colorado">Colorado</option>
                                <option value="connecticut">Connecticut</option>
                                <option value="delaware">Delaware</option>
                                <option value="district of columbia">District Of Columbia</option>
                                <option value="florida">Florida</option>
                                <option value="georgia">Georgia</option>
                                <option value="hawaii">Hawaii</option>
                                <option value="idaho">Idaho</option>
                                <option value="illinois">Illinois</option>
                                <option value="indiana">Indiana</option>
                                <option value="iowa">Iowa</option>
                                <option value="kansas">Kansas</option>
                                <option value="kentucky">Kentucky</option>
                                <option value="louisiana">Louisiana</option>
                                <option value="maine">Maine</option>
                                <option value="maryland">Maryland</option>
                                <option value="massachusetts">Massachusetts</option>
                                <option value="michigan">Michigan</option>
                                <option value="minnesota">Minnesota</option>
                                <option value="mississippi">Mississippi</option>
                                <option value="missouri">Missouri</option>
                                <option value="montana">Montana</option>
                                <option value="nebraska">Nebraska</option>
                                <option value="nevada">Nevada</option>
                                <option value="new hampshire">New Hampshire</option>
                                <option value="new jersey">New Jersey</option>
                                <option value="new mexico">New Mexico</option>
                                <option value="new york">New York</option>
                                <option value="north carolina">North Carolina</option>
                                <option value="north dakota">North Dakota</option>
                                <option value="ohio">Ohio</option>
                                <option value="oklahoma">Oklahoma</option>
                                <option value="oregon">Oregon</option>
                                <option value="pennsylvania">Pennsylvania</option>
                                <option value="rhode island">Rhode Island</option>
                                <option value="south carolina">South Carolina</option>
                                <option value="south dakota">South Dakota</option>
                                <option value="tennessee">Tennessee</option>
                                <option value="texas">Texas</option>
                                <option value="utah">Utah</option>
                                <option value="vermont">Vermont</option>
                                <option value="virginia">Virginia</option>
                                <option value="washington">Washington</option>
                                <option value="west virginia">West Virginia</option>
                                <option value="wisconsin">Wisconsin</option>
                                <option value="wyoming">Wyoming</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Year Issued:</label>
                            <input type="number" value={year} onChange={changeYear} className="form-control" placeholder="Leave blank for random year" name="year" min="1936" max="2011"></input>
                            <small id="yearHelp" className="form-text text-muted">Between 1936 and 2011</small>
                        </div>
                        <button type="submit" onClick={generateSSN} className="btn btn-primary">Submit</button>
                    </div>
                    <div className="col-md-6 text-center">
                        <h3 className="mb-4">Results:</h3>
                        <p className="lead"><big><b>{dataSSN?.ssn}</b></big></p>
                        <p><b>State:</b> Arizona </p>
                        <p><b>Year:</b>
                            {dataSSN?.issueDate}
                        </p>
                    </div>
                    </div>
                </div>
            </div>
            </div>
    );
};

export default FakeSocialSecurityNumber;