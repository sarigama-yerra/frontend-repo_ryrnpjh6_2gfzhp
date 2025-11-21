import { useEffect, useState } from 'react'
import { apiGet, apiPost } from './lib/api'

export function AboutPage(){
  return (
    <Wrapper title="About">
      <p>At HairWorx.co, we believe luxury is felt in the details — the way your stylist listens, the ritual of a considered cleanse, the finish that moves with intention. Our philosophy pairs precision technique with a calm, design-led environment.</p>
    </Wrapper>
  )
}

export function ServicesPage(){
  const [items, setItems] = useState([])
  useEffect(()=>{ apiGet('/api/services').then(setItems).catch(()=>{}) },[])
  return (
    <Wrapper title="Services">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((s,i)=> (
          <div key={i} className="border border-neutral-200 rounded-2xl p-6 bg-white">
            <div className="text-sm uppercase tracking-wide text-neutral-500">{s.category}</div>
            <h3 className="mt-2 font-medium text-lg">{s.name}</h3>
            <p className="mt-2 text-neutral-600">{s.description}</p>
            <div className="mt-4 text-neutral-900">From ${s.price_from}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

export function TeamPage(){
  const [team, setTeam] = useState([])
  useEffect(()=>{ apiGet('/api/stylists').then(setTeam).catch(()=>{}) },[])
  return (
    <Wrapper title="Our Team">
      <div className="grid md:grid-cols-3 gap-6">
        {team.map((m,i)=> (
          <div key={i} className="rounded-2xl overflow-hidden border border-neutral-200 bg-white">
            <img src={m.photo_url} alt={m.name} className="w-full h-64 object-cover"/>
            <div className="p-6">
              <h3 className="font-medium text-lg">{m.name}</h3>
              <p className="mt-2 text-neutral-600">{m.bio}</p>
              <div className="mt-3 text-sm text-neutral-500">Specialties: {(m.specialty||[]).join(', ')}</div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

export function PricingPage(){
  const [items, setItems] = useState([])
  useEffect(()=>{ apiGet('/api/services').then(setItems).catch(()=>{}) },[])
  return (
    <Wrapper title="Price List">
      <div className="divide-y divide-neutral-200 bg-white border border-neutral-200 rounded-2xl">
        {items.map((s,i)=> (
          <div key={i} className="p-5 flex items-center justify-between">
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-neutral-500">{s.duration_minutes} min</div>
            </div>
            <div className="text-neutral-900">From ${s.price_from}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

export function BookingPage(){
  const [services, setServices] = useState([])
  const [stylists, setStylists] = useState([])
  const [form, setForm] = useState({ service_id:'', service_name:'', stylist_id:'', stylist_name:'', date:'', time:'', customer_name:'', customer_email:'', customer_phone:'', notes:'', reminder_method:'email' })
  const [slots, setSlots] = useState([])
  const [done, setDone] = useState(null)

  useEffect(()=>{ apiGet('/api/services').then(setServices); apiGet('/api/stylists').then(setStylists) },[])

  useEffect(()=>{
    if(form.date){
      apiGet(`/api/slots?date=${form.date}&service_id=${form.service_id||''}&stylist_id=${form.stylist_id||''}`).then(res=> setSlots(res.slots || [])).catch(()=> setSlots([]))
    }
  },[form.date, form.service_id, form.stylist_id])

  async function submit(e){
    e.preventDefault()
    const payload = {...form}
    const res = await apiPost('/api/appointments', payload)
    setDone(res)
  }

  return (
    <Wrapper title="Booking">
      {!done ? (
        <form onSubmit={submit} className="grid gap-4 bg-white border border-neutral-200 rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-neutral-600">Service</label>
              <select className="mt-1 w-full border rounded-lg p-2" value={form.service_id} onChange={e=>{ const s=services[e.target.selectedIndex-1]; setForm(f=>({...f, service_id:e.target.value, service_name:s?.name||''})) }}>
                <option value="">Select service</option>
                {services.map((s,i)=> <option key={i} value={`${i}`}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-neutral-600">Stylist</label>
              <select className="mt-1 w-full border rounded-lg p-2" value={form.stylist_id} onChange={e=>{ const s=stylists[e.target.selectedIndex-1]; setForm(f=>({...f, stylist_id:e.target.value, stylist_name:s?.name||''})) }}>
                <option value="">Any stylist</option>
                {stylists.map((s,i)=> <option key={i} value={`${i}`}>{s.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-neutral-600">Date</label>
              <input type="date" className="mt-1 w-full border rounded-lg p-2" value={form.date} onChange={e=> setForm(f=>({...f, date:e.target.value}))} />
            </div>
            <div>
              <label className="text-sm text-neutral-600">Time</label>
              <select className="mt-1 w-full border rounded-lg p-2" value={form.time} onChange={e=> setForm(f=>({...f, time:e.target.value}))}>
                <option value="">Select time</option>
                {slots.map(t=> <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-neutral-600">Reminder</label>
              <select className="mt-1 w-full border rounded-lg p-2" value={form.reminder_method} onChange={e=> setForm(f=>({...f, reminder_method:e.target.value}))}>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-neutral-600">Full name</label>
              <input className="mt-1 w-full border rounded-lg p-2" value={form.customer_name} onChange={e=> setForm(f=>({...f, customer_name:e.target.value}))} />
            </div>
            <div>
              <label className="text-sm text-neutral-600">Email</label>
              <input type="email" className="mt-1 w-full border rounded-lg p-2" value={form.customer_email} onChange={e=> setForm(f=>({...f, customer_email:e.target.value}))} />
            </div>
            <div>
              <label className="text-sm text-neutral-600">Phone</label>
              <input className="mt-1 w-full border rounded-lg p-2" value={form.customer_phone} onChange={e=> setForm(f=>({...f, customer_phone:e.target.value}))} />
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-600">Notes</label>
            <textarea className="mt-1 w-full border rounded-lg p-2" rows="3" value={form.notes} onChange={e=> setForm(f=>({...f, notes:e.target.value}))} />
          </div>

          <button className="mt-2 inline-flex items-center rounded-full bg-neutral-900 text-white px-6 py-3 text-sm w-max">Confirm Booking</button>
          <div className="text-xs text-neutral-500">Appointments will sync to Google Calendar and send reminders (placeholder).</div>
        </form>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-2xl p-8">
          <h3 className="text-xl font-medium">Booking confirmed</h3>
          <p className="mt-2 text-neutral-600">A confirmation will be sent shortly. Your reference id is {done.id}.</p>
          <a href="/" className="inline-flex items-center rounded-full bg-neutral-900 text-white px-6 py-3 text-sm mt-6">Back to Home</a>
        </div>
      )}
    </Wrapper>
  )
}

export function GalleryPage(){
  const [items, setItems] = useState([])
  useEffect(()=>{ apiGet('/api/gallery').then(setItems).catch(()=>{}) },[])
  return (
    <Wrapper title="Gallery / Portfolio">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((g,i)=> (
          <figure key={i} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <img src={g.image_url} alt={g.caption} className="w-full h-64 object-cover"/>
            <figcaption className="p-3 text-sm text-neutral-600">{g.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Wrapper>
  )
}

export function ReviewsPage(){
  const [items, setItems] = useState([])
  useEffect(()=>{ apiGet('/api/reviews').then(setItems).catch(()=>{}) },[])
  return (
    <Wrapper title="Reviews">
      <div className="space-y-4">
        {items.map((r,i)=> (
          <div key={i} className="p-5 rounded-2xl border border-neutral-200 bg-white">
            <div className="font-medium">{r.name}</div>
            <div className="text-amber-500">{'★★★★★'.slice(0, r.rating)}</div>
            <p className="text-neutral-600 mt-1">{r.comment}</p>
            <div className="text-xs text-neutral-500 mt-2">Source: {r.source}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

export function TreatmentsPage(){
  const [items, setItems] = useState([])
  useEffect(()=>{ apiGet('/api/services').then(setItems).catch(()=>{}) },[])
  return (
    <Wrapper title="Treatment Menu">
      <div className="space-y-6">
        {items.map((s,i)=> (
          <div key={i} className="p-6 rounded-2xl border border-neutral-200 bg-white">
            <h3 className="font-medium text-lg">{s.name}</h3>
            <p className="mt-2 text-neutral-600">{s.description}</p>
            <div className="mt-3 text-neutral-900">From ${s.price_from} • {s.duration_minutes} min</div>
            <a href="/booking" className="inline-flex items-center rounded-full bg-neutral-900 text-white px-4 py-2 text-sm mt-4">Book Now</a>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

export function QuizPage(){
  const [form, setForm] = useState({ hair_type:'', condition:'', scalp:'', goals:[], past_treatments:[] })
  const [result, setResult] = useState(null)

  function toggle(list, key, val){
    setForm(f=> ({...f, [key]: f[key].includes(val) ? f[key].filter(v=>v!==val) : [...f[key], val]}))
  }

  async function submit(e){
    e.preventDefault()
    const res = await apiPost('/api/quiz', form)
    setResult(res)
  }

  const goalOpts = ['Smooth', 'Volume', 'Repair', 'Colour']

  return (
    <Wrapper title="AI Hair Diagnosis">
      {!result ? (
        <form onSubmit={submit} className="space-y-4 bg-white border border-neutral-200 rounded-2xl p-6">
          <div>
            <label className="text-sm text-neutral-600">Hair type</label>
            <select className="mt-1 w-full border rounded-lg p-2" value={form.hair_type} onChange={e=> setForm(f=>({...f, hair_type:e.target.value}))}>
              <option value="">Select</option>
              <option>Fine</option>
              <option>Medium</option>
              <option>Thick</option>
              <option>Curly/Coily</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-neutral-600">Hair condition</label>
            <input className="mt-1 w-full border rounded-lg p-2" placeholder="e.g., Frizzy, Dry, Damaged" value={form.condition} onChange={e=> setForm(f=>({...f, condition:e.target.value}))} />
          </div>
          <div>
            <label className="text-sm text-neutral-600">Scalp issues</label>
            <input className="mt-1 w-full border rounded-lg p-2" placeholder="e.g., Dryness, Sensitivity" value={form.scalp} onChange={e=> setForm(f=>({...f, scalp:e.target.value}))} />
          </div>
          <div>
            <label className="text-sm text-neutral-600">Goals</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {goalOpts.map(g=> (
                <button type="button" key={g} onClick={()=> toggle('goals','goals',g)} className={`px-3 py-1.5 rounded-full border ${form.goals.includes(g)?'bg-neutral-900 text-white border-neutral-900':'border-neutral-300'}`}>{g}</button>
              ))}
            </div>
          </div>
          <button className="inline-flex items-center rounded-full bg-neutral-900 text-white px-6 py-3 text-sm">Get Recommendations</button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-neutral-200 bg-white">
            <div className="font-medium">{result.summary}</div>
          </div>
          {result.recommendations.map((r,i)=> (
            <div key={i} className="p-6 rounded-2xl border border-neutral-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-lg">{r.service}</div>
                  <div className="text-neutral-600">From ${r.price_from}</div>
                </div>
                <a href="/booking" className="inline-flex items-center rounded-full bg-neutral-900 text-white px-4 py-2 text-sm">Book Now</a>
              </div>
              <p className="mt-3 text-neutral-600">{r.why}</p>
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  )
}

export function PromotionsPage(){
  const [items, setItems] = useState([])
  useEffect(()=>{ apiGet('/api/promotions').then(setItems).catch(()=>{}) },[])
  return (
    <Wrapper title="Promotions">
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((p,i)=> (
          <div key={i} className="p-6 rounded-2xl border border-neutral-200 bg-white">
            <h3 className="font-medium text-lg">{p.title}</h3>
            <p className="mt-2 text-neutral-600">{p.description}</p>
            {p.code && <div className="mt-3 text-sm">Use code <span className="px-2 py-1 rounded bg-neutral-900 text-white">{p.code}</span></div>}
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

export function FAQsPage(){
  const [items, setItems] = useState([])
  useEffect(()=>{ apiGet('/api/faqs').then(setItems).catch(()=>{}) },[])
  return (
    <Wrapper title="FAQs">
      <div className="space-y-4">
        {items.map((f,i)=> (
          <details key={i} className="p-5 rounded-2xl border border-neutral-200 bg-white">
            <summary className="font-medium cursor-pointer">{f.question}</summary>
            <p className="mt-2 text-neutral-600">{f.answer}</p>
          </details>
        ))}
      </div>
    </Wrapper>
  )
}

export function ContactPage(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' })
  const [done, setDone] = useState(false)

  async function submit(e){
    e.preventDefault()
    await apiPost('/api/contact', form)
    setDone(true)
  }

  return (
    <Wrapper title="Contact">
      {!done ? (
        <form onSubmit={submit} className="space-y-4 bg-white border border-neutral-200 rounded-2xl p-6 max-w-xl">
          <input className="w-full border rounded-lg p-2" placeholder="Name" value={form.name} onChange={e=> setForm(f=>({...f, name:e.target.value}))} />
          <input className="w-full border rounded-lg p-2" placeholder="Email" value={form.email} onChange={e=> setForm(f=>({...f, email:e.target.value}))} />
          <input className="w-full border rounded-lg p-2" placeholder="Phone" value={form.phone} onChange={e=> setForm(f=>({...f, phone:e.target.value}))} />
          <textarea className="w-full border rounded-lg p-2" rows="4" placeholder="Message" value={form.message} onChange={e=> setForm(f=>({...f, message:e.target.value}))} />
          <button className="inline-flex items-center rounded-full bg-neutral-900 text-white px-6 py-3 text-sm">Send</button>
        </form>
      ) : (
        <div className="p-6 rounded-2xl border border-neutral-200 bg-white">Thanks — we’ll be in touch shortly.</div>
      )}
    </Wrapper>
  )
}

export function LocationPage(){
  return (
    <Wrapper title="Location & Hours">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-neutral-200 bg-white">
          <h3 className="font-medium">Address</h3>
          <p className="mt-2 text-neutral-600">123 Kensington High Street, London, W8 5NP</p>
          <h3 className="font-medium mt-6">Hours</h3>
          <p className="mt-2 text-neutral-600">Mon–Fri 10am–7pm • Sat 10am–6pm • Sun Closed</p>
        </div>
        <iframe className="w-full h-80 rounded-2xl border border-neutral-200" src="https://maps.google.com/maps?q=London%20W8&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
      </div>
    </Wrapper>
  )
}

export function LegalPage(){
  return (
    <Wrapper title="Terms & Privacy">
      <div className="space-y-6">
        <div className="p-6 rounded-2xl border border-neutral-200 bg-white">
          <h3 className="font-medium">Privacy Policy</h3>
          <p className="mt-2 text-neutral-600">We respect your privacy. Placeholder copy describing how we collect, use, and protect your personal information in compliance with applicable regulations.</p>
        </div>
        <div className="p-6 rounded-2xl border border-neutral-200 bg-white">
          <h3 className="font-medium">Terms of Service</h3>
          <p className="mt-2 text-neutral-600">By using our website and booking services, you agree to our standard terms. Placeholder copy outlining usage, cancellations, and limitations of liability.</p>
        </div>
      </div>
    </Wrapper>
  )
}

export function ReviewsStrip(){
  const [items, setItems] = useState([])
  useEffect(()=>{ apiGet('/api/reviews').then(setItems).catch(()=>{}) },[])
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-4">
        {items.map((r,i)=> (
          <div key={i} className="p-5 rounded-2xl border border-neutral-200">
            <div className="font-medium">{r.name}</div>
            <div className="text-amber-500">★★★★★</div>
            <p className="text-neutral-600 mt-1">{r.comment}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function InstaFeed(){
  const placeholder = new Array(6).fill(0)
  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Instagram</h3>
          <a className="text-sm text-neutral-600" href="#">Connect Account →</a>
        </div>
        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3">
          {placeholder.map((_,i)=> (
            <div key={i} className="aspect-square bg-white border border-neutral-200 rounded-xl" />
          ))}
        </div>
      </div>
    </section>
  )
}

function Wrapper({title, children}){
  return (
    <div className="pt-28 pb-20 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-8">{title}</h1>
        {children}
      </div>
    </div>
  )
}
