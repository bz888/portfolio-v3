import { Project } from "@/types/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import ProjectMobileCard from "./ProjectMobileCard";


type ItemProp = {
  project: Project
  handleOpen: () => Promise<void> | void
  isOpen: boolean
  onProjectClick: () => Promise<void> | void
}

// abstract functions and prop pass logic
export default function CollapsibleProjectItem({project, isOpen, handleOpen, onProjectClick}: ItemProp) {
  return (
    <Collapsible 

      key={project.id}
      onOpenChange={handleOpen}
      open={isOpen}
      className="w-auto group/collapsible"
    >
      <div className="flex items-center justify-between space-x-4">
        <h1 className="text-base font-semibold">{project.title}</h1>
        <div className="flex-grow text-gray-600 text-sm text-right">
          <span>{project.date} | {project.type}</span>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" onClick={onProjectClick}>
            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
            <span className="sr-only"></span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2">
        <ProjectMobileCard project={project}/>
      </CollapsibleContent>
    </Collapsible>
  )
}
