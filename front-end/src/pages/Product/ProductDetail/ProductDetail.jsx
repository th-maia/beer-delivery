import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  console.log('ProductDetail');
  return (
    <div>
      <h1>
        ProductDetail:
        { id }
      </h1>
    </div>
  );
}

export default ProductDetail;
