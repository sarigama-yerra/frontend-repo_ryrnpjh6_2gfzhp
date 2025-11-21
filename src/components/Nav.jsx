import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
  const links = [
    ['Home', '/'],
    ['About', '/about'],
    ['Services', '/services'],
    ['Our Team', '/team'],
    ['Price List', '/pricing'],
    ['Booking', '/booking'],
    ['Gallery', '/gallery'],
    ['Reviews', '/reviews'],
    ['Treatment Menu', '/treatments'],
    ['AI Hair Diagnosis', '/quiz'],
    ['Promotions', '/promotions'],
    ['FAQs', '/faqs'],
    ['Contact', '/contact'],
    ['Location & Hours', '/location'],
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight text-xl">HairWorx.co</Link>
        <nav className="hidden md:flex gap-5 text-sm">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className={({isActive})=>`px-2 py-1 rounded transition-colors ${isActive? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'}`}>{label}</NavLink>
          ))}
        </nav>
        <Link to="/booking" className="ml-4 inline-flex items-center rounded-full bg-neutral-900 text-white px-4 py-2 text-sm">Book Now</Link>
      </div>
    </header>
  )
}
