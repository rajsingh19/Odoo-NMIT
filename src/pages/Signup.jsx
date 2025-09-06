import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup(){
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    try{
      signup(email, password, username);
      nav("/");
    }catch(ex){
      setErr(ex.message);
    }
  }

  return (
    <div className="container-app max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Create your account</h1>
      <form onSubmit={onSubmit} className="card flex flex-col gap-3">
        {err && <div className="text-sm text-red-600">{err}</div>}
        <label className="label">Username</label>
        <input className="input" value={username} onChange={e => setUsername(e.target.value)} required />
        <label className="label">Email</label>
        <input className="input" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        <label className="label">Password</label>
        <input className="input" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        <button className="btn btn-primary mt-2">Sign up</button>
        <p className="text-sm text-neutral-600">Already have an account? <Link to="/login" className="text-brand-600 underline">Log in</Link></p>
      </form>
    </div>
  )
}
