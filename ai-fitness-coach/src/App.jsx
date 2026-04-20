import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ChatCoach from './pages/ChatCoach'
import AddWorkout from './pages/AddWorkout'
import Diet from './pages/Diet'
import Progress from './pages/Progress'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<ChatCoach />} />
        <Route path="/add-workout" element={<AddWorkout />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  )
}

export default App
