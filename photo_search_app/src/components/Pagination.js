

const Pagination = ({ changePerPage, perPage, prevPage, nextPage, handlePrev, handleNext }) => {


return(
    <div className="pagination-container">
        <button
          className="button"
          disabled={prevPage == null}
          onClick={handlePrev}
        >
          Previous Page
        </button>
        <button
          className="button"
          disabled={nextPage == null}
          onClick={handleNext}
        >
          Next Page
        </button>
        <label className="pagination-label">
          Photos per Page:
        </label>
        <input
          className="pagination-input"
          type="number"
          min="1"
          max="80"
          value={perPage}
          onChange={(event) => changePerPage(event.target.value)}
        />
      </div>
);
}

export default Pagination;