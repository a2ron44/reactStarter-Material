class Validators {
  validatePattern(pattern, string) {
    return pattern.test(string);
  }

  validateEmail(email) {
    return this.validatePattern(/\S+@\S+\.\S+/, email);
  }
}

const funcs = {
  validateEmail,
  validatePattern,
};

export default funcs;
