"use client"
import Header from "@/components/Header";
import { useBallClump } from "@/hooks/BallClumpProvider";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react"


const routeTextMap: Record<string, string> = {
  "/projects": "Projects",
  "/contacts": "Contacts",
  "/": "Hey, I'm Ben",
};

export default function AppHeader() {

  const {isClicked, setClicked} = useBallClump()
  const pathname = usePathname();
  const router = useRouter()

  const text =
    pathname.startsWith("/projects")
      ? routeTextMap["/projects"]
      : routeTextMap[pathname] || "404";

  const navigate = () => {
    if (pathname.startsWith("/projects")) router.push("/projects");
  };

  const handleBack = () => {
    setClicked(!isClicked)
    router.push("/")
  }

   return(
    <motion.div
    initial={{ x: -50, opacity: 0 }} // Starting position and opacity
    animate={{ x: 0, opacity: 1 }} // Ending position and opacity
    exit={{ x: 50, opacity: 0 }} // Optional exit animation
    transition={{ duration: 0.5, ease: "easeOut" }} // Animation timing
    >
      <Header
        isHome={pathname === '/'}
        text={text}
        navigate={navigate}
        onBack={handleBack}
    />
    </motion.div>
)
}