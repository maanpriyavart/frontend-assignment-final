import { useState } from "react";
import Link from "next/link";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";

export default function Home({ products }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleSearch = (value) => {
    setLoading(true);
    setSearch(value);
    setCurrentPage(1);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-4">Product Listing</h1>

        <SearchBar
          search={search}
          setSearch={handleSearch}
        />

        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="row">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    key={product.id}
                  >
                    <Link
                      href={`/product/${product.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div
                        className="card h-100 shadow-sm"
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="card-img-top p-4"
                          style={{
                            height: "220px",
                            objectFit: "contain",
                          }}
                        />

                        <div className="card-body d-flex flex-column">
                          <h6>{product.title}</h6>

                          <p className="text-success fw-bold">
                            ${product.price}
                          </p>

                          <button className="btn btn-dark mt-auto">
                            View Details
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center mt-5">
                  <h3>No Products Found</h3>
                </div>
              )}
            </div>

            {filteredProducts.length > productsPerPage && (
              <div className="d-flex justify-content-center gap-3 my-4">
                <button
                  className="btn btn-outline-primary"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(currentPage - 1)
                  }
                >
                  Previous
                </button>

                <span className="fw-bold mt-2">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className="btn btn-outline-primary"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage(currentPage + 1)
                  }
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const products = await res.json();

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      props: {
        products: [],
      },
    };
  }
}