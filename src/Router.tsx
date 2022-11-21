import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History'
import { DeafultLayout } from './layouts/DefaultLayout'
export function Router() {
  return (
    <Routes>
      <Route path='/' element={<DeafultLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
