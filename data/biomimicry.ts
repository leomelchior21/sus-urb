import type { Biomimicry, System } from "./projects";

export interface BiomimicryStory {
  name: Biomimicry;
  title: string;
  principle: string;
  translation: string[];
  systems: System[];
  imageIndex: number;
}

export const biomimicryStories: BiomimicryStory[] = [
  {
    name: "Honeycomb",
    title: "Honeycomb-Inspired Spaces",
    principle: "Repeating cells create strong, efficient, modular structures.",
    translation: ["modular organization", "adaptable plans", "less material"],
    systems: ["Waste", "Public Space"],
    imageIndex: 20
  },
  {
    name: "Moss",
    title: "Moss-Inspired Green Walls",
    principle: "Moss occupies vertical surfaces, keeps moisture, and supports tiny ecosystems.",
    translation: ["living facades", "thermal comfort", "urban biodiversity"],
    systems: ["Greenery", "Climate"],
    imageIndex: 35
  },
  {
    name: "Mangrove",
    title: "Mangrove-Inspired Supports",
    principle: "Branching roots create stability in wet and unstable environments.",
    translation: ["elevated buildings", "permeable ground", "flood resilience"],
    systems: ["Water", "Climate"],
    imageIndex: 31
  },
  {
    name: "Termite",
    title: "Termite-Inspired Airflow",
    principle: "Interconnected channels regulate temperature through passive air movement.",
    translation: ["ventilation shafts", "airflow paths", "lower cooling demand"],
    systems: ["Energy", "Climate"],
    imageIndex: 4
  },
  {
    name: "Cactus",
    title: "Cactus-Inspired Shading",
    principle: "Specialized forms manage intense sunlight, heat, and scarce water.",
    translation: ["facade fins", "shaded paths", "reduced heat gain"],
    systems: ["Water", "Climate"],
    imageIndex: 34
  }
];
