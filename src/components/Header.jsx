import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.svg";

export default function Header(){
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="container-app flex items-center justify-between py-3 gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="EcoFinds" className="h-7 w-7" />
          <span className="font-semibold tracking-tight">EcoFinds</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-2">
          <NavLink to="/" className="pill">Browse</NavLink>
          <NavLink to="/add" className="pill">Add</NavLink>
          <NavLink to="/my-listings" className="pill">My Listings</NavLink>
          <NavLink to="/cart" className="pill">Cart</NavLink>
          <NavLink to="/purchases" className="pill">Previous</NavLink>
          <NavLink to="/dashboard" className="pill">Dashboard</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-neutral-600">Hi, {user.username || user.email}</span>
              <button className="btn btn-muted" onClick={() => { logout(); nav('/'); }}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-muted">Log in</NavLink>
              <NavLink to="/signup" className="btn btn-primary">Sign up</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
