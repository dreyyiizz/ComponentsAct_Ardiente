import { StrictMode } from 'react'
import { Provider } from '@/components/ui/provider'
import { createRoot } from 'react-dom/client'
import './index.css'
import AchievementDisplay from './components/Achievements-Display/AchievementDisplay'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>

      <Navbar />
      <AchievementDisplay />
      <Footer />
      
    </Provider>
  </StrictMode>
)
