# Sustainable Urbanization Exhibition Notes

Last updated: 2026-08-23

## Current Goal

This is a mobile-first, one-page cultural fair website for the 7th grade Sustainable Urbanization / Solarpunk City project. The page should work as an exhibition guide for parents and visitors: scroll through the concepts, look at student process images, explore ODS links, and open project boxes to read each idea.

## Current Page Structure

- Hero: exhibition title and solarpunk reference image.
- São Paulo: the real city context that motivates the project.
- Golden Circle: why, how, and what framework for the exhibition.
- Solarpunk: animated human, nature, and energy system triangle.
- 4E's: scroll-reactive framework for Environment, Equity, Efficiency, and Economy.
- Biomimicry: nature-inspired strategy cards and CTA to the biomimicry deep dive.
- Master Plan: key São Paulo planning ideas rewritten for clarity.
- Maker Process: sideways-scrolling sketches and model photos.
- ODS / SDGs: dropdown explorer for relevant global goals.
- Projects: expandable bento boxes with project names, students, systems, SDGs, and guiding questions.

## Interaction Decisions

- Bottom navigation stays compact and visible on mobile and desktop.
- Guiding questions appear by tapping a high-contrast animated button.
- Guiding questions support English and PT-BR because some parents may not speak English.
- Project guiding questions live inside the expanded project card so the prompt stays connected to the selected idea.
- Source notes are intentionally tiny and placed near the end of each section.
- Source notes should sit after content with positive spacing; avoid negative margins because they can overlap headings or animations.
- The 4E framework is a classroom simplification to clarify sustainable urbanization for parents and students.

## Main Sources Used

- São Paulo Master Plan / PDE: https://gestaourbana.prefeitura.sp.gov.br/marco-regulatorio/plano-diretor/texto-da-lei-ilustrado/
- PDE 2023 revision context: https://gestaourbana.prefeitura.sp.gov.br/noticias/entenda-os-ajustes-sancionados-para-o-plano-diretor-na-area-de-mobilidade/
- Prefeitura legislation page: https://capital.sp.gov.br/web/licenciamento/w/legislacao/288078
- UN Sustainable Development Goals: https://sdgs.un.org/goals
- UN Goal 11: https://sdgs.un.org/goals/goal11
- Biomimicry Institute: https://biomimicry.org/inspiration/what-is-biomimicry/
- Solarpunk Manifesto: https://re-des.org/a-solarpunk-manifesto/
- Golden Circle: https://simonsinek.com/golden-circle

## Deployment

Pushes to `main` are intended to trigger Vercel production deployment for `sus-urb.vercel.app`.

Recommended check before pushing:

```bash
npm run build
```
