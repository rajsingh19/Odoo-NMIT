import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login(){
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    try{
      login(email, password);
      nav("/");
    }catch(ex){
      setErr(ex.message);
    }
  }

  return (
    <div className="container-app max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Welcome back</h1>
      <form onSubmit={onSubmit} className="card flex flex-col gap-3">
        {err && <div className="text-sm text-red-600">{err}</div>}
        <label className="label">Email</label>
        <input className="input" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        <label className="label">Password</label>
        <input className="input" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        <button className="btn btn-primary mt-2">Log in</button>
        <p className="text-sm text-neutral-600">No account? <Link to="/signup" className="text-brand-600 underline">Sign up</Link></p>
      </form>
    </div>
  )
}
