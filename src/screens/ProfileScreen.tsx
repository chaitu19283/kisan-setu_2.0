import type { NavProps, Language, Role } from '../types'
import { farmer, salesHistory } from '../data'

interface ProfileScreenProps extends NavProps {
  lang: Language
  setLang: (l: Language) => void
  role: Role
}

const langLabels: Record<Language, string> = { en: 'English', te: 'తెలుగు', hi: 'हिंदी', mr: 'मराठी' }

export default function ProfileScreen({ navigate, lang, setLang, role }: ProfileScreenProps) {
  const totalNet = salesHistory.reduce((s, r) => s + r.net, 0)

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {lang === 'te' ? 'ప్రొఫైల్' : lang === 'hi' ? 'मेरा खाता' : lang === 'mr' ? 'माझं खाते' : 'Profile'}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl">
              🧑‍🌾
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{farmer.name}</h2>
              <p className="text-xs text-stone-500 mt-0.5">{farmer.nameTE}</p>
              <p className="text-sm text-stone-500">{farmer.village}, {farmer.district}</p>
              <p className="text-sm text-stone-500">{farmer.phone}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-bold">✓ Verified Farmer</span>
            <span className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full font-semibold">Since {farmer.memberSince}</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-semibold">Role: {role.toUpperCase()}</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            {lang === 'te' ? 'భాష' : lang === 'hi' ? 'भाषा चुनो' : lang === 'mr' ? 'भाषा निवडा' : 'Language'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(['hi', 'mr', 'te', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${
                  lang === l ? 'bg-amber-600 text-white border-amber-600' : 'bg-stone-50 text-stone-600 border-stone-200'
                }`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-amber-600 rounded-2xl p-4">
          <p className="text-amber-100 text-xs font-bold uppercase tracking-wider mb-3">
            {lang === 'te' ? 'ఈ సీజన్ సారాంశం' : lang === 'hi' ? 'इस सीज़न की कमाई' : lang === 'mr' ? 'या हंगामाची कमाई' : 'Season Earnings'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Sales', val: farmer.totalSales },
              { label: 'Net Total', val: `₹${(totalNet / 1000).toFixed(0)}K` },
              { label: 'Best/kg', val: '₹24' },
            ].map((s) => (
              <div key={s.label} className="bg-amber-500 rounded-xl px-2 py-3 text-center">
                <p className="text-amber-100 text-xs font-semibold">{s.label}</p>
                <p className="text-white font-bold text-xl mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.val}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('profitDashboard')}
            className="mt-3 w-full py-3 bg-white text-amber-700 rounded-xl font-bold text-sm"
          >
            {lang === 'te' ? 'పూర్తి ఆదాయ నివేదిక →' : lang === 'hi' ? 'पूरी कमाई देखो →' : lang === 'mr' ? 'पूर्ण कमाई पहा →' : 'Full Earnings Report →'}
          </button>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl px-4 py-4 shadow-sm">
          <p className="font-bold text-stone-900 text-sm mb-3">🤝 {farmer.fpo}</p>
          <div className="bg-stone-50 rounded-xl px-3 py-2.5 mb-2">
            <p className="text-xs text-stone-500">Active member · 47 farmers · Bulk sale benefits</p>
          </div>
          <button
            onClick={() => navigate('fpoDashboard')}
            className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-sm font-bold"
          >
            View FPO Dashboard →
          </button>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl px-4 py-4 shadow-sm">
          <p className="font-bold text-stone-900 text-sm mb-3">Switch View</p>
          <div className="space-y-2">
            <button
              onClick={() => navigate('buyerDashboard')}
              className="w-full flex items-center gap-3 px-3 py-3 bg-stone-50 rounded-xl text-left"
            >
              <span className="text-xl">🏪</span>
              <div>
                <p className="font-semibold text-stone-800 text-sm">Buyer Dashboard</p>
                <p className="text-xs text-stone-500">View produce listings, make offers, manage payments</p>
              </div>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-stone-400 ml-auto" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button
              onClick={() => navigate('fpoDashboard')}
              className="w-full flex items-center gap-3 px-3 py-3 bg-stone-50 rounded-xl text-left"
            >
              <span className="text-xl">🤝</span>
              <div>
                <p className="font-semibold text-stone-800 text-sm">FPO Dashboard</p>
                <p className="text-xs text-stone-500">Aggregate lots, bulk offers, member management</p>
              </div>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-stone-400 ml-auto" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          {[
            { icon: '🔔', label: lang === 'te' ? 'నోటిఫికేషన్లు' : lang === 'hi' ? 'नोटिफिकेशन' : lang === 'mr' ? 'सूचना' : 'Notifications', val: 'On' },
            { icon: '🔒', label: lang === 'te' ? 'గోప్యత' : lang === 'hi' ? 'प्राइवेसी' : lang === 'mr' ? 'गोपनीयता' : 'Privacy & Security', val: '' },
            { icon: '📞', label: lang === 'te' ? 'సహాయం' : lang === 'hi' ? 'मदद' : lang === 'mr' ? 'मदत' : 'Help & Support', val: '' },
            { icon: '📋', label: lang === 'te' ? 'నిబంధనలు' : lang === 'hi' ? 'नियम' : lang === 'mr' ? 'अटी' : 'Terms', val: '' },
          ].map((item, i, arr) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${i < arr.length - 1 ? 'border-b border-stone-100' : ''}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="flex-1 font-semibold text-stone-700 text-sm">{item.label}</span>
              {item.val && <span className="text-xs text-stone-400 font-semibold">{item.val}</span>}
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-stone-300" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('login')}
          className="w-full py-3.5 border-2 border-stone-200 rounded-2xl text-stone-600 font-bold text-sm"
        >
          {lang === 'te' ? 'సైన్ అవుట్' : lang === 'hi' ? 'बाहर जाओ' : lang === 'mr' ? 'बाहेर पडा' : 'Sign Out'}
        </button>

        <div className="pb-4" />
      </div>
    </div>
  )
}
