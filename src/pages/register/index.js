import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const update = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("User Data:", formData);
  };

  return (
    <div className="page max-w-md py-14 sm:py-20">
      <h1 className="h-page">Create an account</h1>
      <p className="mt-2 text-ink-soft">One account for the cart and the catalogue.</p>

      <form onSubmit={handleSubmit} className="panel mt-8 space-y-5 p-6 sm:p-8">
        <div>
          <label htmlFor="username" className="label">Username</label>
          <input id="username" type="text" required autoComplete="username" className="field" onChange={update('username')} />
        </div>

        <div>
          <label htmlFor="email" className="label">Email</label>
          <input id="email" type="email" required autoComplete="email" className="field" onChange={update('email')} />
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[13px] font-medium text-ink-soft hover:text-ink"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="new-password"
            className="field"
            onChange={update('password')}
          />
        </div>

        <div>
          <label htmlFor="confirm" className="label">Confirm password</label>
          <input
            id="confirm"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="new-password"
            className="field"
            onChange={update('confirmPassword')}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full py-3">Create account</button>
      </form>

      <p className="mt-6 text-sm text-ink-soft">
        Already registered?{' '}
        <Link href="/login" className="font-medium text-ink underline underline-offset-4">Log in</Link>
      </p>
    </div>
  );
}
