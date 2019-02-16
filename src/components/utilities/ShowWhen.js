import PropTypes from 'prop-types';

ShowWhen.propTypes = {
  condition: PropTypes.any,
};

export function ShowWhen({ condition, children }) {
  if (condition) return children;
  return null;
}
