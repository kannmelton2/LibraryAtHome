import PropTypes from 'prop-types';

const libraryBookShape = PropTypes.shape({
  bookId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  libraryItemId: PropTypes.number.isRequired,
  onShelf: PropTypes.bool.isRequired,
});

export default { libraryBookShape };