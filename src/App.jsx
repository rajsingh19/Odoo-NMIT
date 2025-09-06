import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Feed from "./pages/Feed";
import AddProduct from "./pages/AddProduct";
import MyListings from "./pages/MyListings";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import PreviousPurchases from "./pages/PreviousPurchases";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

function Protected({ children }){
  const { user } = useAuth();
  if(!user) return <Navigate to="/login" replace />
  return children;
}

export default function App(){
  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen bg-neutral-50">
          <Header />
          <main className="container-app py-6">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/add" element={<Protected><AddProduct /></Protected>} />
              <Route path="/my-listings" element={<Protected><MyListings /></Protected>} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
              <Route path="/cart" element={<Protected><Cart /></Protected>} />
              <Route path="/purchases" element={<Protected><PreviousPurchases /></Protected>} />
            </Routes>
          </main>
        </div>
      </DataProvider>
    </AuthProvider>
  )
}
