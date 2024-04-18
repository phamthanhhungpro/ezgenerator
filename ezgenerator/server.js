// server.js
const express = require('express');
const next = require('next');
const axios = require('axios');
const faker = require('faker');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const randomUserApi = "https://randomuser.me/api/";
const randomOthers = "https://randommer.io/";

app.prepare().then(() => {
  const server = express();

  server.get('/api/random-user', async (req, res) => {
    try {
      const { gender, nat } = req.query;
      const apiUrl = `${randomUserApi}?gender=${gender || 'all'}&nat=${nat || 'us'}`;

      const response = await axios.get(apiUrl);
      const data = response.data;
      res.json(data);
    } catch (error) {
      console.error('Error fetching random user:', error);
      res.status(500).send('Error fetching random user');
    }

  });

  server.get('/api/generate-card', async (req, res) => {
    try {
      const { Type } = req.query;
      var data = generateRandomCard(Type.toLowerCase());

      res.json(data);
    } catch (error) {
      console.error('Error generating card:', error);
      res.status(500).send('Error generating card');
    }
  });

  server.get('/api/validate-card', async (req, res) => {
    try {
      const { cardNumber } = req.query;
      const isValid = validateCreditCard(cardNumber);
  
      res.json({ isValid });
    } catch (error) {
      console.error('Error validating card:', error);
      res.status(500).send('Error validating card');
    }
  });

  server.get('/api/text', async (req, res) => {
    try {
      const { locale, numParagraphs } = req.query;
      var text = generateRandomText(locale, numParagraphs);
  
      res.json({ text });
    } catch (error) {
      res.status(500).send('Error generating text');
    }
  });

  server.get('/api/emails', async (req, res) => {
    try {
      const { nums } = req.query;
      var emails = generateRandomEmails(nums);
  
      res.json({emails});
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/driver-license', async (req, res) => {
    try {
      const { state } = req.query;
      var data = generateFakeDriverLicense();
  
      res.json({data});
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/company', async (req, res) => {
    try {
      const { locale } = req.query;
      var data = generateFakeCompany(locale);
  
      res.json({data});
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/phone', async (req, res) => {
    try {
      const { countryCode, nums } = req.query;
      var data = generateFakePhoneNumbers(countryCode, nums);
  
      res.json({data});
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/ssn', async (req, res) => {
    try {
      const { state } = req.query;
      var data = generateFakeSSN();
  
      res.json({data});
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});


const creditCardGenerator = require('creditcard-generator');

function generateRandomCard(cardType) {
  const cardholderName = faker.name.findName();
  let generatedNumber, generatedCVV, expirationDate;
  switch (cardType.toLowerCase()) {
    case 'visa':
      generatedNumber = creditCardGenerator.GenCC('VISA')[0];
      break;
    case 'mastercard':
      generatedNumber = creditCardGenerator.GenCC('Mastercard')[0];
      break;
    case 'american express':
      generatedNumber = creditCardGenerator.GenCC('American Express')[0];
      break;
    case 'discover':
      generatedNumber = creditCardGenerator.GenCC('Discover')[0];
      break;
    case 'jcb':
      generatedNumber = creditCardGenerator.GenCC('JCB')[0];
      break;
    default:
      throw new Error('Invalid card type');
  }

  // Generate a random CVV (3 or 4 digits depending on card type)
  generatedCVV = faker.random.number({
    min: 100,
    max: cardType.toLowerCase() === 'american express' ? 9999 : 999
  }).toString().padStart(cardType.toLowerCase() === 'american express' ? 4 : 3, '0');

  // Generate a random expiration date within the next 5 years
  const currentYear = new Date().getFullYear();
  const expirationYear = faker.random.number({ min: currentYear, max: currentYear + 5 });
  const expirationMonth = faker.random.number({ min: 1, max: 12 });
  expirationDate = `${expirationMonth.toString().padStart(2, '0')}/${expirationYear.toString().slice(-2)}`;

  return {
    cardholderName,
    cardType,
    cardNumber: generatedNumber,
    cvv: generatedCVV,
    expirationDate
  };
}

const creditCardValidator = require('credit-card-validator');

function validateCreditCard(cardNumber) {
  return creditCardValidator.number(cardNumber).isValid();
}

function generateRandomText(locale, numParagraphs) {
  // Set the locale
  if(!locale) {
    locale = 'en';
  }
  if(!numParagraphs) {
    numParagraphs = 1;
  }
  faker.locale = locale;

  // Generate random text
  let text = '';
  for (let i = 0; i < numParagraphs; i++) {
    text += faker.lorem.paragraph() + '\n\n';
  }
  return text.trim(); // Remove trailing newlines
}

// Random emails
function generateRandomEmails(quantity) {
  const emails = [];
  for (let i = 0; i < quantity; i++) {
    const email = faker.internet.email();
    emails.push(email);
  }
  return emails;
}

// Random driver license
function generateFakeDriverLicense() {
  const licenseAddress = faker.address.streetAddress();
  const licenseBirthdate = faker.date.between('1950-01-01', '2003-12-31').toLocaleDateString('en-US');
  const licenseClass = faker.random.arrayElement(['A', 'B', 'C', 'D', 'E']);
  const licenseExpireDate = faker.date.between('2022-01-01', '2030-12-31').toLocaleDateString('en-US');
  const licenseFirstName = faker.name.firstName();
  const licenseHeight = `${faker.random.number({ min: 4, max: 6 })}'${faker.random.number({ min: 0, max: 11 })}"`;
  const licenseIssuedDate = faker.date.between('2018-01-01', '2023-12-31').toLocaleDateString('en-US');
  const licenseLastName = faker.name.lastName();
  const licenseNum = faker.random.number({ min: 1000000, max: 9999999 }).toString();
  const licenseSex = faker.random.arrayElement(['M', 'F']);
  return {
    licenseAddress,
    licenseBirthdate,
    licenseClass,
    licenseExpireDate,
    licenseFirstName,
    licenseHeight,
    licenseIssuedDate,
    licenseLastName,
    licenseNum,
    licenseSex
  };
}

// Random company
function generateFakeCompany(locale) {
  // Set faker locale based on the specified locale
  if(!locale) {
    locale = 'en';
  }
  faker.locale = locale;

  // Generate fake company details
  const companyName = faker.company.companyName();
  const industry = faker.company.bs();
  const address = faker.address.streetAddress();
  const city = faker.address.city();
  const state = faker.address.state();
  const zipCode = faker.address.zipCode();
  const phoneNumber = faker.phone.phoneNumber();
  const website = faker.internet.url();

  return {
    companyName,
    industry,
    address,
    city,
    state,
    zipCode,
    phoneNumber,
    website
  };
}

// Random phone
function generateFakePhoneNumbers(countryCode, nums) {
  const phoneNumbers = [];
  for (let i = 0; i < nums; i++) {
    const fakePhoneNumber = faker.phone.phoneNumberFormat(0); // 0 for international format
    const phoneNumberWithCountryCode = `+${countryCode} ${fakePhoneNumber}`;
    phoneNumbers.push(phoneNumberWithCountryCode);
  }
  return phoneNumbers;
}

// SSN
function generateFakeSSN() {
  // Generate a random issue date within the last 10 years
  const issueDate = faker.date.past(10).toLocaleDateString('en-US');

  // Generate SSN-like string
  const ssn = `${faker.random.number({ min: 100, max: 999 })}-` +
              `${faker.random.number({ min: 10, max: 99 })}-` +
              `${faker.random.number({ min: 1000, max: 9999 })}`;

  return { ssn, issueDate };
}