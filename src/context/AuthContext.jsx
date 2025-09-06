import { createContext, useContext, useEffect, useState } from "react";
import uuid from "../utils/uuid";

const AuthCtx = createContext(null);

const LS_USERS = "eco_users";
const LS_SESSION = "eco_session";

function getUsers(){
  return JSON.parse(localStorage.getItem(LS_USERS) || "[]");
}
function setUsers(users){
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}
function getSession(){
  return JSON.parse(localStorage.getItem(LS_SESSION) || "null");
}

export function AuthProvider({ children }){
  const [user, setUser] = useState(getSession());

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if(!found) throw new Error("Invalid credentials");
    localStorage.setItem(LS_SESSION, JSON.stringify(found));
    setUser(found);
  };

  const signup = (email, password, username) => {
    const users = getUsers();
    if(users.some(u => u.email === email)) throw new Error("Email already exists");
    const newUser = { id: uuid(), email, password, username };
    users.push(newUser);
    setUsers(users);
    localStorage.setItem(LS_SESSION, JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem(LS_SESSION);
    setUser(null);
  };

  const updateProfile = (patch) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    users[idx] = { ...users[idx], ...patch };
    setUsers(users);
    localStorage.setItem(LS_SESSION, JSON.stringify(users[idx]));
    setUser(users[idx]);
  };

  return <AuthCtx.Provider value={{ user, login, signup, logout, updateProfile }}>{children}</AuthCtx.Provider>
}

export function useAuth(){ return useContext(AuthCtx); }
