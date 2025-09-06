import { Link, useParams, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useMemo, useState } from "react";

// Cart hook
function useCart(userId) {
  const key = `eco_cart_${userId}`;
  const add = (item) => {
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.push({
      id: crypto.randomUUID(),
      productId: item.id,
      price: item.price,
      title: item.title,
    });
    localStorage.setItem(key, JSON.stringify(arr));
  };
  return { add };
}

// Product Card Component (with hover effects)
export function ProductCard({ p, onAddToCart }) {
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
      <Link
        to={`/product/${p.id}`}
        className="font-semibold hover:text-blue-600 transition-colors"
      >
        {p.title}
      </Link>
      <div className="text-neutral-600">
        {p.category} • {p.location || "No location specified"}
      </div>
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

// Product Detail Page
export default function ProductDetail() {
  const { id } = useParams();
  const { products, updateProduct } = useData();
  const { user } = useAuth();
  const nav = useNavigate();
  const { add } = useCart(user?.id ?? "anon");

  const p = useMemo(() => products.find((x) => x.id === id), [products, id]);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    title: p?.title ?? "",
    description: p?.description ?? "",
    price: p?.price ?? 0,
    category: p?.category ?? "",
    imageUrl: p?.imageUrl ?? "",
  });

  if (!p) return <div className="container-app">Product not found.</div>;

  const isOwner = user?.id === p.ownerId;

  const save = () => {
    updateProduct(p.id, form);
    setEdit(false);
  };

  return (
    <div className="container-app grid md:grid-cols-2 gap-6">
      {/* Product Image */}
      <div
        className="card aspect-[4/3] grid place-items-center text-neutral-500 overflow-hidden rounded-xl
                   transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
      >
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={p.title}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          "Image Placeholder"
        )}
      </div>

      {/* Product Details */}
      <div className="card space-y-3 p-3 rounded-xl border bg-white transition-all duration-300 ease-in-out hover:shadow-lg">
        {edit ? (
          <>
            <input
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              className="input min-h-[120px]"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <input
              className="input"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
            <input
              className="input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              className="input"
              value={form.imageUrl || ""}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="Paste image URL"
            />
            <div className="flex gap-2">
              <button className="btn btn-primary" onClick={save}>
                Save
              </button>
              <button className="btn btn-muted" onClick={() => setEdit(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">{p.title}</h1>
            <div className="text-neutral-600">
              {p.category} • {p.location || "No location specified"}
            </div>
            <div className="text-lg font-semibold">₹ {p.price}</div>
            <p className="text-neutral-700">
              {p.description || "No description provided."}
            </p>
            <div className="flex gap-2">
              <button className="btn btn-primary" onClick={() => add(p)}>
                Add to cart
              </button>
              {isOwner && (
                <button className="btn btn-muted" onClick={() => setEdit(true)}>
                  Edit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
