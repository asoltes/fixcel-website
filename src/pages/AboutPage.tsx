import { Helmet } from 'react-helmet-async'

const highlights = [
  'All units tested and verified before listing',
  'Transparent condition grading (Excellent / Good / Fair)',
  'Competitive and fair pricing',
  'Expert technician backing — issues spotted before you buy',
  'Accessible location in Sta Rosa, Laguna',
  'Free inspection before purchase',
]

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | FixCel – Used Laptops in Sta Rosa, Laguna</title>
        <meta
          name="description"
          content="FixCel sells quality tested second-hand laptops in Sta Rosa, Laguna Philippines. Every unit is inspected by an expert technician before listing."
        />
      </Helmet>

      <section className="w-full px-6 lg:px-10 py-8" aria-labelledby="about-heading">
        <h2
          id="about-heading"
          className="text-2xl md:text-3xl font-bold text-navy border-b-2 border-navy pb-2 mb-6"
        >
          About Us and Why Buy From Us?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-8">
          FixCel is your trusted source for quality used and second-hand laptops in Sta Rosa,
          Laguna. Every unit in our inventory is personally inspected and tested by our experienced
          technician before being listed for sale — so you know exactly what you're getting.
          Whether you need a budget-friendly workhorse or a premium pre-owned machine, we've got
          you covered.
        </p>

        <ul className="space-y-3" aria-label="Why buy from FixCel">
          {highlights.map(item => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-navy font-bold text-xs flex-shrink-0 mt-0.5"
                aria-hidden="true"
              >
                ✔
              </span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
