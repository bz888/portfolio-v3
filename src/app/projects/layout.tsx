import { Projects } from "@/types/types";
import projects from "../../projects.json"
import AppNav from "./nav";

export default function Layout({
  children,
}:{
  children: React.ReactNode;
}) {

  return (
    <div className="flex flex-col bg-transparent">
        <AppNav
      projects={projects as Projects}
    >
      <div className="z-20 w-2/3  h-screen hidden smallerScreen:block">
      {children}
      </div>
    </AppNav>
    </div>

  )
}