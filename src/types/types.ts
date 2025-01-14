import * as THREE from "three"

export type Project = {
  id: number;
  title: string;
  date: string;
  type: "personal" | "professional" | "academic";
  description: string;
  codeLink?: string;
  deploymentLink?: string;
  media: string[];
  status: "ongoing" | "hiatus" | "ended" | "under development"
  techStack: string[]; 
};


export type Projects = Project[]

export type SphereProps = {
  vec?: THREE.Vector3;
  scale?: number;
  r?: (range: number) => number;
  setClicked: (clicked: boolean) => void;
  isClicked: boolean;
  textureMap: THREE.Texture
  color: string
}

export type PointerProps = {
  vec?: THREE.Vector3;
}