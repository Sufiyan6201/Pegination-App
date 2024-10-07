import { useEffect, useState } from "react";

function Peginetion() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  // Filtering based on search term
  const filteredProducts = products.filter((product) =>
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting the filtered products
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentItems = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const changeSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const changePage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand">Brands</a>
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </nav>
      <div className="container">
        <h1 className="text-center my-3">Products</h1>
        <div className="d-md-flex justify-content-md-start">
          <button
            onClick={changeSortOrder}
            className="btn btn-start text-dark btn-outline-success mb-3"
          >
            Sort by Price: {sortOrder === "asc" ? "Low to high" : "High to low"}
          </button>
        </div>
        <div className="row">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div className="col-md-4 d-flex" key={item.id}>
                <div className="card mb-3">
                  <img
                    src={item.image}
                    className="card-img-top object-fit-contain"
                    height="250px"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.descripton}</p>
                    <p className="card-text">
                      <strong className="text-body-secondary">
                        Price: ₹{item.price * 80}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p>No results found</p>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => changePage(currentPage - 1)}
            hidden={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className="btn btn-primary"
              onClick={() => changePage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-success" onClick={() => changePage(currentPage + 1)}
            hidden={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Peginetion;
