import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard(){
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || ""
  });

  const save = (e) => {
    e.preventDefault();
    updateProfile(form);
    alert("Saved!");
  };

  return (
    <div className="container-app max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>
      <form onSubmit={save} className="card grid gap-3">
        <div>
          <label className="label">Username</label>
          <input className="input" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <button className="btn btn-primary mt-2 w-full">Save</button>
      </form>
    </div>
  )
}
