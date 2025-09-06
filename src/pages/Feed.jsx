import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import ProductCard from "../components/ProductCard";
import CategoryPills from "../components/CategoryPills";
import SearchBar from "../components/SearchBar";
import categories from "../data/categories";


function useCart(userId){
  const key = `eco_cart_${userId}`;
  const add = (item) => {
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.push({ id: crypto.randomUUID(), productId: item.id, price: item.price, title: item.title });
    localStorage.setItem(key, JSON.stringify(arr));
  };
  return { add };
}

export default function Feed(){
  const { products } = useData();
  const { user } = useAuth();
  const { add } = useCart(user?.id ?? "anon");

  const [q, setQ] = useState("");
  const [cat, setCat] = useState(null);
  const [loc, setLoc] = useState("");

  
  const filtered = useMemo(() => {
    return products.filter(p => {
      const byCat = cat ? p.category === cat : true;
      const byQ = q ? p.title.toLowerCase().includes(q.toLowerCase()) : true;
      const byLoc = loc ? (p.location || "").toLowerCase().includes(loc.toLowerCase()) : true;
      return byCat && byQ && byLoc;
    });
  }, [products, q, cat, loc]);

  return (
    <div className="container-app">
     
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Discover pre-loved gems</h1>
        <Link to="/add" className="btn btn-primary">+ Add Listing</Link>
      </div>

     
      <div className="card mb-4 flex flex-col gap-3 p-3 rounded-xl border bg-white">
        <SearchBar value={q} onChange={setQ} placeholder="Search by title..." />
        <input
          type="text"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          placeholder="Filter by location..."
          className="input"
        />
        <CategoryPills categories={categories} active={cat} onSelect={setCat} />
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(p => (
          <ProductCard key={p.id} p={p} onAddToCart={add} />
        ))}
      </div>
    </div>
  );
}
