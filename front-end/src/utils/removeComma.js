function removeComma(value) {
  return value ? value.replace('.', ',') : null;
}

export default removeComma;
