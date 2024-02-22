import React, { useState, useEffect } from "react";
import "./pairs.page.css";
import logo from "./assets/logo.svg";
import { Link } from "react-router-dom";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";
import data from "./assets/data.json";
import { Pagination } from "./components/pagination";
import { useLocation } from "react-router-dom";

export const Pairs = () => {
  const [show, setShow] = useState({ from: 1, to: 5 });
  const location = useLocation();
  const activePage = location.search.split("=")[1] || 1;

  useEffect(() => {
    const from = (activePage - 1) * 5;
    const to = from + 5;
    setShow({ from, to });
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="pairs">
      <header className="pairs-header">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        <nav className="pairs-nav">
          <ul className="pairs-nav-list">
            <li>
              <Link to="/pairs">About</Link>
            </li>
            <li>
              <div>
                <button>
                  <span>Supported currencies</span>
                  <RiArrowDownSFill />
                </button>
              </div>
            </li>
            <li>
              <Link to="/orders">Reviews</Link>
            </li>
            <li>
              <div>
                <button>
                  <span>Earn with us</span>
                  <RiArrowDownSFill />
                </button>
              </div>
            </li>
            <li>
              <Link to="/trades">F.A.Q.</Link>
            </li>
            <li>
              <Link to="/trades">Blog</Link>
            </li>
            <li>
              <div>
                <button>
                  <span>EN</span>
                  <RiArrowDownSFill />
                </button>
              </div>
            </li>
            <li>
              <label className="nav-search">
                <RiSearchLine />
                <input type="text" placeholder="Order ID" />
              </label>
            </li>
          </ul>
        </nav>
      </header>

      <div className="pairs-content">
        <h1>Sitemap Cypro Pairs</h1>

        <div className="pairs-list">
          {data?.slice(show.from, show.to)?.map((pair, index) => {
            const keys = Object.keys(pair);
            return (
              <div className="pairs-list-item" key={index}>
                <div className="pairs-list-item__header">
                  <h2>
                    <span>{keys}</span>
                    <i>{keys}</i>
                  </h2>
                </div>
                <div className="pairs-list-item__content">
                  {pair[keys].map((value, index) => {
                    const url = geturl(value);
                    const search = location?.search || "?page=1";
                    return (
                      <Link to={url + search} key={index}>
                        {value}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <Pagination count={data.length / 5} />
      </div>
    </div>
  );
};

function geturl(value) {
  const [v1, v2] = value.split(" to ");
  return `/exchange/${v1.toLowerCase()}/${v2.toLowerCase()}`;
}
