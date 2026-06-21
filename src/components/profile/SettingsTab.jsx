import React from 'react'
import { FiChevronDown, FiTrash2 } from 'react-icons/fi'

const ProfileInput = ({ label, id, type = 'text', value, onChange, placeholder, required = false, disabled = false }) => {
  return (
    <div className="relative mb-5 w-full">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ' '}
        required={required}
        disabled={disabled}
        className={`w-full border border-neutral-200 px-4 py-3.5 text-sm outline-none rounded-none focus:border-black focus:ring-1 focus:ring-black text-black bg-white ${disabled ? 'bg-neutral-50 text-neutral-400 border-neutral-200 cursor-not-allowed' : ''}`}
      />
      <label
        htmlFor={id}
        className="absolute left-3 -top-[9px] bg-white px-1.5 text-[11px] font-semibold text-neutral-500 tracking-wide select-none"
      >
        {label}
      </label>
    </div>
  )
}

const ProfileSelect = ({ label, id, value, onChange, options, required = false }) => {
  return (
    <div className="relative mb-5 w-full">
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-neutral-200 px-4 py-3.5 text-sm outline-none rounded-none focus:border-black focus:ring-1 focus:ring-black text-black bg-white appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="absolute left-3 -top-[9px] bg-white px-1.5 text-[11px] font-semibold text-neutral-500 tracking-wide select-none"
      >
        {label}
      </label>
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-500">
        <FiChevronDown size={16} />
      </div>
    </div>
  )
}

export default function SettingsTab({
  email,
  firstName, setFirstName,
  middleName, setMiddleName,
  lastName, setLastName,
  phoneNumber, setPhoneNumber,
  dob, setDob,
  state, setState,
  country, setCountry,
  zipCode, setZipCode,
  city, setCity,
  street, setStreet,
  apartment, setApartment,
  newsletter, setNewsletter,
  loyaltyNews, setLoyaltyNews,
  printedBrochures, setPrintedBrochures,
  gearPreference, setGearPreference,
  activities, setActivities,
  loading,
  message,
  handleSaveSettings,
  handleDeleteAccount
}) {
  return (
    <div className="bg-white border border-neutral-100 p-8 md:p-12 w-full flex flex-col">
      <div className="text-center mb-8 select-none">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-neutral-900">
          Settings
        </h2>
        <h3 className="text-sm font-bold text-neutral-700 uppercase tracking-wide mt-3">
          User information & Shipping address
        </h3>
      </div>
      
      {message.text && (
        <div className={`p-4 text-xs font-semibold uppercase tracking-wider mb-6 border select-none ${
          message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSaveSettings} className="max-w-[620px] mx-auto w-full">
        <ProfileInput 
          label="Email address*" 
          id="email" 
          type="email" 
          value={email} 
          disabled={true} 
        />
        
        <div className="flex flex-col sm:flex-row gap-x-4">
          <ProfileInput 
            label="First name" 
            id="firstName" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
          />
          <ProfileInput 
            label="Middle Name" 
            id="middleName" 
            value={middleName} 
            onChange={(e) => setMiddleName(e.target.value)} 
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-x-4">
          <ProfileInput 
            label="Last name" 
            id="lastName" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
          />
          <ProfileInput 
            label="Phone Number" 
            id="phoneNumber" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
          />
        </div>
        
        <ProfileInput 
          label="Date of birth*" 
          id="dob" 
          value={dob} 
          onChange={(e) => setDob(e.target.value)} 
          placeholder="D/M/YYYY"
          required={true}
        />
        
        <ProfileSelect 
          label="State" 
          id="state" 
          value={state} 
          onChange={(e) => setState(e.target.value)} 
          options={[
            { value: '', label: 'Select State' },
            { value: 'Brussels Capital Region', label: 'Brussels Capital Region' },
            { value: 'Flemish Region', label: 'Flemish Region' },
            { value: 'Walloon Region', label: 'Walloon Region' },
            { value: 'Antwerp', label: 'Antwerp' },
            { value: 'East Flanders', label: 'East Flanders' },
            { value: 'Flemish Brabant', label: 'Flemish Brabant' },
            { value: 'Limburg', label: 'Limburg' },
            { value: 'West Flanders', label: 'West Flanders' },
            { value: 'Hainaut', label: 'Hainaut' },
            { value: 'Liège', label: 'Liège' },
            { value: 'Luxembourg', label: 'Luxembourg' },
            { value: 'Namur', label: 'Namur' },
            { value: 'Walloon Brabant', label: 'Walloon Brabant' },
            { value: 'Other', label: 'Other' }
          ]}
        />
        
        <ProfileSelect 
          label="Country" 
          id="country" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
          options={[
            { value: 'Belgium', label: 'Belgium' },
            { value: 'Romania', label: 'Romania' },
            { value: 'Germany', label: 'Germany' },
            { value: 'United States', label: 'United States' },
            { value: 'Switzerland', label: 'Switzerland' },
            { value: 'France', label: 'France' },
            { value: 'United Kingdom', label: 'United Kingdom' }
          ]}
        />
        
        <div className="flex flex-col sm:flex-row gap-x-4">
          <ProfileInput 
            label="ZIP code" 
            id="zipCode" 
            value={zipCode} 
            onChange={(e) => setZipCode(e.target.value)} 
          />
          <ProfileInput 
            label="City" 
            id="city" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
          />
        </div>
        
        <ProfileInput 
          label="House number & streetname" 
          id="street" 
          value={street} 
          onChange={(e) => setStreet(e.target.value)} 
        />
        
        <ProfileInput 
          label="Number of the apartment, suite, or unit" 
          id="apartment" 
          value={apartment} 
          onChange={(e) => setApartment(e.target.value)} 
        />

        <div className="border-t border-neutral-200 pt-8 mt-10 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 select-none">
            <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider">
              Notifications
            </h4>
          </div>
          <div className="md:w-3/4 flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={newsletter} 
                  onChange={(e) => setNewsletter(e.target.checked)} 
                  className="w-4 h-4 accent-[#E30613] cursor-pointer rounded-none border-neutral-300"
                />
                <span className="text-sm font-semibold text-neutral-800">Newsletter*</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={loyaltyNews} 
                  onChange={(e) => setLoyaltyNews(e.target.checked)} 
                  className="w-4 h-4 accent-[#E30613] cursor-pointer rounded-none border-neutral-300"
                />
                <span className="text-sm font-semibold text-neutral-800">Loyalty news</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={printedBrochures} 
                  onChange={(e) => setPrintedBrochures(e.target.checked)} 
                  className="w-4 h-4 accent-[#E30613] cursor-pointer rounded-none border-neutral-300"
                />
                <span className="text-sm font-semibold text-neutral-800">Printed brochures and post cards</span>
              </label>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed max-w-lg mt-1 select-none">
              Our newsletter is sent two to three times a week. Our printed brochures and post cards are sent up to two to three times a year.
            </p>
            
            <div className="flex flex-col gap-3 mt-4">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input 
                  type="radio" 
                  name="gearPreference"
                  value="men"
                  checked={gearPreference === 'men'} 
                  onChange={() => setGearPreference('men')} 
                  className="w-4 h-4 accent-[#E30613] cursor-pointer"
                />
                <span className="text-sm font-semibold text-neutral-800">Men's gear</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input 
                  type="radio" 
                  name="gearPreference"
                  value="women"
                  checked={gearPreference === 'women'} 
                  onChange={() => setGearPreference('women')} 
                  className="w-4 h-4 accent-[#E30613] cursor-pointer"
                />
                <span className="text-sm font-semibold text-neutral-800">Women's gear</span>
              </label>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed max-w-lg mt-1 select-none">
              Sharing your preferences helps us personalize and filter the best content for you.
            </p>
            
            <div className="mt-4 flex items-start gap-2 max-w-xl select-none">
              <span className="text-neutral-500 mt-0.5">•</span>
              <p className="text-xs text-neutral-600 leading-relaxed">
                I agree that my email address can be used by Mammut Sports Group AG / GmbH for sending me general and tailored advertising materials about products, tours, promotions, events, and news via email. I hereby confirm that I am at least 16 years old. You can revoke this consent at any time. More information in our <a href="#" className="text-[#E30613] hover:underline font-semibold">Data Protection Policy</a>.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-8 mt-10 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 select-none">
            <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider">
              Activities
            </h4>
          </div>
          <div className="md:w-3/4 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 max-w-md">
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={activities.hiking} 
                    onChange={(e) => setActivities({...activities, hiking: e.target.checked})} 
                    className="w-4 h-4 accent-[#E30613] cursor-pointer rounded-none border-neutral-300"
                  />
                  <span className="text-sm text-neutral-800 font-semibold">Hiking</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={activities.snowsports} 
                    onChange={(e) => setActivities({...activities, snowsports: e.target.checked})} 
                    className="w-4 h-4 accent-[#E30613] cursor-pointer rounded-none border-neutral-300"
                  />
                  <span className="text-sm text-neutral-800 font-semibold">Snowsports</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={activities.mountaineering} 
                    onChange={(e) => setActivities({...activities, mountaineering: e.target.checked})} 
                    className="w-4 h-4 accent-[#E30613] cursor-pointer rounded-none border-neutral-300"
                  />
                  <span className="text-sm text-neutral-800 font-semibold">Mountaineering</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={activities.everyday} 
                    onChange={(e) => setActivities({...activities, everyday: e.target.checked})} 
                    className="w-4 h-4 accent-[#E30613] cursor-pointer rounded-none border-neutral-300"
                  />
                  <span className="text-sm text-neutral-800 font-semibold">Everyday</span>
                </label>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={activities.trailRunning} 
                    onChange={(e) => setActivities({...activities, trailRunning: e.target.checked})} 
                    className="w-4 h-4 accent-[#E30613] cursor-pointer rounded-none border-neutral-300"
                  />
                  <span className="text-sm text-neutral-800 font-semibold">Trail Running</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={activities.climbing} 
                    onChange={(e) => setActivities({...activities, climbing: e.target.checked})} 
                    className="w-4 h-4 accent-[#E30613] cursor-pointer rounded-none border-neutral-300"
                  />
                  <span className="text-sm text-neutral-800 font-semibold">Climbing</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={activities.travel} 
                    onChange={(e) => setActivities({...activities, travel: e.target.checked})} 
                    className="w-4 h-4 accent-[#E30613] cursor-pointer rounded-none border-neutral-300"
                  />
                  <span className="text-sm text-neutral-800 font-semibold">Travel</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={activities.viaFerrata} 
                    onChange={(e) => setActivities({...activities, viaFerrata: e.target.checked})} 
                    className="w-4 h-4 accent-[#E30613] cursor-pointer rounded-none border-neutral-300"
                  />
                  <span className="text-sm text-neutral-800 font-semibold">Via Ferrata</span>
                </label>
              </div>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed max-w-lg mt-1 select-none">
              Sharing your preferences helps us personalize and filter the best content for you.
            </p>
            
            <p className="text-xs text-neutral-800 mt-2 font-medium select-none">
              <span className="font-bold">+20</span> points for Mammut Access members
            </p>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center gap-6 select-none">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5B5B5B] text-white py-4 font-bold text-sm tracking-widest hover:bg-[#4a4a4a] active:bg-[#3d3d3d] transition-colors rounded-none uppercase cursor-pointer disabled:bg-neutral-300"
          >
            {loading ? 'Processing...' : 'SAVE'}
          </button>
          
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-red-600 transition-colors font-bold uppercase tracking-wider text-xs cursor-pointer"
          >
            <FiTrash2 size={15} />
            DELETE YOUR ACCOUNT
          </button>
        </div>
      </form>
    </div>
  )
}
