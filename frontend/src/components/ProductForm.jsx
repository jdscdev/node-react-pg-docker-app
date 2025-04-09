import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProductForm = ({ onAddOrEdit, product }) => {
  const buttonText = product ? "Edit Product" : "Add Product";
  const [changedProduct, setChangedProduct] = useState(product || { id: 0, name: '', price: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAddOrEdit(changedProduct);
    setChangedProduct({ id: 0, name: '', price: 0 });
  };

  const handleChange = (propName, propValue) => {
    setChangedProduct({ ...changedProduct, [propName]: propValue });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="id"
        type="hidden"
        value={parseInt(changedProduct.id)}
        required
      />
      <input
        name="name"
        type="text"
        placeholder="Product Name"
        value={changedProduct.name}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        min="0"
        step="0.01"
        value={parseFloat(changedProduct.price)}
        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}
        required
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

ProductForm.propTypes = {
  onAddOrEdit: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })
};

export default ProductForm;
