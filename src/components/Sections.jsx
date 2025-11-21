import { motion } from 'framer-motion'

export function Features() {
  const items = [
    ['Tailored Colour', 'Lived-in tones and luminous dimension.'],
    ['Signature Cuts', 'Precision shapes with effortless movement.'],
    ['Scalp Wellness', 'Holistic care for long-term hair health.'],
  ]
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {items.map(([title, desc], i)=> (
          <motion.div key={i} initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="p-8 border border-neutral-200 rounded-2xl">
            <h3 className="font-medium text-lg text-neutral-900">{title}</h3>
            <p className="mt-3 text-neutral-600">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">Reserve your chair</h2>
        <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">Select a service, choose your stylist, and pick a time that suits you. Seamless online booking with instant confirmation.</p>
        <a href="/booking" className="inline-flex items-center rounded-full bg-neutral-900 text-white px-6 py-3 text-sm mt-8">Book Now</a>
      </div>
    </section>
  )
}
