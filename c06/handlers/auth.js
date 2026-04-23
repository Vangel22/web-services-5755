const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  getByEmail,
  createAccount,
  updateAccount,
} = require("../pkg/account/accounts");
const { getSection } = require("../pkg/config/index");
const { AccountLogin, AccountRegister } = require("../pkg/account/validate");
const { validateSchema } = require("../helper/validation");

const login = async (req, res) => {
  try {
    await validateSchema(req.body, AccountLogin);
    const { email, password } = req.body;

    const account = await getByEmail(email);
    // ako ima account ke go vrati objekt so negoviot username, email, password
    // dokolku nema ke vrati null ili undefined

    if (!account) {
      // neuspesno logiranje
      await updateAccount(account._id, { logFail: account.logFail + 1 });

      // false e koga e undefined, ni treba da go negirame za da vlezeme vo uslovot
      return res.status(404).send("Account not found!");
    }

    // sifra123 -> ova e mojot password vo databazata
    // Probuvam da se najavam so test123 vo req.body.password
    // sifra123 vo bazata e aaaaaaaa (sifrirano), test123 e bbbbbbbb (sifrirano)
    // dali sifra123 === test123, vo bcrypt se proveruva dali aaaaaaaa === bbbbbbbb

    if (!bcrypt.compareSync(password, account.password)) {
      // neuspesno logiranje
      await updateAccount(account._id, { logFail: account.logFail + 1 });

      return res.status(400).send("Wrong password!");
    }

    const payload = {
      username: account.username,
      email: account.email,
      id: account._id,
      organizationId: account.organizationId,
      testiram: "da testiram",
      // new Date() - Od 1vi Januari 1970 Unix do denes 16ti April 2026 - go vrakja vremeto vo milisekundi
      // new Date() / 1000 -> Od 1vi Januari 1970 vo sekundi do denes 16ti April 2026
      // 7 * 24 * 60 * 60 -> 7 denovi po 24 chasa po 60 minuti po 60 sekundi
      // Zbirot od sekundite od 1vi Januari 1970 do denes 2026 April ke se soberat so 7 denovi presmetani vo sekundi
      exp: new Date() / 1000 + 7 * 24 * 60 * 60,
      // exp ke bide 7 denovi vo idnina odkako sme se logirale
    };
    // vo req.auth go imame celiot payload

    const token = jwt.sign(payload, getSection("development").jwt_secret);

    // uspesen login ovde
    await updateAccount(account._id, { logSuccess: account.logSuccess + 1 });

    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error!");
  }
};

const register = async (req, res) => {
  try {
    await validateSchema(req.body, AccountRegister);
    const { username, email, password, confirmPassword } = req.body;

    const accountExists = await getByEmail(email);

    if (accountExists) {
      return res.status(400).send("Account with this email already exists!");
    }

    // sifra123 !== sifra123 -> false, ovoj uslov nema da se izvrsi
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match!");
    }

    const data = {
      username: username,
      email,
      password: bcrypt.hashSync(password),
    };

    const account = await createAccount(data);
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
