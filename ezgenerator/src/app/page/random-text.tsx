import React, { useState } from 'react';

const RandomText: React.FC = () => {

  const [selectRTCountry,setSelectRTCountry] = useState('en_US'); 
  const [numOfParagraphs,setNumOfParagraphs] = useState('1'); 
  const [dataText, setDataText] = useState('');
  const [dataHtml, setDataHtml] = useState('');

  function changeLanguageRT(event: any) {
    setSelectRTCountry(event.target.value);
  }

  function changeNumOfParagraphs(event: any) {
    setNumOfParagraphs(event.target.value);
  }

  async function generateRandomText() {
    const res = await fetch(`http://geninfo.net/api/text/?locale=${selectRTCountry}&numParagraphs=${numOfParagraphs}`, {method: 'GET'});
    const dataFetch = await res.json();
    setDataText(dataFetch.text);
    setDataHtml(dataFetch.htmlTxt);
  }

  return (
    <div className="card-body mb-4 mt-3">
        <h3 className="card-title pt-2 fs-2 text-center" id="displayUserName">Random Text Generator</h3>
        <h3 className="card-title pt-2 pb-3 fs-4 bellowTitle text-center" id="displayUserName">Generate Random Text, Lorem Iposm, or HTML</h3>
        <p className="lead text-center">
            This page contains random fake text 20 different languages, plus random Lorem Ipsom text and random HTML Markup.
            Feel free to use any of this text as test or fill data for your own projects.
        </p>
        <table className="table  table-bordered mt-4">
            <tbody className="text-start" id="displayUserInfo">
                <tr>
                <td>
                    <div className="col">
                    <label className="form-label title-select-top">Language:</label>
                    <select className="form-select" value={selectRTCountry} aria-label="Random" onChange={changeLanguageRT}>
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
                </td>
                <td>
                <div className="col">
                    <label className="form-label title-select-top">Number of Paragraphs:</label>
                    <select className="form-select" value={numOfParagraphs} onChange={changeNumOfParagraphs} aria-label="Random">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    </div>
                </td>
                <td><button type="submit" onClick={generateRandomText} className="btn btn-primary w-100 mt-0">Generate Text</button></td>
                </tr>
            </tbody>
        </table>
        <div className='row'>
            <div className='col-md-6'>
                <h3 className="pt-2 pb-3 fs-4 bellowTitlev2">Random "Real" Text</h3>
                <div dangerouslySetInnerHTML={{ __html: dataHtml }} />
            </div>
            <div className='col-md-6'>
                <h3 className="pt-2 pb-3 fs-4 bellowTitlev2">Random "Real" HTML Text</h3>
                <p>{dataHtml}</p>
            </div>
        </div>
    </div>
  );
};

export default RandomText;