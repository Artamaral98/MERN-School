import { useState, useEffect } from 'react'
import './App.css'
import Router from './routes/Router'
import publicRoutes from './routes/publicRoutes'
import GetRoutes from './routes/GetRoutes'
import Cookies from 'js-cookie'

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes])

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      const privateRoutes = GetRoutes()
      setAllRoutes([...publicRoutes, privateRoutes])
    } else {
      setAllRoutes([...publicRoutes])
    }
  }, [])

  return <Router allRoutes={allRoutes} />
}

export default App
