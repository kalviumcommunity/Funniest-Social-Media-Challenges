import { HashRouter } from 'react-router-dom'
import AllRoutes from './AllRoutes'
import './App.css'

function App() {
  return (
    <>
    <HashRouter>
      <AllRoutes/>
    </HashRouter>
    </>
  )
}

export default App
