// core modules
const fs = require("fs");
const formData = require("form-data");

const Mailgun = require("mailgun.js"); // third-party

const { getSection } = require("../config"); // lokalen modul

// constants
const mailgun = new Mailgun(formData);

const mailTempaltes = {
  PASSWORD_TEMPLATE: {
    title: "Your password reset link has been generated",
    template: "reset_password.html",
  },
  WELCOME: {
    title: "Welcome to our website!",
    template: "welcome.html",
  },
};

// sendMail("h.vangel22@gmail.com", "WELCOME", { first_name: "Vangel", last_name: "Hristov", email: "h.vangel22@gmail.com" });
// sendMail("h.vangel22@gmail.com", "PASSWORD_TEMPLATE", { first_name: "Vangel", last_name: "Hristov", link: "http://test.com" });

const sendMail = async (to, type, data) => {
  const mg = mailgun.client({
    username: "api",
    key: getSection("development").api_key,
  });

  const title = mailTempaltes[type].title; // mailTemplates["WELCOME"].title ->  "Welcome to our website!"
  const templatePath = `${__dirname}/../../email_templates/${mailTempaltes[type].template}`; // mailTemplates["WELCOME"].template -> "welcome.html"
  let content = await readTemplate(templatePath);

  for (let kluc in data) {
    // vo kluc se sodrzi:
    // first_name: "John"
    // last_name: "Doe"
    // email ili link -> john@doe.com , http://test.com
    console.log(`${kluc}`);

    // {{first_name}} -> dinamicno `{{${kluc}}}`
    let regex = new RegExp(`\{\{${kluc}\}\}`, "g");
    // g znaci global flag i ni pomaga dokolku 2 pati imame first_name da gi zameni na dvete mesta podatocite
    content = content.replace(regex, data[kluc]);
  }

  const options = {
    from: getSection("development").sender_email, // mejlot so koj e napraven vasiot mailgun
    to: to,
    subject: title,
    html: content,
  };

  try {
    return await mg.messages.create(getSection("development").domain, options);
  } catch (err) {
    throw err;
  }
};

const readTemplate = async (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports = {
  sendMail,
};
