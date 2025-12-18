import React from "react";
import projects_data from "./../data/projects";

function Projects() {
  return (
    <div className="content">
      <a
        href="https://github.com/He4vyL0v3"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 style={{ textAlign: "left" }}>// SOFT</h2>
        {projects_data.projects.map((project) => (
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </a>
        ))}
      </a>
    </div>
  );
}

export default Projects;
