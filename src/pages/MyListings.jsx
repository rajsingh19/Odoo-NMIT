import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import EmptyState from "../components/EmptyState";

export default function MyListings(){
  const { myProducts, deleteProduct } = useData();

  if(myProducts.length === 0){
    return (
      <div className="container-app">
        <EmptyState title="You haven't listed anything yet" hint="Start by adding your first product." action={<Link to="/add" className="btn btn-primary mt-4">+ Add Product</Link>} />
      </div>
    )
  }

  return (
    <div className="container-app">
      <h1 className="text-2xl font-semibold mb-4">My Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {myProducts.map(p => (
          <div key={p.id} className="card space-y-2">
            <Link to={`/product/${p.id}`} className="font-semibold">{p.title}</Link>
            <div className="text-neutral-600 text-sm">₹ {p.price} • {p.category}</div>
            <div className="flex gap-2">
              <Link to={`/product/${p.id}`} className="btn btn-muted">Edit</Link>
              <button className="btn btn-muted" onClick={() => deleteProduct(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
