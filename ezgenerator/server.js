// server.js
const express = require('express');
const faker = require('faker');

const next = require('next');
const axios = require('axios');
const fs = require('fs');
const path = require('path'); // Import the path module

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const randomUserApi = "https://randomuser.me/api/";
const randomOthers = "https://randommer.io/";

app.prepare().then(() => {
  const server = express();

  server.get('/api/random-user', async (req, res) => {
    try {
      let { gender, nat, ageRange } = req.query;
      nat = "vi";
      const apiUrl = `${randomUserApi}?gender=${gender || 'all'}&nat=${nat || 'us'}`;

      let data = {};
      if(nat === 'vi') {
        data = getUserInfoByNat(gender, nat);
      } 
      else {
        const response = await axios.get(apiUrl);
        data = response.data;
        data.results[0].email = faker.internet.email();
      }

      var additionalData = getAdditionalInfo(nat);
      data.moreData = additionalData;
      data.results[0].dob = getRandomDateOfBirth(ageRange);
      data.cryptoAddress = generateCryptoAddress();
      res.json(data);
    } catch (error) {
      console.error('Error fetching random user:', error);
      res.status(500).send('Error fetching random user');
    }

  });

  server.get('/api/generate-card', async (req, res) => {
    try {
      const { type, nums } = req.query;
      var data = generateRandomCard(type.toLowerCase(), nums);

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

      res.json(text);
    } catch (error) {
      res.status(500).send('Error generating text');
    }
  });

  server.get('/api/emails', async (req, res) => {
    try {
      const { nums } = req.query;
      var emails = generateRandomEmails(nums);

      res.json({ emails });
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/driver-license', async (req, res) => {
    try {
      const { state } = req.query;
      var data = generateFakeDriverLicense();

      res.json({ data });
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/company', async (req, res) => {
    try {
      const { locale, nums } = req.query;
      var data = generateFakeCompany(locale, nums);

      res.json({ data });
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/phone', async (req, res) => {
    try {
      const { countryCode, nums } = req.query;
      var data = generateFakePhoneNumbers(countryCode, nums);

      res.json({ data });
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/ssn', async (req, res) => {
    try {
      const { state } = req.query;
      var data = generateFakeSSN(state);

      res.json({ data });
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  // Route to download an image from a URL
  server.get('/api/download', async (req, res) => {
    const { imageUrl, imageName } = req.query;

    try {
      // Make request to the image URL
      const response = await axios({
          url: imageUrl,
          method: 'GET',
          responseType: 'stream'
      });

      // Set headers to trigger browser download
      res.setHeader('Content-Disposition', `attachment; filename="${imageName}"`);
      res.setHeader('Content-Type', 'application/octet-stream');

      // Pipe the image data to the response
      response.data.pipe(res);
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Error downloading image');
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

function generateRandomCard(cardType, nums) {
  const numsParse = parseInt(nums);
  let arr = [];
  for (let i = 0; i < numsParse; i++) {
    const cardholderName = faker.name.findName();
    let generatedNumber, generatedCVV, expirationDate;
    switch (cardType.toLowerCase()) {
      case 'visa':
        generatedNumber = creditCardGenerator.GenCC('VISA');
        break;
      case 'mastercard':
        generatedNumber = creditCardGenerator.GenCC('Mastercard');
        break;
      case 'american express':
        generatedNumber = creditCardGenerator.GenCC('American Express');
        break;
      case 'discover':
        generatedNumber = creditCardGenerator.GenCC('Discover');
        break;
      case 'jcb':
        generatedNumber = creditCardGenerator.GenCC('JCB');
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

    arr.push({
      cardholderName,
      cardType,
      cardNumber: generatedNumber,
      cvv: generatedCVV,
      expirationDate
    });
  }

  return arr;
}

const creditCardValidator = require('card-validator');

function validateCreditCard(cardNumber) {
  return creditCardValidator.number(cardNumber).isPotentiallyValid;
}

function generateRandomText(locale, numParagraphs) {
  // Set the locale
  if (!locale) {
    locale = 'en';
  }
  if (!numParagraphs) {
    numParagraphs = 1;
  }
  faker.locale = locale;

  // Generate random text
  let text = '';
  var htmlTxt = '';
  for (let i = 0; i < numParagraphs; i++) {
    text += faker.lorem.paragraph() + '\n\n';
    htmlTxt += '<p>' + faker.lorem.paragraph() + '</p><br>';
  }

  return { text, htmlTxt }
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
  const avt = faker.image.avatar();
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
    licenseSex,
    avt
  };
}

// Random company
function generateFakeCompany(locale, nums) {
  // Set faker locale based on the specified locale
  if (!locale) {
    locale = 'en';
  }
  faker.locale = locale;

  var arr = [];
  for (let i = 0; i < nums; i++) {
    // Generate fake company details
    const companyName = faker.company.companyName();
    const industry = faker.company.bs();
    const address = faker.address.streetAddress();
    const city = faker.address.city();
    const state = faker.address.state();
    const zipCode = faker.address.zipCode();
    const phoneNumber = faker.phone.phoneNumber();
    const website = faker.internet.url();

    const email = generateBussinessEmail();

    arr.push({
      companyName,
      industry,
      address,
      city,
      state,
      zipCode,
      phoneNumber,
      website,
      email
    });
  }

  return arr;
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
function generateFakeSSN(state) {
  // Generate a random issue date within the last 10 years
  const issueDate = faker.date.past(10).toLocaleDateString('en-US');

  // Generate SSN-like string
  const ssn = `${faker.random.number({ min: 100, max: 999 })}-` +
    `${faker.random.number({ min: 10, max: 99 })}-` +
    `${faker.random.number({ min: 1000, max: 9999 })}`;

  return { ssn, issueDate, state };
}

function getAdditionalInfo(nat) {
  const height = faker.random.number({ min: 140, max: 200 });
  const weight = faker.random.number({ min: 40, max: 120 });
  const bloodType = faker.random.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
  const ethnicities = ['Asian', 'Black', 'Hispanic', 'White', 'Mixed'];
  const ethnicity = faker.random.arrayElement(ethnicities);
  const hairColor = faker.internet.color();
  let bankNames = ['Chase Bank', 'Wells Fargo', 'Bank of America', 'Citibank', 'TD Bank', 'US Bank', 'Capital One', 'PNC Bank', 'HSBC', 'SunTrust Bank'];
  if(nat === 'vi') {
    bankNames = ['Vietcombank', 'Techcombank', 'BIDV', 'Agribank', 'VietinBank', 'Sacombank', 'ACB', 'VPBank', 'MBBank', 'HDBank'];
  }
  const bankName = faker.random.arrayElement(bankNames);
  const bankNumber = faker.random.number({ min: 1000000000, max: 9999999999 }).toString();
  const routingNumber = faker.random.number({ min: 100000000, max: 999999999 }).toString();
  let countryCode = faker.address.countryCode();
  if(nat === 'vi') {
    countryCode = 'VN';
  }
  const iban = `${countryCode}${faker.random.alphaNumeric(24)}`;
  
  const email = generateBussinessEmail();
  
  const username = faker.internet.userName();
  const domainName = faker.internet.domainName();
  const domainWord = faker.internet.domainWord();
  const urlWithQueryParams = faker.internet.url();
  const ipAddress = faker.internet.ip();
  const ipv6Address = faker.internet.ipv6();
  const macAddress = faker.internet.mac();
  const websiteUrl = faker.internet.url();
  const userAgent = faker.internet.userAgent();
  const degree = faker.name.title();
  const school = faker.company.companyName();
  const companyName = faker.company.companyName();
  const companyDescription = faker.company.catchPhrase();
  const ein = faker.random.number({ min: 100000000, max: 999999999 });
  const jobTitle = faker.name.jobTitle();
  const salary = faker.random.number({ min: 1000, max: 50000 });
  const salaryPerHour = faker.random.number({ min: 10, max: 100 });

  const creditcard = generateRandomCard("visa", 1);
  return {
    height,
    weight,
    bloodType,
    ethnicity,
    hairColor,
    bankName,
    bankNumber,
    routingNumber,
    iban,
    email,
    username,
    domainName,
    domainWord,
    urlWithQueryParams,
    ipAddress,
    ipv6Address,
    macAddress,
    websiteUrl,
    userAgent,
    degree,
    school,
    companyName,
    companyDescription,
    ein,
    jobTitle,
    salary,
    salaryPerHour,
    creditcard
  };
}
function getRandomDateOfBirth(range) {
  let minAge, maxAge;

  // Check if range is empty
  if (range === undefined || range.trim() === '') {
    // Define default age range
    minAge = 18;
    maxAge = 25;
  } else {
    // Parse the range string
    [minAge, maxAge] = range.split('-').map(Number);
  }

  // Calculate minimum and maximum birth years based on age range
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const minBirthYear = currentYear - maxAge;
  const maxBirthYear = currentYear - minAge;

  // Generate a random birth year between min and max
  const birthYear = faker.random.number({ min: minBirthYear, max: maxBirthYear });

  // Generate a random birth month and day
  const birthMonth = faker.random.number({ min: 1, max: 12 });
  const maxDaysInMonth = new Date(birthYear, birthMonth, 0).getDate(); // Get the maximum number of days in the birth month
  const birthDay = faker.random.number({ min: 1, max: maxDaysInMonth });

  // Format the date of birth
  const dateOfBirth = new Date(birthYear, birthMonth - 1, birthDay);

  return {
    date : dateOfBirth,
    age :  currentYear - birthYear
  };
}

function getUserInfoByNat(gender, nat) {
  // Set Faker.js locale based on nationality
  faker.locale = nat.toLowerCase();

  // Generate a random user object using Faker.js
  const user = faker.helpers.userCard();
  console.log(user);

  // Filter the generated user based on gender and nationality
  const filteredUser = {
    gender: gender,
    nat: nat,
    name: {
      title: gender === 'male' ? 'Mr' : 'Ms',
      first: user.name.split(' ')[0],
      last: user.name.split(' ')[1] + " " + user.name.split(' ')[2],
    },
    location: {
      street: {
        number: user.address.geo.lng,
        name: user.address.street.name
      },
      city: user.address.city,
      state: user.address.state,
      country: user.address.country,
      postcode: user.address.zipcode,
      coordinates: {
        latitude: user.address.geo.lat,
        longitude: user.address.geo.lng
      },
      timezone: {
        // offset: user.address.timezone.offset,
        // description: user.address.timezone.description
      }
    },
    email: user.email,
    login: {
      // uuid: user.login.uuid,
      // username: user.login.username,
      // password: user.login.password,
      // salt: user.login.salt,
      // md5: user.login.md5,
      // sha1: user.login.sha1,
      // sha256: user.login.sha256
    },
    dob: {
      // date: user.dob.date,
      // age: user.dob.age
    },
    registered: {
      // date: user.registered.date,
      // age: user.registered.age
    },
    phone: user.phone,
    cell: user.cell,
    id: {
      // name: user.id.name,
      // value: user.id.value
    },
    picture: {
      large: randomFace(gender),
      medium: randomFace(gender),
      thumbnail: randomFace(gender),
    }
  };
  let results = [];
  results.push(filteredUser);

  return {results};
}

function generateBussinessEmail() {
  const businessDomains = [
    'acme.com',
    'widgetcorp.com',
    'techsolutions.biz',
    'globalenterprises.net',
    'innovationinc.org',
    'cyberdyne.org',
    'ventureforge.com',
    'apexindustries.net',
    'synergytech.com',
    'frontierconsulting.biz',
    'dynamicventures.net',
    'eagleenterprises.org',
    'stellarcorp.com',
    'powerhouseindustries.net',
    'unitedsolutions.biz',
    'mercurytechnologies.org',
    'quicksilverenterprises.com',
    'nexustech.net',
    'horizonindustries.biz',
    'peakperformancesolutions.org'
  ];
  const randomDomain = faker.random.arrayElement(businessDomains);
  const randomUsername = faker.internet.userName();
  return `${randomUsername}@${randomDomain}`;
}

const RippleKeypairs = require('ripple-keypairs');
function generateCryptoAddress() {
  let btcAddress = faker.finance.bitcoinAddress();
  let ethAddress = faker.finance.ethereumAddress();
  let rippleAddress = RippleKeypairs.deriveAddress(RippleKeypairs.generateSeed());
  let morenoAddress = faker.finance.ethereumAddress();

  return { btcAddress, ethAddress, rippleAddress, morenoAddress };
}

function randomFace(gender) {
  let srcMale = "https://randomuser.me/api/portraits/men/";
  let srcFemale = "https://randomuser.me/api/portraits/women/";

  let randomNumberFrom1To100 = faker.random.number({ min: 1, max: 100 });
  if(gender === 'male') {
    return srcMale + randomNumberFrom1To100 + ".jpg";
  } else {
    return srcFemale + randomNumberFrom1To100 + ".jpg";
  }
}