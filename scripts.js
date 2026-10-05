// Paleta de colores para párrafos (elegida de coolors.co)
const coloresParrafos = ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627', '#FDFFFC'];

// Paleta distinta para article/section, así cumplimos el punto 3.3
// ("color de fondo distinto al de párrafo")
const coloresBloques = ['#390099', '#9E0059', '#FF0054', '#FF5400', '#FFBD00'];

// Gifs disponibles para el clic en imágenes
const magicGifs = [
  'assets/magic-1.gif',
  'assets/magic-2.gif',
  'assets/magic-3.gif',
  'assets/magic-4.gif',
  'assets/magic-5.gif',
  'assets/magic-6.gif'
];

// 4. Función getRandom: recibe un array y devuelve un elemento al azar
const getRandom = (array) => {
  const indiceAleatorio = Math.floor(Math.random() * array.length);
  return array[indiceAleatorio];
};

// --- 1 y 2: comportamiento al hacer CLICK ---
document.body.addEventListener('click', function (event) {
  event.preventDefault(); // 1. Bloquea el comportamiento por defecto (ej. seguir un enlace)

  const elemento = event.target;   // el elemento exacto donde se hizo clic
  const tipo = elemento.tagName;   // 'IMG', 'P', 'ARTICLE', 'SECTION'...

  if (tipo === 'IMG') {
    elemento.src = getRandom(magicGifs);                          // 2.1
  } else if (tipo === 'P') {
    elemento.style.color = getRandom(coloresParrafos);            // 2.2
    elemento.style.backgroundColor = getRandom(coloresParrafos);
  } else if (tipo === 'ARTICLE' || tipo === 'SECTION') {
    elemento.style.backgroundColor = getRandom(coloresBloques);   // 2.3
  }
});

// --- 3: comportamiento al pasar el ratón por encima (hover) ---
document.body.addEventListener('mouseover', function (event) {
  const elemento = event.target;
  const tipo = elemento.tagName;

  if (tipo === 'IMG') {
    // Guardamos el src original directamente como propiedad propia del elemento,
    // solo si todavía no lo habíamos guardado antes
    if (elemento.srcOriginal === undefined) {
      elemento.srcOriginal = elemento.src;
    }
    elemento.src = 'assets/abracadabra.gif'; // 3.1: siempre el mismo gif fijo

  } else if (tipo === 'P') {
    if (elemento.colorOriginal === undefined) {
      elemento.colorOriginal = elemento.style.color;
      elemento.fondoOriginal = elemento.style.backgroundColor;
    }
    elemento.style.color = getRandom(coloresParrafos);            // 3.2
    elemento.style.backgroundColor = getRandom(coloresParrafos);

  } else if (tipo === 'ARTICLE' || tipo === 'SECTION') {
    if (elemento.fondoOriginal === undefined) {
      elemento.fondoOriginal = elemento.style.backgroundColor;
    }
    elemento.style.backgroundColor = getRandom(coloresBloques);   // 3.3
  }
});

// --- 3 (continuación): al SALIR el ratón, volver al estado original ---
document.body.addEventListener('mouseout', function (event) {
  const elemento = event.target;
  const tipo = elemento.tagName;

  if (tipo === 'IMG' && elemento.srcOriginal !== undefined) {
    elemento.src = elemento.srcOriginal;
  } else if (tipo === 'P' && elemento.colorOriginal !== undefined) {
    elemento.style.color = elemento.colorOriginal;
    elemento.style.backgroundColor = elemento.fondoOriginal;
  } else if ((tipo === 'ARTICLE' || tipo === 'SECTION') && elemento.fondoOriginal !== undefined) {
    elemento.style.backgroundColor = elemento.fondoOriginal;
  }
});