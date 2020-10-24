import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const ProductListView = ({ item }) => {
  return (
    <>
      <ListGroup.Item>
        <div className='product-container'>
          <p className='product-title'>{item.itemName}</p>
          <div className='price-quantity'>
            <p className='product-price'>Price: ${item.price}</p>
            <p className='product-quantity'>Quantity: {item.quantity}</p>
          </div>
        </div>
      </ListGroup.Item>
      <style jsx>{`
        .product-container,
        .price-quantity {
          display: flex;
          justify-content: space-between;
        }

        .product-price {
          padding: 0 12px;
        }

        .product-quantity {
          padding: 0 12px;
        }
      `}</style>
    </>
  );
};

export default ProductListView;
