import bg from '@/images/background/image-7.jpg';
import Link from 'next/link';
import React from 'react';

const PageBanner = ({
  title = '',
  page = '',
  parent = '',
  parentHref = '/',
}) => {
  return (
    <section className="page-banner">
      <div
        className="image-layer"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div>
      <div className="shape-1"></div>
      <div className="shape-2"></div>
      <div className="banner-inner">
        <div className="auto-container">
          <div className="inner-container clearfix">
            <h1>{title}</h1>
            <div className="page-nav">
              <ul className="bread-crumb clearfix">
                <li>
                  <Link legacyBehavior href="/index-main">
                    Home
                  </Link>
                </li>
                {parent && (
                  <li>
                    <Link legacyBehavior href={parentHref}>
                      {parent}
                    </Link>
                  </li>
                )}
                <li className="active">{page || title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
