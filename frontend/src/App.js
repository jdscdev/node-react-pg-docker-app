import React, { useEffect, useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api/products';
import { useErrorHandler } from './hooks/useErrorHandler';
import { ErrorBoundary } from './components/ErrorBoundary';

const App = () => {
  const { error, handleError, clearError } = useErrorHandler();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    clearError();
    getProducts()
      .then(setProducts)
      .catch(handleError);
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
      <h1>Products</h1>
      {error && (
        <div style={{ color: 'red' }}>
          ⚠️ {error.message} (code: {error.code})
        </div>
      )}
      <ErrorBoundary>
        <ProductForm onAddOrEdit={handleAddProduct} />
        <ProductList onDelete={handleDeleteProduct} onAddOrEdit={handleUpdateProduct} products={products} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
