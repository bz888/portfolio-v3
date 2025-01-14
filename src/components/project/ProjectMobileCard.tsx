import { Project } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import ImageModal from "./ImageModal";

type Prop = {
  project: Project;
};

export default function ProjectMobileCard({ project }: Prop) {
  return (
    <Card className="w-full p-0 bg-transparent">
      <CardHeader className="p-0 pt-1">
        <CardDescription>{project.date} | {project.type} | {project.status}</CardDescription>
        <CardDescription>
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Code
            </a>
          </CardDescription>
         {project?.deploymentLink && (
          <CardDescription>
            <a
              href={project.deploymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Deployment
            </a>
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="p-0 ">
        { project.media?.length > 0 && (
            <ImageModal title={project.title} media={project.media} alt="bz888"/>       
             )}

        {project.techStack.length > 0 && (
          <div>
            <span className="text-muted-foreground text-sm">Tech Stack:</span>
            <ul className="list-none pl-5">
              {project.techStack.map((tech, index) => (
                <li className="text-muted-foreground text-sm" key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="pt-2">{project.description}</p>
      </CardContent>
    </Card>
  )
}
