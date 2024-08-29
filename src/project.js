// Factory function to create blank project array list

export const projectLoad = () => {
  console.log("Called project module... creating project array now");
  let projectsArray = [];
  console.log("Pushing the title name of project to the projectArray...");
  let projectTitle = "Default Project";
  projectsArray.push({ projectTitle });
  console.log(projectsArray);
  return { projectsArray, projectTitle };
};
