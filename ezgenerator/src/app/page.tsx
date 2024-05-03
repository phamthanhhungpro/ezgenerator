'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { SetStateAction, useEffect, useState } from "react";
import { format } from 'date-fns';
import RandomText from './page/random-text';
import FakeMail from './page/fake-mail';
import FakeCreditCardGenerator from "./page/fake-credit-card-generator";
import FakeCreditCardValidator from "./page/fake-credit-card-validator";
import FakeDriverLicense from "./page/fake-diver-license";
import FakeCompany from "./page/fake-company";
import FakePhoneNumber from "./page/fake-phone-number";
import FakeSocialSecurityNumber from "./page/fake-social-security-number";
import axios from "axios";

export interface Profile {
  results: Result[]
  info: Info
  moreData: MoreData
}

export interface Result {
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
  date: string
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

export interface Info {
  seed: string
  results: number
  page: number
  version: string
}

export interface MoreData {
  height: number
  weight: number
  bloodType: string
  ethnicity: string
  hairColor: string
  bankName: string
  bankNumber: string
  routingNumber: string
  iban: string
  email: string
  username: string
  domainName: string
  domainWord: string
  urlWithQueryParams: string
  ipAddress: string
  ipv6Address: string
  macAddress: string
  websiteUrl: string
  userAgent: string
  degree: string
  school: string
  companyName: string
  companyDescription: string
  ein: number
  jobTitle: string
  salary: number
}


export default function Home() {
  let data: any = null;
  const [profile, setProfile] = useState<Profile>();

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

  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('us');
  const [state, setState] = useState('');
  const [selectSideNavData, setSelectSideNavData] = useState('IG');
  
  const [imageSrc, setImageSrc] = useState('');

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Credentials": "true"
    }
  };

  useEffect(() => {
    generateKey();
  }, []);
  
  async function downloadImage(imageUrl: string) {
    try {
      const response = await fetch(imageUrl, { 
        mode: 'cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "content-type",
          "Access-Control-Allow-Credentials": "true"
        }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } else {
        console.error('Error downloading image:', response.status);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }
  
  async function generateKey() {
    const res = await fetch(`http://localhost:3000/api/random-user/?gender=${gender}&nat=${country}`, {method: 'GET'});
    const dataFetch = await res.json();
    setProfile(dataFetch);
  }

  function changeGender(event: any) {
    setGender(event.target.value);
  }

  function changeAge(event: any) {
    setAge(event.target.value);
  }

  function changeCountry(event: any) {
    setCountry(event.target.value);
  }

  function changeState(event: any) {
    setState(event.target.value);
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
                    <select value={gender} onChange={changeGender} className="form-select" aria-label="Random">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col">
                    <label className="form-label title-select-top">Age</label>
                    <select value={age} onChange={changeAge} className="form-select" aria-label="Random">
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
                    <select value={country} onChange={changeCountry} className="form-select" aria-label="Random">
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
                  </div>
                  <div className="col">
                    <label className="form-label title-select-top">State</label>
                    <select value={state} onChange={changeState} className="form-select" aria-label="Random">
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
                    <button type="button" onClick={generateKey} className="btn btn-success py-3 px-5 rounded-2 fw-semibold">Generate <FontAwesomeIcon icon={faDownload} /></button>
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
              <div className="card shadow-lg">
                {selectSideNavData === 'IG' && (
                    <><div className="card-header pt-5 shadow-sm text-center"><img src={profile?.results[0].picture.large} className="user-rounded-image img-fluid" id="displayUserPhoto"></img></div><div className="card-body mb-4 mt-5">
                    <h3 className="card-title pt-2 fs-</div>2 text-center" >{profile?.results[0].name.title} {profile?.results[0].name.first} {profile?.results[0].name.last}</h3>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>Fake Name: {profile?.results[0].name.title} {profile?.results[0].name.first} {profile?.results[0].name.last}</td>
                          <td>Random Face:</td>
                        </tr>
                        <tr>
                          <td>Latitude & longitude: {profile?.results[0].location.coordinates.latitude}   ;   {profile?.results[0].location.coordinates.longitude}</td>
                          <td>Random Avatar: <span className="aclass" onClick={() => downloadImage(profile?.results[0].picture.large ?? '')}> Download image <FontAwesomeIcon icon={faDownload} /></span></td>
                        </tr>
                        <tr>
                          <td>Phone: {profile?.results[0].phone}</td>
                          <td>QR Code:</td>
                        </tr>
                        <tr>
                          <td>Social Security Number: {profile?.results[0].id.value}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>Date of Birth: {profile?.results[0].dob.date ? format(profile?.results[0].dob.date, "MM-dd-yyyy") : ''}</td>
                          <td>Height: {profile?.moreData.height}</td>
                          <td>Weight: {profile?.moreData.weight}</td>
                        </tr>
                        <tr>
                          <td>Gender: {profile?.results[0].gender}</td>
                          <td>Hair Color: {profile?.moreData.hairColor}</td>
                          <td>Eye Color: {profile?.moreData.ethnicity}</td>
                        </tr>
                        <tr>
                          <td>Ethnicity:{profile?.moreData.ethnicity}</td>
                          <td>Blood Type: {profile?.moreData.weight}</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                    <h3>Financial & Banking Numbers</h3>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>Credit Card Number:</td>
                          <td>Bank: {profile?.moreData.bankName}</td>
                        </tr>
                        <tr>
                          <td>Exp Date:</td>
                          <td>Bank Account Number: {profile?.moreData.bankNumber}</td>
                        </tr>
                        <tr>
                          <td>CVV:</td>
                          <td>Routing Number: {profile?.moreData.routingNumber}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>IBAN: {profile?.moreData.iban}</td>
                        </tr>
                      </tbody>
                    </table>
                    <h3>Internet Details</h3>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>Username: {profile?.moreData.username}</td>
                          <td>IP Address (IPv4): {profile?.moreData.ipAddress}</td>
                        </tr>
                        <tr>
                          <td>Password: {profile?.results[0].login.password}</td>
                          <td>IP Address (Local): {profile?.moreData.ipv6Address}</td>
                        </tr>
                        <tr>
                          <td>Email Address: {profile?.results[0].email}</td>
                          <td>MAC Address: {profile?.moreData.macAddress}</td>
                        </tr>
                        <tr>
                          <td>Unique User Identifier (UUID):</td>
                          <td>IP Address (IPv6):{profile?.moreData.ipv6Address}</td>
                        </tr>
                        <tr>
                          <td>Website: {profile?.moreData.websiteUrl}</td>
                          <td>Random Emoji:</td>
                        </tr>
                        <tr>
                          <td>Color: {profile?.moreData.hairColor}</td>
                          <td>User Agent: {profile?.moreData.userAgent}</td>
                        </tr>
                      </tbody>
                    </table>
                    <h3>Education</h3>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>Education Level: {profile?.moreData.degree}</td>
                          <td>University: {profile?.moreData.school}</td>
                        </tr>
                      </tbody>
                    </table>
                    <h3>Fake Company & Employee</h3>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>Fake Company Name: {profile?.moreData.companyName}</td>
                          <td>Salary: {profile?.moreData.salary}</td>
                        </tr>
                        <tr>
                          <td>Company Description: {profile?.moreData.companyDescription}</td>
                          <td>Employee Title:</td>
                        </tr>
                        <tr>
                          <td>Company EIN: {profile?.moreData.ein}</td>
                          <td>Company Email: {profile?.moreData.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div></>
                )}
                
                {selectSideNavData === 'RT' && (
                  <RandomText/>
                )}
                
                {selectSideNavData === 'FE' && (
                  <FakeMail/>
                )}
                
                {selectSideNavData === 'FCCG' && (
                  <FakeCreditCardGenerator/>
                )}

                {selectSideNavData === 'FCCV' && (
                  <FakeCreditCardValidator/>
                )}

                {selectSideNavData === 'FDL' && (
                  <FakeDriverLicense/>
                )}

                {selectSideNavData === 'FC' && (
                  <FakeCompany/>
                )}

                {selectSideNavData === 'FPN' && (
                  <FakePhoneNumber/>
                )}

                {selectSideNavData === 'FSSN' && (
                  <FakeSocialSecurityNumber/>
                )}
              </div>
            </div>
          </div>
        </div>
      </main><footer className="bg-dark py-5">
        <p className="text-white text-center mb-0">Copyright @ 2022. All Right Reserved Developed by Nam Nguyen</p>
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
