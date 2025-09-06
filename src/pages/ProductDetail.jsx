import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useMemo, useState } from "react";

function useCart(userId){
  const key = `eco_cart_${userId}`;
  const add = (item) => {
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.push({ id: crypto.randomUUID(), productId: item.id, price: item.price, title: item.title });
    localStorage.setItem(key, JSON.stringify(arr));
  };
  return { add };
}

export default function ProductDetail(){
  const { id } = useParams();
  const { products, updateProduct } = useData();
  const { user } = useAuth();
  const nav = useNavigate();
  const { add } = useCart(user?.id ?? "anon");

  const p = useMemo(() => products.find(x => x.id === id), [products, id]);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ title: p?.title ?? "", description: p?.description ?? "", price: p?.price ?? 0, category: p?.category ?? "" });

  if(!p) return <div className="container-app">Product not found.</div>;

  const isOwner = user?.id === p.ownerId;

  const save = () => {
    updateProduct(p.id, form);
    setEdit(false);
  };

  return (
    <div className="container-app grid md:grid-cols-2 gap-6">
      <div className="card aspect-[4/3] grid place-items-center text-neutral-500">Image Placeholder</div>
      <div className="card space-y-3">
        {edit ? (
          <>
            <input className="input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <textarea className="input min-h-[120px]" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <input className="input" type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
            <input className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <div className="flex gap-2">
              <button className="btn btn-primary" onClick={save}>Save</button>
              <button className="btn btn-muted" onClick={() => setEdit(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">{p.title}</h1>
            <div className="text-neutral-600">{p.category}</div>
            <div className="text-lg font-semibold">₹ {p.price}</div>
            <p className="text-neutral-700">{p.description || "No description provided."}</p>
            <div className="flex gap-2">
              <button className="btn btn-primary" onClick={() => add(p)}>Add to cart</button>
              {isOwner && <button className="btn btn-muted" onClick={() => setEdit(true)}>Edit</button>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
