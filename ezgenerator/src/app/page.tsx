'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCopy, faBitcoinSign, faCodeFork, faBank, faCreditCard, faCalendarDay, faCalendarDays, faPhone } from "@fortawesome/free-solid-svg-icons";
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
import { faBitcoin, faEthereum, faMonero } from "@fortawesome/free-brands-svg-icons";

export interface Profile {
  results: Result[]
  info: Info
  moreData: MoreData
  cryptoAddress: CryptoAddress
}

export interface Result {
  addressVN: addressVN
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

export interface addressVN {
  city: string
  country: string
  district: string
  street: string
  ward: string
  zipCode: string
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
  salaryPerHour: number
  creditcard: Creditcard[]
}

export interface Creditcard {
  cardholderName: string
  cardType: string
  cardNumber: string[]
  cvv: string
  expirationDate: string
}

export interface CryptoAddress {
  btcAddress: string
  ethAddress: string
  rippleAddress: string
  morenoAddress: string
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
  const [age, setAge] = useState('1-90');
  const [country, setCountry] = useState('us');
  const [state, setState] = useState('');
  const [selectSideNavData, setSelectSideNavData] = useState('IG');

  const [vnShow, setVNShow] = useState(false);

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
      const response = await axios.get('https://randominfor.com/api/download', {
          params: {
              imageUrl: imageUrl,
              imageName: 'downloaded_image.jpg'
          },
          responseType: 'blob' // Set responseType to 'blob' to receive binary data
      });

      // Create a blob from the response data
      const blob = new Blob([response.data]);

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement('a');
      link.href = url;
      link.download = 'downloaded_image.jpg'; // Specify the filename

      // Trigger a click event on the anchor element
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the temporary URL to free up memory
      window.URL.revokeObjectURL(url);

  } catch (error) {
      console.error('Error downloading image:', error);
      // Handle error
  }
  }

  function handleCopy(text: string) {
    console.log("Copying text to clipboard:", text);
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
      });
  }

  async function generateKey() {
    if (country === 'vi') {
      setVNShow(true);
    } else {
      setVNShow(false);
    }
    const res = await fetch(`https://randominfor.com/api/random-user/?gender=${gender}&nat=${country}&ageRange=${age}`, { method: 'GET' });
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
    switch (type) {
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
            <p className="fw-lighter"><a className="taga" href="">randominfor.com</a> is a free tool to generate full fake identities with random First and Last Name, Address, Social Security Number, Credit Card, Phone Number, and more!</p>
            <p className="fw-lighter">Protect your privacy by only using your true identity when absolutely necessary.</p>
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
                    <option value="1-90">Random</option>
                    <option value="18-24">18 to 24</option>
                    <option value="25-34">25 to 34</option>
                    <option value="35-44">35 to 44</option>
                    <option value="45-54">45 to 54</option>
                    <option value="55-64">55 to 64</option>
                    <option value="65-90">65+</option>
                  </select>
                </div>
                <div className="col">
                  <label className="form-label title-select-top">Country</label>
                  <select value={country} onChange={changeCountry} className="form-select" aria-label="Random">
                    <option value="vi">Viet Nam</option>
                    <option value="au">Australia</option>
                    <option value="br">Brazil</option>
                    <option value="ca">Canada</option>
                    <option value="ch">Switzerland</option>
                    <option value="de">Germany</option>
                    <option value="dk">Denmark</option>
                    <option value="es">Spain </option>
                    <option value="fl">Finland</option>
                    <option value="fr">France </option>
                    <option value="gb">United Kingdom</option>
                    <option value="ie">Ireland</option>
                    <option value="in">India</option>
                    <option value="ir">Iran</option>
                    <option value="mx">Mexico </option>
                    <option value="nl">Netherlands </option>
                    <option value="no">Norway</option>
                    <option value="nz">New Zealand</option>
                    <option value="rs">Serbia </option>
                    <option value="tr">Turkey</option>
                    <option value="ua">Ukraine</option>
                    <option value="us">United States</option>
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
          <div className="row" id="randomUserDisplaySection">
            <div className="col-xs-12 col-md-3">
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
            <div className="col-xs-12 col-md-9">
              <div className="card shadow-lg">
                {selectSideNavData === 'IG' && (
                  <><div className="card-header pt-5 shadow-sm text-center"><img src={profile?.results[0].picture.large} className="user-rounded-image img-fluid" id="displayUserPhoto"></img></div><div className="card-body mb-4 mt-5">
                    <h3 className="card-title pt-2 fs-</div>2 text-center" ><span className="aclass" onClick={() => handleCopy(`${!vnShow ? profile?.results[0].name.title : ''} ${profile?.results[0].name.first} ${profile?.results[0].name.last}`)}>
                        {!vnShow ? profile?.results[0].name.title : ''} {profile?.results[0].name.first} {profile?.results[0].name.last}
                              <span className="iconCopyHiddenTitle"><FontAwesomeIcon icon={faCopy} /></span>
                            </span></h3>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>
                            <span className="titleField"> Fake Name: </span>
                            <span className="aclass" onClick={() => handleCopy(`${!vnShow ? profile?.results[0].name.title : ''} ${profile?.results[0].name.first} ${profile?.results[0].name.last}`)}>
                            {!vnShow ? profile?.results[0].name.title : ''} {profile?.results[0].name.first} {profile?.results[0].name.last}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Random Face:</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Latitude & longitude:</span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.results[0].location.coordinates.latitude},${profile?.results[0].location.coordinates.longitude}`)}>
                              {profile?.results[0].location.coordinates.latitude} , {profile?.results[0].location.coordinates.longitude}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Random Avatar: </span>
                            <span className="aDownloadclass" onClick={() => downloadImage(profile?.results[0].picture.large ?? '')}> Download image <FontAwesomeIcon icon={faDownload} /></span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"><FontAwesomeIcon icon={faPhone} /> Phone: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.results[0].phone}`)}>
                              {profile?.results[0].phone}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> QR Code:</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Social Security Number: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.results[0].id.value}`)}>
                              {profile?.results[0].id.value}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Address:</span>
                            {vnShow && (
                              <span className="aclass" onClick={() => handleCopy(`${profile?.results[0].addressVN?.street}, ${profile?.results[0].addressVN?.ward}, ${profile?.results[0].addressVN?.district}, ${profile?.results[0].addressVN?.city}, ${profile?.results[0].addressVN?.country}`)}>
                                {profile?.results[0].addressVN?.street}, {profile?.results[0].addressVN?.ward}, {profile?.results[0].addressVN?.district}, {profile?.results[0].addressVN?.city}, {profile?.results[0].addressVN?.country}
                                <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                              </span>
                            
                            )}
                            {!vnShow && (
                              <span className="aclass" onClick={() => handleCopy(`${profile?.results[0].location.street.number} ${profile?.results[0].location.street.name}, ${profile?.results[0].location.city}, ${profile?.results[0].location.state}, ${profile?.results[0].location.country}`)}>
                            {profile?.results[0].location.street.number} {profile?.results[0].location.street.name}, {profile?.results[0].location.city}, {profile?.results[0].location.state}, {profile?.results[0].location.country}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                            )}
                            
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>
                            <span className="titleField"><FontAwesomeIcon icon={faCalendarDays} /> Date of Birth: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.results[0].dob.date ? format(profile?.results[0].dob.date, "MM-dd-yyyy") : ''}`)}>
                              {profile?.results[0].dob.date ? format(profile?.results[0].dob.date, "MM-dd-yyyy") : ''}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Height: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.height}`)}>
                              {profile?.moreData.height}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Weight: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.weight}`)}>
                              {profile?.moreData.weight}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Gender: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.results[0].gender}`)}>
                              {profile?.results[0].gender}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Hair Color: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.hairColor}`)}>
                              {profile?.moreData.hairColor}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Eye Color: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.ethnicity}`)}>
                              {profile?.moreData.ethnicity}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Ethnicity:</span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.ethnicity}`)}>
                              {profile?.moreData.ethnicity}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Blood Type: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.bloodType}`)}>
                              {profile?.moreData.bloodType}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                    <h3 className="titleFeature">Financial & Banking Numbers</h3>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>
                            <span className="titleField"><FontAwesomeIcon icon={faCreditCard} /> Credit Card Number:</span>
                              <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.creditcard[0].cardNumber}`)}>
                                {profile?.moreData.creditcard[0].cardNumber}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"><FontAwesomeIcon icon={faBank} /> Bank: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.bankName}`)}>
                              {profile?.moreData.bankName}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Exp Date:</span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.creditcard[0].expirationDate}`)}>
                              {profile?.moreData.creditcard[0].expirationDate}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Bank Account Number: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.bankNumber}`)}>
                              {profile?.moreData.bankNumber}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> CVV:</span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.creditcard[0].cvv}`)}>
                              {profile?.moreData.creditcard[0].cvv}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Routing Number: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.routingNumber}`)}>
                              {profile?.moreData.routingNumber}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Type Card:</span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.creditcard[0].cardType}`)}>
                              {profile?.moreData.creditcard[0].cardType}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> IBAN: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.iban}`)}>
                              {profile?.moreData.iban}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h3 className="titleFeature">Cryptocurrency Addresses</h3>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>
                            <span className="titleField"><FontAwesomeIcon icon={faBitcoin} /> Bitcoin Address:</span>
                              <span className="aclass" onClick={() => handleCopy(`${profile?.cryptoAddress.btcAddress}`)}>
                                {profile?.cryptoAddress.btcAddress}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"><FontAwesomeIcon icon={faEthereum} /> Ethereum Address: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.cryptoAddress.ethAddress}`)}>
                              {profile?.cryptoAddress.ethAddress}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"><FontAwesomeIcon icon={faCodeFork} /> Ripple Address:</span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.cryptoAddress.rippleAddress}`)}>
                              {profile?.cryptoAddress.rippleAddress}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"><FontAwesomeIcon icon={faMonero} /> Monero Address: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.cryptoAddress.morenoAddress}`)}>
                              {profile?.cryptoAddress.morenoAddress}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h3 className="titleFeature">Internet Details</h3>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>
                            <span className="titleField"> Username: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.username}`)}>
                              {profile?.moreData.username}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> IP Address (IPv4): </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.ipAddress}`)}>
                              {profile?.moreData.ipAddress}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Password: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.results[0].login.password}`)}>
                              {profile?.results[0].login.password}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> IP Address (Local): </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.ipv6Address}`)}>
                              {profile?.moreData.ipv6Address}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Email Address: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.results[0].email}`)}>
                              {profile?.results[0].email}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> MAC Address: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.macAddress}`)}>
                              {profile?.moreData.macAddress}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Unique User Identifier (UUID):</span>
                          </td>
                          <td>
                            <span className="titleField"> IP Address (IPv6):</span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.ipv6Address}`)}>
                              {profile?.moreData.ipv6Address}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Website: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.websiteUrl}`)}>
                              {profile?.moreData.websiteUrl}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Random Emoji:</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Color: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.hairColor}`)}>
                              {profile?.moreData.hairColor}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                            <div style={{ backgroundColor: `${profile?.moreData.hairColor}`, width: "20px", height: "20px", marginLeft: "10px", display: "inline-block" }}></div>
                          </td>
                          <td>
                            <span className="titleField"> User Agent: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.userAgent}`)}>
                              {profile?.moreData.userAgent}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h3 className="titleFeature">Education</h3>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>
                            <span className="titleField"> Education Level: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.degree}`)}>
                              {profile?.moreData.degree}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> University: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.school}`)}>
                              {profile?.moreData.school}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h3 className="titleFeature">Fake Company & Employee</h3>
                    <table className="table table-bordered mt-4">
                      <tbody className="text-start" id="displayUserInfo">
                        <tr>
                          <td>
                            <span className="titleField"> Fake Company Name: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.companyName}`)}>
                              {profile?.moreData.companyName}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Salary: </span>
                            <br></br>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.salary}`)}>
                              $ {profile?.moreData.salary} per year
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                            <br></br>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.salaryPerHour}`)}>
                              $ {profile?.moreData.salaryPerHour} per hour
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Company Description: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.companyDescription}`)}>
                              {profile?.moreData.companyDescription}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField">Employee Title: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.jobTitle}`)}>
                              {profile?.moreData.jobTitle}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="titleField"> Company EIN: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.ein}`)}>
                              {profile?.moreData.ein}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                          <td>
                            <span className="titleField"> Company Email: </span>
                            <span className="aclass" onClick={() => handleCopy(`${profile?.moreData.email}`)}>
                              {profile?.moreData.email}
                              <span className="iconCopyHidden"><FontAwesomeIcon icon={faCopy} /></span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div></>
                )}

                {selectSideNavData === 'RT' && (
                  <RandomText />
                )}

                {selectSideNavData === 'FE' && (
                  <FakeMail />
                )}

                {selectSideNavData === 'FCCG' && (
                  <FakeCreditCardGenerator />
                )}

                {selectSideNavData === 'FCCV' && (
                  <FakeCreditCardValidator />
                )}

                {selectSideNavData === 'FDL' && (
                  <FakeDriverLicense />
                )}

                {selectSideNavData === 'FC' && (
                  <FakeCompany />
                )}

                {selectSideNavData === 'FPN' && (
                  <FakePhoneNumber />
                )}

                {selectSideNavData === 'FSSN' && (
                  <FakeSocialSecurityNumber />
                )}
              </div>
            </div>
          </div>
        </div>
      </main><footer className="bg-dark py-5">
        <p className="text-white text-center mb-0">Copyright @ 2024. All Right Reserved Developed by Nam Nguyen</p>
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
