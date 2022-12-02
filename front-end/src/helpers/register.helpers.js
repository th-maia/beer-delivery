const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_MIN_LENGTH = 6;
const NAME_MIN_LENGTH = 12;

export default (name, email, password) => {
  const isEmailValid = EMAIL_REGEX.test(email);
  const isPasswordValid = password.length >= PASSWORD_MIN_LENGTH;
  const isNameValid = name.length >= NAME_MIN_LENGTH;
  return (isEmailValid && isPasswordValid && isNameValid);
};
