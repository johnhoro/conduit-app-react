import React from "react";

function Pagination(props) {
  let {
    articlesCount,
    articlesPerPage,
    activePageIndex,
    updateCurrentPageIndex,
  } = props;
  let numberOfPage = Math.ceil(articlesCount / articlesPerPage);
  let pagesArray = [];

  for (let i = 1; i <= numberOfPage; i++) {
    pagesArray.push(i);
  }

  return (
    <>
      <div className="pagination flex">
        <div className="prev">
          <p
            onClick={() =>
              updateCurrentPageIndex(
                activePageIndex - 1 < 1 ? 1 : activePageIndex - 1
              )
            }
          >
            Prev
          </p>
        </div>
        <div className="pagination-count flex warp">
          {pagesArray.map((page, i) => (
            <span
              key={i}
              onClick={() => updateCurrentPageIndex(page)}
              className={`${activePageIndex === page ? `active` : ``}`}
            >
              {page}
            </span>
          ))}
        </div>
        <div className="next">
          <p
            onClick={() =>
              updateCurrentPageIndex(
                activePageIndex + 1 > numberOfPage
                  ? numberOfPage
                  : activePageIndex + 1
              )
            }
          >
            Next
          </p>
        </div>
      </div>
    </>
  );
}

export default Pagination;
