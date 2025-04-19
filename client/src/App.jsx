import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Interview from './pages/Interview';
import Summary from './pages/Summary';
import Home from './pages/Home';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Interview />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
