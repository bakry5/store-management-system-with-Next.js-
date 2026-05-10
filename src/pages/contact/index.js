export default function Contact() {
  return (
    <div className="page py-10 sm:py-14">
      <h1 className="h-page">Contact</h1>
      <p className="mt-2 max-w-[52ch] text-ink-soft">
        Questions about a product or an order? Send a message and we will reply by email, Monday to Friday.
      </p>

      <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1fr_320px]">
        <form className="panel space-y-5 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="first" className="label">First name</label>
              <input id="first" type="text" autoComplete="given-name" className="field" />
            </div>
            <div>
              <label htmlFor="last" className="label">Last name</label>
              <input id="last" type="text" autoComplete="family-name" className="field" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="label">Email</label>
            <input id="email" type="email" autoComplete="email" className="field" />
          </div>

          <div>
            <label htmlFor="subject" className="label">Topic</label>
            <select id="subject" className="field">
              <option>General inquiry</option>
              <option>Support</option>
              <option>Sales</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="label">Message</label>
            <textarea id="message" rows="5" className="field resize-y" />
          </div>

          <button type="submit" className="btn btn-primary px-6">Send message</button>
        </form>

        <dl className="space-y-6 border-t border-ink pt-6 text-sm">
          <div>
            <dt className="font-display font-semibold">Email</dt>
            <dd className="mt-1">
              <a href="mailto:mohamed.medhat23000@gmail.com" className="text-ink-soft underline-offset-4 hover:text-ink hover:underline">
                mohamed.medhat23000@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-display font-semibold">Phone</dt>
            <dd className="mt-1">
              <a href="tel:+201507882744" className="text-ink-soft underline-offset-4 hover:text-ink hover:underline">
                +20 150 788 2744
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-display font-semibold">Address</dt>
            <dd className="mt-1 text-ink-soft">123 Business Street, Mansoura, Egypt</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
