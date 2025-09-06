import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import uuid from "../utils/uuid";

const DataCtx = createContext(null);

const LS_PRODUCTS = "eco_products";

function getProducts() {
  return JSON.parse(localStorage.getItem(LS_PRODUCTS) || "[]");
}
function setProducts(p) {
  localStorage.setItem(LS_PRODUCTS, JSON.stringify(p));
}

export function DataProvider({ children }) {
  const [products, setProductsState] = useState(getProducts());
  const { user } = useAuth();

  useEffect(() => {
    const stored = getProducts();
    setProductsState(stored);
  }, []);

  // ✅ Enhanced addProduct with location & coordinates
  const addProduct = (prod) => {
    const p = {
      ...prod,
      id: uuid(),
      ownerId: user?.id ?? "anon",
      createdAt: Date.now(),
      location: prod.location || "", // city / area name
      lat: prod.lat || null,
      lng: prod.lng || null,
    };
    const next = [p, ...getProducts()];
    setProducts(next);
    setProductsState(next);
    return p;
  };

  const updateProduct = (id, patch) => {
    const next = getProducts().map((p) =>
      p.id === id ? { ...p, ...patch } : p
    );
    setProducts(next);
    setProductsState(next);
  };

  const deleteProduct = (id) => {
    const next = getProducts().filter((p) => p.id !== id);
    setProducts(next);
    setProductsState(next);
  };

  const myProducts = useMemo(
    () => products.filter((p) => p.ownerId === user?.id),
    [products, user]
  );

  return (
    <DataCtx.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, myProducts }}
    >
      {children}
    </DataCtx.Provider>
  );
}

export function useData() {
  return useContext(DataCtx);
}
