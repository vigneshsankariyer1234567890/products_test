import PropTypes from 'prop-types';

const Product = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
      <h3 className="font-bold text-lg">{product.title}</h3>
      <p>{product.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-600">${product.price}</span>
        <span>{product.category}</span>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired
};

export {Product};
