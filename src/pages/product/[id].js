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
            src={product.thumbnail}
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

          <p className="mt-3">
            <strong>Rating:</strong> ⭐ {product.rating}
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
  try {
    const { id } = context.params;

    const res = await fetch(
      `https://dummyjson.com/products/${id}`
    );

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    const product = await res.json();

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);

    return {
      notFound: true,
    };
  }
}