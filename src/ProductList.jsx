function Product({ title, price, description, category, image }) {
  // todo: show product here
  return <></>;
}

export default function ProductList() {
  return (
    <main className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Product List</h1>

      {/* show category here */}
      <ul className="list-disc pl-5 mb-4"></ul>

      {/* show products here */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></ul>
    </main>
  );
}
