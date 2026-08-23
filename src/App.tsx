import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ExperienceFile from "./pages/ExperienceFile";
import Education from "./pages/Education";
import ProjectFile from "./pages/ProjectFile";
import Techstack from "./pages/Techstack";
import Resume from "./pages/Resume";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="experience/:slug" element={<ExperienceFile />} />
        <Route path="education" element={<Education />} />
        <Route path="projects/:slug" element={<ProjectFile />} />
        <Route path="techstack" element={<Techstack />} />
        <Route path="resume" element={<Resume />} />
      </Route>
    </Routes>
  );
}

export default App;
