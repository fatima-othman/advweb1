import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {project.name}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {project.type}
            </p>

            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Reports: {project.reports}</span>
              <span>{project.lastDate}</span>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Country: {project.country}
            </p>

            <button className="w-full bg-[#145C43] hover:bg-[#0F4A36] text-white py-2 rounded-xl">
              View Project →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;