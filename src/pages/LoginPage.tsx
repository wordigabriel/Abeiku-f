import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Logo } from "../components/Logo";

export function LoginPage() {
  const { login } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const response = login(email, password);
    if (!response.ok) {
      setError(response.message ?? "Unable to login");
      return;
    }
    navigate("/");
  };

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-4xl place-items-center px-4 py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Logo />
        <h1 className="mt-4 text-3xl font-semibold">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Use default admin credentials: admin@abeikufarms.com / admin123</p>
        <input
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button className="mt-4 w-full rounded-full bg-[#0B5D1E] py-3 text-white">Login</button>
        <div className="mt-4 flex justify-between text-sm text-slate-600">
          <Link to="/signup">Create account</Link>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </form>
    </main>
  );
}