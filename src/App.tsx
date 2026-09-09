import { useState } from 'react'
import type { Screen, TabName, Language, Role } from './types'
import BottomNav from './components/BottomNav'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import MyProduceScreen from './screens/MyProduceScreen'
import AddProduceScreen from './screens/AddProduceScreen'
import MarketScreen from './screens/MarketScreen'
import BestOptionsScreen from './screens/BestOptionsScreen'
import SellNowScreen from './screens/SellNowScreen'
import BuyerScreen from './screens/BuyerScreen'
import OfferCompareScreen from './screens/OfferCompareScreen'
import TransportScreen from './screens/TransportScreen'
import OrdersScreen from './screens/OrdersScreen'
import OrderTrackingScreen from './screens/OrderTrackingScreen'
import PaymentScreen from './screens/PaymentScreen'
import FeedbackScreen from './screens/FeedbackScreen'
import ProfitDashboardScreen from './screens/ProfitDashboardScreen'
import ProfileScreen from './screens/ProfileScreen'
import BuyerDashboardScreen from './screens/BuyerDashboardScreen'
import FPODashboardScreen from './screens/FPODashboardScreen'
import NegotiationScreen from './screens/NegotiationScreen'
import PaymentSecuredScreen from './screens/PaymentSecuredScreen'
import WeighingQCScreen from './screens/WeighingQCScreen'
import FinalReceiptScreen from './screens/FinalReceiptScreen'
import BuyerProfileScreen from './screens/BuyerProfileScreen'
import SpoilageRiskScreen from './screens/SpoilageRiskScreen'
import CropScanScreen from './screens/CropScanScreen'
import QualityAnalysisScreen from './screens/QualityAnalysisScreen'
import SmartDecisionScreen from './screens/SmartDecisionScreen'

const tabForScreen: Partial<Record<Screen, TabName>> = {
  home: 'home',
  myProduce: 'myProduce',
  addProduce: 'myProduce',
  market: 'market',
  bestOptions: 'market',
  sellNow: 'market',
  buyers: 'market',
  offerCompare: 'market',
  orders: 'orders',
  orderTracking: 'orders',
  transport: 'orders',
  payment: 'orders',
  feedback: 'orders',
  profitDashboard: 'profile',
  profile: 'profile',
  buyerDashboard: 'profile',
  fpoDashboard: 'profile',
  negotiation: 'market',
  paymentSecured: 'orders',
  weighingQC: 'orders',
  finalReceipt: 'orders',
  buyerProfile: 'market',
  spoilageRisk: 'market',
  cropScan: 'market',
  qualityAnalysis: 'market',
  smartDecision: 'market',
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [activeTab, setActiveTab] = useState<TabName>('home')
  const [lang, setLang] = useState<Language>('en')
  const [role, setRole] = useState<Role>('farmer')

  const navigate = (s: Screen) => {
    setScreen(s)
    const tab = tabForScreen[s]
    if (tab) setActiveTab(tab)
  }

  const handleLogin = (r: Role, l: Language) => {
    setRole(r)
    setLang(l)
    if (r === 'buyer') navigate('buyerDashboard')
    else if (r === 'fpo') navigate('fpoDashboard')
    else navigate('home')
  }

  const isLoggedIn = screen !== 'login'
  const hideBotNav = ['buyerDashboard', 'fpoDashboard', 'cropScan'].includes(screen)

  const sharedProps = { navigate, lang }

  const renderScreen = () => {
    switch (screen) {
      case 'login':        return <LoginScreen onLogin={handleLogin} />
      case 'home':         return <HomeScreen {...sharedProps} />
      case 'myProduce':    return <MyProduceScreen {...sharedProps} />
      case 'addProduce':   return <AddProduceScreen {...sharedProps} />
      case 'market':       return <MarketScreen {...sharedProps} />
      case 'bestOptions':  return <BestOptionsScreen {...sharedProps} />
      case 'sellNow':      return <SellNowScreen {...sharedProps} />
      case 'buyers':       return <BuyerScreen {...sharedProps} />
      case 'offerCompare': return <OfferCompareScreen {...sharedProps} />
      case 'transport':    return <TransportScreen {...sharedProps} />
      case 'orders':       return <OrdersScreen {...sharedProps} />
      case 'orderTracking':return <OrderTrackingScreen {...sharedProps} />
      case 'payment':      return <PaymentScreen {...sharedProps} />
      case 'feedback':     return <FeedbackScreen {...sharedProps} />
      case 'profitDashboard': return <ProfitDashboardScreen {...sharedProps} />
      case 'profile':
        return (
          <ProfileScreen
            navigate={navigate}
            lang={lang}
            setLang={setLang}
            role={role}
          />
        )
      case 'buyerDashboard':   return <BuyerDashboardScreen {...sharedProps} />
      case 'fpoDashboard':     return <FPODashboardScreen {...sharedProps} />
      case 'negotiation':      return <NegotiationScreen {...sharedProps} />
      case 'paymentSecured':   return <PaymentSecuredScreen {...sharedProps} />
      case 'weighingQC':       return <WeighingQCScreen {...sharedProps} />
      case 'finalReceipt':     return <FinalReceiptScreen {...sharedProps} />
      case 'buyerProfile':     return <BuyerProfileScreen {...sharedProps} />
      case 'spoilageRisk':     return <SpoilageRiskScreen {...sharedProps} />
      case 'cropScan':         return <CropScanScreen navigate={navigate} />
      case 'qualityAnalysis':  return <QualityAnalysisScreen {...sharedProps} />
      case 'smartDecision':    return <SmartDecisionScreen {...sharedProps} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-stone-200 flex justify-center items-start">
      <div
        className="w-full max-w-md flex flex-col relative overflow-hidden"
        style={{ minHeight: '100svh', background: '#F4EFE4' }}
      >
        <div
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: isLoggedIn && !hideBotNav ? 72 : 0 }}
        >
          {renderScreen()}
        </div>

        {isLoggedIn && !hideBotNav && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
            <BottomNav
              activeTab={activeTab}
              lang={lang}
              onTabChange={(tab) => {
                setActiveTab(tab)
                const tabScreenMap: Record<TabName, Screen> = {
                  home: 'home',
                  myProduce: 'myProduce',
                  market: 'market',
                  orders: 'orders',
                  profile: 'profile',
                }
                navigate(tabScreenMap[tab])
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
