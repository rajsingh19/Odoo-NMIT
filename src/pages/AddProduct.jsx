import { useState } from "react";
import { useNavigate } from "react-router-dom";
import categories from "../data/categories";
import { useData } from "../context/DataContext";

export default function AddProduct(){
  const { addProduct } = useData();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const p = addProduct({ title, category, description, price: Number(price) });
    nav(`/product/${p.id}`);
  };

  return (
    <div className="container-app max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
      <form onSubmit={onSubmit} className="card grid gap-3">
        <div>
          <label className="label">Product Title</label>
          <input className="input" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="label">Category</label>
          <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Description</label>
          <textarea className="input min-h-[120px]" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label className="label">Price (₹)</label>
          <input className="input" type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <div>
          <label className="label">Image</label>
          <div className="aspect-[4/3] rounded-xl bg-neutral-100 grid place-items-center text-neutral-500">
            Image Placeholder
          </div>
        </div>
        <button className="btn btn-primary w-full mt-2">Submit Listing</button>
      </form>
    </div>
  )
}
