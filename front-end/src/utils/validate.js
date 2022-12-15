export default function validateEmail(email) {
  return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
}
