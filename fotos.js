/* ================================================================
   ✏️  ESTE ES EL ÚNICO ARCHIVO QUE TIENES QUE EDITAR
   ================================================================

   💡 Los títulos, descripciones y fechas de cada foto es más fácil escribirlos
      desde el álbum: ábrelo y dale a "✎ editar textos" (o tecla E).
      Eso se guarda en descripciones.js y tiene prioridad sobre lo que pongas aquí.

   CÓMO AGREGAR UNA FOTO:
     1. Copia la foto a la carpeta  fotos/
     2. Agrega un bloque como este dentro de "paginas" (cada uno es una página):

        {
          foto: "fotos/mi-foto.jpg",
          titulo: "Título corto",
          descripcion: "Una o tres líneas contando qué pasó.",
          fecha: "2026-03-15",        // OPCIONAL: bórrala si no la sabes
        },

   LA FECHA ES OPCIONAL. Si no la sabes, simplemente no pongas la línea "fecha".
   Si solo sabes una parte, también sirve:
        fecha: "2026-03-15",   // día exacto
        fecha: "2026-03",      // solo mes y año
        fecha: "2026",         // solo el año
        fecha: "semana 5",     // o texto libre

   VARIAS FOTOS DE LA MISMA OCASIÓN (categoría):
     Agrúpalas así. Cada foto sigue teniendo su página, con una etiqueta
     "▸ NOMBRE DE LA OCASIÓN 1/3" arriba. La fecha se pone una sola vez
     para todo el grupo (y también es opcional).

        {
          ocasion: "Nuestro primer CTF",
          fecha: "2026-04",                 // opcional, aplica a todas las fotos
          descripcion: "Texto opcional.",   // opcional: si lo pones, sale una página de portada para la ocasión
          fotos: [
            { foto: "fotos/ctf-1.jpg", titulo: "Llegando", descripcion: "..." },
            { foto: "fotos/ctf-2.jpg", titulo: "2 a.m.", fecha: "2026-04-19" },  // una foto puede tener su propia fecha
            { foto: "fotos/ctf-3.jpg" },    // título y descripción también son opcionales
          ],
        },

   CÓMO AGREGAR UNA PÁGINA SOLO DE TEXTO (tipo "capítulo"):

        { tipo: "texto", titulo: "Capítulo 2", texto: "Lo que quieras escribir..." },

   Tips:
     - El orden de la lista es el orden del libro.
     - No olvides la coma  ,  después de cada bloque  }
     - Descripciones cortas se ven mejor (si es larga, la foto se achica sola).
     - Si una foto no aparece, la página te dice qué archivo falta.
   ================================================================ */

const ALBUM = {
  titulo: "Memorias",
  subtitulo: "Semillero de Ciberseguridad",
  organizacion: "IEEE Computer Society",
  universidad: "Universidad de La Sabana",
  anio: "",

  dedicatoria:
    "Para todos los que se quedaron hasta tarde rompiendo cosas (con permiso), " +
    "aprendiendo a punta de errores y compartiendo momentos frente a una terminal. " +
    "Esto es lo que fuimos.",

  // Pon el mp3 en la carpeta musica/ con este nombre
  cancion: {
    archivo: "musica/20201203.mp3",
    titulo: "20201203",
    artista: "Mac DeMarco",
  },

  // Una ocasión por carpeta de fotos/Fotos semillero. Cambia el orden moviendo bloques completos.
  paginas: [
    {
      ocasion: "Build Day",
      fotos: [
        { foto: "fotos/Fotos semillero/Build Day/Build day Claude 1.jpg" },
        { foto: "fotos/Fotos semillero/Build Day/Build Day Claude 2.jpg" },
        { foto: "fotos/Fotos semillero/Build Day/Build day Claude 3.jpg" },
        { foto: "fotos/Fotos semillero/Build Day/Grupo Build day.jpg" },
      ],
    },
    {
      ocasion: "CTF 1",
      fotos: [
        { foto: "fotos/Fotos semillero/CTF 1/CTF1 grupo 1.jpg" },
        { foto: "fotos/Fotos semillero/CTF 1/CTF1 Grupo 5.jpg" },
        { foto: "fotos/Fotos semillero/CTF 1/CTF 1 Equipo y ganador 1.jpg" },
        { foto: "fotos/Fotos semillero/CTF 1/CTF 1 Equipo y ganador 2.jpg" },
        { foto: "fotos/Fotos semillero/CTF 1/CTF 1 Equipo y ganador 3.jpg" },
        { foto: "fotos/Fotos semillero/CTF 1/CTF 1 Equipo y ganador 4.jpg" },
        { foto: "fotos/Fotos semillero/CTF 1/CTF 1 Grupo 3.jpg" },
        { foto: "fotos/Fotos semillero/CTF 1/CTF 1 Grupo 4.jpg" },
        { foto: "fotos/Fotos semillero/CTF 1/CTF 1 llegando la gente.jpg" },
        { foto: "fotos/Fotos semillero/CTF 1/CTF 1- Grupo 2.jpg" },
      ],
    },
    {
      ocasion: "Ctf 2",
      fotos: [
        { foto: "fotos/Fotos semillero/Ctf 2/CTF2 participantes.jpg" },
        { foto: "fotos/Fotos semillero/Ctf 2/CTF2 Premio.jpg" },
      ],
    },
    {
      ocasion: "Cumple Nico",
      fotos: [
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 1.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 2.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 3.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 4.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 5.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 6.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 7.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 8.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 9.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 10.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 11.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 12.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 13.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 14.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 15.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 16.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 17.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 18.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 19.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 20.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 21.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 22.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 23.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 24.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 25.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 26.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 27.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 29.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 30.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 31.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 32.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 33.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 34.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 35.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 36.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 37.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 38.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 39.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 40.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 41.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 42.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 43.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 44.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 45.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 46.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 47.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 48.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 49.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 50.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 51.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 52.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 53.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 54.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 55.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 56.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 57.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 58.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 59.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 60.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 61.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 62.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 63.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 64.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 65.jpg" },
        { foto: "fotos/Fotos semillero/Cumple Nico/Cumple Nico 66.jpg" },
      ],
    },
    {
      ocasion: "Dragon Jaar",
      fotos: [
        { foto: "fotos/Fotos semillero/Dragon Jaar/Dragon Jaar.jpg" },
      ],
    },
    {
      ocasion: "Feria 1",
      fotos: [
        { foto: "fotos/Fotos semillero/Feria 1/Feria 1 grupo 1.jpg" },
        { foto: "fotos/Fotos semillero/Feria 1/Feria 1 grupo 2(1).jpg" },
        { foto: "fotos/Fotos semillero/Feria 1/Feria 1 grupo 2.jpg" },
        { foto: "fotos/Fotos semillero/Feria 1/Feria 1 grupo 3.jpg" },
        { foto: "fotos/Fotos semillero/Feria 1/Feria 1 grupo 4.jpg" },
        { foto: "fotos/Fotos semillero/Feria 1/Feria 1 grupo 5.jpg" },
        { foto: "fotos/Fotos semillero/Feria 1/Feria 1 Nico.jpg" },
      ],
    },
    {
      ocasion: "Feria 2",
      fotos: [
        { foto: "fotos/Fotos semillero/Feria 2/Feria 2 1.jpg" },
        { foto: "fotos/Fotos semillero/Feria 2/Feria 2 2.jpg" },
        { foto: "fotos/Fotos semillero/Feria 2/Feria 2 3.jpg" },
        { foto: "fotos/Fotos semillero/Feria 2/Feria 2 4.jpg" },
        { foto: "fotos/Fotos semillero/Feria 2/Feria 2 5.jpg" },
        { foto: "fotos/Fotos semillero/Feria 2/Feria 2 6.jpg" },
        { foto: "fotos/Fotos semillero/Feria 2/Feria 2 7.jpg" },
        { foto: "fotos/Fotos semillero/Feria 2/Feria 2 8.jpg" },
        { foto: "fotos/Fotos semillero/Feria 2/Feria 2 9.jpg" },
        { foto: "fotos/Fotos semillero/Feria 2/Feria 2 10.jpg" },
        { foto: "fotos/Fotos semillero/Feria 2/Feria 2 11.jpg" },
      ],
    },
    {
      ocasion: "Flyers",
      fotos: [
        { foto: "fotos/Fotos semillero/Flyers/Flyer.jpg" },
      ],
    },
    {
      ocasion: "Irish y mac",
      fotos: [
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 1.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 2.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 3.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 4.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 5.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 6.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 7.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 8.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 9.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 10.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 11.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 12.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 13.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 14.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 15.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 16.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 17.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 18.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 19.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Irish 20.jpg" },
        { foto: "fotos/Fotos semillero/Irish y mac/Mac.jpg" },
      ],
    },
    {
      ocasion: "Mao y Nico",
      fotos: [
        { foto: "fotos/Fotos semillero/Random/Nico y Mao.jpg" },
      ],
    },
    {
      ocasion: "Sesiones",
      fotos: [
        { foto: "fotos/Fotos semillero/Sesiones/Sesion 1 Semestre 2 semillero 2.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion 1 Semestre 2 semillero 3.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion 1 Semestre 2 semillero 4.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion 1 Semestre 2 semillero 5.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion 1 Semestre 2 semillero 6.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion 1 Semestre 2 semillero 7.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion 1 Semestre 2 semillero 8.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion 1 Semestre 2 semillero.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/sesion avanzada 1 2.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion avanzada 1.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion basico 1 2.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion basico 1_.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion IP 2.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion IP 3.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion IP 4.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion IP 5.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion IP 6.jpg" },
        { foto: "fotos/Fotos semillero/Sesiones/Sesion IP.jpg" },
      ],
    },
    {
      ocasion: "Zona Centro Sabana 2026 - 2",
      fotos: [
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 1.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 2.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 3.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 4.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 5.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 6.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 7.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 8.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 9.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 10.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 11.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 12.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 14.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 15.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 16.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 17.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 18.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 19.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 20.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 21.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 22.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 23.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 24.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 25.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 26.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 27.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 28.jpg" },
        { foto: "fotos/Fotos semillero/Zona Centro Sabana 2026 - 2/Zona centro 134.jpg" },
      ],
    },
  ],

  // Agrega una hoja rayada al final donde cada uno puede dejar una nota (botón "+ dejar una nota")
  paginaDeFirmas: true,

  despedida:
    "Gracias por cada reunión, cada reto y cada 'ya casi lo tengo'.",

  // Nota a mano en la página de despedida (bórrala si no quieres ninguna)
  nota: {
    texto: "Gracias por todos estos momentos, espero sean muchos más.",
    firma: "Pablo",
  },
};
