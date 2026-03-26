import { Helmet } from 'react-helmet-async'

const contactItems = [
  {
    label: 'Address',
    value: '1312 Rizal Boulevard Brgy. Pooc Sta Rosa, Laguna Philippines',
  },
  {
    label: 'Phone',
    value: '+63 995 160 790',
    href: 'tel:+63995160790',
  },
  {
    label: 'Email',
    value: 'fixcel@gmail.com',
    href: 'mailto:fixcel@gmail.com',
  },
  {
    label: 'Website',
    value: 'www.fixcel.net',
    href: 'https://www.fixcel.net',
  },
  {
    label: 'Hours',
    value: 'Mon – Fri: 8:00 AM – 5:00 PM',
  },
] as const

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact FixCel | Sta Rosa, Laguna Philippines</title>
        <meta
          name="description"
          content="Contact FixCel for computer and laptop repair in Sta Rosa, Laguna Philippines. Call, email, or visit us today."
        />
      </Helmet>

      <section className="w-full px-6 lg:px-10 py-8" aria-labelledby="contact-heading">
        <h2
          id="contact-heading"
          className="text-2xl md:text-3xl font-bold text-navy border-b-2 border-navy pb-2 mb-8"
        >
          Contact Us
        </h2>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-5">
          {contactItems.map(item => (
            <div key={item.label} className="flex flex-col sm:flex-row sm:gap-4">
              <span className="font-semibold text-navy w-20 flex-shrink-0">{item.label}:</span>
              {'href' in item ? (
                <a
                  href={item.href}
                  className="text-navy-light hover:underline break-all"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-gray-700">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
