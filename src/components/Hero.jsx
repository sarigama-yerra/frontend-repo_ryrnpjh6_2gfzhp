import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#fff6f0]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/c1w2QYixcPkptHWE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
          <p className="uppercase tracking-[0.25em] text-xs text-neutral-600">Luxury Hair Atelier</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900">HairWorx.co</h1>
          <p className="mt-5 text-neutral-700 leading-relaxed max-w-xl">Elevated haircare and precision artistry in a serene, design-led space. Over 500 five-star reviews. Book an experience defined by craft, care, and quietly luxurious details.</p>
          <div className="mt-8 flex gap-3">
            <a href="/booking" className="inline-flex items-center rounded-full bg-neutral-900 text-white px-6 py-3 text-sm">Book Now</a>
            <a href="/services" className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-sm">Explore Services</a>
          </div>
          <div className="mt-6 text-sm text-neutral-600">★★★★★ Trusted by 500+ Google reviews</div>
        </motion.div>
      </div>
    </section>
  )
}
