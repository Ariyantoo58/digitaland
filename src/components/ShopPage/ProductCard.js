import Link from 'next/link';
import React from 'react';
import { Col, Image } from 'react-bootstrap';

const ProductCard = ({ product = {} }) => {
  const {
    category,
    created_at,
    data,
    description,
    image_link,
    stars,
    title,
    price,
    live_link,
  } = product;

  return (
    <Col sm={12} md={6} lg={4}>
      <div className="product-card">
        <div className="product-card__image">
          <Image src={image_link} alt="" />
          <div className="product-card__buttons">
            <Link href={live_link} target="_blank" rel="noopener noreferrer">
              <a className="theme-btn btn-style-one">
                <i className="btn-curve"></i>
                <span className="btn-title">Live view</span>
              </a>
            </Link>
            <Link href="/product-details">
              <a className="theme-btn btn-style-two">
                <i className="btn-curve"></i>
                <span className="btn-title">Detail</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="product-card__content">
          <h3 className="product-card__title">
            <Link href="/product-details">{title}</Link>
          </h3>
          <p className="product-card__price">${price}</p>
          <div className="product-card__stars">
            {Array.from(Array(stars)).map((_, i) => (
              <i key={i} className="fa fa-star"></i>
            ))}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
