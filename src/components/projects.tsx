import React from "react";
import projects_data from "./../data/projects";

function Projects() {
  return (
    <div className="content" id="projects">
      {projects_data.projects.map((project) => (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          key={project.id}
        >
          <div className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default Projects;
