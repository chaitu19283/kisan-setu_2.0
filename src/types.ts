export type Screen =
  | 'login'
  | 'home'
  | 'myProduce'
  | 'addProduce'
  | 'market'
  | 'bestOptions'
  | 'sellNow'
  | 'buyers'
  | 'offerCompare'
  | 'transport'
  | 'orders'
  | 'orderTracking'
  | 'payment'
  | 'feedback'
  | 'profitDashboard'
  | 'profile'
  | 'buyerDashboard'
  | 'fpoDashboard'
  | 'negotiation'
  | 'paymentSecured'
  | 'weighingQC'
  | 'finalReceipt'
  | 'buyerProfile'
  | 'spoilageRisk'
  | 'cropScan'
  | 'qualityAnalysis'
  | 'smartDecision'

export type TabName = 'home' | 'myProduce' | 'market' | 'orders' | 'profile'

export type Language = 'en' | 'te' | 'hi' | 'mr'

export type Role = 'farmer' | 'fpo' | 'buyer'

export interface NavProps {
  navigate: (screen: Screen) => void
  lang?: Language
}
