import Libro from "../models/libro.js";
import Contenido from "../models/contenido.js";
import connectDB from "../db/db.js";

await connectDB();

try {
  const existingLibros = await Libro.countDocuments();
  const existingContenidos = await Contenido.countDocuments();

  if (existingLibros || existingContenidos) {
    console.log("Ya existen datos en la base. Abortando el seed.");
    process.exit(0);
  }

  console.log("La BDD está vacía, me conecté y lo verifiqué");

  // insertar Libro. Va primero para formar su id
  const librosInsertar = await Libro.insertMany([
    {
      //id[0]
      tipo: "Libro",
      isbn: "978-1-85780-229-0",
      tituloLibro: "1000 preserved aircraft in colour",
      autor: "Gerry Manning",
      idioma: "Ingles",
      editorial: "Midland Publishing",
      medidas: "21.5 x 28 cms",
      genero: "Aviación",
      subgenero: "Aviacion, aviones preservados",
      anio: 2006,
      paginas: 160,
      portadaImagePath: "/uploads/1000_preserved.jpg",
    },
    {
      //id[1]
      tipo: "Libro",
      isbn: "84-8372-600-9",
      tituloLibro: "Air war in the Falklands 1982",
      autor: "Christopher Chant",
      idioma: "Ingles",
      editorial: "Ediciones del Prado. Osprey Aviation.",
      medidas: "18.2 x 24.8 cms",
      genero: "Aviación",
      subgenero: "Guerra de Malvinas",
      anio: 2001,
      paginas: 63,
      portadaImagePath: "/uploads/MLV_Air_war_in_the_Falklands.jpg",
    },
    {
      //id[2]
      tipo: "Libro",
      isbn: "84-8372-188-0",
      tituloLibro: "Ases del Mustang de la Octava Fuerza Aérea",
      autor: "Jerry Scutts",
      idioma: "Español",
      editorial: "Ediciones del Prado. Osprey Aviation.",
      medidas: "18.2 x 24.7 cms",
      genero: "Aviación",
      subgenero: "Aviones en combate: Ases y leyendas",
      anio: 1999,
      paginas: 64,
      portadaImagePath: "/uploads/aec_03_mustang.jpg",
    },
    {
      //id[3]
      tipo: "Manual",
      tituloLibro: "Canon EOS 550D Instruction Manual",
      autor: "Canon Inc.",
      idioma: "Ingles",
      editorial: "Canon Inc.",
      medidas: "10.5 x 14.7 cms",
      genero: "Fotografía",
      subgenero: "Manuales de fotografía",
      anio: 2010,
      paginas: 259,
      portadaImagePath: "/uploads/Canon_550D_ingles.jpg",
    },
    {
      //id[4]
      tipo: "Revista",
      issn: "2041-7489",
      tituloLibro: "Combat Aircraft",
      autor: "Key Publishing Ltd.",
      idioma: "Ingles",
      editorial: "Key Publishing Ltd.",
      medidas: "21 x 29.7 cms",
      genero: "Aviación",
      subgenero: "Aviación militar",
      anio: 2017,
      paginas: 96,
      portadaImagePath: "/uploads/combat_aircraft_feb2017.jpg",
    },
    {
      //id[5]
      tipo: "Libro",
      isbn: "978-85-422-0608-1",
      tituloLibro: "Conversando sobre economia com a minha filha",
      autor: "Yanis Varoufakis",
      idioma: "Portugues",
      editorial: "Editora Planeta Do Brasil Ltda.",
      medidas: "16 x 22.7 cms",
      genero: "Economia",
      subgenero: "Conceptos de economía",
      anio: 2015,
      paginas: 206,
      portadaImagePath:
        "/uploads/Conversando_sobre_economia_com_a_minha_filha_varoufakis_2015.jpg",
    },
    {
      //id[6]
      tipo: "Libro",
      isbn: "84-8372-187-2",
      tituloLibro: "Despegan los Hurricane",
      autor: "Tom Holmes",
      idioma: "Español",
      editorial: "Ediciones del Prado. Osprey Aviation.",
      medidas: "18.2 x 24.7 cms",
      genero: "Aviación",
      subgenero: "Aviones en combate: Ases y leyendas",
      anio: 1999,
      paginas: 64,
      portadaImagePath: "/uploads/aec_02_hurricane.jpg",
    },
    {
      //id[7]
      tipo: "Libro",
      isbn: "978-987-1682-81-2",
      tituloLibro: "E/MB-326GB/GC & MB-339AA",
      autor: "Jorge Felix Nuñez Padin",
      idioma: "Español",
      editorial: "Núñez Padin",
      medidas: "27.1 x 19.5 cms",
      genero: "Aviación",
      subgenero: "Aviacion Naval Armada Argentina",
      anio: 2021,
      paginas: 76,
      portadaImagePath: "/uploads/padin_39_aermacchi.jpg",
    },
    {
      //id[8]
      tipo: "Libro",
      isbn: "84-8372-190-2",
      tituloLibro: "El legendario Spitfire Mk I/II",
      autor: "Alfred Price",
      idioma: "Español",
      editorial: "Ediciones del Prado. Osprey Aviation.",
      medidas: "18.2 x 24.7 cms",
      genero: "Aviación",
      subgenero: "Aviones en combate: Ases y leyendas",
      anio: 1999,
      paginas: 64,
      portadaImagePath: "/uploads/aec_05_spitfireMk.jpg",
    },
    {
      //id[9]
      tipo: "Catalogo",
      tituloLibro: "Empty Leg Broker Aereo",
      autor: "Chema Alvarez",
      idioma: "Español",
      editorial: "Avion Revue",
      medidas: "28.2 x 20.7 cms",
      genero: "Aviación",
      subgenero: "Aviones corporativos",
      anio: 2007,
      paginas: 50,
      portadaImagePath: "/uploads/aviones_corporativos_empty_leg.jpg",
    },
    {
      //id[10]
      tipo: "Libro",
      isbn: "978-1-098-10763-5",
      tituloLibro: "Essential Math for AI",
      autor: "Hala Nelson",
      idioma: "Ingles",
      editorial: "O'Reilly",
      medidas: "19 x 26 cms",
      genero: "Informática",
      subgenero: "Inteligencia artificial",
      anio: 2023,
      paginas: 570,
      portadaImagePath: "/uploads/essential_math_for_AI_Hala_Nelson_2023.jpg",
    },
    {
      //id[11]
      tipo: "Libro",
      isbn: "978-987-1682-42-2",
      tituloLibro: "Lockheed Neptune & Orion",
      autor: "Jorge Felix Nuñez Padin",
      idioma: "Español",
      editorial: "Núñez Padin",
      medidas: "27.1 x 19.5 cms",
      genero: "Aviación",
      subgenero: "Aviacion Naval Armada Argentina",
      anio: 2017,
      paginas: 60,
      portadaImagePath: "/uploads/padin_35_neptune_orion.jpg",
    },
    {
      //id[12]
      tipo: "Libro",
      isbn: "84-8372-186-4",
      tituloLibro: "Los ases de la blitzkrieg (Mess Bf 109 D/E)",
      autor: "John Weal",
      idioma: "Español",
      editorial: "Ediciones del Prado. Osprey Aviation.",
      medidas: "18.2 x 24.7 cms",
      genero: "Aviación",
      subgenero: "Aviones en combate: Ases y leyendas",
      anio: 1999,
      paginas: 64,
      portadaImagePath: "/uploads/aec_01_me109.jpg",
    },
    {
      //id[13]
      tipo: "Libro",
      isbn: "84-8372-189-9",
      tituloLibro: "Los ases soviéticos de la II Guerra Mundial",
      autor: "Hugh Morgan",
      idioma: "Español",
      editorial: "Ediciones del Prado. Osprey Aviation.",
      medidas: "18.2 x 24.7 cms",
      genero: "Aviación",
      subgenero: "Aviones en combate: Ases y leyendas",
      anio: 1999,
      paginas: 64,
      portadaImagePath: "/uploads/aec_04_sovieticos.jpg",
    },
    {
      //id[14]
      tipo: "Revista",
      issn: "1138-1434",
      tituloLibro: "National Geographic",
      autor: "National Geographic Society",
      idioma: "Español",
      editorial: "Editorial Televisa S.A.",
      medidas: "17.6 x 25.3 cms",
      genero: "Documental",
      subgenero: "Divulgación científica",
      mes: "Enero",
      anio: 1998,
      paginas: 140,
      portadaImagePath: "/uploads/img024mqqqxl96nv4berrunnwc9dgnn29sn745.jpg",
    },
    {
      //id[15]
      tipo: "Revista",
      issn: "1138-1434",
      tituloLibro: "National Geographic",
      autor: "National Geographic Society",
      idioma: "Español",
      editorial: "Editorial Televisa S.A.",
      medidas: "17.6 x 25.3 cms",
      genero: "Documental",
      subgenero: "Divulgación científica",
      mes: "Febrero",
      anio: 1998,
      paginas: 146,
      portadaImagePath: "/uploads/img025rshxfv5d3h6qgkx2dn1t8qqv4q115en6.jpg",
    },
    {
      //id[16]
      tipo: "Revista",
      issn: "1138-1434",
      tituloLibro: "National Geographic",
      autor: "National Geographic Society",
      idioma: "Español",
      editorial: "Editorial Televisa S.A.",
      medidas: "17.6 x 25.3 cms",
      genero: "Documental",
      subgenero: "Divulgación científica",
      mes: "Mayo",
      anio: 1998,
      paginas: 142,
      portadaImagePath: "/uploads/img028k4p9fcv2ccb0dhwgp95znlaah2vzi4ir.jpg",
    },
    {
      //id[17]
      tipo: "Revista",
      issn: "1138-1434",
      tituloLibro: "National Geographic",
      autor: "National Geographic Society",
      idioma: "Español",
      editorial: "Editorial Televisa S.A.",
      medidas: "17.6 x 25.3 cms",
      genero: "Documental",
      subgenero: "Divulgación científica",
      mes: "Abril",
      anio: 1998,
      paginas: 142,
      portadaImagePath: "/uploads/img027dzyqfq80tes7kryixs1hy7yt36na2b8y.jpg",
    },
    {
      //id[18]
      tipo: "Revista",
      issn: "1138-1434",
      tituloLibro: "National Geographic",
      autor: "National Geographic Society",
      idioma: "Español",
      editorial: "Editorial Televisa S.A.",
      medidas: "17.6 x 25.3 cms",
      genero: "Documental",
      subgenero: "Divulgación científica",
      mes: "Marzo",
      anio: 1998,
      paginas: 150,
      portadaImagePath: "/uploads/img026vjoz4b3u0gw9tgzmo1z1n79ezihryxev.jpg",
    },
    {
      //id[19]
      tipo: "Libro",
      isbn: "978-987-1682-24-9",
      tituloLibro: "S-61D.4 & UH-3H Sea King",
      autor: "Jorge Felix Nuñez Padin",
      idioma: "Español",
      editorial: "Núñez Padin",
      medidas: "27.1 x 19.5 cms",
      genero: "Aviación",
      subgenero: "Aviacion Naval Armada Argentina",
      anio: 2014,
      paginas: 52,
      portadaImagePath: "/uploads/padin_32_sking.jpg",
    },
    {
      //id[20]
      tipo: "Libro",
      isbn: "978-987-1682-81-3",
      tituloLibro: "Super Etendard/SEM",
      autor: "Jorge Felix Nuñez Padin",
      idioma: "Español",
      editorial: "Núñez Padin",
      medidas: "27.1 x 19.5 cms",
      genero: "Aviación",
      subgenero: "Aviacion Naval Armada Argentina",
      anio: 2022,
      paginas: 76,
      portadaImagePath: "/uploads/padin_40_SUE.jpg",
    },
    {
      //id[21]
      tipo: "Libro",
      isbn: "978-987-1682-80-2",
      tituloLibro: "Vought F4U-5/-5N/-5NL Corsair",
      autor: "Jorge Felix Nuñez Padin",
      idioma: "Español",
      editorial: "Núñez Padin",
      medidas: "27.1 x 19.5 cms",
      genero: "Aviación",
      subgenero: "Aviacion Naval Armada Argentina",
      anio: 2020,
      paginas: 52,
      portadaImagePath: "/uploads/padin_38_corsair.jpg",
    },
  ]);
  console.log("Se insertaron datos en Libros.");

  // insertar contenido. El id del libro es formado dinámicamente
  await Contenido.insertMany([
    {
      libroId: librosInsertar[5]._id,
      tituloArticulo: "Por que tanta desigualdade?",
      resumenArticulo:
        "Por que os aborígenes australianos não invadiram a Inglaterra? Uma coisa são os mercados, outra coisa é a economia. Dois grandes saltos: Linguagem e superávit. Escrita. Dívida e dinheiro. Estado, burocracia e exércitos. Clero. Tecnologia. Guerra bioquímica. Voltemos à pergunta: por que os britânicos colonizaram os aborígenes e não o contrário? E a África? Então, por que tanta desigualdade? Desigualdade como ideologia retroalimentada.",
      paginaArticulo: 13,
    },
    {
      libroId: librosInsertar[10]._id,
      tituloArticulo: "Why learn the mathematics of AI?",
      resumenArticulo:
        "What is AI?. Why is AI so popular now?. What is AI able to do?. An Ai agent's specific tasks. What are AI's limitations?. What happens when AI systems fail? Where is AI headed?. Who are current main contributors to the AI field?. What math is typically involved in AI?",
      paginaArticulo: 1,
    },
    {
      libroId: librosInsertar[10]._id,
      tituloArticulo: "Data, data, data",
      resumenArticulo:
        "Data for AI. Real data versus simulated data. Mathematical models: linear versus nonlinear. An example of real data. An example of simulated data. Mathematical models: Simulations and AI. Where do we get our data from? The vocabulary of data distributions, probability and statistics. Random variables. Probability distributions. Marginal probalities. The uniform and the normal distributions.",
      paginaArticulo: 13,
    },
    {
      libroId: librosInsertar[5]._id,
      tituloArticulo: "Preço vs valor",
      resumenArticulo:
        "Dois tipos de valores. O mercado de sangue.Oiko-nomia. Um mundo fora da lógica dos mercados. O nascimento das sociedades de mercado. Fábricas: os laboratórios cinzentos da história. A grande contradição.",
      paginaArticulo: 33,
    },
    {
      libroId: librosInsertar[5]._id,
      tituloArticulo: "Dívida, lucro, riqueza",
      resumenArticulo: "Dívida. Lucro. Riqueza.",
      paginaArticulo: 57,
    },
    {
      libroId: librosInsertar[12]._id,
      tituloArticulo: "El nacimiento de la Blitzkrieg",
      resumenArticulo:
        "La historia lleva casi 20 minutos de retraso. La mayoría de las fuentes de consulta afirman que la Segunda Guerra Mundial se inició a la 05:45 horas del 1 de septiembre de 1939. Esa fue la hora que indicó Adolf Hitler durante su discurso ante la asamblea del Reichstag, poco despues de las 10 de la mañana de aquel primer día de hostilidades. En el transcurso de su alocución, difundida a toda la nación alemana, el Führer había culpado a los polacos por sus 'constantes provocaciones'. Aseguró que no tuvo mas remedio que responder adecuadamente,por lo cual 'desde las 05:45 horas se ha respondido a los disparos'",
      paginaArticulo: 6,
    },
    {
      libroId: librosInsertar[12]._id,
      tituloArticulo: "La defensa del Mar del Norte",
      resumenArticulo:
        "El comienzo de la guerra en el Oeste fue una cuestión mucho mas claramente definida que en el Este. Ligado por su tratado con los polacos, el gobierno británico exigió a Hitler que Alemania se comprometiera a detener todas sus operaciones ofensivas y a retirar todas sus tropas de Polonia. El plazo para el cumplimiento de todo ello finalizaba a las 11 horas de la mañana del 3 de septiembre; llegada esa hora no se había recibido ningún compromiso por parte de los alemanes, y las palabras del Primer Ministro Neville Chamberlain, difundidas desde Downing Street 15 minutos mas tarde, fueron las siguientes: '... en consecuencia, esta nación está en guerra con Alemania'.",
      paginaArticulo: 18,
    },
    {
      libroId: librosInsertar[12]._id,
      tituloArticulo: "Láminas en color",
      resumenArticulo:
        "Esta sección de 12 páginas muestra muchos de los aviones pilotados por los primeros ases de la Jagdwaffe durante la II Guerra Mundial. Todas las ilustraciones se han realizado en exclusiva para este libro y tanto el artista autor de estos perfiles, John Weal, como el ilustrador responsable de las figuras, Mike Chappell, han hecho un gran esfuerzo para representar a los aviones y a sus pilotos de la forma más precisa posible, en base a una profunda investigación.",
      paginaArticulo: 25,
    },
    {
      libroId: librosInsertar[12]._id,
      tituloArticulo: "Patrullando la westwall",
      resumenArticulo:
        "El 8 de septiembre (de 1939), una rotte de Bf 109D del II./JG 52 estaba patrullando el Rhin cuando descubrieron un avión francés de reconocimiento que estaba observando detenidamente el puente de Kehl. Los cazas le persiguieron y, tras una pasada sin éxito, un segundo ataque desde atrás realizado por el Leutnant Paul Gutbrod, hizo que el desafortunado Mureaux 115 se rompiese en el aire. Gutbrod recibió la Cruz de Hierro de Segunda clase por esta explosión, pero moriría el 1 de Junio de 1940 durante un ataque a tierra sobre tropas francesas, cerca de Belval, en las Ardenas.",
      paginaArticulo: 38,
    },
    {
      libroId: librosInsertar[12]._id,
      tituloArticulo: "La madurez de la blitzkrieg",
      resumenArticulo:
        "A las 21:55 horas del 9 de mayo, el cuartel General de la Luftflotte 2 envió una breve señal a todas las unidades: 'Puesta en marcha a las 05:35 horas'. En realidad fue 25 minutos antes de esa hora cuando los primeros JU 52 cargados de paracaidistas, protegidos por los Bf 109 de Ibel, cruzaron la frontera alemana al norte de Aachen. En este primer día de la campaña en el Oeste, los Gruppen del JG 27 se ocuparían principalmente de proteger a los transportes trimotores que realizaban trayectos de ida y vuelta",
      paginaArticulo: 47,
    },
    {
      libroId: librosInsertar[12]._id,
      tituloArticulo:
        "Ases condecorados con la Cruz de Caballeros (29/5/40 - 22/6/41)",
      resumenArticulo:
        "La lista ilustra claramente los dos tipos de pilotos condecorados con la Cruz de Caballeros en esta primera época; por un lado la 'vieja guardia', Schumacher, Osterkamp y el resto, que recibían la condecoración en atención a sus cualidades de liderazgo; y por el otro la 'sangre joven', encabezados por M­öldres, Balthasar y Galland, que recibían este honor por su pericia en el combate.",
      paginaArticulo: 60,
    },
    {
      libroId: librosInsertar[12]._id,
      tituloArticulo: "Datos técnicos del Messerschmitt BF 109 D/E",
      resumenArticulo:
        "El primer vuelo del prototipo de Bf109D tuvo lugar en mayo de 1935. Iba a convertirse en el caballo de batalla de la Luftwaffe. De entre sus numerosas variantes, el Bf 109D supuso la introducción del motor de la serie DB 600, con el que este pionero de los monoplanos de caza se convertiría en un auténtico ganador.",
      paginaArticulo: 62,
    },
    {
      libroId: librosInsertar[1]._id,
      tituloArticulo: "Error compounds error",
      resumenArticulo:
        "Between April and June 1982, a small campaign was fought between British and Argentine air, sea and land forces for control of the Falkland Islands, a small group of islands lying in the South Atlantic only a few hundred of miles off the coast of Argentina, which knew the islands as the Islas Malvinas.",
      paginaArticulo: 7,
    },
    {
      libroId: librosInsertar[1]._id,
      tituloArticulo: "The Task Force heads south",
      resumenArticulo:
        "On or shortly after 10 April it is thought that BAe Canberra PR.Mk 9 reconnaissance aircraft of the RAF's Number 39 Squadron may have begun flying from the Punta Arenas air base in southern Chile after receiving the markings of the Fuerza Aérea de Chile in Belize while in transit from the United Kingdom, and it is also possible if not actually probable that BAe Nimrod R.Mk 1 electronic intelligence aircraft of the RAF's Number 51 Saquadron also flew from Punta Arenas.",
      paginaArticulo: 15,
    },
    {
      libroId: librosInsertar[1]._id,
      tituloArticulo: "Dominance of the Sea Harrier",
      resumenArticulo:
        "Early in the afternoon of 1 May, Flt. Lt. Paul Barton, on detachment from the RAF to the Fleet Air Arm, was piloting on of the two Sea Harrier FRS.Mk 1 fighters of Number 801 Squadron which were providing a combat air patrol to the west of the task force when the approach of an incoming force of Argentine warlanes was reported from the Invincible's command centre.",
      paginaArticulo: 23,
    },
    {
      libroId: librosInsertar[1]._id,
      tituloArticulo: "Enter the Exocet",
      resumenArticulo:
        "Given the importance that the Exocet missile possessed in the course of the Falklands war, it is useful to look slightly more closely at the actions in which this potentially decisive weapon was employed. The first of these actions, was the sinking of the destroyer Sheffield, south east of Lafonia on 4 May. Despite its equipment, which included an array of advanced sensors, the Sheffield received only the shortest of warnings of the missile's  imminent arrival, and then only from a visual sighting. The missile's impact just above the waterline on the ship's starboard side started a major fire that eventually resulted in the abandonment and loss of the ship, whose crew lost 21 men dead.",
      paginaArticulo: 39,
    },
    {
      libroId: librosInsertar[1]._id,
      tituloArticulo: "The battle for the East Falkland",
      resumenArticulo:
        "Another loss on 4 May, the day the Sheffield was hit, occurred when Lieutenant N. Taylor of Number 800 Squadron was killed when his Sea Harrier was downed by ground-based anti-aircraft fire during a raid on BAM Condor at Goose Green.",
      paginaArticulo: 43,
    },
    {
      libroId: librosInsertar[1]._id,
      tituloArticulo: "Overall British air superiority",
      resumenArticulo:
        "Argentine attacks on british ships now ended for the period until 8 June, largely as a result of the bad weather that was also affecting the operations of the Harrier aircraft seeking to support the British land advance.",
      paginaArticulo: 55,
    },
    {
      libroId: librosInsertar[20]._id,
      tituloArticulo: "Historia Dassault Super Etendard",
      resumenArticulo:
        "Atento al problema que significaba la desactivación de los F4U Corsair, así como de los F9F Panther, el Comando de Operaciones Navales, a mediados de 1967, dio los primeros pasos con el llamado 'Plan mínimo de equipamiento', para la compra de material aéreo.",
      paginaArticulo: 4,
    },
    {
      libroId: librosInsertar[20]._id,
      tituloArticulo:
        "La operación de traslado de los Super Etendard a la Argentina",
      resumenArticulo:
        "Para el traslado de los aviones hacia el país se consideraron únicamente dos alternativas, descartándose de plano la opción del ferry. Aprovechando la experiencia de la Fuerza Aérea Argentina, adquirida con el transporte de los Mirage IIIEA/DA, se analizó el empleo de aviones C-130H Hércules desde la Base Mérignac. Era necesario diseñar y construir dos bateas contenedoras - cada una con capacidad para un fuselaje de Super Etendard - al costo de 2,38 millones de francos.",
      paginaArticulo: 7,
    },
    {
      libroId: librosInsertar[20]._id,
      tituloArticulo: "Operaciones embarcadas en el ARA (V-2) 25 de Mayo",
      resumenArticulo:
        "Ya para el mes de octubre de 1978, la Armada Argentina llevó a cabo un 'Estudio sobre la factibilidad operativa del avión Super Etendard a bordo del Portaaviones ARA 25 de Mayo'. En el participó el Jefe de la Comisión Evaluadora en Europa, Capitán de Fragata Horacio Estrada y los Capitanes de Corbeta Julio Lavezzo y Jorge Colombo y el Teniente de Navío Augusto Bedacarratz.",
      paginaArticulo: 9,
    },
    {
      libroId: librosInsertar[20]._id,
      tituloArticulo: "Técnica Dassault Super Etendard / SEM",
      resumenArticulo:
        "Tras la cancelación del Programa SEPECAT Jaguar M, variante naval del caza táctico franco-británico que supo equipar a las fuerzas aéreas de ambas naciones europeas, la Aeronavale seleccionó en enero de 1973 al Dassault Super Etendard como su nuevo avión de ataque embarcado. Con fecha 4 de septiembre de ese año, se firmó un contrato para la construcción de un centenar de aviones",
      paginaArticulo: 43,
    },
    {
      libroId: librosInsertar[20]._id,
      tituloArticulo: "Colores & Insignias",
      resumenArticulo:
        "Los Super Etendard fueron pintados en fábrica con pintura poliretánica Celomer PU66 de color 'Gris blue tres foncé' o gris azulado (referencia francesa 5430/2274) para las superficies superiores, mientras que para las superficies inferiores se empleó color 'Blanc' o blanco (5430/0000).",
      paginaArticulo: 57,
    },
    {
      libroId: librosInsertar[14]._id,
      tituloArticulo: "Para entender el milenio.",
      resumenArticulo:
        "Antes del año 2000, National Geographic pondrá de relieve seis temas que forjarán el destino de la humanidad en los próximos mil años: La exploración, el mundo físico, la población, la biodiversidad, la cultura humana, la ciencia. Durante el próximo bienio, a manera de testimoni, National Geographic presentará una instantánea del mundo en vísperas del año 2000, a lo largo de 20 reportajes que hablarán de nuestra relación con la naturaleza y nuestros congéneres.",
      paginaArticulo: 2,
    },
    {
      libroId: librosInsertar[14]._id,
      tituloArticulo: "Para pasarla en grande: Blackpool, Inglaterra.",
      resumenArticulo:
        "Los británicos inventaron las vacaciones en la playa y francamente no me puedo imaginar en que estaban pensando. Sentarse medio desnudo durante horas sobre un montón de arena me parece lo mas alejado de una experiencia agradable. Hacerlo en un clima como el de Gran Bretaña es claramente un tipo de locura.",
      paginaArticulo: 34,
    },
    {
      libroId: librosInsertar[14]._id,
      tituloArticulo: "Osos polares al acecho en el ártico profundo.",
      resumenArticulo:
        "Los grandes osos yacen despatarrados sobre el hielo marino, blanco contra blanco; solo resalta lo negro de las narices y los ojos. Transcurren los últimos días de mayo, la temporada de apareamiento. Durante días, esta pareja había viajado por el estrecho de Barrow y otros canales congelados similares entre las laberínticas islas Queen Elizabeth, en el norte de Canada, mientras otros osos polares cazaban focas.",
      paginaArticulo: 52,
    },
    {
      libroId: librosInsertar[14]._id,
      tituloArticulo: "El apacible fluir del Altamaha.",
      resumenArticulo:
        "Amanece sobre el tramo dcon régimen de marea del Altamaha, en Georgia. Cuando era niño solía meterme hasta las rodillas en las corrientes rápidas que descendían de las montañas Blue Ridge. Me preguntaba adonde llegaba el agua. Cuando era un joven periodista político, el polvo de las comunidades ribereñas del sur de Georigia cubría mis zapatos sin que yo comprendiera la importancia del agua.",
      paginaArticulo: 72,
    },
    {
      libroId: librosInsertar[14]._id,
      tituloArticulo: "Los Países Bajos: Oda al hielo.",
      resumenArticulo:
        "El deslizarse de las navajas de acero sobre el agua congelada es música para el alma holandesa. Cuando los canales congelados se extienden por el territorio como si fueran rayos de sol, los patinadores se entregan a su obsesión nacional, capturada aquí en un retrato iniciado hace dos décadas. El hielo invita a los holandeses a salir, con una fuerza primitiva tan antigua como su propia historia.",
      paginaArticulo: 96,
    },
    {
      libroId: librosInsertar[14]._id,
      tituloArticulo: "Amelia Earhart.",
      resumenArticulo:
        "La mañana del 2 de julio de 1937, en Lae, Isla de Nueva Guinea, Amelia Earhart, encendió los motores de su Lockheed Electra. Escuchó durante unos momentos el ronco rugir de los motores y luego enfiló el avión plateado hacia el extremo de la pista. Quienes presenciaron su despegue aquella brumosa mañana en Lae, fueron los últimos en ver a Earhart y a Noonan. El avión desapareció en algún lugar del Pacífico",
      paginaArticulo: 112,
    },
    {
      libroId: librosInsertar[15]._id,
      tituloArticulo: "Entre bastidores: rendido pero no vencido",
      resumenArticulo:
        "Era demasiado riezgoso seguir adelante', así explica Will Steger su decisión de terminar prematuramente el viaje 'En solitario desde el Polo', planeado como un recorrido de 800 kilómetros y 50 días; una aventura sin precedentes que constía en partir del Polo Norte, atravezar el Océano Ártico y llegar a Cánada. Durante mas de dos años, Will se había preparado para el viaje y se encontraba en excelente condición física cuando salió de su casa en el mes de julio pasado.",
      paginaArticulo: 0,
    },
    {
      libroId: librosInsertar[15]._id,
      tituloArticulo: "Exploracion",
      resumenArticulo:
        "No cesaremos de explorar. La Geografía básica ya es algo conocido. Lo que en nuestros mapas Joseph Conrad llamó espacios en blanco de delicioso misterio, ahora parecen estar llenos, creando la impresión de que queda poco por explorar.",
      paginaArticulo: 2,
    },
    {
      libroId: librosInsertar[15]._id,
      tituloArticulo: "Australia en bicicleta, segunda parte: Sobre la cima",
      resumenArticulo:
        "¿Porqué recorrer Australia en bicicleta? En mi caso, las razones son de índole personal: mi matrimonio acababa de derrumbarse y 15 años despues de haberme mudado de Estados Unidos para residir aquí, todavía no sabía que hacer. Así que me puse en marcha. Exhausto, al suroeste de Darwin, con 6 mil kilómetros recorridos y otros 9 mil por delante, tenía tiempo para descubrir lo que representa mi país adoptivo para mi",
      paginaArticulo: 112,
    },
  ]);
  console.log("Se insertaron datos en contenidos.");

  console.log("La base de datos fue correctamente poblada");
  process.exit(0);
} catch (error) {
  console.error("Error al cargar los datos iniciales: ", error);
  process.exit(1);
}
