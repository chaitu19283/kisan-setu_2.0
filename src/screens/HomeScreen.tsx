import type { NavProps, Language, Screen } from '../types'
import { farmer, produce } from '../data'

interface HomeScreenProps extends NavProps {
  lang: Language
}

const labels: Record<Language, Record<string, string>> = {
  en: {
    greeting: 'Hello', sell: 'Sell My Crop', speak: 'Speak',
    deal: 'Truck Tomorrow', dealSub: '10:00 AM · Tomatoes · 1,000 kg',
    rec: 'Better price found!', recSub: 'You may get ₹55,000 · View →',
    buyers: 'Buyers', price: 'Best Price', transport: 'Truck', storage: 'Storage',
  },
  hi: {
    greeting: 'नमस्ते', sell: 'फसल बेचो', speak: 'बोलो',
    deal: 'कल ट्रक आएगा', dealSub: '10:00 AM · टमाटर · 1,000 किलो',
    rec: 'अच्छा भाव मिला!', recSub: 'मिलेगा ₹55,000 · देखो →',
    buyers: 'खरीदार', price: 'भाव', transport: 'ट्रक', storage: 'गोदाम',
  },
  mr: {
    greeting: 'नमस्कार', sell: 'पीक विका', speak: 'बोला',
    deal: 'उद्या ट्रक येईल', dealSub: '10:00 AM · टोमॅटो · 1,000 किलो',
    rec: 'चांगला भाव मिळाला!', recSub: 'मिळेल ₹55,000 · पहा →',
    buyers: 'खरेदीदार', price: 'भाव', transport: 'ट्रक', storage: 'गोदाम',
  },
  te: {
    greeting: 'నమస్కారం', sell: 'పంట అమ్మండి', speak: 'మాట్లాడు',
    deal: 'రేపు ట్రక్కు వస్తుంది', dealSub: '10:00 AM · టమాటాలు · 1,000 కిలో',
    rec: 'మెరుగైన ధర దొరికింది!', recSub: '₹55,000 వస్తుంది · చూడు →',
    buyers: 'కొనుగోలుదారులు', price: 'ధర', transport: 'ట్రక్కు', storage: 'గోదాం',
  },
}

const quickTiles: { emoji: string; key: string; nav: Screen; bg: string }[] = [
  { emoji: '👥', key: 'buyers',    nav: 'buyers',      bg: '#EFF6FF' },
  { emoji: '💰', key: 'price',     nav: 'bestOptions', bg: '#FFFBEB' },
  { emoji: '🚚', key: 'transport', nav: 'transport',   bg: '#FFF7ED' },
  { emoji: '🏪', key: 'storage',   nav: 'bestOptions', bg: '#F5F3FF' },
]

export default function HomeScreen({ navigate, lang = 'en' }: HomeScreenProps) {
  const l = labels[lang]

  return (
    <div className="flex flex-col" style={{ background: '#F4EFE4', minHeight: '100%' }}>

      {/* Header */}
      <div className="px-4 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-500 font-semibold">{l.greeting}</p>
            <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {lang === 'te' ? farmer.nameTE : farmer.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-10 px-3 bg-amber-500 rounded-full flex items-center gap-1.5 shadow-md shadow-amber-200 active:opacity-80">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              </svg>
              <span className="text-white text-xs font-bold">{l.speak} 🎤</span>
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 relative active:opacity-80">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-3">

        {/* Hero — Sell My Crop */}
        <button
          onClick={() => navigate('addProduce')}
          className="w-full rounded-3xl text-left overflow-hidden active:scale-[0.98] transition-transform"
          style={{ background: 'linear-gradient(140deg, #14532d 0%, #15803d 55%, #22c55e 100%)', minHeight: 140 }}
        >
          <div className="px-5 py-5 flex flex-col h-full">
            <span style={{ fontSize: 52, lineHeight: 1 }}>🌾</span>
            <div className="mt-3">
              <p className="text-white font-black leading-none" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28 }}>
                {l.sell}
              </p>
            </div>
            <div className="mt-4">
              <div className="bg-white/20 rounded-2xl px-4 py-2.5 inline-flex items-center">
                <span className="text-white font-bold text-base">START →</span>
              </div>
            </div>
          </div>
        </button>

        {/* Active deal */}
        <button
          onClick={() => navigate('orderTracking')}
          className="w-full bg-white rounded-2xl border-2 border-green-200 text-left active:scale-[0.98] transition-transform"
        >
          <div className="px-4 py-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
              <span style={{ fontSize: 32 }}>🚚</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                <p className="text-sm font-black text-green-700">{l.deal}</p>
              </div>
              <p className="text-xs text-stone-500">{l.dealSub}</p>
            </div>
            <span className="text-stone-400 text-xl flex-shrink-0">›</span>
          </div>
        </button>

        {/* Recommendation */}
        <button
          onClick={() => navigate('bestOptions')}
          className="w-full bg-amber-50 rounded-2xl border-2 border-amber-200 text-left active:scale-[0.98] transition-transform"
        >
          <div className="px-4 py-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <span style={{ fontSize: 32 }}>💡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-amber-700">{l.rec}</p>
              <p className="text-xs text-stone-500 mt-0.5">{l.recSub}</p>
            </div>
            <span className="text-amber-400 text-xl flex-shrink-0">›</span>
          </div>
        </button>

        {/* Quick action tiles */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {quickTiles.map((tile) => (
            <button
              key={tile.key}
              onClick={() => navigate(tile.nav)}
              className="rounded-2xl text-left px-4 py-4 border border-stone-200 active:scale-[0.97] transition-transform"
              style={{ background: tile.bg, minHeight: 100 }}
            >
              <span style={{ fontSize: 36, lineHeight: 1 }}>{tile.emoji}</span>
              <p className="text-base font-black text-stone-900 mt-3 leading-tight">{l[tile.key]}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
