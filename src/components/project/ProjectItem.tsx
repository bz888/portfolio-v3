import { Project } from "@/types/types";

type ItemProp = {
  project: Project
  onProjectClick: () => Promise<void> | void
  isOpen: boolean
  handleOpen: () => Promise<void> | void
}

export default function ProjectItem({project, onProjectClick, isOpen, handleOpen}: ItemProp) {
  const handleOnClick = () => {
    handleOpen()
    onProjectClick()
  }

  return (
    <div
    onClick={handleOnClick}
    className="relative transition duration-300 group"
  >
    <div className="flex items-center justify-between">
      <h1 className={`${isOpen ? "text-gray-500" : "text-black"} text-xl font-bold mb-2 inline-block cursor-pointer hover:text-gray-500`}>{project.title}</h1>
      <div className="flex-grow text-gray-600 text-sm text-right">
          <span>{project.date} | {project.type}</span>
        </div>
    </div>
  </div>
  )
}