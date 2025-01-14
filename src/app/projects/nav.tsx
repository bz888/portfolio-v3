"use client"

import ProjectItem from "@/components/project/ProjectItem";
import CollapsibleProjectItem from "@/components/project/ProjectMobileItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateSlug } from "@/helper/globalHelper";
import { Projects, Project } from "@/types/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Prop = {
  projects: Projects
  children: React.ReactNode
}

type NavItemProp = {
  project: Project
  onProjectClick: () => Promise<void> | void

}

function CollapsibleNavItem({ project, activeProject, setActiveProject, onProjectClick }: NavItemProp & { activeProject: string | null, setActiveProject: (title: string | null) => void }) {
  const pathname = usePathname();

  const isOpen = activeProject === project.title;

  useEffect(() => {
    if (pathname === '/projects') {
      setActiveProject(null);
    }

    if (pathname.includes(generateSlug(project.title))) {
      setActiveProject(project.title);
    }
  }, [pathname, project.title, setActiveProject]);

  const handleOpen = () => {
    if (isOpen) {
      setActiveProject(null); // Close the current item
    } else {
      setActiveProject(project.title); // Open the clicked item
    }
  };

  return (
    <CollapsibleProjectItem
      project={project}
      isOpen={isOpen}
      handleOpen={handleOpen}
      onProjectClick={onProjectClick}
    />
  );
}


function ProjectNavItem({project, onProjectClick} :NavItemProp ) { 
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    const setState = (bool: boolean) => {
      setIsOpen(bool)
    }

    if (pathname.includes(generateSlug(project.title))) {
      setState(true)
      return
    } 

    setState(false)


  },[pathname, project.title])

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <ProjectItem
    project={project}
    onProjectClick={onProjectClick} 
    isOpen={isOpen}
    handleOpen={handleOpen}
    />
  )
}


export default function AppNav({projects, children}: Prop) {
  const router = useRouter()
  const [activeProject, setActiveProject] = useState<string | null>(null);


  const onClick = (projectTitle : string) => {
    router.replace(`/projects/${generateSlug(projectTitle)}`)
  }

  const [isSmallScreen, setIsSmallScreen] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateScreenSize = () => setIsSmallScreen(mediaQuery.matches);

    updateScreenSize();

    mediaQuery.addEventListener('change', updateScreenSize);

    return () => mediaQuery.removeEventListener('change', updateScreenSize);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row h-screen z-10 overflow-hidden pl-10 smallerScreen:ml-10">
      <ScrollArea className="smallerScreen:w-1/3 pr-10 smallerScreen:pr-0 w-full h-5/6 flex flex-col gap-4">
      <div className="flex flex-col gap-4 pt-4 pb-8 mb-10 h-max">
             {projects.map((project) => {
              if (!isSmallScreen) {
                return (
                  <ProjectNavItem
                  key={project.id}
                  project={project}
                  onProjectClick={() => onClick(project.title)}
                />
                )
              }

              return (
                <CollapsibleNavItem
                key={project.title}
                project={project}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                onProjectClick={() => onClick(project.title)}
              />
              )
             }
            )
          }
        </div>
      </ScrollArea>

    {children}
    </div>
  )
}