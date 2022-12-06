function getDateNow() {
  return new Date().toLocaleString('sv-SE').split(' ')[0];
}
export default getDateNow;
