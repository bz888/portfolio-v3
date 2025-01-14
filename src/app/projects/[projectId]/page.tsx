"use client";

import projects from '../../../projects.json';
import { generateSlug } from "@/helper/globalHelper";
import ProjectCard from "@/components/project/ProjectCard";
import { Project, Projects } from "@/types/types";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathName = usePathname();

  // Find the project based on the current path
  const project = (projects as Projects).find(
    (proj: Project) => `/projects/${generateSlug(proj.title)}` === pathName
  );
  if (!project) {
    return <div>Project not found.</div>
  }

  return (
    <ProjectCard project={project}/>
  );
}
