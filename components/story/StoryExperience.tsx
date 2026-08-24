"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ExternalLink, HelpCircle, MapPinned, Route, Sparkles, Sprout, SunMedium, Users, Zap } from "lucide-react";
import { biomimicryStories } from "@/data/biomimicry";
import { cityProjects } from "@/data/projects";
import type { Language } from "@/app/page";

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.62, ease: "easeOut" }
} as const;

const newImage = (name: string) => `/images/new/${name}`;

type Localized = Record<Language, string>;
type QuestionTopic = "Sustainable Urbanization" | "Solarpunk" | "Biomimicry" | "SDGs / ODS" | "Projects";
type SourceLink = { label: Localized; href?: string };

const saoImages = [
  {
    src: newImage("sao-paulo-aerial.jpg"),
    label: { en: "Density", pt: "Densidade" },
    copy: {
      en: "A city built upward, under pressure, and full of possibility.",
      pt: "Uma cidade que cresceu para cima, sob pressão e cheia de possibilidades."
    }
  },
  {
    src: newImage("sao-paulo-flood.jpg"),
    label: { en: "Water", pt: "Água" },
    copy: {
      en: "When rivers and heavy rain meet too much concrete, infrastructure becomes visible.",
      pt: "Quando rios e chuvas fortes encontram concreto demais, a infraestrutura fica visível."
    }
  },
  {
    src: newImage("sao-paulo-traffic.jpg"),
    label: { en: "Mobility", pt: "Mobilidade" },
    copy: {
      en: "Every commute is also a design consequence.",
      pt: "Todo deslocamento também é consequência de decisões de projeto."
    }
  },
  {
    src: newImage("sao-paulo-heat-islands.webp"),
    label: { en: "Heat Islands", pt: "Ilhas de Calor" },
    copy: {
      en: "Heat concentrates where shade, vegetation, and permeable ground disappear.",
      pt: "O calor se concentra onde sombra, vegetação e solo permeável desaparecem."
    }
  }
];

const bioImages: Record<string, string> = {
  Honeycomb: newImage("bio-sunflower.png"),
  Moss: newImage("bio-moss.png"),
  Mangrove: newImage("bio-mangrove.png"),
  Termite: newImage("bio-termite.png"),
  Cactus: newImage("bio-cactus.png")
};

const biomimicryCopy: Record<string, { title: Localized; principle: Localized }> = {
  Honeycomb: {
    title: { en: "Honeycomb-Inspired Spaces", pt: "Espaços Inspirados em Colmeias" },
    principle: {
      en: "Repeating cells create strong, efficient, modular structures.",
      pt: "Células repetidas criam estruturas fortes, eficientes e modulares."
    }
  },
  Moss: {
    title: { en: "Moss-Inspired Green Walls", pt: "Paredes Verdes Inspiradas em Musgo" },
    principle: {
      en: "Moss occupies vertical surfaces, retains moisture, and supports tiny ecosystems.",
      pt: "O musgo ocupa superfícies verticais, retém umidade e sustenta pequenos ecossistemas."
    }
  },
  Mangrove: {
    title: { en: "Mangrove-Inspired Supports", pt: "Apoios Inspirados em Manguezais" },
    principle: {
      en: "Branching roots create stability in wet and unstable environments.",
      pt: "Raízes ramificadas criam estabilidade em ambientes úmidos e instáveis."
    }
  },
  Termite: {
    title: { en: "Termite-Inspired Airflow", pt: "Fluxo de Ar Inspirado em Cupinzeiros" },
    principle: {
      en: "Interconnected channels regulate temperature through passive air movement.",
      pt: "Canais interligados regulam a temperatura por meio do movimento passivo do ar."
    }
  },
  Cactus: {
    title: { en: "Cactus-Inspired Shading", pt: "Sombreamento Inspirado em Cactos" },
    principle: {
      en: "Specialized forms manage intense sunlight, heat, and scarce water.",
      pt: "Formas especializadas lidam com sol intenso, calor e escassez de água."
    }
  }
};

const systemLabels: Record<string, Localized> = {
  Water: { en: "Water", pt: "Água" },
  Energy: { en: "Energy", pt: "Energia" },
  Greenery: { en: "Greenery", pt: "Vegetação" },
  Mobility: { en: "Mobility", pt: "Mobilidade" },
  Waste: { en: "Waste", pt: "Resíduos" },
  "Public Space": { en: "Public Space", pt: "Espaço Público" },
  Climate: { en: "Climate", pt: "Clima" }
};

const biomimicryLabels: Record<string, Localized> = {
  Honeycomb: { en: "Honeycomb", pt: "Colmeia" },
  Moss: { en: "Moss", pt: "Musgo" },
  Mangrove: { en: "Mangrove", pt: "Manguezal" },
  Termite: { en: "Termite", pt: "Cupinzeiro" },
  Cactus: { en: "Cactus", pt: "Cacto" }
};

const projectCopy: Record<string, { name: Localized; solution: Localized }> = {
  "7A-01": {
    name: { en: "Termite Apartment Commons", pt: "Apartamentos Comunitários Cupinzeiro" },
    solution: {
      en: "A shared apartment building close to shops, schools, and public transportation, with air tunnels inspired by termite mounds.",
      pt: "Um edifício residencial compartilhado, perto de comércio, escolas e transporte público, com túneis de ar inspirados em cupinzeiros."
    }
  },
  "7A-02": {
    name: { en: "Moss Courtyard Homes", pt: "Casas com Pátio de Musgo" },
    solution: {
      en: "Homes arranged around a shared courtyard where moss-inspired walls cool the space and invite community life.",
      pt: "Casas organizadas em torno de um pátio comum, onde paredes inspiradas em musgo resfriam o espaço e estimulam a convivência."
    }
  },
  "7A-03": {
    name: { en: "Honeycomb Modular Housing", pt: "Moradia Modular Colmeia" },
    solution: {
      en: "Apartment modules combine in different ways using honeycomb geometry for strength and spatial efficiency.",
      pt: "Módulos de apartamentos se combinam de diferentes formas usando a geometria da colmeia para ganhar resistência e eficiência espacial."
    }
  },
  "7A-04": {
    name: { en: "Cactus Cool Homes", pt: "Casas Frescas Cacto" },
    solution: {
      en: "Cactus-inspired walls, shades, and smaller openings reduce heat gain while keeping homes livable.",
      pt: "Paredes, sombras e aberturas menores inspiradas em cactos reduzem o ganho de calor e mantêm as casas habitáveis."
    }
  },
  "7A-05": {
    name: { en: "Termite Office Tower", pt: "Torre de Escritórios Cupinzeiro" },
    solution: {
      en: "An office building with termite-inspired air tunnels that move fresh air through the structure.",
      pt: "Um edifício de escritórios com túneis de ar inspirados em cupinzeiros, conduzindo ar fresco pela estrutura."
    }
  },
  "7A-06": {
    name: { en: "Cactus Local Market", pt: "Mercado Local Cacto" },
    solution: {
      en: "A local market with cactus-inspired roofs that protect visitors and sellers from intense sunlight.",
      pt: "Um mercado local com coberturas inspiradas em cactos que protegem visitantes e vendedores do sol intenso."
    }
  },
  "7A-07": {
    name: { en: "Honeycomb Repair Lab", pt: "Laboratório de Reparos Colmeia" },
    solution: {
      en: "A repair center with honeycomb-inspired rooms that adapt to bikes, furniture, electronics, and objects.",
      pt: "Um centro de reparos com salas inspiradas em colmeias, adaptáveis a bicicletas, móveis, eletrônicos e outros objetos."
    }
  },
  "7A-08": {
    name: { en: "Moss Food Hall", pt: "Praça Gastronômica Musgo" },
    solution: {
      en: "Restaurants, food stands, and meeting areas wrapped in moss-inspired green walls.",
      pt: "Restaurantes, barracas de comida e áreas de encontro envolvidos por paredes verdes inspiradas em musgo."
    }
  },
  "7B-01": {
    name: { en: "Mangrove Flood Homes", pt: "Casas Antienchente Manguezal" },
    solution: {
      en: "Raised homes on mangrove-inspired supports that let water flow underneath instead of damaging families' homes.",
      pt: "Casas elevadas sobre apoios inspirados em manguezais, permitindo que a água passe por baixo sem danificar as moradias."
    }
  },
  "7B-02": {
    name: { en: "Termite Garden Community", pt: "Comunidade Jardim Cupinzeiro" },
    solution: {
      en: "A housing cluster with gardens, paths, common areas, and termite-inspired airflow systems.",
      pt: "Um conjunto habitacional com jardins, caminhos, áreas comuns e sistemas de ventilação inspirados em cupinzeiros."
    }
  },
  "7B-03": {
    name: { en: "Honeycomb Micro Apartments", pt: "Microapartamentos Colmeia" },
    solution: {
      en: "Small apartments formed from honeycomb modules that can be added, moved, or changed.",
      pt: "Pequenos apartamentos formados por módulos de colmeia que podem ser adicionados, movidos ou transformados."
    }
  },
  "7B-04": {
    name: { en: "Moss Terrace Residence", pt: "Residência Terraço Musgo" },
    solution: {
      en: "A residential building with planted terraces and moss-inspired walls to reduce heat.",
      pt: "Um edifício residencial com terraços plantados e paredes inspiradas em musgo para reduzir o calor."
    }
  },
  "7B-05": {
    name: { en: "Termite Maker Workshop", pt: "Oficina Maker Cupinzeiro" },
    solution: {
      en: "A workshop for testing, building, and inventing with ventilation inspired by termite mounds.",
      pt: "Uma oficina para testar, construir e inventar, com ventilação inspirada em cupinzeiros."
    }
  },
  "7B-06": {
    name: { en: "Cactus Creative Studios", pt: "Estúdios Criativos Cacto" },
    solution: {
      en: "Studios for artists and designers with cactus-inspired shades that filter harsh sunlight.",
      pt: "Estúdios para artistas e designers com sombreamentos inspirados em cactos que filtram a luz solar intensa."
    }
  },
  "7B-07": {
    name: { en: "Honeycomb Innovation Hub", pt: "Hub de Inovação Colmeia" },
    solution: {
      en: "A collaborative technology hub using honeycomb modules for strength and future expansion.",
      pt: "Um hub colaborativo de tecnologia que usa módulos de colmeia para ganhar resistência e permitir expansão futura."
    }
  },
  "7B-08": {
    name: { en: "Mangrove Shopping Center", pt: "Centro Comercial Manguezal" },
    solution: {
      en: "A shopping center lifted on mangrove-inspired supports so rainwater can pass safely below.",
      pt: "Um centro comercial elevado sobre apoios inspirados em manguezais, para que a água da chuva passe com segurança por baixo."
    }
  },
  "7C-01": {
    name: { en: "Cactus Family Housing", pt: "Moradia Familiar Cacto" },
    solution: {
      en: "Family homes with cactus-inspired shading for paths, indoor areas, and outdoor gathering.",
      pt: "Casas familiares com sombreamento inspirado em cactos para caminhos, áreas internas e encontros ao ar livre."
    }
  },
  "7C-02": {
    name: { en: "Mangrove Rain Apartments", pt: "Apartamentos de Chuva Manguezal" },
    solution: {
      en: "Apartments near rain gardens that collect water and use mangrove-inspired landscapes for flood protection.",
      pt: "Apartamentos próximos a jardins de chuva que coletam água e usam paisagens inspiradas em manguezais para proteção contra enchentes."
    }
  },
  "7C-03": {
    name: { en: "Honeycomb Adaptive Homes", pt: "Casas Adaptáveis Colmeia" },
    solution: {
      en: "Homes built from honeycomb-inspired modules that can add rooms or transform layouts over time.",
      pt: "Casas feitas com módulos inspirados em colmeias, capazes de ganhar novos cômodos ou mudar de configuração com o tempo."
    }
  },
  "7C-04": {
    name: { en: "Passive Airflow Apartments", pt: "Apartamentos de Ventilação Passiva" },
    solution: {
      en: "A residential building where cool air enters low and hot air exits at the top.",
      pt: "Um edifício residencial onde o ar fresco entra pela parte baixa e o ar quente sai pela parte superior."
    }
  },
  "7C-05": {
    name: { en: "Moss Shared Office", pt: "Escritório Compartilhado Musgo" },
    solution: {
      en: "A co-working office with moss-inspired green walls and shaded outdoor areas.",
      pt: "Um escritório compartilhado com paredes verdes inspiradas em musgo e áreas externas sombreadas."
    }
  },
  "7C-06": {
    name: { en: "Cactus Vertical Farm", pt: "Fazenda Vertical Cacto" },
    solution: {
      en: "A multi-level food-growing building with cactus-inspired water-saving and shading systems.",
      pt: "Um edifício de cultivo de alimentos em vários níveis, com sistemas de economia de água e sombreamento inspirados em cactos."
    }
  },
  "7C-07": {
    name: { en: "Honeycomb Materials Workshop", pt: "Oficina de Materiais Colmeia" },
    solution: {
      en: "A workshop that makes products and components with recycled or natural materials and honeycomb strength.",
      pt: "Uma oficina que produz objetos e componentes com materiais reciclados ou naturais e resistência inspirada em colmeias."
    }
  },
  "7C-08": {
    name: { en: "Mangrove Water Study Center", pt: "Centro de Estudos da Água Manguezal" },
    solution: {
      en: "A center for studying urban water, with mangrove-inspired gardens that slow, filter, and manage rainwater.",
      pt: "Um centro para estudar a água urbana, com jardins inspirados em manguezais que desaceleram, filtram e manejam a chuva."
    }
  }
};

const processImages = [
  newImage("process-sketch-1.jpeg"),
  newImage("process-sketch-2.jpeg"),
  newImage("process-sketch-3.jpeg"),
  newImage("process-sketch-4.jpeg"),
  newImage("process-model-1.jpeg"),
  newImage("process-model-2.jpeg"),
  "/images/img-32.jpeg",
  "/images/img-47.jpeg"
];

const solarpunkImages = [
  { src: newImage("solarpunk-terrace.jpg"), label: { en: "Terraces", pt: "Terraços" } },
  { src: newImage("solarpunk-sketch.jpg"), label: { en: "Concept", pt: "Conceito" } },
  { src: newImage("solarpunk-city.jpg"), label: { en: "City", pt: "Cidade" } },
  { src: newImage("solarpunk-green-street.jfif"), label: { en: "Green street", pt: "Rua verde" } },
  { src: newImage("solarpunk-living-roof.jfif"), label: { en: "Living roof", pt: "Cobertura viva" } },
  { src: newImage("solarpunk-waterfront.jfif"), label: { en: "Waterfront", pt: "Frente d'água" } },
  { src: newImage("solarpunk-garden-tower.jfif"), label: { en: "Garden tower", pt: "Torre jardim" } }
];

const solarpunkPillars = [
  {
    name: { en: "Human", pt: "Pessoas" },
    icon: Users,
    copy: { en: "inclusive spaces, comfort, access, community", pt: "espaços inclusivos, conforto, acesso e comunidade" },
    position: "human"
  },
  {
    name: { en: "Nature", pt: "Natureza" },
    icon: Sprout,
    copy: { en: "shade, water, biodiversity, living surfaces", pt: "sombra, água, biodiversidade e superfícies vivas" },
    position: "nature"
  },
  {
    name: { en: "Energy", pt: "Energia" },
    icon: Zap,
    copy: { en: "solar power, passive cooling, efficient systems", pt: "energia solar, resfriamento passivo e sistemas eficientes" },
    position: "energy"
  }
];

const fourEs = [
  {
    name: { en: "Environment", pt: "Meio Ambiente" },
    line: { en: "helps the planet", pt: "cuida do planeta" },
    icon: Sprout,
    copy: {
      en: "Green areas, water absorption, shade, biodiversity, and cleaner air make the city healthier.",
      pt: "Áreas verdes, absorção da água, sombra, biodiversidade e ar mais limpo tornam a cidade mais saudável."
    }
  },
  {
    name: { en: "Equity", pt: "Equidade" },
    line: { en: "helps everyone", pt: "inclui todo mundo" },
    icon: Users,
    copy: {
      en: "A sustainable city must include housing, access, safety, comfort, and public life for different people.",
      pt: "Uma cidade sustentável precisa incluir moradia, acesso, segurança, conforto e vida pública para pessoas diferentes."
    }
  },
  {
    name: { en: "Efficiency", pt: "Eficiência" },
    line: { en: "works better, not bigger", pt: "funciona melhor, não apenas maior" },
    icon: Zap,
    copy: {
      en: "Shorter trips, passive comfort, clean energy, and smart infrastructure reduce waste and pressure.",
      pt: "Deslocamentos mais curtos, conforto passivo, energia limpa e infraestrutura inteligente reduzem desperdício e pressão."
    }
  },
  {
    name: { en: "Economy", pt: "Economia" },
    line: { en: "lasts over time", pt: "permanece ao longo do tempo" },
    icon: Route,
    copy: {
      en: "Local services, durable systems, maintenance, and shared resources help the city keep working.",
      pt: "Serviços locais, sistemas duráveis, manutenção e recursos compartilhados ajudam a cidade a continuar funcionando."
    }
  }
];

const topicLabels: Record<Language, Record<QuestionTopic, string>> = {
  en: {
    "Sustainable Urbanization": "Sustainable Urbanization",
    Solarpunk: "Solarpunk",
    Biomimicry: "Biomimicry",
    "SDGs / ODS": "SDGs / ODS",
    Projects: "Projects"
  },
  pt: {
    "Sustainable Urbanization": "Urbanização Sustentável",
    Solarpunk: "Solarpunk",
    Biomimicry: "Biomimética",
    "SDGs / ODS": "ODS",
    Projects: "Projetos"
  }
};

const questionBank: Record<QuestionTopic, string[]> = {
  "Sustainable Urbanization": [
    "What makes a city sustainable besides having green buildings?",
    "Why is it important to think about the whole city instead of designing one building alone?",
    "How can the location of a building affect transportation and people's daily lives?",
    "Why does a sustainable city need different types of spaces, such as housing, work, services, and green areas?",
    "How can adding more vegetation change the temperature and comfort of a city?",
    "What could happen if a city grows without enough planning?",
    "How can the way we use land affect flooding and rainwater absorption?",
    "Why are public spaces important when planning a sustainable city?",
    "How can a city balance the needs of people, nature, and infrastructure?",
    "If you could change one thing about São Paulo to make it more sustainable, what would you change and why?"
  ],
  Solarpunk: [
    "What is Solarpunk, and what kind of future does it imagine?",
    "How is a Solarpunk city different from a typical futuristic city we see in movies?",
    "Why is nature an important part of the Solarpunk movement?",
    "What role does technology have in a Solarpunk city?",
    "Why is Solarpunk about more than just adding plants to buildings?",
    "How can architecture help create the optimistic future imagined by Solarpunk?",
    "What is one Solarpunk idea that you can identify in our city model? Explain it.",
    "How could a Solarpunk city improve people's quality of life?",
    "Why are community and shared public spaces important in Solarpunk?",
    "If you could add one new Solarpunk idea to our city, what would you create and why?"
  ],
  Biomimicry: [
    "What is biomimicry, and how is it different from simply making a building look like nature?",
    "Why can nature be a useful source of ideas for architects and engineers?",
    "How can studying how an organism works help us solve a city problem?",
    "How can honeycomb structures inspire the organization of architectural spaces?",
    "How can moss inspire a different way of thinking about building walls?",
    "What can architects learn from mangrove roots when designing structures?",
    "How can termite mounds inspire buildings that stay comfortable without using as much air conditioning?",
    "What can cactus shapes teach us about protecting buildings from strong sunlight and heat?",
    "Choose one biomimicry example from our project. What natural strategy is being copied, and what problem does it solve?",
    "If you could study another plant or animal to improve a city, what would you choose and what could we learn from it?"
  ],
  "SDGs / ODS": [
    "What are the Sustainable Development Goals, and why were they created?",
    "Which SDG is most connected to our Sustainable Urbanization project? Why?",
    "How can a global goal like an SDG influence a decision made in one neighborhood or building?",
    "What does SDG 11 - Sustainable Cities and Communities - mean in practice?",
    "How can clean energy help a city achieve some of the SDGs?",
    "How are environmental problems and social problems connected in the SDGs?",
    "Choose one feature of our city and explain which SDG it could help achieve.",
    "Can one project contribute to more than one SDG? Give an example and explain how.",
    "Why can't governments achieve the SDGs only by building new technology?",
    "If you had to choose one SDG as the most important for São Paulo today, which would you choose and why?"
  ],
  Projects: [
    "What urban problem is your group trying to solve, and how does your project respond to it?",
    "Explain your project to me as if I had never seen it before. What does it do and why is it important?",
    "What is the most sustainable feature of your project, and why did your group choose it?",
    "What biomimicry idea did your group use, and how did you transform it into an architectural solution?",
    "How does your project connect to the Solarpunk movement?",
    "Which SDG is most connected to your project, and how does your solution contribute to it?",
    "Why did your group place this project in this part of the city?",
    "How does your project affect or connect with the buildings and spaces around it?",
    "If your project were actually built in São Paulo, what benefits could it bring and what challenges might it face?",
    "If your group had one more month to improve the project, what would you change and why?"
  ]
};

const questionBankPt: Record<QuestionTopic, string[]> = {
  "Sustainable Urbanization": [
    "O que torna uma cidade sustentável além de ter prédios verdes?",
    "Por que é importante pensar na cidade inteira em vez de projetar apenas um prédio?",
    "Como a localização de um edifício pode afetar o transporte e a vida diária das pessoas?",
    "Por que uma cidade sustentável precisa de diferentes tipos de espaço, como moradia, trabalho, serviços e áreas verdes?",
    "Como acrescentar mais vegetação pode mudar a temperatura e o conforto de uma cidade?",
    "O que pode acontecer se uma cidade cresce sem planejamento suficiente?",
    "Como o uso do solo pode afetar enchentes e a absorção da água da chuva?",
    "Por que os espaços públicos são importantes no planejamento de uma cidade sustentável?",
    "Como uma cidade pode equilibrar as necessidades das pessoas, da natureza e da infraestrutura?",
    "Se você pudesse mudar uma coisa em São Paulo para torná-la mais sustentável, o que mudaria e por quê?"
  ],
  Solarpunk: [
    "O que é Solarpunk e que tipo de futuro ele imagina?",
    "Como uma cidade Solarpunk é diferente de uma cidade futurista comum que vemos nos filmes?",
    "Por que a natureza é uma parte importante do movimento Solarpunk?",
    "Qual é o papel da tecnologia em uma cidade Solarpunk?",
    "Por que Solarpunk é mais do que apenas colocar plantas nos prédios?",
    "Como a arquitetura pode ajudar a criar o futuro otimista imaginado pelo Solarpunk?",
    "Qual ideia Solarpunk você consegue identificar no nosso modelo de cidade? Explique.",
    "Como uma cidade Solarpunk poderia melhorar a qualidade de vida das pessoas?",
    "Por que comunidade e espaços públicos compartilhados são importantes no Solarpunk?",
    "Se você pudesse acrescentar uma nova ideia Solarpunk à nossa cidade, o que criaria e por quê?"
  ],
  Biomimicry: [
    "O que é biomimética e como ela é diferente de apenas fazer um prédio parecer natureza?",
    "Por que a natureza pode ser uma fonte útil de ideias para arquitetos e engenheiros?",
    "Como estudar o funcionamento de um organismo pode nos ajudar a resolver um problema urbano?",
    "Como estruturas em formato de colmeia podem inspirar a organização de espaços arquitetônicos?",
    "Como o musgo pode inspirar uma forma diferente de pensar as paredes de um edifício?",
    "O que arquitetos podem aprender com raízes de mangue ao projetar estruturas?",
    "Como cupinzeiros podem inspirar edifícios que ficam confortáveis usando menos ar-condicionado?",
    "O que formas de cactos podem nos ensinar sobre proteger edifícios do sol forte e do calor?",
    "Escolha um exemplo de biomimética do nosso projeto. Qual estratégia natural foi copiada e que problema ela resolve?",
    "Se você pudesse estudar outra planta ou animal para melhorar uma cidade, o que escolheria e o que poderíamos aprender?"
  ],
  "SDGs / ODS": [
    "O que são os Objetivos de Desenvolvimento Sustentável e por que eles foram criados?",
    "Qual ODS está mais conectado ao nosso projeto de Urbanização Sustentável? Por quê?",
    "Como uma meta global, como um ODS, pode influenciar uma decisão em um bairro ou edifício?",
    "O que o ODS 11 - Cidades e Comunidades Sustentáveis - significa na prática?",
    "Como energia limpa pode ajudar uma cidade a alcançar alguns ODS?",
    "Como problemas ambientais e sociais se conectam nos ODS?",
    "Escolha uma característica da nossa cidade e explique qual ODS ela poderia ajudar a alcançar.",
    "Um projeto pode contribuir para mais de um ODS? Dê um exemplo e explique como.",
    "Por que governos não conseguem alcançar os ODS apenas construindo novas tecnologias?",
    "Se você tivesse que escolher um ODS como o mais importante para São Paulo hoje, qual escolheria e por quê?"
  ],
  Projects: [
    "Qual problema urbano o seu grupo está tentando resolver e como o projeto responde a ele?",
    "Explique seu projeto como se eu nunca tivesse visto antes. O que ele faz e por que é importante?",
    "Qual é a característica mais sustentável do seu projeto e por que o grupo a escolheu?",
    "Qual ideia de biomimética seu grupo usou e como ela virou uma solução arquitetônica?",
    "Como seu projeto se conecta ao movimento Solarpunk?",
    "Qual ODS está mais conectado ao seu projeto e como a solução contribui para ele?",
    "Por que o seu grupo colocou esse projeto nessa parte da cidade?",
    "Como seu projeto afeta ou se conecta aos edifícios e espaços ao redor?",
    "Se o projeto fosse construído em São Paulo, quais benefícios ele poderia trazer e quais desafios poderia enfrentar?",
    "Se o grupo tivesse mais um mês para melhorar o projeto, o que mudaria e por quê?"
  ]
};

const odsOptions = [
  {
    id: "11",
    color: "#FD9D24",
    ink: "#111111",
    title: { en: "Sustainable Cities and Communities", pt: "Cidades e Comunidades Sustentáveis" },
    focus: {
      en: "The heart of the exhibition: housing, mobility, public space, resilience, and inclusive urban life.",
      pt: "O centro da exposição: moradia, mobilidade, espaço público, resiliência e vida urbana inclusiva."
    },
    lookFor: {
      en: ["mixed-use neighborhoods", "safe public areas", "flood-aware planning", "access to services"],
      pt: ["bairros de uso misto", "áreas públicas seguras", "planejamento contra enchentes", "acesso a serviços"]
    }
  },
  {
    id: "7",
    color: "#FCC30B",
    ink: "#111111",
    title: { en: "Affordable and Clean Energy", pt: "Energia Limpa e Acessível" },
    focus: {
      en: "Connects to solar panels, passive cooling, daylight, and buildings that need less energy to stay comfortable.",
      pt: "Conecta-se a painéis solares, resfriamento passivo, luz natural e edifícios que precisam de menos energia para serem confortáveis."
    },
    lookFor: {
      en: ["solar energy", "shading", "natural ventilation", "efficient systems"],
      pt: ["energia solar", "sombreamento", "ventilação natural", "sistemas eficientes"]
    }
  },
  {
    id: "13",
    color: "#3F7E44",
    ink: "#ffffff",
    title: { en: "Climate Action", pt: "Ação contra a Mudança Global do Clima" },
    focus: {
      en: "Helps students explain heat islands, heavy rain, flood risk, and the need for cities that adapt to climate pressure.",
      pt: "Ajuda os estudantes a explicar ilhas de calor, chuvas intensas, risco de enchentes e a necessidade de cidades adaptadas à crise climática."
    },
    lookFor: {
      en: ["cooler surfaces", "rain gardens", "urban trees", "resilient infrastructure"],
      pt: ["superfícies mais frescas", "jardins de chuva", "árvores urbanas", "infraestrutura resiliente"]
    }
  },
  {
    id: "15",
    color: "#56C02B",
    ink: "#111111",
    title: { en: "Life on Land", pt: "Vida Terrestre" },
    focus: {
      en: "Makes biodiversity visible through green roofs, living walls, corridors, soil, and habitats inside the city.",
      pt: "Torna a biodiversidade visível por meio de telhados verdes, paredes vivas, corredores ecológicos, solo e habitats dentro da cidade."
    },
    lookFor: {
      en: ["native plants", "pollinator areas", "green corridors", "soil protection"],
      pt: ["plantas nativas", "áreas para polinizadores", "corredores verdes", "proteção do solo"]
    }
  },
  {
    id: "6",
    color: "#26BDE2",
    ink: "#111111",
    title: { en: "Clean Water and Sanitation", pt: "Água Potável e Saneamento" },
    focus: {
      en: "Links water-sensitive design to drainage, reuse, infiltration, and cleaner urban rivers.",
      pt: "Relaciona o desenho sensível à água com drenagem, reúso, infiltração e rios urbanos mais limpos."
    },
    lookFor: {
      en: ["rainwater capture", "permeable ground", "wetlands", "water reuse"],
      pt: ["captação da chuva", "solo permeável", "áreas alagáveis", "reúso da água"]
    }
  }
];

function SectionSources({ sources, language }: { sources: SourceLink[]; language: Language }) {
  return (
    <p className="section-sources">
      <span>{language === "en" ? "Sources:" : "Fontes:"}</span>{" "}
      {sources.map((source, index) => (
        <span key={source.label.en}>
          {source.href ? (
            <a href={source.href} target="_blank" rel="noreferrer">
              {source.label[language]}
            </a>
          ) : (
            source.label[language]
          )}
          {index < sources.length - 1 ? " · " : ""}
        </span>
      ))}
    </p>
  );
}

function GuidingQuestion({ topic, language }: { topic: QuestionTopic; language: Language }) {
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);
  const questions = language === "en" ? questionBank[topic] : questionBankPt[topic];

  useEffect(() => {
    setQuestionIndex(null);
  }, [language, topic]);

  function drawQuestion() {
    setQuestionIndex((current) => {
      if (questions.length === 1) return 0;
      let next = Math.floor(Math.random() * questions.length);
      while (next === current) {
        next = Math.floor(Math.random() * questions.length);
      }
      return next;
    });
  }

  return (
    <motion.div className="question-block" {...reveal}>
      <div className="question-toolbar">
        <button className="question-button" type="button" onClick={drawQuestion}>
          <Sparkles size={18} aria-hidden="true" />
          {language === "en" ? "Ask a guiding question" : "toque e faça uma pergunta!"}
        </button>
      </div>
      {questionIndex !== null ? (
        <motion.div className="question-card" initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} key={`${topic}-${questionIndex}`}>
          <HelpCircle size={22} aria-hidden="true" />
          <div>
            <span>{topicLabels[language][topic]}</span>
            <p>{questions[questionIndex]}</p>
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
}

function FourEsSection({ language }: { language: Language }) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 35%"] });
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.72], [0.08, 1]);
  const hubScale = useTransform(scrollYProgress, [0, 0.35, 1], [0.88, 1.08, 1]);
  const hubRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section className="four-es-section refined" id="four-es" ref={ref}>
      <div className="section-heading dark">
        <p className="eyebrow">{language === "en" ? "Sustainable urbanization" : "Urbanização sustentável"}</p>
        <h2>{language === "en" ? "THE 4E'S" : "OS 4E'S"}</h2>
        <p>
          {language === "en"
            ? "These four ideas set the tone for the city: sustainability has to protect the environment, include people, work efficiently, and last economically."
            : "Essas quatro ideias orientam a cidade: a sustentabilidade precisa proteger o meio ambiente, incluir pessoas, funcionar com eficiência e durar economicamente."}
        </p>
      </div>
      <div className="four-es-board">
        <motion.div className="four-es-line horizontal" style={{ scaleX: lineProgress }} aria-hidden="true" />
        <motion.div className="four-es-line vertical" style={{ scaleY: lineProgress }} aria-hidden="true" />
        <motion.div className="four-es-hub" style={{ scale: hubScale, rotate: hubRotate }}>
          <strong>4E&apos;s</strong>
          <span>in sustainable urbanization</span>
        </motion.div>
        {fourEs.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.article
              key={pillar.name.en}
              className={`four-e-card card-${index + 1}`}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
            >
              <Icon aria-hidden="true" />
              <div>
                <h3>{pillar.name[language]}</h3>
                <span>{pillar.line[language]}</span>
                <p>{pillar.copy[language]}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
      <SectionSources language={language} sources={[{ label: { en: "classroom 4E framework for sustainable urbanization", pt: "estrutura dos 4E's trabalhada em sala sobre urbanização sustentável" } }]} />
    </section>
  );
}

export function StoryExperience({ language }: { language: Language }) {
  const [activeOds, setActiveOds] = useState(odsOptions[0]);
  const [activeSolarImage, setActiveSolarImage] = useState(0);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const background = useTransform(
    scrollYProgress,
    [0, 0.1, 0.18, 0.28, 0.42, 0.55, 0.72, 1],
    ["#061912", "#12281e", "#3b0508", "#5a070d", "#43070a", "#0f2f23", "#174d36", "#123a5a"]
  );
  const solarTiles = solarpunkImages.map((_, tileIndex) => solarpunkImages[(activeSolarImage + tileIndex) % solarpunkImages.length]);
  const odsStyle = {
    "--ods-color": activeOds.color,
    "--ods-ink": activeOds.ink
  } as CSSProperties;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSolarImage((current) => (current + 1) % solarpunkImages.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="one-page">
      <motion.div className="scroll-background" style={{ backgroundColor: background }} aria-hidden="true" />

      <section className="hero-section refined" id="home">
        <Image
          className="hero-image"
          src={newImage("solarpunk-city.jpg")}
          alt="Green solarpunk architectural reference with terraces and integrated vegetation."
          width={900}
          height={1200}
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <motion.div className="hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <motion.p className="eyebrow" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }}>
            {language === "en" ? "7th grade · cultural fair · maker" : "7º ano · mostra cultural · maker"}
          </motion.p>
          <motion.h1
            aria-label={language === "en" ? "Sustainable Urbanization" : "Urbanização Sustentável"}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.24, duration: 0.86, ease: "easeOut" }}
          >
            <span aria-hidden="true">
              {language === "en" ? (
                <>
                  SUSTAINABLE<br />URBANIZATION
                </>
              ) : (
                <>
                  URBANIZAÇÃO<br />SUSTENTÁVEL
                </>
              )}
            </span>
          </motion.h1>
          <motion.h2 initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.68 }}>
            {language === "en" ? "Designing a Solarpunk City" : "Projetando uma Cidade Solarpunk"}
          </motion.h2>
        </motion.div>
        <SectionSources language={language} sources={[{ label: { en: "student visual reference set", pt: "conjunto de referências visuais dos estudantes" } }]} />
      </section>

      <section className="sao-section refined" id="sao-paulo">
        <div className="section-heading">
          <p className="eyebrow">São Paulo</p>
          <h2>{language === "en" ? "THE CITY WE HAVE" : "A CIDADE QUE TEMOS"}</h2>
          <p>
            {language === "en"
              ? "São Paulo is not a simple problem. It is dense, productive, unequal, inventive, vulnerable, and alive. That complexity gave students a real place to question how cities grow."
              : "São Paulo não é um problema simples. É densa, produtiva, desigual, inventiva, vulnerável e viva. Essa complexidade deu aos estudantes um lugar real para questionar como as cidades crescem."}
          </p>
        </div>
        <div className="sao-editorial">
          {saoImages.map((image, index) => (
            <motion.article key={image.label.en} className={`sao-card sao-card-${index + 1}`} {...reveal}>
              <Image src={image.src} alt={`${image.label[language]} ${language === "en" ? "reference image for São Paulo." : "imagem de referência para São Paulo."}`} width={1100} height={760} sizes="(max-width: 760px) 92vw, 31vw" />
              <div>
                <strong>{image.label[language]}</strong>
                <p>{image.copy[language]}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <GuidingQuestion topic="Sustainable Urbanization" language={language} />
        <SectionSources
          language={language}
          sources={[
            { label: { en: "São Paulo Master Plan / PDE", pt: "Plano Diretor Estratégico de São Paulo / PDE" }, href: "https://gestaourbana.prefeitura.sp.gov.br/marco-regulatorio/plano-diretor/texto-da-lei-ilustrado/" },
            { label: { en: "student image set", pt: "conjunto de imagens dos estudantes" } }
          ]}
        />
      </section>

      <section className="golden-section refined" id="golden-circle">
        <div className="golden-layout">
          <motion.div className="golden-orbit" {...reveal}>
            <span className="orbit-ring outer" />
            <span className="orbit-ring middle" />
            <span className="orbit-ring inner" />
            <div className="orbit-core">{language === "en" ? "CITY" : "CIDADE"}</div>
            <div className="orbit-label why">{language === "en" ? "WHY" : "POR QUÊ"}<br /><b>Solarpunk</b></div>
            <div className="orbit-label how">{language === "en" ? "HOW" : "COMO"}<br /><b>{language === "en" ? "Biomimicry" : "Biomimética"}</b></div>
            <div className="orbit-label what">{language === "en" ? "WHAT" : "O QUÊ"}<br /><b>{language === "en" ? "Urbanization" : "Urbanização"}</b></div>
          </motion.div>
          <motion.div className="golden-text" {...reveal}>
            <p className="eyebrow">{language === "en" ? "Golden circle" : "Círculo dourado"}</p>
            <h2>{language === "en" ? "WHY, HOW, WHAT." : "POR QUÊ, COMO, O QUÊ."}</h2>
            <p>
              {language === "en"
                ? "The project moves from vision to method to city-making: imagine a better future, learn from nature, then connect every intervention into one urban system."
                : "O projeto parte da visão, passa pelo método e chega à construção da cidade: imaginar um futuro melhor, aprender com a natureza e conectar cada intervenção em um único sistema urbano."}
            </p>
          </motion.div>
        </div>
        <SectionSources language={language} sources={[{ label: { en: "Simon Sinek, The Golden Circle", pt: "Simon Sinek, O Círculo Dourado" }, href: "https://simonsinek.com/golden-circle" }]} />
      </section>

      <section className="solarpunk-section" id="solarpunk">
        <div className="section-heading dark">
          <p className="eyebrow">{language === "en" ? "Why?" : "Por quê?"}</p>
          <h2>SOLARPUNK</h2>
          <p>
            {language === "en"
              ? "Solarpunk is an optimistic design lens. It asks how people, ecosystems, and clean energy can support each other in everyday urban life."
              : "Solarpunk é uma lente de projeto otimista. Ele pergunta como pessoas, ecossistemas e energia limpa podem se apoiar na vida urbana cotidiana."}
          </p>
        </div>
        <div className="solar-trio" aria-label={language === "en" ? "Human, nature, and energy system animation" : "Animação de sistema com pessoas, natureza e energia"}>
          <svg viewBox="0 0 900 580" className="solar-trio-lines" aria-hidden="true">
            <path d="M450 112 L190 438 L710 438 Z" />
            <path d="M450 112 C390 250 350 330 190 438" />
            <path d="M450 112 C510 250 550 330 710 438" />
            <path d="M190 438 C330 510 570 510 710 438" />
          </svg>
          <motion.div
            className="solar-trio-core"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SunMedium aria-hidden="true" />
            <span>Solarpunk</span>
            <b>{language === "en" ? "city system" : "sistema urbano"}</b>
          </motion.div>
          {solarpunkPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.name.en}
                className={`solar-node ${pillar.position}`}
                initial={{ opacity: 0, scale: 0.78 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
              >
                <Icon aria-hidden="true" />
                <h3>{pillar.name[language]}</h3>
                <p>{pillar.copy[language]}</p>
              </motion.article>
            );
          })}
        </div>
        <motion.div className="solarpunk-mosaic" {...reveal}>
          {solarTiles.map((image, index) => (
            <figure key={`${index}-${image.src}`} className={`solar-photo-tile tile-${index + 1}`}>
                <Image
                  key={image.src}
                  src={image.src}
                  alt={`${image.label[language]} ${language === "en" ? "solarpunk visual reference." : "referência visual solarpunk."}`}
                  width={620}
                  height={460}
                  sizes="(max-width: 760px) 42vw, 210px"
                  unoptimized={image.src.endsWith(".jfif")}
                />
                <figcaption>
                  <SunMedium size={15} aria-hidden="true" />
                  {image.label[language]}
                </figcaption>
              </figure>
            ))}
        </motion.div>
        <GuidingQuestion topic="Solarpunk" language={language} />
        <SectionSources
          language={language}
          sources={[
            { label: { en: "A Solarpunk Manifesto", pt: "Um Manifesto Solarpunk" }, href: "https://re-des.org/a-solarpunk-manifesto/" },
            { label: { en: "Project Hieroglyph solarpunk notes", pt: "Notas solarpunk do Project Hieroglyph" }, href: "https://hieroglyph.asu.edu/2014/09/solarpunk-notes-toward-a-manifesto/" },
            { label: { en: "student image set", pt: "conjunto de imagens dos estudantes" } }
          ]}
        />
      </section>

      <FourEsSection language={language} />

      <section className="bio-section refined" id="biomimicry">
        <div className="section-heading">
          <p className="eyebrow">{language === "en" ? "How?" : "Como?"}</p>
          <h2>{language === "en" ? "BIOMIMICRY" : "BIOMIMÉTICA"}</h2>
          <p>
            {language === "en"
              ? "Nature becomes a design teacher: organisms, patterns, and ecosystems suggest strategies for comfort, resilience, structure, and adaptation."
              : "A natureza se torna professora de projeto: organismos, padrões e ecossistemas sugerem estratégias de conforto, resiliência, estrutura e adaptação."}
          </p>
          <a className="deep-dive-link" href="https://biomimi.vercel.app/" target="_blank" rel="noreferrer">
            {language === "en" ? "Open biomimicry deep dive" : "Abrir estudo aprofundado de biomimética"} <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="bio-bento">
          {biomimicryStories.map((story) => {
            const copy = biomimicryCopy[story.name];
            return (
            <motion.article key={story.name} className="bio-bento-card" {...reveal}>
              <Image src={bioImages[story.name]} alt={`${biomimicryLabels[story.name][language]} ${language === "en" ? "biomimicry reference." : "referência de biomimética."}`} width={900} height={900} sizes="(max-width: 760px) 88vw, 28vw" />
              <div>
                <h3>{copy.title[language]}</h3>
                <p>{copy.principle[language]}</p>
              </div>
            </motion.article>
            );
          })}
        </div>
        <GuidingQuestion topic="Biomimicry" language={language} />
        <SectionSources
          language={language}
          sources={[
            { label: { en: "The Biomimicry Institute", pt: "The Biomimicry Institute" }, href: "https://biomimicry.org/inspiration/what-is-biomimicry/" },
            { label: { en: "biomimicry deep dive", pt: "estudo aprofundado de biomimética" }, href: "https://biomimi.vercel.app/" },
            { label: { en: "student image set", pt: "conjunto de imagens dos estudantes" } }
          ]}
        />
      </section>

      <section className="planning-section refined" id="planning">
        <div className="section-heading">
          <p className="eyebrow">{language === "en" ? "Master Plan" : "Plano Diretor"}</p>
          <h2>{language === "en" ? "SÃO PAULO AS A SYSTEM" : "SÃO PAULO COMO SISTEMA"}</h2>
          <p>
            {language === "en"
              ? "The Master Plan is the city's growth agreement: it connects where people live, how they move, where nature is protected, and how land should serve public life."
              : "O Plano Diretor é o acordo de crescimento da cidade: conecta onde as pessoas vivem, como se movem, onde a natureza é protegida e como a terra deve servir à vida pública."}
          </p>
        </div>
        <div className="master-plan-grid">
          <article className="master-plan-card featured">
            <MapPinned aria-hidden="true" />
            <span>01</span>
            <h3>{language === "en" ? "Grow where the city already works" : "Crescer onde a cidade já funciona"}</h3>
            <p>
              {language === "en"
                ? "More homes, services, and jobs should be close to public transport and existing infrastructure, so growth creates shorter trips instead of more pressure."
                : "Mais moradias, serviços e empregos devem ficar perto do transporte público e da infraestrutura existente, para que o crescimento crie viagens mais curtas em vez de mais pressão."}
            </p>
          </article>
          <article className="master-plan-card">
            <Users aria-hidden="true" />
            <span>02</span>
            <h3>{language === "en" ? "Make housing part of sustainability" : "Fazer da moradia parte da sustentabilidade"}</h3>
            <p>
              {language === "en"
                ? "Social housing and access to the city matter because an ecological city cannot exclude the people who need the city most."
                : "Habitação social e acesso à cidade importam porque uma cidade ecológica não pode excluir as pessoas que mais precisam dela."}
            </p>
          </article>
          <article className="master-plan-card">
            <Route aria-hidden="true" />
            <span>03</span>
            <h3>{language === "en" ? "Plan land use and mobility together" : "Planejar uso do solo e mobilidade juntos"}</h3>
            <p>
              {language === "en"
                ? "Where buildings go changes traffic, walking, services, and time. Urban planning is also daily-life planning."
                : "A localização dos edifícios muda o trânsito, os caminhos a pé, os serviços e o tempo. Planejamento urbano também é planejamento da vida diária."}
            </p>
          </article>
          <article className="master-plan-card">
            <Sprout aria-hidden="true" />
            <span>04</span>
            <h3>{language === "en" ? "Treat climate as urban infrastructure" : "Tratar o clima como infraestrutura urbana"}</h3>
            <p>
              {language === "en"
                ? "Green areas, permeable ground, shade, and water strategies are not decoration. They protect people from heat, floods, and environmental risk."
                : "Áreas verdes, solo permeável, sombra e estratégias de água não são decoração. Elas protegem as pessoas do calor, das enchentes e dos riscos ambientais."}
            </p>
          </article>
          <article className="master-plan-card">
            <SunMedium aria-hidden="true" />
            <span>05</span>
            <h3>{language === "en" ? "Activate the ground floor" : "Ativar o térreo"}</h3>
            <p>
              {language === "en"
                ? "Streets become safer and more useful when buildings connect to sidewalks with entrances, shops, services, and shared public life."
                : "As ruas ficam mais seguras e úteis quando os edifícios se conectam às calçadas com entradas, lojas, serviços e vida pública compartilhada."}
            </p>
          </article>
          <article className="master-plan-card">
            <Sparkles aria-hidden="true" />
            <span>06</span>
            <h3>{language === "en" ? "Land has a social role" : "A terra tem função social"}</h3>
            <p>
              {language === "en"
                ? "Empty or underused land is not neutral. In a fairer city, land should help produce housing, services, nature, and opportunity."
                : "Terrenos vazios ou subutilizados não são neutros. Em uma cidade mais justa, a terra deve ajudar a produzir moradia, serviços, natureza e oportunidade."}
            </p>
          </article>
        </div>
        <SectionSources
          language={language}
          sources={[
            { label: { en: "Gestão Urbana: Master Plan", pt: "Gestão Urbana: Plano Diretor" }, href: "https://gestaourbana.prefeitura.sp.gov.br/marco-regulatorio/plano-diretor/texto-da-lei-ilustrado/" },
            { label: { en: "PDE 2023 revision", pt: "Revisão do PDE 2023" }, href: "https://gestaourbana.prefeitura.sp.gov.br/noticias/entenda-os-ajustes-sancionados-para-o-plano-diretor-na-area-de-mobilidade/" },
            { label: { en: "Prefeitura legislation page", pt: "Página de legislação da Prefeitura" }, href: "https://capital.sp.gov.br/web/licenciamento/w/legislacao/288078" }
          ]}
        />
      </section>

      <section className="process-section refined" id="process">
        <div className="section-heading dark">
          <p className="eyebrow">{language === "en" ? "Maker process" : "Processo maker"}</p>
          <h2>{language === "en" ? "FROM SKETCH TO CITY MODEL" : "DO ESBOÇO AO MODELO DE CIDADE"}</h2>
          <p>
            {language === "en"
              ? "Students moved between drawings, references, material tests, and physical models to turn sustainable ideas into an urban proposal. Swipe sideways to see more process images."
              : "Os estudantes passaram por desenhos, referências, testes de materiais e modelos físicos para transformar ideias sustentáveis em uma proposta urbana. Deslize para o lado para ver mais imagens do processo."}
          </p>
        </div>
        <div className="side-scroll-hint" aria-hidden="true">
          <span>{language === "en" ? "Swipe" : "Deslize"}</span>
          <i />
          <span>{language === "en" ? "more images" : "mais imagens"}</span>
        </div>
        <div className="process-strip">
          {processImages.map((src, index) => (
            <motion.figure key={src} className={index === 2 || index === 6 ? "wide" : ""} {...reveal}>
              <Image
                src={src}
                alt={language === "en" ? "Student sketch or model-building process for the solarpunk city project." : "Esboço ou processo de construção de modelo dos estudantes para o projeto de cidade solarpunk."}
                width={1000}
                height={760}
                sizes="(max-width: 760px) 72vw, 24vw"
              />
            </motion.figure>
          ))}
        </div>
        <SectionSources language={language} sources={[{ label: { en: "student sketches, model photos, and classroom documentation", pt: "esboços dos estudantes, fotos dos modelos e documentação de sala" } }]} />
      </section>

      <section className="ods-section refined" id="ods" style={odsStyle}>
        <div className="section-heading">
          <p className="eyebrow">ODS / SDGs</p>
          <h2>{language === "en" ? "GLOBAL GOALS, LOCAL DECISIONS" : "METAS GLOBAIS, DECISÕES LOCAIS"}</h2>
          <p>
            {language === "en"
              ? "The SDGs help students connect a model city to bigger questions: climate, housing, water, energy, biodiversity, and justice."
              : "Os ODS ajudam os estudantes a conectar uma cidade-modelo a questões maiores: clima, moradia, água, energia, biodiversidade e justiça."}
          </p>
        </div>
        <motion.div className="ods-explorer" {...reveal}>
          <label htmlFor="ods-select">{language === "en" ? "Explore an SDG" : "Explore um ODS"}</label>
          <div className="select-shell">
            <select
              id="ods-select"
              value={activeOds.id}
              onChange={(event) => setActiveOds(odsOptions.find((ods) => ods.id === event.target.value) ?? odsOptions[0])}
            >
              {odsOptions.map((ods) => (
                <option key={ods.id} value={ods.id}>
                  {language === "en" ? "SDG" : "ODS"} {ods.id} - {ods.title[language]}
                </option>
              ))}
            </select>
            <ChevronDown size={20} aria-hidden="true" />
          </div>
          <article>
            <span>{language === "en" ? "SDG" : "ODS"} {activeOds.id}</span>
            <h3>{activeOds.title[language]}</h3>
            <p>{activeOds.focus[language]}</p>
            <div>
              {activeOds.lookFor[language].map((item) => (
                <b key={item}>{item}</b>
              ))}
            </div>
          </article>
        </motion.div>
        <GuidingQuestion topic="SDGs / ODS" language={language} />
        <SectionSources
          language={language}
          sources={[
            { label: { en: "UN Sustainable Development Goals", pt: "Objetivos de Desenvolvimento Sustentável da ONU" }, href: "https://sdgs.un.org/goals" },
            { label: { en: "UN Goal 11", pt: "ODS 11 da ONU" }, href: "https://sdgs.un.org/goals/goal11" }
          ]}
        />
      </section>

      <section className="projects-teaser refined" id="projects">
        <div className="section-heading">
          <p className="eyebrow">{language === "en" ? "Student groups" : "Grupos dos estudantes"}</p>
          <h2>{language === "en" ? "OUR SOLARPUNK CITY" : "NOSSA CIDADE SOLARPUNK"}</h2>
        </div>
        <div className="project-bento-grid">
          {cityProjects.map((project, index) => {
            const copy = projectCopy[project.id];
            return (
            <motion.details key={project.id} open={activeProjectId === project.id} className={`project-bento ${index % 7 === 0 ? "featured" : ""}`} {...reveal}>
              <summary
                onClick={(event) => {
                  event.preventDefault();
                  setActiveProjectId((current) => (current === project.id ? null : project.id));
                }}
              >
                <span>{biomimicryLabels[project.biomimicry][language]}</span>
                <h3>{copy.name[language]}</h3>
                <p>{project.students}</p>
                <ChevronDown className="project-disclosure" size={22} aria-hidden="true" />
              </summary>
              <div className="project-bento-body">
                <p>{copy.solution[language]}</p>
                <div>
                  {project.systems.map((system) => <span key={system}>{systemLabels[system][language]}</span>)}
                  {project.sdgs.map((sdg) => <span key={sdg}>{language === "en" ? "SDG" : "ODS"} {sdg}</span>)}
                </div>
                <GuidingQuestion topic="Projects" language={language} />
              </div>
            </motion.details>
            );
          })}
        </div>
        <SectionSources
          language={language}
          sources={[
            { label: { en: "student project proposals and model documentation", pt: "propostas dos projetos dos estudantes e documentação dos modelos" } },
            { label: { en: "UN Sustainable Development Goals", pt: "Objetivos de Desenvolvimento Sustentável da ONU" }, href: "https://sdgs.un.org/goals" }
          ]}
        />
      </section>
    </main>
  );
}
