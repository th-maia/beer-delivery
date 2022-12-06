import PropTypes from 'prop-types';

function removeComma(value) {
  return value ? value.toString().replace('.', ',') : null;
}

export default removeComma;

removeComma.propTypes = {
  value: PropTypes.string,
}.isRequired;
