import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Interview from './pages/Interview';
import Summary from './pages/Summary';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Interview />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
