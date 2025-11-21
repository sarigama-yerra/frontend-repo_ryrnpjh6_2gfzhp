import Nav from './components/Nav'
import Hero from './components/Hero'
import { Features, CTA } from './components/Sections'
import { ReviewsStrip, InstaFeed } from './pages'

function App() {
  return (
    <div className="bg-white text-neutral-900">
      <Nav />
      <Hero />
      <Features />
      <ReviewsStrip />
      <InstaFeed />
      <CTA />
      <footer className="py-12 border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-neutral-600">© {new Date().getFullYear()} HairWorx.co • All rights reserved</div>
          <div className="flex gap-6 text-sm">
            <a href="/terms" className="text-neutral-600 hover:text-neutral-900">Terms & Privacy</a>
            <a href="/contact" className="text-neutral-600 hover:text-neutral-900">Contact</a>
            <a href="/booking" className="inline-flex items-center rounded-full bg-neutral-900 text-white px-4 py-2 text-sm">Book Now</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App