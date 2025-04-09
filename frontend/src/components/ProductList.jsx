import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalWindow from './ModalWindow';
import ProductForm from './ProductForm';

const ProductList = ({ onDelete, onAddOrEdit, products }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmitModal = async (prod) => {
    await onAddOrEdit(prod);
    setShowModal(false);
  };

  return (
    <ul>
      {products.map((prod) => (
        <li key={prod.id}>
          {prod.name} - ${prod.price}
          <ModalWindow show={showModal} handleClose={() => setShowModal(false)}>
            <h2>Edit Product</h2>
            <ProductForm onAddOrEdit={(prod) => handleSubmitModal(prod)} product={prod} />
          </ModalWindow>
          <button onClick={() => setShowModal(true)}>Edit</button>
          <button onClick={() => onDelete(prod.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onAddOrEdit: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProductList;
