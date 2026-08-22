import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import ExperienceDetail from './pages/ExperienceDetail'
import Education from './pages/Education'
import Projects from './pages/Projects'
import Techstack from './pages/Techstack'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="experience/:slug" element={<ExperienceDetail />} />
        <Route path="education" element={<Education />} />
        <Route path="projects" element={<Projects />} />
        <Route path="techstack" element={<Techstack />} />
      </Route>
    </Routes>
  )
}

export default App
