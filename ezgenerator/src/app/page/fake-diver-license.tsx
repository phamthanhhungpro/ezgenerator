import React, { useState } from 'react';

export interface drivers {
    licenseAddress: string
    licenseBirthdate: string
    licenseClass: string
    licenseExpireDate: string
    licenseFirstName: string
    licenseHeight: string
    licenseIssuedDate: string
    licenseLastName: string
    licenseNum: string
    licenseSex: string
    avt: string
  }

const FakeDriverLicense: React.FC = () => {
    const [state, setState] = useState('');
    const [dataDriver, setDataDriver] = useState<drivers>();
    function changeState(event: any) {
        setState(event.target.value);
    }

    async function generateDriverLicense() {
        const res = await fetch(`http://localhost:3000/api/driver-license`, {method: 'GET'});
        const dataFetch = await res.json();
        setDataDriver(dataFetch.data);
    }

    return (
        <div className="card-body mb-4 mt-3">
            <h1 className="card-title fs-2 text-center border-bottom-title pb-2"> Fake Driver's License</h1>
            <p className="lead">
            A driver's license is an official document that permits an individual to be able to drive one or more
            types of vehicles. Each state in the US has their own method for creating a driver's license.
            </p>
            <p>A driver's license usually consist of a driver's license number,
            first and last name of the driver, the date of birth, the height, type of driver's license, the date the license was
            issued, and the expiration date. The generated driver's license in this page is a different layout and uses the license number format
            of each state, but it is not as specific as some states want it to be. For example, a state will generate a number based on the
            name of the driver, but our generator does not do that. Our generator follows how many characters or digits the license number should have
            for each state. This generator is only for testing purposes and is fake.</p>
            <div className='row mt-5'>
                <div className="col-md-6">
                    <label className="form-label title-select-top">Choose the State of the Driver's License</label>
                    <select className="form-select mb-3" value={state} onChange={changeState} aria-label="Random">
                        <option value="All States">All States</option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
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
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option>
                    </select>
                    <button type="submit" className="btn btn-primary" onClick={generateDriverLicense}>Submit</button>
                </div>
                <div className='col-md-6'>
                <div className="card">
                    <div className="card-header">
                        <h3><span id="license-header">Driver's License</span></h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img src="https://randomuser.me/api/portraits/men/56.jpg" className="rounded img-fluid driverimage"></img>
                            </div>
                            <div className="col-md-8">
                                <h4 id="ID">ID: {dataDriver?.licenseNum}</h4>
                                <h4><span className="firstname">{dataDriver?.licenseFirstName}</span> <span className="lastname">{dataDriver?.licenseLastName}</span></h4>
                                <em className="address">{dataDriver?.licenseAddress}</em>
                                <div className="row mt-3">
                                <div className="col-md-6">
                                    <small className="DOB">DOB: {dataDriver?.licenseBirthdate}</small><br></br>
                                    <small className="Class">Class: {dataDriver?.licenseClass}</small><br></br>
                                    <small className="Sex">SEX: {dataDriver?.licenseSex}</small><br></br>
                                </div>
                                <div className="col-md-6">
                                    <small className="Height">HEIGHT: {dataDriver?.licenseHeight}"</small><br></br>
                                    <small className="ISS">ISS: {dataDriver?.licenseIssuedDate}</small><br></br>
                                    <small className="EXP">EXP: {dataDriver?.licenseExpireDate}</small><br></br>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FakeDriverLicense;