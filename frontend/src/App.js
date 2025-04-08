import React, { useEffect, useState } from 'react';
import './css/App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(setProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = e => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(() => {
        setNewProduct({ name: '', price: '' });
        fetchProducts();
      });
  };

  const handleDelete = id => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    }).then(fetchProducts);
  };

  return (
    <div className="App">
      <h1>Product Manager</h1>
      <input name="name" value={newProduct.name} onChange={handleChange} placeholder="Name" />
      <input name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" type="number" />
      <button onClick={handleAdd}>Add Product</button>
      <ul>
        {products.map(p => (
          <li key="prodid_{p.id}">
            {p.name} - ${p.price}
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
