import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Category = ({ categoryName }) => {
  return (
    <Link to={`/category/${categoryName}`} className="block border rounded p-4 hover:bg-gray-100">
      <div className="text-center">
        <img src={`https://source.unsplash.com/random/200x200?${categoryName}`} alt={categoryName} className="mx-auto mb-2" />
        <p className="font-semibold">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</p>
      </div>
    </Link>
  );
};

Category.propTypes = {
  categoryName: PropTypes.string.isRequired
};

export {Category};
