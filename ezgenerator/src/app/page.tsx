'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { SetStateAction, useState } from "react";
import { format } from 'date-fns';
export interface profile {
  gender: string
  name: Name
  location: Location
  email: string
  login: Login
  dob: Dob
  registered: Registered
  phone: string
  cell: string
  id: Id
  picture: Picture
  nat: string
}

export interface Name {
  title: string
  first: string
  last: string
}

export interface Location {
  street: Street
  city: string
  state: string
  country: string
  postcode: number
  coordinates: Coordinates
  timezone: Timezone
}

export interface Street {
  number: number
  name: string
}

export interface Coordinates {
  latitude: string
  longitude: string
}

export interface Timezone {
  offset: string
  description: string
}

export interface Login {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export interface Dob {
  date: Date
  age: number
}

export interface Registered {
  date: string
  age: number
}

export interface Id {
  name: string
  value: string
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}

export default function Home() {
  let data: any = null;
  const [profile, setProfile] = useState<profile>();

  // Create a class name of the left sidebar
  const [classIG, setClassIG] = useState('nav-link active');
  const [classRT, setClassRT] = useState('nav-link');
  const [classFE, setClassFE] = useState('nav-link');
  const [classFCCG, setClassFCCG] = useState('nav-link');
  const [classFCCV, setClassFCCV] = useState('nav-link');
  const [classFDL, setClassFDL] = useState('nav-link');
  const [classFC, setClassFC] = useState('nav-link');
  const [classFPN, setClassFPN] = useState('nav-link');
  const [classFSSN, setClassFSSN] = useState('nav-link');

  const [selectSideNavData, setSelectSideNavData] = useState('IG');

  const [selectRTCountry,setSelectRTCountry] = useState(''); 
  async function generateKey() {
    const res = await fetch('http://localhost:3000/api/random-user/?nat=au&gender=male', {method: 'GET'});
    const dataFetch = await res.json();
    data = dataFetch.results[0];
    setProfile(data);
    console.log(data, 'data');
  }

  function changeLanguageRT(event: any) {
    setSelectRTCountry(event.target.value);
    console.log(selectRTCountry,'selectRTCountry');
  }
  function onSelectSideNav(type: string) {
    resetClassOfSideNav();
    setSelectSideNavData(type);
    switch(type) {
      case 'IG': {
        setClassIG('nav-link active');
        break;
      }
      case 'RT': {
        setClassRT('nav-link active');
        break;
      }
      case 'FE': {
        setClassFE('nav-link active');
        break;
      }
      case 'FCCG': {
        setClassFCCG('nav-link active');
        break;
      }
      case 'FCCV': {
        setClassFCCV('nav-link active');
        break;
      }
      case 'FDL': {
        setClassFDL('nav-link active');
        break;
      }
      case 'FC': {
        setClassFC('nav-link active');
        break;
      }
      case 'FPN': {
        setClassFPN('nav-link active');
        break;
      }
      default: {
        setClassFSSN('nav-link active');
        break;
      }
    }
  }

  function resetClassOfSideNav() {
    setClassIG('nav-link');
    setClassRT('nav-link');
    setClassFE('nav-link');
    setClassFCCG('nav-link');
    setClassFCCV('nav-link');
    setClassFDL('nav-link');
    setClassFC('nav-link');
    setClassFPN('nav-link');
    setClassFSSN('nav-link');
  }
  return (
    <><header className="bg-dark text-white py-5">
      <div className="container">
        <div className="row pb-5">
          <div className="header-inner-div col-md-12 text-center">
            <h2 className="fs-1 fw-normal text-uppercase">Random User Generator</h2>
            <p className="fw-lighter">Random user generator is a practice project made by random user api and
              bootstrap 5. By this website you can generate a random person info and use anywhere.</p>
              <div className="mb-3 container">
                <div className="row">
                  <div className="col">
                    <label className="form-label title-select-top">Gender</label>
                    <select className="form-select" aria-label="Random">
                      <option value="1">Random</option>
                      <option value="2">Male</option>
                      <option value="3">Female</option>
                    </select>
                  </div>
                  <div className="col">
                    <label className="form-label title-select-top">Age</label>
                    <select className="form-select" aria-label="Random">
                      <option value="1">Random</option>
                      <option value="2">18 to 24</option>
                      <option value="3">25 to 34</option>
                      <option value="3">35 to 44</option>
                      <option value="3">45 to 54</option>
                      <option value="3">55 to 64</option>
                      <option value="3">65+</option>
                    </select>
                  </div>
                  <div className="col">
                    <label className="form-label title-select-top">Country</label>
                    <select className="form-select" aria-label="Random">
                      <option value="united-states">United States</option>
                      <option value="united-kingdom">United Kingdom</option>
                      <option value="france">France</option>
                      <option value="germany">Germany</option>
                      <option value="china">China</option>
                      <option value="india">India</option>
                      <option value="">---</option>
                      <option value="argentina">Argentina</option>
                      <option value="armenia">Armenia</option>
                      <option value="australia">Australia</option>
                      <option value="austria">Austria</option>
                      <option value="bangladesh">Bangladesh</option>
                      <option value="belgium-dutch">Belgium (Dutch)</option>
                      <option value="belgium-french">Belgium (French)</option>
                      <option value="brazil">Brazil</option>
                      <option value="bulgaria">Bulgaria</option>
                      <option value="canada-english">Canada (English)</option>
                      <option value="canada-french">Canada (French)</option>
                      <option value="china">China</option>
                      <option value="croatia">Croatia</option>
                      <option value="cyprus">Cyprus</option>
                      <option value="czech-republic">Czech Republic</option>
                      <option value="denmark">Denmark</option>
                      <option value="finland">Finland</option>
                      <option value="france">France</option>
                      <option value="georgia">Georgia</option>
                      <option value="germany">Germany</option>
                      <option value="greece">Greece</option>
                      <option value="hong-kong">Hong Kong (English)</option>
                      <option value="hungary">Hungary</option>
                      <option value="iceland">Iceland</option>
                      <option value="india">India</option>
                      <option value="indonesia">Indonesia</option>
                      <option value="iran">Iran</option>
                      <option value="israel">Israel</option>
                      <option value="italy">Italy</option>
                      <option value="japan">Japan</option>
                      <option value="jordan">Jordan</option>
                      <option value="kazakhstan">Kazakhstan</option>
                      <option value="latvia">Latvia</option>
                      <option value="lithuania">Lithuania</option>
                      <option value="malaysia">Malaysia</option>
                      <option value="moldova">Moldova</option>
                      <option value="mongolia">Mongolia</option>
                      <option value="nepal">Nepal</option>
                      <option value="netherlands">Netherlands</option>
                      <option value="new-zealand">New Zealand</option>
                      <option value="nigeria">Nigeria</option>
                      <option value="norway">Norway</option>
                      <option value="peru">Peru</option>
                      <option value="philippines">Philippines</option>
                      <option value="poland">Poland</option>
                      <option value="portugal">Portugal</option>
                      <option value="romania">Romania</option>
                      <option value="russia">Russia</option>
                      <option value="saudi-arabia">Saudi Arabia</option>
                      <option value="serbia">Serbia</option>
                      <option value="singapore">Singapore</option>
                      <option value="slovakia">Slovakia</option>
                      <option value="slovenia">Slovenia</option>
                      <option value="south-africa">South Africa</option>
                      <option value="south-korea">South Korea</option>
                      <option value="spain">Spain</option>
                      <option value="sweden">Sweden</option>
                      <option value="switzerland-french">Switzerland (French)</option>
                      <option value="switzerland-german">Switzerland (German)</option>
                      <option value="switzerland-italian">Switzerland (Italian)</option>
                      <option value="taiwan">Taiwan</option>
                      <option value="thailand">Thailand</option>
                      <option value="uganda">Uganda</option>
                      <option value="ukraine">Ukraine</option>
                      <option value="united-kingdom">United Kingdom</option>
                      <option value="venezuela-english">Venezuela (English)</option>
                      <option value="venezuela-spanish">Venezuela (Spanish)</option>
                      <option value="vietnam">Vietnam</option>
                    </select>
                  </div>
                  <div className="col">
                    <label className="form-label title-select-top">State</label>
                    <select className="form-select" aria-label="Random">
                      <option value="">Random</option>
                      <option value="alabama">Alabama</option>
                      <option value="alaska">Alaska</option>
                      <option value="arizona">Arizona</option>
                      <option value="arkansas">Arkansas</option>
                      <option value="california">California</option>
                      <option value="colorado">Colorado</option>
                      <option value="connecticut">Connecticut</option>
                      <option value="delaware">Delaware</option>
                      <option value="district-of-columbia">District Of Columbia</option>
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
                      <option value="new-hampshire">New Hampshire</option>
                      <option value="new-jersey">New Jersey</option>
                      <option value="new-mexico">New Mexico</option>
                      <option value="new-york">New York</option>
                      <option value="north-carolina">North Carolina</option>
                      <option value="north-dakota">North Dakota</option>
                      <option value="ohio">Ohio</option>
                      <option value="oklahoma">Oklahoma</option>
                      <option value="oregon">Oregon</option>
                      <option value="pennsylvania">Pennsylvania</option>
                      <option value="rhode-island">Rhode Island</option>
                      <option value="south-carolina">South Carolina</option>
                      <option value="south-dakota">South Dakota</option>
                      <option value="tennessee">Tennessee</option>
                      <option value="texas">Texas</option>
                      <option value="utah">Utah</option>
                      <option value="vermont">Vermont</option>
                      <option value="virginia">Virginia</option>
                      <option value="washington">Washington</option>
                      <option value="west-virginia">West Virginia</option>
                      <option value="wisconsin">Wisconsin</option>
                      <option value="wyoming">Wyoming</option>
                    </select>
                  </div>
                  <div className="col">
                    <button type="button" onClick={() => generateKey} className="btn btn-success py-3 px-5 rounded-2 fw-semibold">Generate <FontAwesomeIcon icon={faDownload} /></button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </header><main>
        <div className="container-xxl mb-5">
          <div className="row">
            <div className="col-md-3" id="randomUserDisplaySection">
                <div className="card text-center shadow-lg">
                  <ul className="nav nav-pills flex-column mb-auto sidenav-left">
                    <li className="nav-item">
                      <p className={classIG} onClick={() => onSelectSideNav('IG')}>
                      Identity Generator
                      </p>
                    </li>
                    <li>
                      <p className={classRT} onClick={() => onSelectSideNav('RT')}>
                      Random Text
                      </p>
                    </li>
                    <li>
                      <p className={classFE} onClick={() => onSelectSideNav('FE')}>
                      Fake Email
                      </p>
                    </li>
                    <li>
                      <p className={classFCCG} onClick={() => onSelectSideNav('FCCG')}>
                      Fake Credit Card Generator
                      </p>
                    </li>
                    <li>
                      <p className={classFCCV} onClick={() => onSelectSideNav('FCCV')}>
                      Fake Credit Card Validator
                      </p>
                    </li>
                    <li>
                      <p className={classFDL} onClick={() => onSelectSideNav('FDL')}>
                      Fake Driver's License
                      </p>
                    </li>
                    <li>
                      <p className={classFC} onClick={() => onSelectSideNav('FC')}>
                      Fake Company
                      </p>
                    </li>
                    <li>
                      <p className={classFPN} onClick={() => onSelectSideNav('FPN')}>
                      Fake Phone Number
                      </p>
                    </li>
                    <li>
                      <p className={classFSSN} onClick={() => onSelectSideNav('FSSN')}>
                      Fake Social Security Number
                      </p>
                    </li>
                  </ul>
                </div>
            </div>
            <div className="col-md-9" id="randomUserDisplaySection">
              <div className="card text-center shadow-lg">
                <div className="card-header pt-5 shadow-sm"><img src={profile?.picture.large} className="user-rounded-image img-fluid" id="displayUserPhoto"></img></div>
                {selectSideNavData === 'IG' && (
                  <div className="card-body mb-4 mt-5">
                  <h3 className="card-title pt-2 fs-2" id="displayUserName">Seline Giraud</h3>
                  <table className="table table-bordered mt-4">
                    <tbody className="text-start" id="displayUserInfo">
                      <tr>
                        <td>Fake Name: {profile?.name.title} {profile?.name.first} {profile?.name.last}</td>
                        <td>Random Face:</td>
                      </tr>
                      <tr>
                        <td>Latitude & longitude: {profile?.location.coordinates.latitude}   ;   {profile?.location.coordinates.longitude}</td>
                        <td>Random Avatar:</td>
                      </tr>
                      <tr>
                        <td>Phone: {profile?.phone}</td>
                        <td>QR Code:</td>
                      </tr>
                      <tr>
                        <td>Social Security Number:</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table table-bordered mt-4">
                    <tbody className="text-start" id="displayUserInfo">
                      <tr>
                        <td>Date of Birth: {profile?.dob.date ? format(profile?.dob.date, "MM-dd-yyyy") : ''}</td>
                        <td>Height:</td>
                        <td>Weight:</td>
                      </tr>
                      <tr>
                        <td>Gender:</td>
                        <td>Hair Color:</td>
                        <td>Eye Color:</td>
                      </tr>
                      <tr>
                        <td>Ethnicity:</td>
                        <td>Blood Type:</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <h3>Financial & Banking Numbers</h3>
                  <table className="table table-bordered mt-4">
                    <tbody className="text-start" id="displayUserInfo">
                      <tr>
                        <td>Credit Card Number:</td>
                        <td>Bank:</td>
                      </tr>
                      <tr>
                        <td>Exp Date:</td>
                        <td>Bank Account Number:</td>
                      </tr>
                      <tr>
                        <td>CVV:</td>
                        <td>Routing Number:</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>IBAN:</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3>Internet Details</h3>
                  <table className="table table-bordered mt-4">
                    <tbody className="text-start" id="displayUserInfo">
                      <tr>
                        <td>Username:</td>
                        <td>IP Address (IPv4):</td>
                      </tr>
                      <tr>
                        <td>Password:</td>
                        <td>IP Address (Local):</td>
                      </tr>
                      <tr>
                        <td>Email Address:</td>
                        <td>MAC Address:</td>
                      </tr>
                      <tr>
                        <td>Unique User Identifier (UUID):</td>
                        <td>IP Address (IPv6):</td>
                      </tr>
                      <tr>
                        <td>Website:</td>
                        <td>Random Emoji:</td>
                      </tr>
                      <tr>
                        <td>Color:</td>
                        <td>User Agent:</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3>Education</h3>
                  <table className="table table-bordered mt-4">
                    <tbody className="text-start" id="displayUserInfo">
                      <tr>
                        <td>Education Level:</td>
                        <td>University:</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3>Fake Company & Employee</h3>
                  <table className="table table-bordered mt-4">
                    <tbody className="text-start" id="displayUserInfo">
                      <tr>
                        <td>Fake Company Name:</td>
                        <td>Salary:</td>
                      </tr>
                      <tr>
                        <td>Company Description:</td>
                        <td>Employee Title:</td>
                      </tr>
                      <tr>
                        <td>Company EIN:</td>
                        <td>Company Email:</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                )}
                
                {selectSideNavData === 'RT' && (
                  <div className="card-body mb-4 mt-5">
                  <h3 className="card-title pt-2 fs-2" id="displayUserName">Random Text Generator</h3>
                  <h3 className="card-title pt-2 fs-2" id="displayUserName">Generate Random Text, Lorem Iposm, or HTML</h3>
                  <table className="table table-bordered mt-4">
                    <tbody className="text-start" id="displayUserInfo">
                      <tr>
                        <td>
                          <div className="col">
                            <label className="form-label title-select-top">Language:</label>
                            <select className="form-select" value={selectRTCountry} aria-label="Random" onChange={changeLanguageRT}>
                              <option value="en_US">English</option>
                              <option value="es_ES">Spanish</option>
                              <option value="fr_FR">French</option>
                              <option value="de_DE">German</option>
                              <option value="zh_TW">Chinese</option>
                              <option value="ar_JO">Arabic</option>
                              <option value="zh_TW">Chinese</option>
                              <option value="cs_CZ">Czech</option>
                              <option value="nl_NL">Dutch</option>
                              <option value="fa_IR">Farsi</option>
                              <option value="ka_GE">Georgian</option>
                              <option value="el_GR">Greek (Modern)</option>
                              <option value="hu_HU">Hungarian</option>
                              <option value="it_IT">Italian</option>
                              <option value="ja_JP">Japanese</option>
                              <option value="kk_KZ">Kazakh</option>
                              <option value="ko_KR">Korean</option>
                              <option value="pl_PL">Polish</option>
                              <option value="ro_MD">Romanian</option>
                              <option value="ru_RU">Russian</option>
                              <option value="es_ES">Spanish</option>
                              <option value="uk_UA">Ukrainian</option>
                            </select>
                          </div>
                        </td>
                        <td>
                        <div className="col">
                            <label className="form-label title-select-top">Number of Paragraphs:</label>
                            <select className="form-select" aria-label="Random">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>
                        </td>
                        <td><button type="submit" className="btn btn-primary w-100 mt-0">Generate Text</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                )}
                
                {selectSideNavData === 'FE' && (
                  <div className="card-body mb-4 mt-5">
                  <h3 className="card-title pt-2 fs-2" id="displayUserName">Create List of Fake Emails</h3>
                  <h3 className="card-title pt-2 fs-2" id="displayUserName">Free Email List Generator</h3>
                  <table className="table table-bordered mt-4">
                    <tbody className="text-start" id="displayUserInfo">
                      <tr>
                        <td>
                          <div className="col">
                            <p>Simple Fake Email List Generator. Select how many email addresses you are looking for and click "generate".</p>
                            <label className="form-label title-select-top">Number of Email to Generate</label>
                            <input type="text" className="form-control"></input>
                            <button type="submit" className="btn btn-primary w-100">Generate Emails</button>
                          </div>
                        </td>
                        <td>
                        <div className="col">
                          <textarea className="form-control h-100">orunolfsdottir@gmail.com
                            emerald69@harvey.info
                            tate.schiller@gmail.com
                            jolie.casper@yahoo.com
                            stanley.tremblay@medhurst.com
                            wayne96@hartmann.info
                            pvonrueden@oberbrunner.com
                            wheathcote@morissette.com
                            baylee37@hotmail.com
                            vincent.bernhard@bernhard.com
                          </textarea>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                )}
                
                {selectSideNavData === 'FCCG' && (
                  <div>
                    <h1 className="heading"> Fake Credit Card Generator</h1>
                    <p className="lead">
                      Generating credit card numbers involve a mathematical formula known as the Luhn algorithm or the
                      MOD 10 algorithm.
                    </p>
                    <p className="mb-3">
                      To validate the generated fake credit cards, visit the fake credit card validator <a href="/tools/fake-credit-card-validator">here</a>.
                      Visit our other tools like the <a href="/identity">identity generator</a> that creates fake identities.
                    </p>
                    <h3>What makes a Credit Card Number valid?</h3>
                    <p className="mb-3">
                      A valid credit card is composed of several parts.
                      The first few digits of the credit card number (usually up to six digits) are known as the identification number (IIN) or the bank identification number (BIN).
                      The next two parts are the individual account identification number and a single digit checksum in that order.
                      The single digit checksum is used to validate the credit card number to prevent any errors and is also the resulting number when
                      using the Luhn algorithm.
                    </p>
                    <h3>What are the Fake Credit Cards for?</h3>
                    <p className="mb-5">
                      Developers would use fake credit card generators to generate fake data to test their software or websites.
                      One example that this tool would be useful for is testing the <a href="https://stripe.com/">stripe</a> API.
                    </p>
                    <label className="form-label title-select-top">Choose Card Type:</label>
                    <select className="form-select" aria-label="Random">
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                      <option value="american express">American Express</option>
                      <option value="discover">Discover</option>
                      <option value="jcb">JCB</option>
                    </select>
                    <label className="form-label title-select-top">How many credits cards to generate?</label>
                    <input type="number" className="form-control"></input>
                    <small id="numberGen" className="form-text text-muted">Number from 1 - 50</small>
                    <button type="submit" className="btn btn-primary w-100 mt-0">SUBMIT</button>
                    <h2 className="text-center my-5" id="CCRESULTS">RESULTS</h2>
                  </div>
                )}

                {selectSideNavData === 'FCCV' && (
                  <div>
                    <h1 className="heading"> Fake Credit Card Validator</h1>
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
                                <form>
                                  <input type="hidden" name="_token" value="CLcYhdcTavxNGJWii8V0D4BTsB1ACTUBps14Id5N"></input>
                                  <div className="form-group text-center">
                                      <label>Validate Credit Card Number</label>
                                      <input className="form-control form-control-lg" type="text" placeholder="3458 8306 1287 283"></input>
                                  </div>
                                  <button className="btn btn-primary" id="submit">Submit</button>
                                </form>
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
                )}

                {selectSideNavData === 'FDL' && (
                  <div>
                    <h1 className="heading"> Fake Driver's License</h1>
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
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>
                            <div className="col">
                              <label className="form-label title-select-top">Choose the State of the Driver's License</label>
                              <select className="form-select" aria-label="Random">
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
                              <button type="submit" className="btn btn-primary w-100">Generate Emails</button>
                            </div>
                          </td>
                          <td>
                          <div className="card">
                            <div className="card-header">
                                <h3><span id="license-header">Tennessee Driver's License</span></h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                  <div className="col-md-4">
                                      <img src="https://fauxid.com/img/profiles/male/male30.jpeg" className="rounded img-fluid driverimage"></img>
                                  </div>
                                  <div className="col-md-8">
                                      <h4 id="ID">ID: 072515576</h4>
                                      <h4><span className="firstname">Margaret</span> <span className="lastname">Reinger</span></h4>
                                      <em className="address">526 Feil Village Suite 699, Samantastad, TN 20162</em>
                                      <div className="row mt-3">
                                        <div className="col-md-6">
                                            <small className="DOB">DOB: 02/10/1941</small><br></br>
                                            <small className="Class">Class: B</small><br></br>
                                            <small className="Sex">SEX: F</small><br></br>
                                        </div>
                                        <div className="col-md-6">
                                            <small className="Height">HEIGHT: 5'3"</small><br></br>
                                            <small className="ISS">ISS: 08/10/2020</small><br></br>
                                            <small className="EXP">EXP: 08/10/2025</small><br></br>
                                        </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {selectSideNavData === 'FC' && (
                  <div>
                    <h1 className="heading"> Fake Company Name Generator:
                      <br></br>
                      <span>Helpings Objects Verbs Noun Since 1991™</span>
                    </h1>
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
                                    <select id="country" name="country" className="form-control">
                                      <option value="united-states">United States</option>
                                      <option value="united-kingdom">United Kingdom</option>
                                      <option value="france">France</option>
                                      <option value="germany">Germany</option>
                                      <option value="china">China</option>
                                      <option value="india">India</option>
                                      <option value="">---</option>
                                      <option value="argentina">Argentina</option>
                                      <option value="armenia">Armenia</option>
                                      <option value="bangladesh">Bangladesh</option>
                                      <option value="belgium-french">Belgium</option>
                                      <option value="brazil">Brazil</option>
                                      <option value="canada-french">Canada</option>
                                      <option value="china">China</option>
                                      <option value="croatia">Croatia</option>
                                      <option value="cyprus">Cyprus</option>
                                      <option value="czech-republic">Czech Republic</option>
                                      <option value="denmark">Denmark</option>
                                      <option value="finland">Finland</option>
                                      <option value="france">France</option>
                                      <option value="georgia">Georgia</option>
                                      <option value="germany">Germany</option>
                                      <option value="greece">Greece</option>
                                      <option value="hungary">Hungary</option>
                                      <option value="iceland">Iceland</option>
                                      <option value="indonesia">Indonesia</option>
                                      <option value="iran">Iran</option>
                                      <option value="israel">Israel</option>
                                      <option value="italy">Italy</option>
                                      <option value="japan">Japan</option>
                                      <option value="jordan">Jordan</option>
                                      <option value="kazakhstan">Kazakhstan</option>
                                      <option value="mongolia">Montenegro</option>
                                      <option value="netherlands">Netherlands</option>
                                      <option value="norway">Norway</option>
                                      <option value="peru">Peru</option>
                                      <option value="poland">Poland</option>
                                      <option value="russia">Russian Federation</option>
                                      <option value="saudi-arabia">Saudi Arabia</option>
                                      <option value="slovakia">Slovakia</option>
                                      <option value="south-africa">South Africa</option>
                                      <option value="south-korea">South Korea</option>
                                      <option value="spain">Spain</option>
                                      <option value="sweden">Sweden</option>
                                      <option value="thailand">Thailand</option>
                                      <option value="ukraine">Ukraine</option>
                                      <option value="united-states">United States</option>
                                      <option value="venezuela-spanish">Venezuela</option>
                                    </select>
                                    <small id="countryHelp" className="form-text text-muted">The country where the company is located.</small>
                                </div>
                                <div className="form-group">
                                    <label>Number Fake Companies:</label>
                                    <input type="number" className="form-control" value="10" min="1" max="1000"></input>
                                    <small id="countHelp" className="form-text text-muted">A number between 1 and 1000.</small>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary w-100">
                                      Generate Fake Companies 
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6">
                            </div>
                          </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                          <h2>
                            Fake Netherlands Company Names
                          </h2>
                      </div>
                      <div className="col-md-4">
                          <div className="clearfix mb-2">
                            <button className="btn btn-primary btn float-right download-button mt-md-4 w-100">
                            </button>
                          </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectSideNavData === 'FPN' && (
                  <div className="content">
                    <h1 className="heading"> Fake Phone Number Generator</h1>
                    <p className="lead">
                      A phone number consists of the country calling code, area code, and a few more numbers which helps provide an exact address
                      for connecting the phone call with a specific phone line.
                    </p>
                    <p className="mb-3">
                      The country code is the first number you dial to reach anyone from
                      another country, and it is not necessary to dial the country code if the person you are trying to reach is in the same country. The
                      area code is the next group of numbers to dial, and it is for a more specific but large geographical region. Large cities usually have multiple area codes.
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                          <div className="card">
                            <div className="card-body">
                                <form>
                                  <div className="form-group">
                                      <label className="mr-1">Choose Country Calling Code</label>
                                      <select className="form-control" id="countryCode" name="countryCode">
                                        <option value="nocountrycode">No country code</option>
                                        <option value="93">(+93) Afghanistan</option>
                                        <option value="358">(+358) Aland Islands</option>
                                        <option value="355">(+355) Albania</option>
                                        <option value="213">(+213) Algeria</option>
                                        <option value="1">(+1) American Samoa</option>
                                        <option value="376">(+376) Andorra</option>
                                        <option value="244">(+244) Angola</option>
                                        <option value="1">(+1) Anguilla</option>
                                        <option value="1">(+1) Antigua and Barbuda</option>
                                        <option value="54">(+54) Argentina</option>
                                        <option value="374">(+374) Armenia</option>
                                        <option value="297">(+297) Aruba</option>
                                        <option value="61">(+61) Australia</option>
                                        <option value="43">(+43) Austria</option>
                                        <option value="994">(+994) Azerbaijan</option>
                                        <option value="1">(+1) Bahamas</option>
                                        <option value="973">(+973) Bahrain</option>
                                        <option value="880">(+880) Bangladesh</option>
                                        <option value="1">(+1) Barbados</option>
                                        <option value="375">(+375) Belarus</option>
                                        <option value="32">(+32) Belgium</option>
                                        <option value="501">(+501) Belize</option>
                                        <option value="229">(+229) Benin</option>
                                        <option value="1">(+1) Bermuda</option>
                                        <option value="975">(+975) Bhutan</option>
                                        <option value="591">(+591) Bolivia</option>
                                        <option value="387">(+387) Bosnia and Herzegovina</option>
                                        <option value="267">(+267) Botswana</option>
                                        <option value="55">(+55) Brazil</option>
                                        <option value="673">(+673) Brunei Darussalam</option>
                                        <option value="359">(+359) Bulgaria</option>
                                        <option value="226">(+226) Burkina Faso</option>
                                        <option value="257">(+257) Burundi</option>
                                        <option value="855">(+855) Cambodia</option>
                                        <option value="237">(+237) Cameroon</option>
                                        <option value="1">(+1) Canada</option>
                                        <option value="238">(+238) Cape Verde</option>
                                        <option value="1">(+1) Cayman Islands</option>
                                        <option value="236">(+236) Central Africa</option>
                                        <option value="235">(+235) Chad</option>
                                        <option value="56">(+56) Chile</option>
                                        <option value="86">(+86) China</option>
                                        <option value="57">(+57) Colombia</option>
                                        <option value="269">(+269) Comoros</option>
                                        <option value="242">(+242) Congo</option>
                                        <option value="243">(+243) Congo</option>
                                        <option value="682">(+682) Cook Islands</option>
                                        <option value="506">(+506) Costa Rica</option>
                                        <option value="225">(+225) Cote d'Ivoire</option>
                                        <option value="385">(+385) Croatia</option>
                                        <option value="53">(+53) Cuba</option>
                                        <option value="599">(+599) Curacao</option>
                                        <option value="357">(+357) Cyprus</option>
                                        <option value="420">(+420) Czech Republic</option>
                                        <option value="45">(+45) Denmark</option>
                                        <option value="253">(+253) Djibouti</option>
                                        <option value="1">(+1) Dominica</option>
                                        <option value="1">(+1) Dominican Republic</option>
                                        <option value="593">(+593) Ecuador</option>
                                        <option value="20">(+20) Egypt</option>
                                        <option value="503">(+503) El Salvador</option>
                                        <option value="240">(+240) Equatorial Guinea</option>
                                        <option value="291">(+291) Eritrea</option>
                                        <option value="372">(+372) Estonia</option>
                                        <option value="251">(+251) Ethiopia</option>
                                        <option value="500">(+500) Falkland Islands</option>
                                        <option value="298">(+298) Faroe Islands</option>
                                        <option value="679">(+679) Fiji</option>
                                        <option value="358">(+358) Finland</option>
                                        <option value="33">(+33) France</option>
                                        <option value="689">(+689) French Polynesia</option>
                                        <option value="241">(+241) Gabon</option>
                                        <option value="220">(+220) Gambia</option>
                                        <option value="995">(+995) Georgia</option>
                                        <option value="49">(+49) Germany</option>
                                        <option value="233">(+233) Ghana</option>
                                        <option value="350">(+350) Gibraltar</option>
                                        <option value="30">(+30) Greece</option>
                                        <option value="299">(+299) Greenland</option>
                                        <option value="1">(+1) Grenada</option>
                                        <option value="1">(+1) Guam</option>
                                        <option value="502">(+502) Guatemala</option>
                                        <option value="44">(+44) Guernsey</option>
                                        <option value="224">(+224) Guinea</option>
                                        <option value="245">(+245) Guinea-Bissau</option>
                                        <option value="592">(+592) Guyana</option>
                                        <option value="509">(+509) Haiti</option>
                                        <option value="39">(+39) Holy See</option>
                                        <option value="504">(+504) Honduras</option>
                                        <option value="852">(+852) Hong Kong</option>
                                        <option value="36">(+36) Hungary</option>
                                        <option value="354">(+354) Iceland</option>
                                        <option value="91">(+91) India</option>
                                        <option value="62">(+62) Indonesia</option>
                                        <option value="98">(+98) Iran</option>
                                        <option value="964">(+964) Iraq</option>
                                        <option value="353">(+353) Ireland</option>
                                        <option value="44">(+44) Isle of Man</option>
                                        <option value="972">(+972) Israel</option>
                                        <option value="39">(+39) Italy</option>
                                        <option value="1">(+1) Jamaica</option>
                                        <option value="81">(+81) Japan</option>
                                        <option value="44">(+44) Jersey</option>
                                        <option value="962">(+962) Jordan</option>
                                        <option value="7">(+7) Kazakhstan</option>
                                        <option value="254">(+254) Kenya</option>
                                        <option value="686">(+686) Kiribati</option>
                                        <option value="850">(+850) North Korea</option>
                                        <option value="82">(+82) South Korea</option>
                                        <option value="965">(+965) Kuwait</option>
                                        <option value="996">(+996) Kyrgyzstan</option>
                                        <option value="856">(+856) Lao</option>
                                        <option value="371">(+371) Latvia</option>
                                        <option value="961">(+961) Lebanon</option>
                                        <option value="266">(+266) Lesotho</option>
                                        <option value="231">(+231) Liberia</option>
                                        <option value="218">(+218) Libya</option>
                                        <option value="423">(+423) Liechtenstein</option>
                                        <option value="370">(+370) Lithuania</option>
                                        <option value="352">(+352) Luxembourg</option>
                                        <option value="853">(+853) Macao</option>
                                        <option value="389">(+389) Macedonia</option>
                                        <option value="261">(+261) Madagascar</option>
                                        <option value="265">(+265) Malawi</option>
                                        <option value="60">(+60) Malaysia</option>
                                        <option value="960">(+960) Maldives</option>
                                        <option value="223">(+223) Mali</option>
                                        <option value="356">(+356) Malta</option>
                                        <option value="692">(+692) Marshall Islands</option>
                                        <option value="596">(+596) Martinique</option>
                                        <option value="222">(+222) Mauritania</option>
                                        <option value="230">(+230) Mauritius</option>
                                        <option value="262">(+262) Mayotte</option>
                                        <option value="52">(+52) Mexico</option>
                                        <option value="691">(+691) Micronesia</option>
                                        <option value="373">(+373) Moldova</option>
                                        <option value="377">(+377) Monaco</option>
                                        <option value="976">(+976) Mongolia</option>
                                        <option value="382">(+382) Montenegro</option>
                                        <option value="1">(+1) Montserrat</option>
                                        <option value="212">(+212) Morocco</option>
                                        <option value="258">(+258) Mozambique</option>
                                        <option value="95">(+95) Myanmar</option>
                                        <option value="264">(+264) Namibia</option>
                                        <option value="674">(+674) Nauru</option>
                                        <option value="977">(+977) Nepal</option>
                                        <option value="31">(+31) Netherlands</option>
                                        <option value="687">(+687) New Caledonia</option>
                                        <option value="64">(+64) New Zealand</option>
                                        <option value="505">(+505) Nicaragua</option>
                                        <option value="227">(+227) Niger</option>
                                        <option value="234">(+234) Nigeria</option>
                                        <option value="683">(+683) Niue</option>
                                        <option value="672">(+672) Norfolk Island</option>
                                        <option value="1">(+1) Northern Mariana Islands</option>
                                        <option value="47">(+47) Norway</option>
                                        <option value="968">(+968) Oman</option>
                                        <option value="92">(+92) Pakistan</option>
                                        <option value="680">(+680) Palau</option>
                                        <option value="970">(+970) Palestine</option>
                                        <option value="507">(+507) Panama</option>
                                        <option value="675">(+675) Papua New Guinea</option>
                                        <option value="595">(+595) Paraguay</option>
                                        <option value="51">(+51) Peru</option>
                                        <option value="63">(+63) Philippines</option>
                                        <option value="48">(+48) Poland</option>
                                        <option value="351">(+351) Portugal</option>
                                        <option value="1">(+1) Puerto Rico</option>
                                        <option value="974">(+974) Qatar</option>
                                        <option value="40">(+40) Romania</option>
                                        <option value="7">(+7) Russian Federation</option>
                                        <option value="250">(+250) Rwanda</option>
                                        <option value="590">(+590) Saint Barthelemy</option>
                                        <option value="290">(+290) Saint Helena</option>
                                        <option value="1">(+1) Saint Kitts and Nevis</option>
                                        <option value="1">(+1) Saint Lucia</option>
                                        <option value="590">(+590) Saint Martin</option>
                                        <option value="1">(+1) Saint Vincent and the Grenadines</option>
                                        <option value="685">(+685) Samoa</option>
                                        <option value="378">(+378) San Marino</option>
                                        <option value="239">(+239) Sao Tome and Principe</option>
                                        <option value="966">(+966) Saudi Arabia</option>
                                        <option value="221">(+221) Senegal</option>
                                        <option value="381">(+381) Serbia</option>
                                        <option value="248">(+248) Seychelles</option>
                                        <option value="232">(+232) Sierra Leone</option>
                                        <option value="65">(+65) Singapore</option>
                                        <option value="421">(+421) Slovakia</option>
                                        <option value="386">(+386) Slovenia</option>
                                        <option value="677">(+677) Solomon Islands</option>
                                        <option value="252">(+252) Somalia</option>
                                        <option value="27">(+27) South Africa</option>
                                        <option value="211">(+211) South Sudan</option>
                                        <option value="34">(+34) Spain</option>
                                        <option value="94">(+94) Sri Lanka</option>
                                        <option value="249">(+249) Sudan</option>
                                        <option value="597">(+597) Suriname</option>
                                        <option value="268">(+268) Swaziland</option>
                                        <option value="46">(+46) Sweden</option>
                                        <option value="41">(+41) Switzerland</option>
                                        <option value="963">(+963) Syria</option>
                                        <option value="886">(+886) Taiwan</option>
                                        <option value="992">(+992) Tajikistan</option>
                                        <option value="255">(+255) Tanzania</option>
                                        <option value="66">(+66) Thailand</option>
                                        <option value="670">(+670) Timor-Leste</option>
                                        <option value="228">(+228) Togo</option>
                                        <option value="690">(+690) Tokelau</option>
                                        <option value="676">(+676) Tonga</option>
                                        <option value="1">(+1) Trinidad and Tobago</option>
                                        <option value="216">(+216) Tunisia</option>
                                        <option value="90">(+90) Turkey</option>
                                        <option value="993">(+993) Turkmenistan</option>
                                        <option value="1">(+1) Turks and Caicos Islands</option>
                                        <option value="688">(+688) Tuvalu</option>
                                        <option value="256">(+256) Uganda</option>
                                        <option value="380">(+380) Ukraine</option>
                                        <option value="971">(+971) United Arab Emirates</option>
                                        <option value="44">(+44) United Kingdom</option>
                                        <option value="1">(+1) United States</option>
                                        <option value="598">(+598) Uruguay</option>
                                        <option value="998">(+998) Uzbekistan</option>
                                        <option value="678">(+678) Vanuatu</option>
                                        <option value="58">(+58) Venezuela</option>
                                        <option value="84">(+84) Viet Nam</option>
                                        <option value="1">(+1) British Virgin Islands</option>
                                        <option value="1">(+1) US Virgin Islands</option>
                                        <option value="681">(+681) Wallis and Futuna</option>
                                        <option value="212">(+212) Western Sahara</option>
                                        <option value="967">(+967) Yemen</option>
                                        <option value="260">(+260) Zambia</option>
                                        <option value="263">(+263) Zimbabwe</option>
                                      </select>
                                  </div>
                                  <div className="form-group">
                                      <label className="mr-1">Format Type <span className="required"></span></label>
                                      <input type="text" className="form-control" id="formatType" name="formatType" value="(###) ###-####"></input>
                                      <small className="form-text text-muted">Ex: (#####) ### #### or 570-###-###</small>
                                  </div>
                                  <div className="form-group">
                                      <label>Area Code <small className="text-muted">(optional)</small></label>
                                      <input type="text" className="form-control" id="areaCode" name="areaCode" placeholder="Ex: 301, 240, or 570"></input>
                                  </div>
                                  <div className="form-group">
                                      <label>How many phone numbers to generate?</label>
                                      <input type="number" className="form-control" id="quantityPhone" name="quantityPhone" min="1" max="1000" value="10"></input>
                                      <small id="numbermuted" className="form-text text-muted">Number from 1 - 1000</small>
                                  </div>
                                  <a href="#" className="btn btn-primary" id="submit">Generate Phone Numbers</a>
                                </form>
                            </div>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <textarea className="form-control h-100 phonelist">
                          +84 (1380) 7497 950
                          +84 (2158) 6502 377
                          +84 (7016) 5160 424
                          +84 (5224) 2559 685
                          +84 (3637) 6751 849
                          +84 (1099) 3164 452
                          +84 (7764) 9331 997
                          +84 (8484) 3557 415
                          +84 (7730) 7359 670
                          </textarea>
                      </div>
                    </div>
                  </div>
                )}

                {selectSideNavData === 'FSSN' && (
                  <div>
                    <h1 className="heading"> Social Security Number Generator</h1>
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
                                  <select className="form-control">
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
                                  <input type="number" className="form-control" placeholder="Leave blank for random year" name="year" min="1936" max="2011"></input>
                                  <small id="yearHelp" className="form-text text-muted">Between 1936 and 2011</small>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                            <div className="col-md-6 text-center">
                                <h3 className="mb-4">Results:</h3>
                                <p className="lead"><big><b>527-48-XXXX</b></big></p>
                                <p><b>State:</b> Arizona </p>
                                <p><b>Year:</b>
                                  1972
                                </p>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main><footer className="bg-dark py-5">
        <p className="text-white text-center mb-0">Copyright @ 2022. All Right Reserved Developed by Azhar Anowar</p>
      </footer><div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="copiedToClipboardToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto text-success"><i className="fa-regular fa-clipboard me-2"></i>Copied to clipboard!</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body text-secondary fw-normal" id="copiedToClipboardMessage">
          </div>
        </div>
      </div></>
  );
}
