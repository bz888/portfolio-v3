import { GITHUB_LINK, LINKEDIN_LINK } from "@/globalConstant";

export default function ContactContent() {
  return (
    <div className="flex flex-col w-screen h-screen z-40 relative md:pl-10 md:ml-10 sm:ml-8 sm:pl-8 pl-7 ml-7">
      <div>
      <a
              href={GITHUB_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
                    <span className="z-40 hover:underline text-6xl sm:text-7xl md:text-8xl font-semibold cursor-pointer hover:text-gray-500">
          {"Github >"}
          </span>
            </a>
      </div>
      <div>
      <a
              href={LINKEDIN_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
        <span className="text-6xl sm:text-7xl md:text-8xl font-semibold cursor-pointer hover:text-gray-500 hover:underline">{"Linkedin >"}</span>
        </a>
      </div>
    </div>
  )
}