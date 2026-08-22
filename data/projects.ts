import { projectImages } from "./images";

export type ClassName = "7A" | "7B" | "7C";
export type Biomimicry = "Honeycomb" | "Moss" | "Mangrove" | "Termite" | "Cactus";
export type System = "Water" | "Energy" | "Greenery" | "Mobility" | "Waste" | "Public Space" | "Climate";

export interface CityProject {
  id: string;
  projectName: string;
  className: ClassName;
  groupNumber: number;
  urbanChallenge: string;
  solution: string;
  biomimicry: Biomimicry;
  urbanFunction: string[];
  systems: System[];
  sdgs: number[];
  sustainabilityStrategies: string[];
  heroImage?: string;
  galleryImages?: string[];
  sketchImages?: string[];
  finalModelImages?: string[];
  studentQuote?: string;
  cityPosition: { x: number; y: number };
}

const img = (index: number) => projectImages[(index - 1) % projectImages.length].src;

const baseStrategies: Record<Biomimicry, string[]> = {
  Honeycomb: ["modular construction", "material efficiency", "adaptable spaces"],
  Moss: ["living walls", "thermal comfort", "microclimate improvement"],
  Mangrove: ["elevated structure", "rainwater flow", "flood resilience"],
  Termite: ["passive ventilation", "air channels", "reduced cooling demand"],
  Cactus: ["solar shading", "heat reduction", "water-aware surfaces"]
};

const positions = [
  [18, 24], [34, 18], [55, 24], [76, 20], [22, 42], [43, 39], [65, 42], [83, 39],
  [15, 61], [32, 58], [51, 59], [70, 62], [88, 58], [22, 78], [42, 76], [62, 79],
  [81, 77], [12, 35], [51, 15], [91, 28], [35, 88], [58, 89], [75, 90], [8, 82]
] as const;

const records: Omit<CityProject, "id" | "cityPosition" | "sustainabilityStrategies" | "heroImage" | "galleryImages" | "finalModelImages" | "sketchImages">[] = [
  {
    projectName: "Termite Apartment Commons",
    className: "7A",
    groupNumber: 1,
    urbanChallenge: "Dense housing needs comfort, proximity, and lower energy use.",
    solution: "A shared apartment building close to shops, schools, and public transportation, with air tunnels inspired by termite mounds.",
    biomimicry: "Termite",
    urbanFunction: ["Housing", "Mixed Use"],
    systems: ["Climate", "Mobility", "Energy"],
    sdgs: [7, 11, 13]
  },
  {
    projectName: "Moss Courtyard Homes",
    className: "7A",
    groupNumber: 2,
    urbanChallenge: "Housing can become isolated and overheated when shared space is missing.",
    solution: "Homes arranged around a common courtyard where moss-inspired walls cool the space and invite community life.",
    biomimicry: "Moss",
    urbanFunction: ["Housing", "Public Space"],
    systems: ["Greenery", "Climate", "Public Space"],
    sdgs: [11, 13]
  },
  {
    projectName: "Honeycomb Modular Housing",
    className: "7A",
    groupNumber: 3,
    urbanChallenge: "Cities need housing that uses less material and can change over time.",
    solution: "Apartment modules combine in different ways using honeycomb geometry for strength and spatial efficiency.",
    biomimicry: "Honeycomb",
    urbanFunction: ["Housing"],
    systems: ["Waste", "Energy"],
    sdgs: [11, 12]
  },
  {
    projectName: "Cactus Cool Homes",
    className: "7A",
    groupNumber: 4,
    urbanChallenge: "Homes exposed to strong sun can become uncomfortable and energy intensive.",
    solution: "Cactus-inspired walls, shades, and smaller openings reduce heat gain while keeping homes livable.",
    biomimicry: "Cactus",
    urbanFunction: ["Housing"],
    systems: ["Climate", "Energy"],
    sdgs: [7, 11, 13]
  },
  {
    projectName: "Termite Office Tower",
    className: "7A",
    groupNumber: 5,
    urbanChallenge: "Workplaces often depend on mechanical cooling throughout the day.",
    solution: "An office building with termite-inspired air tunnels that move fresh air through the structure.",
    biomimicry: "Termite",
    urbanFunction: ["Work"],
    systems: ["Climate", "Energy"],
    sdgs: [7, 11, 13]
  },
  {
    projectName: "Cactus Local Market",
    className: "7A",
    groupNumber: 6,
    urbanChallenge: "Outdoor commerce needs shade, comfort, and active public space.",
    solution: "A local market with cactus-inspired roofs that protect visitors and sellers from intense sunlight.",
    biomimicry: "Cactus",
    urbanFunction: ["Commerce", "Public Space"],
    systems: ["Climate", "Public Space"],
    sdgs: [11, 12]
  },
  {
    projectName: "Honeycomb Repair Lab",
    className: "7A",
    groupNumber: 7,
    urbanChallenge: "Repair culture needs flexible civic spaces that can host different kinds of work.",
    solution: "A repair center with honeycomb-inspired rooms that adapt to bikes, furniture, electronics, and objects.",
    biomimicry: "Honeycomb",
    urbanFunction: ["Public", "Work"],
    systems: ["Waste", "Public Space"],
    sdgs: [11, 12]
  },
  {
    projectName: "Moss Food Hall",
    className: "7A",
    groupNumber: 8,
    urbanChallenge: "Food spaces can be hot, paved, and disconnected from urban ecology.",
    solution: "Restaurants, food stands, and meeting areas wrapped in moss-inspired green walls.",
    biomimicry: "Moss",
    urbanFunction: ["Commerce", "Culture"],
    systems: ["Greenery", "Public Space", "Climate"],
    sdgs: [11, 12, 13]
  },
  {
    projectName: "Mangrove Flood Homes",
    className: "7B",
    groupNumber: 1,
    urbanChallenge: "Heavy rain and flooding threaten homes in vulnerable areas.",
    solution: "Raised homes on mangrove-inspired supports that let water flow underneath instead of damaging families' homes.",
    biomimicry: "Mangrove",
    urbanFunction: ["Housing"],
    systems: ["Water", "Climate"],
    sdgs: [6, 11, 13]
  },
  {
    projectName: "Termite Garden Community",
    className: "7B",
    groupNumber: 2,
    urbanChallenge: "Communities need both private homes and shared green life.",
    solution: "A housing cluster with gardens, paths, common areas, and termite-inspired airflow systems.",
    biomimicry: "Termite",
    urbanFunction: ["Housing", "Green Space"],
    systems: ["Climate", "Greenery", "Public Space"],
    sdgs: [11, 13]
  },
  {
    projectName: "Honeycomb Micro Apartments",
    className: "7B",
    groupNumber: 3,
    urbanChallenge: "Compact city living should remain flexible and humane.",
    solution: "Small apartments formed from honeycomb modules that can be added, moved, or changed.",
    biomimicry: "Honeycomb",
    urbanFunction: ["Housing"],
    systems: ["Waste", "Energy"],
    sdgs: [11, 12]
  },
  {
    projectName: "Moss Terrace Residence",
    className: "7B",
    groupNumber: 4,
    urbanChallenge: "Tall housing needs everyday access to plants, shade, and outdoor comfort.",
    solution: "A residential building with planted terraces and moss-inspired walls to reduce heat.",
    biomimicry: "Moss",
    urbanFunction: ["Housing", "Green Space"],
    systems: ["Greenery", "Climate"],
    sdgs: [11, 13]
  },
  {
    projectName: "Termite Maker Workshop",
    className: "7B",
    groupNumber: 5,
    urbanChallenge: "Making and repair spaces produce heat and need healthy airflow.",
    solution: "A workshop for testing, building, and inventing with ventilation inspired by termite mounds.",
    biomimicry: "Termite",
    urbanFunction: ["Education", "Work"],
    systems: ["Climate", "Waste"],
    sdgs: [11, 12, 13]
  },
  {
    projectName: "Cactus Creative Studios",
    className: "7B",
    groupNumber: 6,
    urbanChallenge: "Creative workplaces need daylight without overheating.",
    solution: "Studios for artists and designers with cactus-inspired shades that filter harsh sunlight.",
    biomimicry: "Cactus",
    urbanFunction: ["Culture", "Work"],
    systems: ["Climate", "Energy"],
    sdgs: [7, 11]
  },
  {
    projectName: "Honeycomb Innovation Hub",
    className: "7B",
    groupNumber: 7,
    urbanChallenge: "Innovation spaces need structure that can grow with new uses.",
    solution: "A collaborative technology hub using honeycomb modules for strength and future expansion.",
    biomimicry: "Honeycomb",
    urbanFunction: ["Work", "Education"],
    systems: ["Energy", "Waste"],
    sdgs: [9, 11, 12]
  },
  {
    projectName: "Mangrove Shopping Center",
    className: "7B",
    groupNumber: 8,
    urbanChallenge: "Commercial areas can block water and worsen flood damage.",
    solution: "A shopping center lifted on mangrove-inspired supports so rainwater can pass safely below.",
    biomimicry: "Mangrove",
    urbanFunction: ["Commerce"],
    systems: ["Water", "Climate", "Public Space"],
    sdgs: [6, 11, 13]
  },
  {
    projectName: "Cactus Family Housing",
    className: "7C",
    groupNumber: 1,
    urbanChallenge: "Multigenerational housing needs protected routes and cooler shared spaces.",
    solution: "Family homes with cactus-inspired shading for paths, indoor areas, and outdoor gathering.",
    biomimicry: "Cactus",
    urbanFunction: ["Housing"],
    systems: ["Climate", "Public Space"],
    sdgs: [11, 13]
  },
  {
    projectName: "Mangrove Rain Apartments",
    className: "7C",
    groupNumber: 2,
    urbanChallenge: "Stormwater needs room to slow down instead of becoming a hazard.",
    solution: "Apartments near rain gardens that collect water and use mangrove-inspired landscapes for flood protection.",
    biomimicry: "Mangrove",
    urbanFunction: ["Housing", "Green Space"],
    systems: ["Water", "Greenery", "Climate"],
    sdgs: [6, 11, 13]
  },
  {
    projectName: "Honeycomb Adaptive Homes",
    className: "7C",
    groupNumber: 3,
    urbanChallenge: "Families change, but fixed homes often do not.",
    solution: "Homes built from honeycomb-inspired modules that can add rooms or transform layouts over time.",
    biomimicry: "Honeycomb",
    urbanFunction: ["Housing"],
    systems: ["Waste", "Public Space"],
    sdgs: [11, 12]
  },
  {
    projectName: "Passive Airflow Apartments",
    className: "7C",
    groupNumber: 4,
    urbanChallenge: "Apartment comfort depends on moving hot air out and cool air in.",
    solution: "A residential building where cool air enters low and hot air exits at the top.",
    biomimicry: "Termite",
    urbanFunction: ["Housing"],
    systems: ["Climate", "Energy"],
    sdgs: [7, 11, 13]
  },
  {
    projectName: "Moss Shared Office",
    className: "7C",
    groupNumber: 5,
    urbanChallenge: "Shared work buildings need comfort without depending only on machines.",
    solution: "A co-working office with moss-inspired green walls and shaded outdoor areas.",
    biomimicry: "Moss",
    urbanFunction: ["Work"],
    systems: ["Greenery", "Climate", "Energy"],
    sdgs: [7, 11, 13]
  },
  {
    projectName: "Cactus Vertical Farm",
    className: "7C",
    groupNumber: 6,
    urbanChallenge: "Cities need food systems closer to people and less vulnerable to heat.",
    solution: "A multi-level food growing building with cactus-inspired water-saving and shading systems.",
    biomimicry: "Cactus",
    urbanFunction: ["Green Space", "Commerce"],
    systems: ["Water", "Greenery", "Climate"],
    sdgs: [6, 11, 12, 13]
  },
  {
    projectName: "Honeycomb Materials Workshop",
    className: "7C",
    groupNumber: 7,
    urbanChallenge: "Construction should create less waste and use materials more intelligently.",
    solution: "A workshop that makes products and components with recycled or natural materials and honeycomb strength.",
    biomimicry: "Honeycomb",
    urbanFunction: ["Work", "Education"],
    systems: ["Waste", "Energy"],
    sdgs: [11, 12]
  },
  {
    projectName: "Mangrove Water Study Center",
    className: "7C",
    groupNumber: 8,
    urbanChallenge: "Flooding and pollution need civic learning, not only hidden infrastructure.",
    solution: "A center for studying urban water, with mangrove-inspired gardens that slow, filter, and manage rainwater.",
    biomimicry: "Mangrove",
    urbanFunction: ["Education", "Public"],
    systems: ["Water", "Greenery", "Climate", "Public Space"],
    sdgs: [6, 11, 13]
  }
];

export const cityProjects: CityProject[] = records.map((record, idx) => {
  const id = `${record.className}-${String(record.groupNumber).padStart(2, "0")}`;
  const start = idx * 2 + 1;
  const galleryImages = [img(start), img(start + 1), img(start + 13)];
  return {
    ...record,
    id,
    cityPosition: { x: positions[idx][0], y: positions[idx][1] },
    sustainabilityStrategies: baseStrategies[record.biomimicry],
    heroImage: galleryImages[0],
    galleryImages,
    finalModelImages: galleryImages.slice(0, 2),
    sketchImages: idx === 22 ? [img(46)] : [],
    studentQuote: "We designed one part, then connected it to the needs of the whole city."
  };
});

export const getProject = (id: string) => cityProjects.find((project) => project.id === id);
export const biomimicryOptions = ["Honeycomb", "Moss", "Mangrove", "Termite", "Cactus"] as const;
export const systemOptions = ["Water", "Energy", "Greenery", "Mobility", "Waste", "Public Space", "Climate"] as const;
