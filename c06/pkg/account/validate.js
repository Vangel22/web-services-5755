const AccountLogin = {
  email: "required|email",
  password: "required|string",
};

const AccountRegister = {
  username: "required|string",
  email: "required|email",
  password: "required|string",
  confirmPassword: "required|string",
  // organizationName resava deka noviot account pripagja na nekoja organizacija.
  // Ako organizacijata so ova ime veke postoi -> noviot account se pridruzuva kon nea.
  // Ako ne postoi -> ja kreirame novata organizacija i prviot korisnik e toj sto ja napravil.
  organizationName: "required|string",
};

const AccountUpdate = {
  username: "string",
  email: "email",
  password: "string",
};

module.exports = {
  AccountLogin,
  AccountRegister,
  AccountUpdate,
};
