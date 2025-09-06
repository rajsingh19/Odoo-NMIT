import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";

function useCart(userId){
  const key = `eco_cart_${userId}`;
  const get = () => JSON.parse(localStorage.getItem(key) || "[]");
  const set = (arr) => localStorage.setItem(key, JSON.stringify(arr));
  const clear = () => set([]);
  const remove = (id) => set(get().filter(i => i.id !== id));
  return { get, set, clear, remove };
}

export default function Cart(){
  const { user } = useAuth();
  const cart = useCart(user?.id ?? "anon");
  const [items, setItems] = useState(cart.get());
  const total = useMemo(() => items.reduce((a,b) => a + Number(b.price), 0), [items]);

  const checkout = () => {
    const orderKey = `eco_orders_${user?.id ?? "anon"}`;
    const orders = JSON.parse(localStorage.getItem(orderKey) || "[]");
    orders.push({ id: crypto.randomUUID(), items, total, createdAt: Date.now() });
    localStorage.setItem(orderKey, JSON.stringify(orders));
    cart.clear();
    setItems([]);
    alert("Purchased! 🎉");
  };

  return (
    <div className="container-app">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <div className="card">
        {items.length === 0 ? (
          <div className="text-neutral-600">Your cart is empty.</div>
        ) : (
          <div className="space-y-3">
            {items.map(i => (
              <div key={i.id} className="flex items-center justify-between border-b last:border-0 py-2">
                <div>
                  <div className="font-medium">{i.title}</div>
                  <div className="text-sm text-neutral-600">₹ {i.price}</div>
                </div>
                <button className="btn btn-muted" onClick={() => { cart.remove(i.id); setItems(cart.get()); }}>Remove</button>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <div className="text-lg font-semibold">Total: ₹ {total}</div>
              <button className="btn btn-primary" onClick={checkout}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
