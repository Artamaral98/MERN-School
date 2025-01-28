import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
      <Toaster toastOptions={{
        position: 'top-right',
        style: {
          background: '#283046',
          color: 'white'
        }
      }}/>
    </BrowserRouter>,
  </AuthProvider>
)
