// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    "intro",
    {
      type: "category",
      label: "Backend",
      collapsed: false,
      items: [
        "backend/intro_back",
        "backend/modelo",
        "backend/consideraciones",
      ],
    },
    {
      type: "category",
      label: "Husky & Tests",
      collapsed: false,
      items: [
        "huskyTest/introCalidad",
        "huskyTest/estrategiaTesting",
        "huskyTest/automatizacionHusky",
        "huskyTest/reglasEslint",
      ],
    },
    {
      type: "category",
      label: "Frontend",
      collapsed: false,
      items: [
        "frontend/intro_front",
        "frontend/guiaSitio",
        "frontend/rutas",
        "frontend/funciones",
        "frontend/servicios",
      ],
    },
    {
      type: "category",
      label: "Patrones de Diseño",
      collapsed: false,
      items: [
        "patrones/patrones"
      ]
    }
  ],
};

export default sidebars;
