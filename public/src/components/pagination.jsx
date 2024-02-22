import React, { memo } from "react";
import "./pagination.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

export const Pagination = memo(({ count }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.search.split("=")[1] || 1;
  const pages = Math.ceil(count);

  const handlePageChange = (page) => {
    navigate(`${location.pathname}?page=${page}`);
  };

  const handleNextPage = () => {
    if (+activePage >= pages) return;
    const page = +activePage + 1;
    navigate(`${location.pathname}?page=${page}`);
  };

  const handlePrevPage = () => {
    if (+activePage === 1) return;
    const page = +activePage - 1;
    navigate(`${location.pathname}?page=${page}`);
  };

  const showPages = pagesCount(pages, activePage);
  return (
    <div className="pagination">
      <button disabled={+activePage <= 1} onClick={handlePrevPage}>
        <MdArrowBackIos />
      </button>

      <div className="pagination__buttons">
        {showPages.map((page, index) => {
          const active = +page === +activePage ? "active" : "";
          const disabled = page === "..." ? true : false;
          return (
            <button
              onClick={() => handlePageChange(page)}
              key={index}
              className={active + " "}
              disabled={disabled}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNextPage}
        aria-label="next page"
        disabled={+activePage >= pages}
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
});

function pagesCount(length, page) {
  let start, end;
  // [1, 2, 3, 4, 5, ... 22]
  // [1, ... 5, 6, 7, 8, 9, ... 22]
  // [1, ... 18, 19, 20, 21, 22]
  // length > 5 and page < 5 => [1, 2, 3, 4, 5, ... 22]
  // length > 5 and page > length - 4 => [1, ... 18, 19, 20, 21, 22]
  // length > 5 and page >= 5 and page <= length - 4 => [1, ... 5, 6, 7, 8, 9, ... 22]
  const res = [];
  if (length > 5 && +page < 5) {
    start = 1;
    end = 5;
  } else if (length > 5 && +page > length - 4) {
    start = length - 4;
    end = length;
  } else {
    start = +page - 1;
    end = +page + 1;
  }

  for (let i = start; i <= end; i++) {
    if (i === start && i !== 1) {
      res.push(1, "...");
    }

    res.push(i);
  }

  if (end !== length) {
    res.push("...", length);
  }

  return res;
}
