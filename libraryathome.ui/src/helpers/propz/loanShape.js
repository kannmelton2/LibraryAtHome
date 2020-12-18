import PropTypes from 'prop-types';

const loanShape = PropTypes.shape({
  loanId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  borrowerId: PropTypes.number.isRequired,
  loanDate: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  Returned: PropTypes.bool,
});

export default { loanShape };