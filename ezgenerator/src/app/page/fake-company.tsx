import React, { useState } from 'react';

export interface Company {
    companyName: string
    industry: string
    address: string
    city: string
    state: string
    zipCode: string
    phoneNumber: string
    website: string
    email: string
  }

const FakeCompany: React.FC = () => {
    const [country, setCountry] = useState('en_US');
    const [numsCompany, setNumsCompany] = useState(100);
    const [dataCompany, setDataCompany] = useState<Company[]>();

    function changeCountry(event: any) {
        setCountry(event.target.value);
    }

    function changeNumsCompany(event: any) {
        setNumsCompany(event.target.value);
    }

    async function generateCompany() {
        const res = await fetch(`https://randominfor.com/api/company?locale=${country}&nums=${numsCompany}`, {method: 'GET'});
        const dataFetch = await res.json();
        setDataCompany(dataFetch.data);
    }

    function exportToCSV() {
        const csvContent = "data:text/csv;charset=utf-8," + 
        dataCompany?.map(row => `${row.companyName},${row.industry},${row.website},${row.email},${row.phoneNumber}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
      };

    return (
        <div className='card-body mb-4 mt-3'>
            <h1 className="card-title fs-2 text-center"> Fake Company Name Generator:</h1>
            <h3 className="card-title pt-2 pb-3 fs-4 bellowTitle text-center">Helpings Objects Verbs Noun Since 1991™</h3>
            <p className="lead text-center">
                Generate fake company names with taglines and buzzword descriptions like <i>"Uber for Fake Names."</i>
                Perfect for coming up with business ideas or just seeding your database.
            </p>
            <div className="card bottom-spaced">
                <div className="card-body bg-light">
                    <div className="row">
                    <div className="col-md-6">
                        <h3 className="bottom-spaced">Company Name Generator</h3>
                        <div className="form-group">
                            <label>Company Country:</label>
                            <select id="country" name="country" value={country} onChange={changeCountry} className="form-control">
                                <option value="en_US">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="vi">Viet Nam</option>
                                <option value="fr">France</option>
                                <option value="de">Germany</option>
                                <option value="zh_CN">China</option>
                                <option value="en_IND">India</option>
                                <option value="">---</option>
                                <option value="ar">Argentina</option>
                                <option value="bd">Bangladesh</option>
                                <option value="nl_BE">Belgium</option>
                                <option value="pt_BR">Brazil</option>
                                <option value="en_CA">Canada</option>
                                <option value="zh_CN">China</option>
                                <option value="hr">Croatia</option>
                                <option value="cz">Czech Republic</option>
                                <option value="fi">Finland</option>
                                <option value="fr">France</option>
                                <option value="ge">Georgia</option>
                                <option value="de">Germany</option>
                                <option value="en_IND">Indonesia</option>
                                <option value="it">Italy</option>
                                <option value="ja">Japan</option>
                                <option value="nl">Netherlands</option>
                                <option value="nb_NO">Norway</option>
                                <option value="pl">Poland</option>
                                <option value="ru">Russian Federation</option>
                                <option value="sk">Slovakia</option>
                                <option value="en_ZA">South Africa</option>
                                <option value="ko">South Korea</option>
                                <option value="es">Spain</option>
                                <option value="en_US">United States</option>
                                <option value="vi">Viet Nam</option>
                            </select>
                            <small id="countryHelp" className="form-text text-muted">The country where the company is located.</small>
                        </div>
                        <div className="form-group">
                            <label>Number Fake Companies:</label>
                            <input type="number" className="form-control" value={numsCompany} onChange={changeNumsCompany} min="1" max="1000"></input>
                            <small id="countHelp" className="form-text text-muted">A number between 1 and 1000.</small>
                        </div>
                        <div className="form-group">
                            <button type="submit" onClick={generateCompany} className="btn btn-primary w-100">
                                Generate Fake Companies 
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6">
                    </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-8">
                    <h2 className="card-title pt-1 pb-1 fs-4 titleShowCompany">
                        Fake Netherlands Company Names
                    </h2>
                </div>
                <div className="col-md-4">
                    <div className="clearfix mb-2">
                    <button className="btn btn-primary btn float-right download-button w-100">
                        Download Table as CSV 
                    </button>
                    </div>
                </div>
            </div>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Fake Company Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Website</th>
                    <th scope="col">Company Email</th>
                    <th scope="col">Phone Number</th>
                    </tr>
                </thead>
                <tbody className="text-start">
                {dataCompany?.map((company, index) => (
                    <tr>
                        <td>{index}</td>
                        <td>{company.companyName}</td>
                        <td>{company.industry}</td>
                        <td>{company.website}</td>
                        <td>{company.email}</td>
                        <td>{company.phoneNumber}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default FakeCompany;