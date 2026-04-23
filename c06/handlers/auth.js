const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  getByEmail,
  createAccount,
  updateAccount,
} = require("../pkg/account/accounts");
const {
  create: createOrganization,
  getByName: getOrganizationByName,
} = require("../pkg/organization/index");
const { getSection } = require("../pkg/config/index");
const { AccountLogin, AccountRegister } = require("../pkg/account/validate");
const { validateSchema } = require("../helper/validation");

const login = async (req, res) => {
  try {
    await validateSchema(req.body, AccountLogin);
    const { email, password } = req.body;

    const account = await getByEmail(email);

    if (!account) {
      await updateAccount(account._id, { logFail: account.logFail + 1 });
      return res.status(404).send("Account not found!");
    }

    if (!bcrypt.compareSync(password, account.password)) {
      await updateAccount(account._id, { logFail: account.logFail + 1 });

      return res.status(400).send("Wrong password!");
    }

    const payload = {
      username: account.username,
      email: account.email,
      id: account._id,
      organizationId: account.organizationId,
      testiram: "da testiram",
      exp: new Date() / 1000 + 7 * 24 * 60 * 60,
    };

    const token = jwt.sign(payload, getSection("development").jwt_secret);

    await updateAccount(account._id, { logSuccess: account.logSuccess + 1 });

    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error!");
  }
};

// Registracija = kreiranje na nov account povrzan so nekoja organizacija.
// Ova go resava cirkularniot problem (account bara organizationId, a organizacija
// bara najaven korisnik) na najednostaven mozen nacin:
//   - Ako organizacijata so ova ime ne postoi -> ja kreirame (noviot account e sopstvenik).
//   - Ako veke postoi -> noviot account se pridruzuva kon postoeckata organizacija.
const register = async (req, res) => {
  try {
    await validateSchema(req.body, AccountRegister);
    const { username, email, password, confirmPassword, organizationName } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match!");
    }

    const accountExists = await getByEmail(email);
    if (accountExists) {
      return res.status(400).send("Account with this email already exists!");
    }

    // Najdi-ili-kreiraj: ako organizacijata postoi ja koristime, inaku ja kreirame.
    let organization = await getOrganizationByName(organizationName);
    if (!organization) {
      organization = await createOrganization({ name: organizationName });
    }

    const account = await createAccount({
      username,
      email,
      password: bcrypt.hashSync(password),
      organizationId: organization._id,
    });

    return res.status(200).send(account);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error!");
  }
};

module.exports = {
  login,
  register,
};
