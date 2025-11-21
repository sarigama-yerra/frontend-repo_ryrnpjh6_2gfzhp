import { Routes, Route } from 'react-router-dom'
import App from './App'
import { AboutPage, ServicesPage, TeamPage, PricingPage, BookingPage, GalleryPage, ReviewsPage, TreatmentsPage, QuizPage, PromotionsPage, FAQsPage, ContactPage, LocationPage, LegalPage } from './pages'

export default function SiteRoutes(){
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/treatments" element={<TreatmentsPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/promotions" element={<PromotionsPage />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/terms" element={<LegalPage />} />
    </Routes>
  )
}
