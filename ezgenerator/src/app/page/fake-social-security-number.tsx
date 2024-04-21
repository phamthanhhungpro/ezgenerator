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
        const res = await fetch(`http://localhost:3000//api/ssn/?state=${state}`, {method: 'GET'});
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
                                <option value="Alabama">All state</option>
                                <option value="Alabama">Alabama</option>
                                <option value="Alaska">Alaska</option>
                                <option value="Arizona">Arizona</option>
                                <option value="Arkansas">Arkansas</option>
                                <option value="California">California</option>
                                <option value="Colorado">Colorado</option>
                                <option value="Connecticut">Connecticut</option>
                                <option value="Delaware">Delaware</option>
                                <option value="District of columbia">District Of Columbia</option>
                                <option value="Florida">Florida</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Idaho">Idaho</option>
                                <option value="Illinois">Illinois</option>
                                <option value="Indiana">Indiana</option>
                                <option value="Iowa">Iowa</option>
                                <option value="Kansas">Kansas</option>
                                <option value="Kentucky">Kentucky</option>
                                <option value="Louisiana">Louisiana</option>
                                <option value="Maine">Maine</option>
                                <option value="Maryland">Maryland</option>
                                <option value="Massachusetts">Massachusetts</option>
                                <option value="Michigan">Michigan</option>
                                <option value="Minnesota">Minnesota</option>
                                <option value="Mississippi">Mississippi</option>
                                <option value="Missouri">Missouri</option>
                                <option value="Montana">Montana</option>
                                <option value="Nebraska">Nebraska</option>
                                <option value="Nevada">Nevada</option>
                                <option value="New hampshire">New Hampshire</option>
                                <option value="New jersey">New Jersey</option>
                                <option value="New mexico">New Mexico</option>
                                <option value="New york">New York</option>
                                <option value="North carolina">North Carolina</option>
                                <option value="North dakota">North Dakota</option>
                                <option value="Ohio">Ohio</option>
                                <option value="Oklahoma">Oklahoma</option>
                                <option value="Oregon">Oregon</option>
                                <option value="Pennsylvania">Pennsylvania</option>
                                <option value="Rhode island">Rhode Island</option>
                                <option value="South carolina">South Carolina</option>
                                <option value="South dakota">South Dakota</option>
                                <option value="Tennessee">Tennessee</option>
                                <option value="Texas">Texas</option>
                                <option value="Utah">Utah</option>
                                <option value="Vermont">Vermont</option>
                                <option value="Virginia">Virginia</option>
                                <option value="Washington">Washington</option>
                                <option value="West virginia">West Virginia</option>
                                <option value="Wisconsin">Wisconsin</option>
                                <option value="Wyoming">Wyoming</option>
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
                        <p><b>State:</b> {dataSSN?.state} </p>
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