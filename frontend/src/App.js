import React, { useEffect, useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api/products';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleAddProduct = async (product) => {
    const newProduct = await createProduct(product);
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = async (product) => {
    const updatedProduct = await updateProduct(product.id, product);
    const updatedProducts = products.map((prod) => (prod.id === product.id ? updatedProduct : prod));
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    setProducts(products.filter((prod) => prod.id !== id));
  };

  return (
    <div>
      <h1>Product Manager</h1>
      <ProductForm onAddOrEdit={handleAddProduct} />
      <ProductList onDelete={handleDeleteProduct} onAddOrEdit={handleUpdateProduct} products={products} />
    </div>
  );
};

export default App;
