import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from '@/redux/cartSlice';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="page py-16 sm:py-24">
        <h1 className="h-page">Your cart is empty</h1>
        <p className="mt-3 max-w-[44ch] text-ink-soft">Items you add from the catalogue will show up here.</p>
        <Link href="/products" className="btn btn-primary mt-8 px-6 py-3">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="page py-10 sm:py-14">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="h-page">Cart</h1>
          <p className="mt-2 text-ink-soft">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
        </div>
        <button onClick={() => dispatch(clearCart())} className="btn-text-danger">Remove all</button>
      </div>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_340px]">
        <ul className="border-t border-ink">
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="grid grid-cols-[72px_1fr] items-center gap-x-4 gap-y-3 border-b border-line py-4 sm:grid-cols-[72px_1fr_auto_88px]"
            >
              <div className="relative h-[72px] w-[72px] border border-line bg-surface">
                <Image src={item.thumbnail} alt={item.title} fill sizes="72px" className="object-contain p-1" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium">{item.title}</p>
                <p className="text-sm tabular-nums text-ink-soft">${item.price} each</p>
                <button onClick={() => dispatch(removeFromCart(item._id))} className="btn-text mt-1 !text-[13px]">
                  Remove
                </button>
              </div>

              <div className="flex items-center rounded-md border border-line bg-surface">
                <button
                  onClick={() => dispatch(decrementQuantity(item._id))}
                  aria-label={`Decrease quantity of ${item.title}`}
                  className="h-9 w-9 text-lg hover:bg-paper"
                >
                  −
                </button>
                <span className="w-9 text-center text-sm font-medium tabular-nums">{item.qty}</span>
                <button
                  onClick={() => dispatch(incrementQuantity(item._id))}
                  aria-label={`Increase quantity of ${item.title}`}
                  className="h-9 w-9 text-lg hover:bg-paper"
                >
                  +
                </button>
              </div>

              <p className="text-right font-display font-bold tabular-nums">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        <aside className="panel p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-semibold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Shipping</dt>
              <dd className="tabular-nums">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</dd>
            </div>
          </dl>
          {subtotal < 50 && (
            <p className="mt-3 text-sm text-ink-soft">
              Add ${(50 - subtotal).toFixed(2)} more to ship free.
            </p>
          )}
          <div className="mt-5 flex items-baseline justify-between border-t border-line pt-5">
            <span className="font-medium">Total</span>
            <span className="font-display text-2xl font-bold tabular-nums">${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary mt-6 w-full py-3">Checkout</button>
        </aside>
      </div>
    </div>
  );
}
