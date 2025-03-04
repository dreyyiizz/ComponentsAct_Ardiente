import { StrictMode } from 'react'
import { Provider } from '@/components/ui/provider'
import { createRoot } from 'react-dom/client'
import './index.css'

import EmployeeDisplay from './components/Employees/EmployeeDisplay'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <EmployeeDisplay />
    </Provider>
  </StrictMode>
)
