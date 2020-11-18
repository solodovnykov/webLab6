import "../styles/App.css";
import React, { useEffect } from "react";
import ItemCard from "../Components/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
import {filterByPrice} from "../actions/catalogActions";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import LoadingRectangle from "../Components/LoadingRectangle";

function Catalog() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;


  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);


  return (
    <div>
      {loading ? (
        <div className="container catalog-load-wrapper">
          <LoadingRectangle height="100px" width="100%" />
          <div className="catalog-load">
            {[...Array(6)].map((x, i) => (
              <LoadingBox className="catalog-load" key={i} />
            ))}
          </div>
        </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="Catalog container">
          <div className="catalog-header">
            <div className="catalog-filter-by-price">
              <span className="catalog-filter-text">Filter</span>
              <select className="catalog-filter-list">
                <option value="asc" className="catalog-filter-item">ASC</option>
                <option value="desc" className="catalog-filter-item">DESC</option>
              </select>
            </div>
          </div>
          <div className="catalog-card-wrapper">
            {products.map((info) => {
              return <ItemCard key={info.__id} product={info} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalog;
