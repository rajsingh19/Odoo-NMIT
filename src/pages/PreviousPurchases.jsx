import { useAuth } from "../context/AuthContext";

export default function PreviousPurchases(){
  const { user } = useAuth();
  const key = `eco_orders_${user?.id ?? "anon"}`;
  const orders = JSON.parse(localStorage.getItem(key) || "[]");

  return (
    <div className="container-app">
      <h1 className="text-2xl font-semibold mb-4">Previous Purchases</h1>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="card text-neutral-600">No previous purchases.</div>
        ) : orders.map(o => (
          <div key={o.id} className="card">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Order • {new Date(o.createdAt).toLocaleString()}</div>
              <div className="font-semibold">₹ {o.total}</div>
            </div>
            <ul className="mt-2 list-disc pl-6 text-sm text-neutral-700">
              {o.items.map(i => <li key={i.id}>{i.title} — ₹ {i.price}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
