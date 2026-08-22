export type ImageCategory =
  | "sao-paulo"
  | "solarpunk"
  | "biomimicry"
  | "honeycomb"
  | "moss"
  | "mangrove"
  | "termite"
  | "cactus"
  | "urban-planning"
  | "student-process"
  | "student-sketch"
  | "city-model"
  | "final-project"
  | "background"
  | "other";

export interface ProjectImage {
  id: string;
  fileName: string;
  src: string;
  alt: string;
  category: ImageCategory;
  orientation: "landscape" | "portrait" | "square";
  width: number;
  height: number;
  projectId?: string;
  className?: "7A" | "7B" | "7C";
  featured?: boolean;
}

const names = [
  "WhatsApp Image 2026-08-22 at 18.36.04.jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.05 (1).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.05 (2).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.05 (3).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.05 (4).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.05 (5).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.05.jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.06 (1).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.06 (2).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.06 (3).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.06.jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.10.jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.11 (1).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.11 (2).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.11 (3).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.11 (4).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.11.jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.12 (1).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.12 (2).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.12 (3).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.12 (4).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.12.jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.13 (1).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.13 (2).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.13 (3).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.13 (4).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.13.jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.14 (1).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.14 (2).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.14 (3).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.14 (4).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.14.jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.15 (1).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.15 (2).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.15 (3).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.15 (4).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.15 (5).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.15.jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.16 (1).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.16 (2).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.16 (3).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.16 (4).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.16 (5).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.16.jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.17 (1).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.17 (2).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.17 (3).jpeg",
  "WhatsApp Image 2026-08-22 at 18.36.17.jpeg"
];

const landscape = new Set([6, 13, 14, 19, 20, 26, 39, 40, 41, 42, 43, 46, 47, 48]);
const categoryFor = (index: number): ImageCategory => {
  if (index <= 2) return "student-process";
  if (index <= 17) return index <= 12 ? "city-model" : "student-process";
  if (index <= 22) return "honeycomb";
  if (index <= 32) return "final-project";
  if (index <= 38) return index % 2 === 0 ? "cactus" : "moss";
  if (index <= 44) return "student-process";
  if (index === 46) return "student-sketch";
  if (index === 47) return "solarpunk";
  return "final-project";
};

export const projectImages: ProjectImage[] = names.map((fileName, idx) => {
  const index = idx + 1;
  const isLandscape = landscape.has(index);
  return {
    id: `img-${String(index).padStart(2, "0")}`,
    fileName,
    src: `/images/img-${String(index).padStart(2, "0")}.jpeg`,
    alt:
      index === 46
        ? "Student concept sketch for a solarpunk urban project."
        : index <= 17
          ? "Students building and arranging sustainable city model pieces in the maker classroom."
          : "MDF architectural model with green roofs, shaded spaces, and biomimetic details.",
    category: categoryFor(index),
    orientation: isLandscape ? "landscape" : "portrait",
    width: isLandscape ? 1600 : 1200,
    height: isLandscape ? 1200 : 1600,
    featured: [4, 6, 17, 25, 32, 35, 47].includes(index)
  };
});

export const imageById = (id: string) => projectImages.find((image) => image.id === id);
export const featuredImages = projectImages.filter((image) => image.featured);
