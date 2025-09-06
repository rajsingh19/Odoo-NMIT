import { Link } from "react-router-dom";

export default function ProductCard({ p, onAddToCart }) {
  return (
    <div
      className="card flex flex-col gap-3 p-3 rounded-xl border bg-white 
                 transition-all duration-300 ease-in-out 
                 hover:shadow-xl hover:scale-105"
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 grid place-items-center">
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={p.title}
            className="object-cover w-full h-full rounded-xl transition-transform duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          <div className="text-sm text-neutral-500">Image Placeholder</div>
        )}
      </div>
      <Link to={`/product/${p.id}`} className="font-semibold hover:text-blue-600 transition-colors">
        {p.title}
      </Link>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">₹ {p.price}</span>
        <button
          className="btn btn-primary"
          onClick={() => onAddToCart?.(p)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
