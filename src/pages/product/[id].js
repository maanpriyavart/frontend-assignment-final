import axios from "axios";
import Link from "next/link";

export default function ProductDetails({ product }) {
  return (
    <div className="container py-5">

      <Link href="/" className="btn btn-secondary mb-4">
        ← Back to Products
      </Link>

      <div className="row">

        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="col-md-7">

          <h2>{product.title}</h2>

          <span className="badge bg-primary mb-3">
            {product.category}
          </span>

          <h3 className="text-success">
            ${product.price}
          </h3>

          <p>
            ⭐ {product.rating.rate} ({product.rating.count} Reviews)
          </p>

          <hr />

          <h5>Description</h5>

          <p>{product.description}</p>

        </div>

      </div>

    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const response = await axios.get(
    `https://fakestoreapi.com/products/${id}`
  );

  return {
    props: {
      product: response.data,
    },
  };
}