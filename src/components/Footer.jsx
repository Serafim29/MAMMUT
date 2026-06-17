import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiMinus, FiMessageSquare, FiMail, FiPhone, FiHelpCircle } from 'react-icons/fi'
import { 
  FaInstagram, 
  FaFacebookF, 
  FaYoutube, 
  FaPinterestP, 
  FaLinkedinIn, 
  FaTiktok 
} from 'react-icons/fa'

const StravaIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`inline-block ${className}`}
  >
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l-1.65-3.247H4.828L8.379 12l3.55-6.903H9.113z"/>
  </svg>
)

function Footer() {
  const [openSections, setOpenSections] = useState({
    shop: false,
    about: false,
    support: false,
    contact: false,
  })

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const shopLinks = [
    { label: 'Clothing', href: '#' },
    { label: 'Equipment', href: '#' },
    { label: 'Footwear', href: '#' },
    { label: 'Outlet', href: '#' }
  ]

  const aboutLinks = [
    { label: 'About us', href: '#' },
    { label: 'Responsibility', href: '#' },
    { label: 'Newsroom', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'B2B', href: '#' },
    { label: 'Corporate Business Collection', href: '#' },
    { label: 'Newsletter', href: '#' },
    { label: 'Mammut Collective & Hero Discount', href: '#' },
    { label: 'Affiliate Program', href: '#' },
    { label: 'Partnerships', href: '#' },
    { label: 'Loyalty Program', href: '#' },
    { label: 'Corporate Collection', href: '#' }
  ]

  const supportLinks = [
    { label: 'Orders', href: '#' },
    { label: 'Shipping', href: '#' },
    { label: 'Warranty & Repair', href: '#' },
    { label: 'Returns & Refunds', href: '#' },
    { label: 'Payments', href: '#' },
    { label: 'Product support & care', href: '#' },
    { label: 'Store Finder', href: '#' }
  ]

  const legalLinks = [
    { label: 'Sitemap', href: '#' },
    { label: 'Your privacy choices', href: '#' },
    { label: 'Legal Notice', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Data Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Accessibility', href: '#' }
  ]

  const contactItems = [
    {
      id: 'chat',
      label: 'Chat',
      subtext: 'Mon-Fri: 9am-6pm EST',
      icon: FiMessageSquare
    },
    {
      id: 'email',
      label: 'Email',
      subtext: 'We usually reply within 48 hours',
      icon: FiMail
    },
    {
      id: 'call',
      label: 'Call us',
      subtext: 'Mon-Fri: 9am-6pm EST',
      icon: FiPhone
    },
    {
      id: 'help',
      label: 'Help center',
      subtext: '',
      icon: FiHelpCircle
    }
  ]

  const socials = [
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaYoutube, href: '#', label: 'Youtube' },
    { icon: StravaIcon, href: '#', label: 'Strava', isCustom: true },
    { icon: FaPinterestP, href: '#', label: 'Pinterest' },
    { icon: FaLinkedinIn, href: '#', label: 'Linkedin' },
    { icon: FaTiktok, href: '#', label: 'Tiktok' }
  ]

  return (
    <footer className="w-full bg-[#f2f2f2] text-black font-sans border-t border-neutral-200 mt-auto select-none">
        <div className="hidden lg:block max-w-[1440px] mx-auto px-16 py-16">
        
        <div className="grid grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block">
              <span className="text-3xl font-black tracking-[0.15em] text-[#E30613] font-sans">
                MAMMUT
              </span>
            </Link>
          </div>

          <div>
            <h3 className="font-extrabold text-[15px] tracking-wider uppercase mb-5 text-neutral-900">
              Shop
            </h3>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-[14px] text-neutral-700 hover:text-black hover:underline transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-extrabold text-[15px] tracking-wider uppercase mb-5 text-neutral-900">
              About
            </h3>
            <ul className="flex flex-col gap-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-[14px] text-neutral-700 hover:text-black hover:underline transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-extrabold text-[15px] tracking-wider uppercase mb-5 text-neutral-900">
              Support
            </h3>
            <ul className="flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-[14px] text-neutral-700 hover:text-black hover:underline transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-300 my-10" />

        <div>
          <h3 className="font-extrabold text-[15px] tracking-wider uppercase mb-6 text-neutral-900">
            Contact
          </h3>
          <div className="grid grid-cols-4 gap-6">
            {contactItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-neutral-300/60 flex items-center justify-center text-black flex-shrink-0 group-hover:bg-neutral-300 transition-colors duration-150">
                  <item.icon size={22} className="stroke-[1.75px]" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-black">
                    {item.label}
                  </h4>
                  {item.subtext && (
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {item.subtext}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-300 my-10" />

        <div className="flex items-center justify-between">
          <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-[12px] font-semibold text-neutral-700">
            <span className="flex items-center gap-1.5 text-black font-bold mr-2">
              <span className="text-base leading-none">🇺🇸</span>
              United States — English
            </span>
            
            {legalLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="hover:text-black hover:underline transition-colors text-neutral-600"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a 
                key={social.label} 
                href={social.href} 
                aria-label={social.label}
                className="text-black hover:text-[#E30613] transition-colors duration-150"
              >
                {social.isCustom ? (
                  <social.icon size={20} />
                ) : (
                  <social.icon size={20} />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block lg:hidden px-8 py-12">
        
        <div className="grid grid-cols-2 gap-8 items-start">
          <div>
            <Link to="/" className="inline-block">
              <span className="text-3xl font-black tracking-[0.15em] text-[#E30613] font-sans">
                MAMMUT
              </span>
            </Link>
          </div>

          <div className="border-t border-neutral-300">
            
            <div className="border-b border-neutral-300 py-4">
              <button 
                onClick={() => toggleSection('shop')}
                className="w-full flex justify-between items-center font-bold text-[16px] text-black text-left cursor-pointer"
              >
                <span>Shop</span>
                {openSections.shop ? <FiMinus size={18} /> : <FiPlus size={18} />}
              </button>
              {openSections.shop && (
                <ul className="mt-4 flex flex-col gap-3 pl-1 animate-fadeIn">
                  {shopLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[14px] text-neutral-700 hover:text-black hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-b border-neutral-300 py-4">
              <button 
                onClick={() => toggleSection('about')}
                className="w-full flex justify-between items-center font-bold text-[16px] text-black text-left cursor-pointer"
              >
                <span>About</span>
                {openSections.about ? <FiMinus size={18} /> : <FiPlus size={18} />}
              </button>
              {openSections.about && (
                <ul className="mt-4 flex flex-col gap-3 pl-1 animate-fadeIn">
                  {aboutLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[14px] text-neutral-700 hover:text-black hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-b border-neutral-300 py-4">
              <button 
                onClick={() => toggleSection('support')}
                className="w-full flex justify-between items-center font-bold text-[16px] text-black text-left cursor-pointer"
              >
                <span>Support</span>
                {openSections.support ? <FiMinus size={18} /> : <FiPlus size={18} />}
              </button>
              {openSections.support && (
                <ul className="mt-4 flex flex-col gap-3 pl-1 animate-fadeIn">
                  {supportLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[14px] text-neutral-700 hover:text-black hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-b border-neutral-300 py-4">
              <button 
                onClick={() => toggleSection('contact')}
                className="w-full flex justify-between items-center font-bold text-[16px] text-black text-left cursor-pointer"
              >
                <span>Contact</span>
                {openSections.contact ? <FiMinus size={18} /> : <FiPlus size={18} />}
              </button>
              {openSections.contact && (
                <div className="mt-5 flex flex-col gap-5 pl-1 animate-fadeIn">
                  {contactItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-neutral-300/60 flex items-center justify-center text-black flex-shrink-0">
                        <item.icon size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[13px] text-black">
                          {item.label}
                        </h4>
                        {item.subtext && (
                          <p className="text-[11px] text-neutral-500">
                            {item.subtext}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="border-t border-neutral-300 my-8" />

        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a 
                key={social.label} 
                href={social.href} 
                aria-label={social.label}
                className="text-black hover:text-[#E30613] transition-colors duration-150"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <div className="text-[13px] font-bold text-black flex items-center gap-1.5">
            <span className="text-base leading-none">🇺🇸</span>
            United States — English
          </div>

          <div className="flex flex-col gap-3.5 text-[13px] font-medium text-neutral-700">
            {legalLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="hover:text-black hover:underline transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>


      <div className="block md:hidden px-4 py-8">
        
        <div className="border-t border-neutral-300">
          
          <div className="border-b border-neutral-300 py-4">
            <button 
              onClick={() => toggleSection('shop')}
              className="w-full flex justify-between items-center font-bold text-[16px] text-black text-left cursor-pointer"
            >
              <span>Shop</span>
              {openSections.shop ? <FiMinus size={18} /> : <FiPlus size={18} />}
            </button>
            {openSections.shop && (
              <ul className="mt-4 flex flex-col gap-3.5 pl-1">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[14px] text-neutral-700 hover:text-black">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-b border-neutral-300 py-4">
            <button 
              onClick={() => toggleSection('about')}
              className="w-full flex justify-between items-center font-bold text-[16px] text-black text-left cursor-pointer"
            >
              <span>About</span>
              {openSections.about ? <FiMinus size={18} /> : <FiPlus size={18} />}
            </button>
            {openSections.about && (
              <ul className="mt-4 flex flex-col gap-3.5 pl-1">
                {aboutLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[14px] text-neutral-700 hover:text-black">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-b border-neutral-300 py-4">
            <button 
              onClick={() => toggleSection('support')}
              className="w-full flex justify-between items-center font-bold text-[16px] text-black text-left cursor-pointer"
            >
              <span>Support</span>
              {openSections.support ? <FiMinus size={18} /> : <FiPlus size={18} />}
            </button>
            {openSections.support && (
              <ul className="mt-4 flex flex-col gap-3.5 pl-1">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[14px] text-neutral-700 hover:text-black">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-b border-neutral-300 py-4">
            <button 
              onClick={() => toggleSection('contact')}
              className="w-full flex justify-between items-center font-bold text-[16px] text-black text-left cursor-pointer"
            >
              <span>Contact</span>
              {openSections.contact ? <FiMinus size={18} /> : <FiPlus size={18} />}
            </button>
            {openSections.contact && (
              <div className="mt-5 flex flex-col gap-5 pl-1">
                {contactItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-300/60 flex items-center justify-center text-black flex-shrink-0">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[13px] text-black">
                        {item.label}
                      </h4>
                      {item.subtext && (
                        <p className="text-[11px] text-neutral-500">
                          {item.subtext}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        <div className="flex items-center justify-between my-8 px-1">
          {socials.map((social) => (
            <a 
              key={social.label} 
              href={social.href} 
              aria-label={social.label}
              className="text-black hover:text-[#E30613] transition-colors duration-150"
            >
              <social.icon size={22} />
            </a>
          ))}
        </div>

        <div className="text-[13px] font-bold text-black flex items-center gap-1.5 mb-6 px-1">
          <span className="text-base leading-none">🇺🇸</span>
          United States — English
        </div>

        <div className="flex flex-col gap-4 px-1 text-[13px] font-medium text-neutral-700">
          {legalLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

    </footer>
  )
}

export default Footer
