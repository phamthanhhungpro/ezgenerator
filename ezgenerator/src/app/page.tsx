'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
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

  async function generateKey() {
    const res = await fetch('http://localhost:3000/api/random-user/?nat=au&gender=male', {method: 'GET'});
    const dataFetch = await res.json();
    data = dataFetch.results[0];
    setProfile(data);
    console.log(data, 'data');
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
                            <select className="form-select" aria-label="Random">
                              <option value="en_US">English</option>
                              <option value="es_ES">Spanish</option>
                              <option value="fr_FR">French</option>
                              <option value="de_DE">German</option>
                              <option value="zh_TW">Chinese</option>
                              <option value="">---</option>
                              <option value="ar_JO">Arabic</option>
                              <option value="zh_TW">Chinese</option>
                              <option value="cs_CZ">Czech</option>
                              <option value="nl_NL">Dutch</option>
                              <option value="en_US">English</option>
                              <option value="fa_IR">Farsi</option>
                              <option value="fr_FR">French</option>
                              <option value="ka_GE">Georgian</option>
                              <option value="de_DE">German</option>
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
