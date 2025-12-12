import { DictionaryEntry } from './types';

export const MAX_CHALLENGES = 6;
export const ANIMATION_DELAY_MS = 300;

export const DICTIONARY: DictionaryEntry[] = [
  { 
    word: "REACT", 
    definition_en: "A popular tool used to build website parts like blocks.",
    definition_es: "Una herramienta popular usada para construir partes de sitios web como bloques.",
    info: "Maintained by Meta (Facebook), it introduced the Virtual DOM.",
    link: "https://react.dev/"
  },
  { 
    word: "DEBUG", 
    definition_en: "Finding and fixing mistakes in code.",
    definition_es: "Encontrar y arreglar errores en el código.",
    info: "The term was coined by Grace Hopper after finding a literal moth in a computer.",
    link: "https://en.wikipedia.org/wiki/Debugging"
  },
  { 
    word: "LINUX", 
    definition_en: "A free operating system used by many servers.",
    definition_es: "Un sistema operativo gratuito usado por muchos servidores.",
    info: "Created by Linus Torvalds in 1991.",
    link: "https://www.linux.org/"
  },
  { 
    word: "PIXEL", 
    definition_en: "A single tiny dot of color on your screen.",
    definition_es: "Un pequeño punto único de color en tu pantalla.",
    info: "Short for 'Picture Element'.",
    link: "https://en.wikipedia.org/wiki/Pixel"
  },
  { 
    word: "CACHE", 
    definition_en: "A temporary storage to make loading faster.",
    definition_es: "Un almacenamiento temporal para hacer la carga más rápida.",
    info: "There are hardware caches (CPU) and software caches (Browser, CDN).",
    link: "https://aws.amazon.com/caching/"
  },
  { 
    word: "PROXY", 
    definition_en: "A middleman between you and the internet.",
    definition_es: "Un intermediario entre tú e internet.",
    info: "Often used for security, anonymity, or content filtering.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling"
  },
  { 
    word: "TOKEN", 
    definition_en: "A digital key or pass used for security.",
    definition_es: "Una llave o pase digital usado para seguridad.",
    info: "JWT (JSON Web Tokens) are commonly used for authentication.",
    link: "https://jwt.io/"
  },
  { 
    word: "MERGE", 
    definition_en: "Joining two different versions of code together.",
    definition_es: "Unir dos versiones diferentes de código.",
    info: "A common operation in Git, sometimes resulting in 'conflicts'.",
    link: "https://git-scm.com/docs/git-merge"
  },
  { 
    word: "QUERY", 
    definition_en: "Asking a database for specific information.",
    definition_es: "Pedirle a una base de datos información específica.",
    info: "SQL stands for Structured Query Language.",
    link: "https://www.w3schools.com/sql/"
  },
  { 
    word: "STACK", 
    definition_en: "A list where the last item added is the first one out.",
    definition_es: "Una lista donde el último elemento agregado es el primero en salir.",
    info: "Follows the LIFO principle (Last In, First Out).",
    link: "https://www.geeksforgeeks.org/stack-data-structure/"
  },
  { 
    word: "QUEUE", 
    definition_en: "A list where the first item added is the first one out.",
    definition_es: "Una lista donde el primer elemento agregado es el primero en salir.",
    info: "Follows the FIFO principle (First In, First Out).",
    link: "https://www.geeksforgeeks.org/queue-data-structure/"
  },
  { 
    word: "ARRAY", 
    definition_en: "A list of items stored in order.",
    definition_es: "Una lista de elementos guardados en orden.",
    info: "Arrays are zero-indexed in most programming languages.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
  },
  { 
    word: "AGILE", 
    definition_en: "A way of working that focuses on small, quick steps.",
    definition_es: "Una forma de trabajar que se enfoca en pasos pequeños y rápidos.",
    info: "Values individuals and interactions over processes and tools.",
    link: "https://agilemanifesto.org/"
  },
  { 
    word: "SCRUM", 
    definition_en: "A team framework to get work done in short cycles.",
    definition_es: "Un marco de trabajo en equipo para completar tareas en ciclos cortos.",
    info: "Uses roles like Scrum Master and Product Owner.",
    link: "https://www.scrum.org/resources/what-is-scrum"
  },
  { 
    word: "CLOUD", 
    definition_en: "Computers and services you access over the internet.",
    definition_es: "Computadoras y servicios a los que accedes por internet.",
    info: "Popular providers include AWS, Azure, and Google Cloud.",
    link: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-cloud-computing/"
  },
  { 
    word: "ASYNC", 
    definition_en: "Code that doesn't stop everything else while waiting.",
    definition_es: "Código que no detiene todo lo demás mientras espera.",
    info: "JavaScript uses Promises and async/await to handle this.",
    link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous"
  },
  { 
    word: "PATCH", 
    definition_en: "A small update to fix a bug or add a feature.",
    definition_es: "Una actualización pequeña para arreglar un error o agregar algo.",
    info: "Patch Tuesday is a common term for when Microsoft releases updates.",
    link: "https://en.wikipedia.org/wiki/Patch_(computing)"
  },
  { 
    word: "ROUTE", 
    definition_en: "Path that tells data or users where to go.",
    definition_es: "Camino que le dice a los datos o usuarios a dónde ir.",
    info: "In web apps, routing maps URLs to specific components.",
    link: "https://reactrouter.com/en/main"
  },
  { 
    word: "FETCH", 
    definition_en: "Getting data from another place, like a server.",
    definition_es: "Obtener datos de otro lugar, como un servidor.",
    info: "The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline.",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
  },
  { 
    word: "BUILD", 
    definition_en: "Preparing code so it can be run by computers.",
    definition_es: "Preparar el código para que pueda ser ejecutado por computadoras.",
    info: "Tools like Webpack, Vite, or Make are used for this process.",
    link: "https://en.wikipedia.org/wiki/Software_build"
  },
  { 
    word: "SHELL", 
    definition_en: "A text-based program to talk to the operating system.",
    definition_es: "Un programa basado en texto para hablar con el sistema operativo.",
    info: "Bash and Zsh are popular Unix shells.",
    link: "https://en.wikipedia.org/wiki/Shell_(computing)"
  },
  { 
    word: "LOGIC", 
    definition_en: "The reasoning or rules a computer follows.",
    definition_es: "El razonamiento o reglas que sigue una computadora.",
    info: "Boolean logic (True/False) is the foundation of digital circuits.",
    link: "https://en.wikipedia.org/wiki/Logic_gate"
  },
  { 
    word: "WHILE", 
    definition_en: "A loop that runs as long as a condition is true.",
    definition_es: "Un bucle que corre mientras una condición sea verdadera.",
    info: "Be careful! If the condition never changes, you get an infinite loop.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while"
  },
  { 
    word: "CONST", 
    definition_en: "A value that cannot be changed after it is set.",
    definition_es: "Un valor que no puede ser cambiado después de definirse.",
    info: "Short for 'constant'.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const"
  },
  { 
    word: "FLOAT", 
    definition_en: "A number that has a decimal point.",
    definition_es: "Un número que tiene un punto decimal.",
    info: "Floating point arithmetic can sometimes lead to precision errors.",
    link: "https://en.wikipedia.org/wiki/Floating-point_arithmetic"
  },
  { 
    word: "INDEX", 
    definition_en: "A number representing a position in a list.",
    definition_es: "Un número que representa una posición en una lista.",
    info: "Usually starts at 0 in computer science.",
    link: "https://en.wikipedia.org/wiki/Index_(programming)"
  }
];