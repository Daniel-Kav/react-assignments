import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold px-4">
          <Link to="/" className="hover:underline px-5 ">Home</Link>
          <Link to="/about" className="hover:underline px-4">About</Link>
          <Link to="/home" className="hover:underline">Home</Link>
        </div>
      </nav>
    </header>
  )
}
