import { useState } from 'react'
import type { Language, Role } from '../types'

interface LoginScreenProps {
  onLogin: (role: Role, lang: Language) => void
}

const languages: { code: Language; label: string; sublabel: string }[] = [
  { code: 'hi', label: 'हिंदी',   sublabel: 'Hindi' },
  { code: 'mr', label: 'मराठी',  sublabel: 'Marathi' },
  { code: 'te', label: 'తెలుగు', sublabel: 'Telugu' },
  { code: 'en', label: 'English', sublabel: 'English' },
]

const t: Record<Language, Record<string, string>> = {
  en: {
    tagline: 'Sell smart. Earn more.',
    iam: 'I am a',
    mobile: 'Mobile Number',
    sendOtp: 'Send OTP',
    login: 'Login →',
    otpSent: 'Code sent to',
    changeNum: 'Change number',
    voice: 'Tap to speak instead',
    help: 'Need help? Call support',
    selectLang: 'Choose your language',
  },
  hi: {
    tagline: 'समझदारी से बेचो। ज़्यादा कमाओ।',
    iam: 'मैं हूँ',
    mobile: 'मोबाइल नंबर',
    sendOtp: 'OTP भेजो',
    login: 'लॉगिन करो →',
    otpSent: 'कोड गया',
    changeNum: 'नंबर बदलो',
    voice: 'बोलकर बताओ',
    help: 'मदद चाहिए? फ़ोन करो',
    selectLang: 'अपनी भाषा चुनो',
  },
  mr: {
    tagline: 'हुशारीने विका. जास्त कमवा.',
    iam: 'मी आहे',
    mobile: 'मोबाईल नंबर',
    sendOtp: 'OTP पाठवा',
    login: 'लॉगिन करा →',
    otpSent: 'कोड गेला',
    changeNum: 'नंबर बदला',
    voice: 'बोलून सांगा',
    help: 'मदत हवी? फोन करा',
    selectLang: 'तुमची भाषा निवडा',
  },
  te: {
    tagline: 'తెలివిగా అమ్మండి. ఎక్కువ సంపాదించండి.',
    iam: 'నేను ఒక',
    mobile: 'మొబైల్ నంబర్',
    sendOtp: 'OTP పంపు',
    login: 'లాగిన్ →',
    otpSent: 'కోడ్ పంపబడింది',
    changeNum: 'నంబర్ మార్చు',
    voice: 'మాట్లాడి చెప్పు',
    help: 'సహాయం కావాలా? కాల్ చేయండి',
    selectLang: 'మీ భాష ఎంచుకోండి',
  },
}

const roles: { id: Role; emoji: string; hi: string; mr: string; te: string; en: string; sub: string }[] = [
  { id: 'farmer', emoji: '🌾', hi: 'किसान',       mr: 'शेतकरी',          te: 'రైతు',    en: 'Farmer',  sub: 'Small / marginal farmer' },
  { id: 'fpo',    emoji: '🤝', hi: 'किसान समूह',  mr: 'शेतकरी संघटना',  te: 'FPO',     en: 'FPO',     sub: 'Farmer Producer Organisation' },
  { id: 'buyer',  emoji: '🏪', hi: 'खरीदार',      mr: 'खरेदीदार',        te: 'కొనుగోలుదారు', en: 'Buyer', sub: 'Wholesaler / Processor' },
]

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [lang, setLang] = useState<Language>('hi')
  const [role, setRole] = useState<Role>('farmer')
  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])

  const l = t[lang]

  const handleOtp = (val: string, idx: number) => {
    const next = [...otp]
    next[idx] = val.replace(/\D/, '').slice(0, 1)
    setOtp(next)
    if (val && idx < 3) document.getElementById(`otp-${idx + 1}`)?.focus()
  }

  const roleName = (r: typeof roles[0]) => {
    if (lang === 'hi') return r.hi
    if (lang === 'mr') return r.mr
    if (lang === 'te') return r.te
    return r.en
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4EFE4' }}>
      <div className="flex-1 flex flex-col px-5 pt-12 pb-4">

        {/* Logo */}
        <div className="mb-7 text-center">
          <div className="inline-flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-3xl bg-green-700 flex items-center justify-center shadow-lg shadow-green-200">
              <span style={{ fontSize: 36 }}>🌾</span>
            </div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              KisanSetu
            </h1>
            <p className="text-stone-500 text-sm font-semibold">{l.tagline}</p>
          </div>
        </div>

        {/* Language picker — 2×2 grid for 4 options */}
        <div className="mb-5">
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2">{l.selectLang}</p>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lg) => (
              <button
                key={lg.code}
                onClick={() => setLang(lg.code)}
                className={`py-4 rounded-2xl font-bold text-center border-2 transition-all active:scale-95 ${
                  lang === lg.code
                    ? 'bg-green-700 text-white border-green-700 shadow-md shadow-green-200'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                <span className="block text-xl font-black">{lg.label}</span>
                <span className={`text-xs mt-0.5 block ${lang === lg.code ? 'text-green-200' : 'text-stone-400'}`}>
                  {lg.sublabel}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Role picker */}
        <div className="mb-5">
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2">{l.iam}</p>
          <div className="flex flex-col gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left active:scale-[0.98] ${
                  role === r.id
                    ? 'bg-green-50 border-green-500'
                    : 'bg-white border-stone-200'
                }`}
              >
                <span style={{ fontSize: 36 }}>{r.emoji}</span>
                <div className="flex-1">
                  <p className={`font-black text-base ${role === r.id ? 'text-green-800' : 'text-stone-800'}`}>
                    {roleName(r)}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">{r.sub}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  role === r.id ? 'border-green-700 bg-green-700' : 'border-stone-300'
                }`}>
                  {role === r.id && <span className="text-white text-sm font-black">✓</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Phone / OTP */}
        {step === 'form' ? (
          <div className="mb-4">
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2">{l.mobile}</p>
            <div className="flex gap-2">
              <div className="flex items-center px-3.5 py-4 bg-white border-2 border-stone-200 rounded-2xl text-stone-700 font-black text-base">
                🇮🇳 +91
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/, '').slice(0, 10))}
                placeholder="94012 34567"
                className="flex-1 px-4 py-4 bg-white border-2 border-stone-200 rounded-2xl text-stone-900 font-black text-2xl placeholder:text-stone-300 placeholder:font-normal placeholder:text-base outline-none focus:border-green-500"
              />
            </div>
            <button className="mt-2.5 flex items-center gap-2 text-sm text-amber-600 font-bold">
              <span className="text-base">🎤</span> {l.voice}
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1">OTP</p>
            <p className="text-sm text-stone-500 mb-3">{l.otpSent} +91 {phone || '94012 34567'}</p>
            <div className="flex gap-3">
              {otp.map((d, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="tel"
                  value={d}
                  onChange={(e) => handleOtp(e.target.value, i)}
                  className="flex-1 h-16 text-center text-3xl font-black bg-white border-2 border-stone-200 rounded-2xl outline-none focus:border-green-500 text-stone-900 transition-colors"
                />
              ))}
            </div>
            <button onClick={() => setStep('form')} className="mt-2 text-sm text-green-700 font-bold">
              {l.changeNum}
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 pb-10 space-y-2">
        <button
          onClick={() => step === 'form' ? setStep('otp') : onLogin(role, lang)}
          className="w-full py-5 bg-green-700 text-white rounded-2xl font-black text-xl shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {step === 'form' ? l.sendOtp : l.login}
        </button>
        <button
          onClick={() => onLogin(role, lang)}
          className="w-full py-3.5 text-stone-500 font-semibold text-sm"
        >
          🎤 {l.help}
        </button>
      </div>
    </div>
  )
}
