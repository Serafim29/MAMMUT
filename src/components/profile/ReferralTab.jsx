import React from 'react'
import { FiCopy, FiUpload, FiGift, FiCheckCircle, FiChevronDown } from 'react-icons/fi'
import referAFriendImg from '../../assets/image_refer_a_friend.webp'
import { faqs } from './faqData'

export default function ReferralTab({ copySuccess, setCopySuccess, openFaq, setOpenFaq }) {
  return (
    <div className="flex flex-col gap-6 w-full select-none">
      <div className="bg-white border border-neutral-100 p-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-[260px] h-[190px] overflow-hidden flex-shrink-0 border border-neutral-100">
          <img 
            src={referAFriendImg} 
            alt="Refer a friend" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 select-none">
          <h3 className="text-[17px] font-bold text-neutral-900 font-sans uppercase tracking-wide">
            Refer a Friend
          </h3>
          <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
            Refer a friend and earn 50 points. They'll also receive 50 points and a 10% discount on their next purchase.
          </p>
          
          <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mt-6 mb-2">
            Share your unique link
          </h4>
          <div className="max-w-[420px] bg-[#F4F0EB] px-4 py-3 flex items-center justify-between border border-neutral-200/50">
            <span className="text-xs font-semibold text-neutral-800 font-mono tracking-tight select-all">
              mammut.com/referral/w0imiov
            </span>
            <button 
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('mammut.com/referral/w0imiov')
                setCopySuccess(true)
                setTimeout(() => setCopySuccess(false), 2000)
              }}
              className="text-neutral-500 hover:text-black cursor-pointer p-1"
              aria-label="Copy referral code"
            >
              {copySuccess ? (
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Copied!</span>
              ) : (
                <FiCopy size={15} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-100 p-8 select-none">
        <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-6">
          How does it work?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-2.5 mb-2 text-[#E30613]">
              <FiUpload size={17} className="stroke-[2.5]" />
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                Share Your Unique Link
              </h4>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
              Copy your referral link and share it with friends via WhatsApp, email, or social media.
            </p>
          </div>

          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-2.5 mb-2 text-[#E30613]">
              <FiGift size={17} className="stroke-[2]" />
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                Your friend joins and makes a purchase
              </h4>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
              When your friend uses your link to create an account on mammut.com and makes their first purchase of $150 or more, they will get 50 points instantly.
            </p>
          </div>

          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-2.5 mb-2 text-[#E30613]">
              <FiCheckCircle size={17} className="stroke-[2]" />
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                Earn your reward
              </h4>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
              Once your friend's purchase is complete, you'll receive 50 points credited to your account. Keep inviting friends to earn even more.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-100 p-8 select-none">
        <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-6">
          Conditions & FAQs
        </h3>
        
        <div className="mb-8">
          <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider mb-3">
            Overview:
            </h4>
          <ul className="text-xs text-neutral-600 space-y-2 leading-relaxed">
            <li className="flex items-start gap-1.5">• Earning points: earn 1 point for every $1 spent.</li>
            <li className="flex items-start gap-1.5">• Expiration points: points expire 365 days after the date they are earned.</li>
            <li className="flex items-start gap-1.5">• Progression: journey further by earning more points. The level lasts for 12 months.</li>
          </ul>
        </div>

        <div className="border-t border-neutral-100 mt-6 pt-6">
          <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider mb-4">
            FAQ
          </h4>
          
          <div className="divide-y divide-neutral-200 border-b border-neutral-200">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div key={index} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left font-bold text-neutral-800 text-[11px] hover:text-[#E30613] transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <FiChevronDown 
                      size={15} 
                      className={`text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#E30613]' : ''}`} 
                    />
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-[200px] mt-3 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-xs text-neutral-500 leading-relaxed font-sans normal-case tracking-normal py-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
