import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { router } from './router.tsx'
import { store } from '@/app/store.ts'
import { Provider } from 'react-redux'
import { AccessProvider } from '@/components/ui/access-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AccessProvider>
        <RouterProvider router={router} />
      </AccessProvider>
    </Provider>
  </StrictMode>
)
