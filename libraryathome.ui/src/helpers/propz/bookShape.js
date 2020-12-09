  import PropTypes from 'prop-types';

const bookShape = PropTypes.shape({
  bookId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
});

export default { bookShape };