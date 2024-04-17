'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function Home() {
  let data: any = null;

  async function generateKey() {
    const res = await fetch('http://localhost:3000/api/random-user/?nat=au&gender=male', {method: 'GET'});
    const dataFetch = await res.json();
    data = dataFetch.results[0];
    console.log(data, 'data');
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
                      <a href="#" className="nav-link active" aria-current="page">
                      Identity Generator
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link link-dark">
                      Random Text
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link link-dark">
                      Fake Email
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link link-dark">
                      Fake Credit Card Generator
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link link-dark">
                      Fake Credit Card Validator
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link link-dark">
                      Fake Driver's License
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link link-dark">
                      Fake Company
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link link-dark">
                      Fake Phone Number
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link link-dark">
                      Fake Social Security Number
                      </a>
                    </li>
                  </ul>
                </div>
            </div>
            <div className="col-md-9" id="randomUserDisplaySection">
              <div className="card text-center shadow-lg">
                <div className="card-header pt-5 shadow-sm"><img src="https://randomuser.me/api/portraits/med/men/69.jpg" className="user-rounded-image img-fluid" id="displayUserPhoto"></img></div>
                <div className="card-body mb-4 mt-5">
                  <h3 className="card-title pt-2 fs-2" id="displayUserName">Seline Giraud</h3>
                  <table className="table table-bordered mt-4">
                    <tbody className="text-start" id="displayUserInfo">
                      <tr>
                        <td>Fake Name:</td>
                        <td>Random Face:</td>
                      </tr>
                      <tr>
                        <td>Latitude & longitude:</td>
                        <td>Random Avatar:</td>
                      </tr>
                      <tr>
                        <td>Phone:</td>
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
                        <td>Date of Birth:</td>
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
