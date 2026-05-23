import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export function SignupPage() {
  const { signup } = useAppContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const response = signup(form);
    if (!response.ok) {
      setError(response.message ?? "Unable to create account");
      return;
    }
    navigate("/");
  };

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-4xl place-items-center px-4 py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold">Create Account</h1>
        <input
          required
          value={form.fullName}
          onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
          placeholder="Full name"
          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
        <input
          required
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="Email"
          className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
        <input
          required
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          placeholder="Phone"
          className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
        <input
          required
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          placeholder="Password"
          className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button className="mt-4 w-full rounded-full bg-[#0B5D1E] py-3 text-white">Sign Up</button>
        <p className="mt-3 text-sm text-slate-600">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}