import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });
  };

  return (
    <div className="page max-w-md py-14 sm:py-20">
      <h1 className="h-page">Log in</h1>
      <p className="mt-2 text-ink-soft">Use your account to manage products.</p>

      <form onSubmit={handleLogin} className="panel mt-8 space-y-5 p-6 sm:p-8">
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Link href="#" className="btn-text !text-[13px]">Forgot password?</Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              className="field pr-16"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] font-medium text-ink-soft hover:text-ink"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
          <input type="checkbox" className="h-4 w-4 accent-ink" />
          Keep me logged in
        </label>

        <button type="submit" className="btn btn-primary w-full py-3">Log in</button>
      </form>

      <p className="mt-6 text-sm text-ink-soft">
        New here?{' '}
        <Link href="/register" className="font-medium text-ink underline underline-offset-4">Create an account</Link>
      </p>
    </div>
  );
}
