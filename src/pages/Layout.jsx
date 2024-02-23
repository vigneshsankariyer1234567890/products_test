import { Link, useLocation, Outlet } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  let title = 'Categories'; // Default title

  if (location.pathname.startsWith('/category/')) {
    // Extracts category name from the path and capitalizes it
    const categoryName = location.pathname.split('/category/')[1];
    title = `Products for ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`;
  }

  return (
    <>
      <nav className="bg-blue-500 text-white p-4">
        <Link to="/">Home</Link>
      </nav>
      <header className="text-3xl font-bold text-blue-600 mb-4">
        <h1>{title}</h1>
      </header>
      <main className="p-8 bg-gray-100">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;


export {Layout as NavigationLayout};
