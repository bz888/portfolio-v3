import { Project } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import ImageModal from "./ImageModal";

type Prop = {
  project: Project;
};

export default function ProjectCard({ project }: Prop) {
  return (
    <Card className="md:w-full md:w-2/3 hidden md:block z-10 bg-transparent">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>
          {project.date} | {project.type}
        </CardDescription>
        {project?.codeLink && (
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
        )}
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
        <CardDescription>
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
        </CardDescription>
      </CardHeader>
      <CardContent>
        { project.media?.length > 0 && (
            <ImageModal title={project.title} media={project.media} alt="bz888"/>
          )}
      <p className="pt-2">{project.description}</p>      
      </CardContent>
    </Card>
  )
}
