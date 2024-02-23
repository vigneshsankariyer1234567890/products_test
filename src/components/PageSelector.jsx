import PropTypes from 'prop-types';

const PageSelector = ({ currentPage, setPage, hasMore }) => {
  return (
    <div className="flex justify-center items-center space-x-4 my-4">
      <button 
        onClick={() => setPage(currentPage - 1)} 
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button 
        onClick={() => setPage(currentPage + 1)} 
        disabled={!hasMore}
      >
        Next
      </button>
    </div>
  );
};

PageSelector.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired
};

export {PageSelector};
