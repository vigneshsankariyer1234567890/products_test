import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePage } from '../store/categoriesSlice';
import { Product } from '../components/Product';
import { PageSelector } from '../components/PageSelector';
import { fetchProductsByCategory } from '../store/categoriesSlice';

export const Products = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const { products, page, pageSize, hasMore, productsPending, productsError } = useSelector(state => state.categories.data[categoryName] || {});

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryName));
  }, [dispatch, categoryName]);

  const setPage = (newPage) => {
    dispatch(updatePage({ category: categoryName, newPage, newHasMore: newPage * pageSize < products.length }));
  };

  if (productsPending) {
    return <div>Loading products...</div>;
  }

  if (productsError) {
    return <div>Error loading products: {productsError}</div>;
  }

  return (
    <div>
      <div className="flex flex-col space-y-4">
        {products && products.slice((page - 1) * pageSize, page * pageSize).map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <PageSelector currentPage={page} setPage={setPage} hasMore={hasMore} />
    </div>
  );
}