import { shopPage } from '@/data/shopPage';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CustomSelect from '../Reuseable/CustomSelect';
import ProductCard from './ProductCard';
import { supabaseClient } from 'src/config/supabaseClient';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

const options = [
  { label: 'Sort by Price', value: 'price' },
  { label: 'Sort by Date', value: 'created_at' },
  { label: 'Sort by Ratings', value: 'stars' },
];

const { categories } = shopPage;

const ShopPage = () => {
  const [sliderValue, setSliderValue] = useState([30, 150]);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(null);
  const [categories, setCategories] = useState([]);

  console.log(router.query.category, 'router');

  const filters = {
    category: 2,
  };

  const [sortBy, setSortBy] = useState('Sort by Pric');

  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Calculate offset
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      // Build base query
      let query = supabaseClient.from('products').select('*');

      if (router?.query?.category) {
        query = query.eq('categoryId', router?.query?.category);
      }

      if (router?.query?.searchQuery) {
        query = query.or(`title.ilike.%${router?.query?.searchQuery}%`);
      }

      // Get total count with filters

      // // Fetch paginated data with filters
      const res = await query
        .range(from, to)
        .select('*', { count: 'exact' })
        .order(router?.query?.sort ? router.query.sort : 'id', {
          ascending: false,
        });

      const { data, count, error } = res;

      console.log(res, 'countt');

      // if (error) throw error;

      if (error) throw error;
      setProducts(data);
    } catch (err) {
      console.error('Error fetching contact:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    const { data, error } = await supabaseClient.from('categories').select('*');
    setCategories(data);
  };

  const handleSelectSortBy = ({ value }) => {
    router.query.sort = value;
    fetchProducts();
    router.push(router);
  };

  const handleSlideChange = (value) => {
    setSliderValue(value);
  };

  const handleCategory = (category) => {
    router.query.category = category.id;
    fetchProducts();
    router.push(router);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    router.query.searchQuery = formData.get('search');
    fetchProducts();
    router.push(router);
  };

  useEffect(() => {
    getCategories();
    fetchProducts();
  }, [router.isReady, router.query.category]);

  if (!products) {
    return 'LOADING ...';
  }

  return (
    <section className="shop-page">
      <div className="auto-container">
        <Row>
          <Col lg={3}>
            <div className="shop-sidebar">
              <div className="shop-search shop-sidebar__single">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search"
                    name="search"
                    defaultValue={
                      router?.query?.searchQuery
                        ? router?.query?.searchQuery
                        : ''
                    }
                  />
                  <button type="submit">
                    <i className="flaticon-magnifying-glass"></i>
                  </button>
                </form>
              </div>
              <div className="shop-range shop-sidebar__single">
                <h3 className="shop-sidebar__title">Price</h3>
                <div className="product-sidebar__price-range">
                  <Slider
                    range
                    allowCross={false}
                    value={sliderValue}
                    onChange={handleSlideChange}
                    max={200}
                    min={10}
                    className="range-slider-price"
                    id="range-slider-price"
                    draggableTrack
                  />
                  <div className="form-group">
                    <div className="left">
                      <p>
                        $
                        <span id="min-value-rangeslider">{sliderValue[0]}</span>
                      </p>
                      <span>-</span>
                      <p>
                        $
                        <span id="max-value-rangeslider">{sliderValue[1]}</span>
                      </p>
                    </div>
                    <div className="right">
                      <button className="theme-btn btn-style-one">
                        <i className="btn-curve"></i>
                        <span className="btn-title">Filter</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shop-category shop-sidebar__single">
                <h3 className="shop-sidebar__title">Categories</h3>
                <ul className="list-unstyled">
                  {categories.map((category, i) => (
                    <li key={i} onClick={() => handleCategory(category)}>
                      <a>{category.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
          <Col lg={9}>
            <div className="product-sorting default-form">
              <p>Showing 1–9 of 12 results</p>
              <div className="form-group">
                <CustomSelect
                  name="sortBy"
                  options={options}
                  onChange={handleSelectSortBy}
                  instanceId="sortBySelect21"
                  defaultValue={options[0]}
                />
              </div>
            </div>

            <Row>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Row>

            <div className="text-center load-more-products">
              <a className="theme-btn btn-style-one" href="#">
                <i className="btn-curve"></i>
                <span className="btn-title">Load More</span>
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ShopPage;
