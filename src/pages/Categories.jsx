import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/categoriesSlice';
import { Category } from '../components/Category';

export const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data);
  const categoriesPending = useSelector(state => state.categories.categoriesPending);
  const categoriesError = useSelector(state => state.categories.categoriesError);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (categoriesPending) {
    return <div>Loading categories...</div>;
  }

  if (categoriesError) {
    return <div>Error loading categories: {categoriesError}</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {Object.keys(categories).map(categoryName => (
        <Category key={categoryName} categoryName={categoryName} />
      ))}
    </div>
  );
}