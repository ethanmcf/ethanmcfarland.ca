import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Education from './pages/Education'
import Projects from './pages/Projects'
import Techstack from './pages/Techstack'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="experience" element={<Experience />} />
        <Route path="education" element={<Education />} />
        <Route path="projects" element={<Projects />} />
        <Route path="techstack" element={<Techstack />} />
      </Route>
    </Routes>
  )
}

export default App
