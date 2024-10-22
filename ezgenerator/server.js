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
const { Pool } = require('pg');  // Import the pg library

// Create a PostgreSQL client
const pool = new Pool({
  user: 'logstore',
  host: '46.250.224.140',
  database: 'logstore',
  password: 'Logstore@1331',
  port: 5432,
});

// Function to log request details to PostgreSQL, including a JSON data column
async function logRequest(ip, action, jsonData) {
  const query = `
    INSERT INTO InfoLog (Ip, Action, Time, Data)
    VALUES ($1, $2, NOW(), $3)
  `;
  try {
    await pool.query(query, [ip, action, jsonData]);
    console.log(`Logged request: ${action} from IP: ${ip} with data: ${jsonData}`);
  } catch (err) {
    console.error('Error logging request:', err);
  }
}


app.prepare().then(() => {
  const server = express();

  server.get('/api/random-user', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const action = 'Generate thông tin ngẫu nhiên';

    try {
      let { gender, nat, ageRange } = req.query;

      const apiUrl = `${randomUserApi}?gender=${gender || 'all'}&nat=${nat || 'en'}`;

      let data = {};
      if (nat === 'vi') {
        data = getUserInfoByNat(gender, nat);
      }
      else {
        const response = await axios.get(apiUrl);
        data = response.data;
      }

      data.results[0].email = generateBussinessEmail();

      var additionalData = getAdditionalInfo(nat);
      data.moreData = additionalData;
      data.results[0].dob = getRandomDateOfBirth(ageRange);
      data.cryptoAddress = generateCryptoAddress();

      // Log to PostgreSQL with JSON data
      await logRequest(ip, action, JSON.stringify(data));

      res.json(data);
    } catch (error) {
      console.error('Error fetching random user:', error);
      res.status(500).send('Error fetching random user');
    }

  });

  server.get('/api/generate-card', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const action = 'Generate thông tin thẻ';

    try {
      const { type, nums } = req.query;
      var data = generateRandomCard(type.toLowerCase(), nums);

      await logRequest(ip, action, JSON.stringify(data));

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
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const action = 'Generate đoạn văn ngẫu nhiên';

    try {
      const { locale, numParagraphs } = req.query;
      var text = generateRandomText(locale, numParagraphs);

      await logRequest(ip, action, JSON.stringify(data));

      res.json(text);
    } catch (error) {
      res.status(500).send('Error generating text');
    }
  });

  server.get('/api/emails', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const action = 'Generate email ngẫu nhiên';

    try {
      const { nums } = req.query;
      var emails = generateRandomEmails(nums);

      await logRequest(ip, action, JSON.stringify(data));

      res.json({ emails });
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/driver-license', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const action = 'Generate bằng lái xe ngẫu nhiên';

    try {
      const { state } = req.query;
      var data = generateFakeDriverLicense();

      await logRequest(ip, action, JSON.stringify(data));

      res.json({ data });
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/company', async (req, res) => {

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const action = 'Generate thông tin công ty ngẫu nhiên';
    try {
      const { locale, nums } = req.query;
      var data = generateFakeCompany(locale, nums);

      await logRequest(ip, action, JSON.stringify(data));

      res.json({ data });
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/phone', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const action = 'Generate số điện thoại ngẫu nhiên';

    try {
      const { countryCode, nums } = req.query;
      var data = generateFakePhoneNumbers(countryCode, nums);

      await logRequest(ip, action, JSON.stringify(data));

      res.json({ data });
    } catch (error) {
      res.status(500).send('Error generating');
    }
  });

  server.get('/api/ssn', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const action = 'Generate số SSN ngẫu nhiên';

    try {
      const { state } = req.query;
      var data = generateFakeSSN(state);

      await logRequest(ip, action, JSON.stringify(data));

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
  if (nat === 'vi') {
    bankNames = ['Vietcombank', 'Techcombank', 'BIDV', 'Agribank', 'VietinBank', 'Sacombank', 'ACB', 'VPBank', 'MBBank', 'HDBank'];
  }
  const bankName = faker.random.arrayElement(bankNames);
  const bankNumber = faker.random.number({ min: 1000000000, max: 9999999999 }).toString();
  const routingNumber = faker.random.number({ min: 100000000, max: 999999999 }).toString();
  let countryCode = faker.address.countryCode();
  if (nat === 'vi') {
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
    date: dateOfBirth,
    age: currentYear - birthYear
  };
}

function getUserInfoByNat(gender, nat) {
  // Set Faker.js locale based on nationality
  faker.locale = 'vi';

  const vietnameseSurnames = [
    "Nguyễn", "Trần", "Lê", "Phạm", "Huỳnh", "Hoàng", "Phan",
    "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương",
    "Lý", "Đinh", "Trịnh", "Mai", "Đoàn", "Lâm", "Trương",
    "Vương", "Quách", "Tạ", "Thái", "Châu", "Văn", "Tô",
    "Lưu", "Thân", "Tôn", "Triệu", "Vĩ", "Quang", "Nguyễn Văn",
    "Nguyễn Thị", "Phùng", "Phương", "Lương", "Cao", "Phùng",
    "Đinh", "Bạch", "Hứa", "Đoàn", "Tôn Nữ", "Thiệu", "Từ"
  ];

  const vietnameseMaleMiddleNames = [
    "Văn", "Bảo", "Bình", "Công", "Cường", "Đức", "Duy",
    "Hải", "Hiếu", "Hoàng", "Hùng", "Huy", "Khoa", "Khôi",
    "Long", "Minh", "Nam", "Nhân", "Phúc", "Quang",
    "Quốc", "Sơn", "Tấn", "Thanh", "Thành", "Thiện",
    "Trung", "Tuấn", "Tùng", "Việt", "Vinh"
  ];

  const vietnameseFemaleMiddleNames = [
    "Thị", "Bảo", "Chi", "Diệp", "Hà", "Hằng", "Hiền",
    "Hoa", "Hồng", "Huệ", "Hương", "Khanh", "Lan", "Linh",
    "Mai", "Minh", "Ngọc", "Như", "Oanh", "Phương",
    "Quỳnh", "Thanh", "Thảo", "Thúy", "Thùy", "Trang",
    "Trinh", "Tuyết", "Vân", "Xuân", "Yến"
  ];

  const vietnameseMaleFirstNames = [
    "Anh", "Bảo", "Cường", "Dũng", "Duy", "Đạt", "Đức",
    "Giang", "Hà", "Hải", "Hiếu", "Hoàng", "Hùng", "Huy",
    "Khánh", "Khoa", "Long", "Minh", "Nam", "Nhân",
    "Phong", "Phúc", "Quân", "Quang", "Sơn", "Thanh", "Thành",
    "Thiện", "Tiến", "Trung", "Tuấn", "Tùng", "Vinh", "Vũ"
  ];

  const vietnameseFemaleFirstNames = [
    "Anh", "Bích", "Châu", "Chi", "Diệp", "Dung", "Giang",
    "Hà", "Hạnh", "Hiền", "Hoa", "Hoài", "Hương", "Huyền",
    "Khánh", "Lan", "Linh", "Loan", "Mai", "Minh",
    "Ngọc", "Như", "Nhung", "Oanh", "Phương", "Quyên",
    "Thảo", "Thùy", "Trang", "Trinh", "Tuyết", "Vân", "Xuân"
  ];
  let fullName = "";
  if (gender === 'male') {
    fullName = getFullName(vietnameseSurnames, vietnameseMaleMiddleNames, vietnameseMaleFirstNames);
  } else {
    fullName = getFullName(vietnameseSurnames, vietnameseFemaleMiddleNames, vietnameseFemaleFirstNames);
  }
  // Generate a random user object using Faker.js
  const user = faker.helpers.userCard();
  var addressVN = generateRandomVietnamAddress();
  // Filter the generated user based on gender and nationality
  const filteredUser = {
    gender: gender,
    nat: nat,
    name: {
      title: gender === 'male' ? 'Mr' : 'Ms',
      first: fullName.split(' ')[0],
      last: fullName.split(' ')[1] + " " + fullName.split(' ')[2],
      fullName: fullName,
    },
    addressVN,
    location: {
      street: {
        number: user.address.geo.lng,
        name: user.address.street.name
      },
      city: addressVN.city,
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
      password: faker.internet.password(),
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
    phone: generateVietnamesePhoneNumber(),
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

  return { results };
}

function generateBussinessEmail() {
  faker.locale = 'en';

  // Generate a random user object using Faker.js
  const user = faker.helpers.userCard();

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
  const randomUsername = user.email.split('@')[0];
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
  if (gender === 'male') {
    return srcMale + randomNumberFrom1To100 + ".jpg";
  } else {
    return srcFemale + randomNumberFrom1To100 + ".jpg";
  }
}

function getFullName(surNames, middleNames, firstNames) {
  return faker.random.arrayElement(surNames) + " " + faker.random.arrayElement(middleNames) + " " + faker.random.arrayElement(firstNames);
}

function generateVietnamesePhoneNumber() {
  var networks = ["viettel", "vinaphone", "mobifone"];
  var networkCodes = {
    "viettel": ["032", "033", "034", "035", "036", "037", "038", "039"],
    "vinaphone": ["088", "091", "094", "083", "084", "085", "081", "082"],
    "mobifone": ["070", "079", "077", "076", "078"]
  };

  var networkCode = networkCodes[faker.random.arrayElement(networks)];
  if (!networkCode) {
    console.error("Invalid network specified. Please choose Viettel, Vinaphone, or Mobifone.");
    return;
  }

  var phoneNumber = "(+84) " + networkCode[Math.floor(Math.random() * networkCode.length)];
  for (var i = 0; i < 7; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
}

// Enhanced data structure for cities, provinces, districts, and wards in Vietnam
const vietnamData = {
  'Hanoi': {
    'districts': {
      'Ba Dinh': ['Phuc Xa', 'Truc Bach', 'Vinh Phuc', 'Cong Vi', 'Lieu Giai'],
      'Hoan Kiem': ['Phan Chu Trinh', 'Hang Bai', 'Cua Dong', 'Dong Xuan', 'Hang Ma'],
      'Tay Ho': ['Quang An', 'Xuan La', 'Nhat Tan', 'Tu Lien', 'Phu Thuong'],
      'Long Bien': ['Gia Thuy', 'Ngoc Thuy', 'Bo De', 'Viet Hung', 'Phuc Loi'],
      'Cau Giay': ['Dich Vong', 'Nghia Tan', 'Mai Dich', 'Yen Hoa', 'Trung Hoa'],
      // Add more districts and wards as needed
    },
    'zipCode': '100000'
  },
  'Ho Chi Minh City': {
    'districts': {
      'Quan 1': ['Ben Nghe', 'Ben Thanh', 'Nguyen Thai Binh', 'Da Kao', 'Pham Ngu Lao'],
      'Quan 2': ['An Khanh', 'An Loi Dong', 'An Phu', 'Binh An', 'Binh Khanh'],
      'Quan 3': ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5'],
      'Quan 4': ['Phường 6', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 13'],
      'Quan 5': ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 6'],
      // Add more districts and wards as needed
    },
    'zipCode': '700000'
  },
  'Da Nang': {
    'districts': {
      'Hai Chau': ['Thuan Phuoc', 'Thanh Binh', 'Hai Chau 1', 'Hai Chau 2', 'Phuoc Ninh'],
      'Thanh Khe': ['Tan Chinh', 'Chinh Gian', 'Thac Gian', 'Vinh Trung', 'Thanh Khe Dong'],
      'Son Tra': ['An Hai Bac', 'An Hai Tay', 'An Hai Dong', 'Man Thai', 'Tho Quang'],
      'Ngu Hanh Son': ['My An', 'My Hoa', 'My Khe', 'Hoa Quy', 'Hoa Hai'],
      'Lien Chieu': ['Hoa Khanh Bac', 'Hoa Khanh Nam', 'Hoa Minh', 'Hoa Hiep Bac', 'Hoa Hiep Nam'],
      // Add more districts and wards as needed
    },
    'zipCode': '550000'
  },
  'Hai Phong': {
    'districts': {
      'Hong Bang': ['Hoang Van Thu', 'Phan Boi Chau', 'Quang Trung', 'Ho Nam', 'Truong Son'],
      'Le Chan': ['An Bien', 'An Duong', 'Cat Dai', 'Dang Giang', 'Dong Hai'],
      'Ngo Quyen': ['Cau Dat', 'Dong Khe', 'Lach Tray', 'Le Loi', 'May Chai'],
      'Kien An': ['Bac Son', 'Dang Lam', 'Dinh Tien Hoang', 'Dong Hoa', 'Nam Son'],
      'Hai An': ['Dang Hai', 'Dang Lam', 'Dong Hai 1', 'Dong Hai 2', 'Thanh To'],
      // Add more districts and wards as needed
    },
    'zipCode': '180000'
  },
  'Can Tho': {
    'districts': {
      'Ninh Kieu': ['Tan An', 'An Cu', 'An Hoa', 'An Khanh', 'An Lac'],
      'Binh Thuy': ['An Thoi', 'Binh Thuy', 'Long Hoa', 'Long Tuyen', 'Thoi An Dong'],
      'Cai Rang': ['Ba Lang', 'Hung Phu', 'Le Binh', 'Phu Thu', 'Thuan Hung'],
      'O Mon': ['Chau Van Liem', 'Long Hung', 'Long Hoa', 'Thoi Hoa', 'Thoi Long'],
      'Thot Not': ['Tan Loc', 'Tan Hung', 'Thoi Thuan', 'Thuan An', 'Thoi Long'],
      // Add more districts and wards as needed
    },
    'zipCode': '900000'
  }
};

// Function to get a random element from an array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Function to generate a random Vietnamese address
function generateRandomVietnamAddress() {
  const city = getRandomElement(Object.keys(vietnamData));
  const districts = vietnamData[city].districts;
  const district = getRandomElement(Object.keys(districts));
  const ward = getRandomElement(districts[district]);

  const address = {
    street: faker.address.streetName(),
    ward: ward,
    district: district,
    city: city,
    country: 'Vietnam',
    zipCode: vietnamData[city].zipCode
  };

  return address;
}