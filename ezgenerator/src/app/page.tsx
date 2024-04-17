import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
export default function Home() {
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
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  </div>
                  <div className="col">
                  <label className="form-label title-select-top">Age</label>
                  <select className="form-select" aria-label="Random">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  </div>
                  <div className="col">
                  <label className="form-label title-select-top">Country</label>
                  <select className="form-select" aria-label="Random">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  </div>
                  <div className="col">
                  <label className="form-label title-select-top">State</label>
                  <select className="form-select" aria-label="Random">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  </div>
                  <div className="col">
                    <button type="button" className="btn btn-success py-3 px-5 rounded-2 fw-semibold">Generate <FontAwesomeIcon icon={faDownload} /></button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </header><main>
        <div className="container mb-5">
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
            <div className="col-md-7" id="randomUserDisplaySection">
              <div className="card text-center shadow-lg">
                <div className="card-header pt-5 shadow-sm"><img src="https://randomuser.me/api/portraits/women/89.jpg" className="user-rounded-image img-fluid" id="displayUserPhoto"></img></div>
                <div className="card-body mb-4 mt-5">
                  <h3 className="card-title pt-2 fs-2" id="displayUserName">Seline Giraud</h3>
                  <table className="table table-bordered mt-4">
                    <tbody className="text-start" id="displayUserInfo">
                      <tr className="">
                        <td className="col-1 text-center"><i className="fa-solid fa-user fs-4 text-muted"></i>
                        </td>
                        <th scope="col-2">Full Name: </th>
                        <td className="col-6" id="displayUserFullName"></td>
                        <td className="col-2 text-center"><button type="button"
                          className="btn btn-outline-secondary" id="copyUserFullName"><i
                            className="fa-regular fa-clipboard me-2"></i>Copy</button></td>
                      </tr>
                      <tr>
                        <td className="col-1 text-center"><i
                          className="fa-solid fa-envelope fs-4 text-muted"></i></td>
                        <th scope="col-2">Email Address: </th>
                        <td className="col-6" id="displayUserEmail"></td>
                        <td className="col-2 text-center"><button type="button"
                          className="btn btn-outline-secondary" id="copyUserEmail"><i
                            className="fa-regular fa-clipboard me-2"></i>Copy</button></td>
                      </tr>
                      <tr>
                        <td className="col-1 text-center"><i className="fa-solid fa-phone fs-4 text-muted"></i>
                        </td>
                        <th scope="col-2">Phone Number: </th>
                        <td className="col-6" id="displayUserPhoneNumber"></td>
                        <td className="col-2 text-center"><button type="button"
                          className="btn btn-outline-secondary" id="copyUserPhoneNumber"><i
                            className="fa-regular fa-clipboard me-2"></i>Copy</button></td>
                      </tr>
                      <tr>
                        <td className="col-1 text-center"><i className="fa-solid fa-user fs-4 text-muted"></i>
                        </td>
                        <th scope="col-2">Gander: </th>
                        <td className="col-6 text-capitalize" id="displayUserGander"></td>
                        <td className="col-2 text-center"><button type="button"
                          className="btn btn-outline-secondary" id="copyUserGander"><i
                            className="fa-regular fa-clipboard me-2"></i>Copy</button></td>
                      </tr>
                      <tr>
                        <td className="col-1 text-center"><i
                          className="fa-regular fa-calendar fs-4 text-muted"></i></td>
                        <th scope="col-2">Date of Birth: </th>
                        <td className="col-6" id="displayUserDOB"></td>
                        <td className="col-2 text-center"><button type="button"
                          className="btn btn-outline-secondary" id="copyUserDOB"><i
                            className="fa-regular fa-clipboard me-2"></i>Copy</button></td>
                      </tr>
                      <tr>
                        <td className="col-1 text-center"><i
                          className="fa-solid fa-location-dot fs-4 text-muted"></i></td>
                        <th scope="col-2">Address: </th>
                        <td className="col-6" id="displayUserAddress"></td>
                        <td className="col-2 text-center"><button type="button"
                          className="btn btn-outline-secondary" id="copyUserAddress"><i
                            className="fa-regular fa-clipboard me-2"></i>Copy</button></td>
                      </tr>
                      <tr>
                        <td className="col-1 text-center"><i
                          className="fa-solid fa-map-location-dot fs-4 text-muted"></i></td>
                        <th scope="col-2">Post Code: </th>
                        <td className="col-6" id="displayUserPostcode"></td>
                        <td className="col-2 text-center"><button type="button"
                          className="btn btn-outline-secondary" id="copyUserPostcode"><i
                            className="fa-regular fa-clipboard me-2"></i>Copy</button></td>
                      </tr>
                      <tr>
                        <td className="col-1 text-center"><i
                          className="fa-solid fa-id-card fs-4 text-muted"></i></td>
                        <th scope="col-2">SSN Number: </th>
                        <td className="col-6" id="displayUserSSNNumber"></td>
                        <td className="col-2 text-center"><button type="button"
                          className="btn btn-outline-secondary" id="copyUserSSNNumber"><i
                            className="fa-regular fa-clipboard me-2"></i>Copy</button></td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="button" className="btn btn-primary py-3 px-5 mt-3 rounded-2 fw-semibold">Generate New User</button>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
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
