import React from 'react';

const ProductList = ({ onDelete, products }) => (
  <ul>
    {products.map((prod) => (
      <li key={prod.id}>
        {prod.name} - ${prod.price}
        <button onClick={() => {}}>Edit</button>
        <button onClick={() => onDelete(prod.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default ProductList;
