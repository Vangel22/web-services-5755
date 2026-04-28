const makeId = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = characters.length;

  for (let i = 0; i < length; i++) {
    // result += i;
    // result = "012345"
    result += characters.charAt(Math.floor(Math.random() * charLength));
    // console.log(
    //   "random",
    //   characters.charAt(Math.floor(Math.random() * charLength)),
    // );
    // Math.floor - ili dolna granica 0.0-0.5 -> 0
    // Math.ceil - ili gorna granica -> 0.5 -> 1
  }

  // charLength = 62
  // Math.random = 0,1
  // Math.random * charLength = 0,1 * 62 = 6,2
  // Math.floor(6,2) = 6
  // 6tiot karakter od characters = F bukvata

  return result;
};

// makeId(6) -> A0f2cB -> primer sto ke se slucuva

module.exports = makeId;
