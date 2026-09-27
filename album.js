/* ================================================================
   Lógica del álbum (no necesitas tocar este archivo)
   ================================================================ */
(() => {
  const libro = document.getElementById("libro");
  const btnAnterior = document.getElementById("anterior");
  const btnSiguiente = document.getElementById("siguiente");
  const indicador = document.getElementById("indicador");
  const casete = document.getElementById("casete");
  const estadoCasete = document.getElementById("casete-estado");
  const musica = document.getElementById("musica");

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Textos editados desde el navegador ----------
     Prioridad: borrador sin guardar (localStorage) > descripciones.js > fotos.js */
  const GUARDADAS = typeof DESCRIPCIONES !== "undefined" ? DESCRIPCIONES : {};
  const CLAVE_BORRADOR = "album-memorias-borrador";
  let borrador = {};
  try { borrador = JSON.parse(localStorage.getItem(CLAVE_BORRADOR)) || {}; } catch (_) {}
  const CAMPOS = ["titulo", "descripcion", "fecha"];
  function conTextos(p) {
    const ed = { ...GUARDADAS[p.foto], ...borrador[p.foto] };
    const r = { ...p };
    if ("titulo" in ed) r.titulo = ed.titulo;
    if ("descripcion" in ed) r.descripcion = ed.descripcion;
    if (ed.fecha) r.fecha = ed.fecha; // fecha vacía = usar la de la ocasión
    return r;
  }

  const WASHI = ["rgba(236,196,96,.72)", "rgba(150,190,160,.72)", "rgba(232,150,150,.7)", "rgba(140,170,215,.72)"];
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

  // Acepta fecha completa, solo año-mes o solo año (o nada):
  // "2026-03-04" -> "'26 03 04" · "2026-03" -> "'26 03" · "2026" -> "'26" (estilo fecha de cámara de rollo)
  const RE_FECHA = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/;
  function fechaCamara(f) {
    const m = RE_FECHA.exec(String(f || "").trim());
    return m ? "'" + [m[1].slice(2), m[2], m[3]].filter(Boolean).join(" ") : String(f || "").trim();
  }
  function fechaLarga(f) {
    const m = RE_FECHA.exec(String(f || "").trim());
    if (!m) return "";
    return m[2] ? `${MESES[+m[2] - 1]} ${m[1]}` : m[1];
  }

  const ESCUDO = `
    <svg class="escudo" viewBox="0 0 100 120" aria-hidden="true">
      <defs>
        <linearGradient id="oro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f5dfa4"/><stop offset=".45" stop-color="#d9b46a"/>
          <stop offset=".7" stop-color="#9c7a36"/><stop offset="1" stop-color="#f5dfa4"/>
        </linearGradient>
      </defs>
      <path d="M50 5 L91 19 V56 C91 85 72 105 50 115 C28 105 9 85 9 56 V19 Z" fill="none" stroke="url(#oro)" stroke-width="2.5"/>
      <path d="M50 15 L82 26 V56 C82 79 67 95 50 104 C33 95 18 79 18 56 V26 Z" fill="none" stroke="url(#oro)" stroke-width=".9"/>
      <circle cx="50" cy="52" r="10" fill="url(#oro)"/>
      <path d="M45.5 58 L42 82 H58 L54.5 58 Z" fill="url(#oro)"/>
    </svg>`;

  const SELLO = `
    <svg class="sello" viewBox="0 0 200 200" aria-hidden="true">
      <defs><path id="circulo-sello" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"/></defs>
      <circle cx="100" cy="100" r="93" fill="none" stroke="currentColor" stroke-width="4"/>
      <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" stroke-width="2"/>
      <text font-size="15" letter-spacing="2"><textPath href="#circulo-sello" textLength="430" lengthAdjust="spacing">IEEE COMPUTER SOCIETY · UNISABANA ·</textPath></text>
      <text x="100" y="97" text-anchor="middle" font-size="17">SEMILLERO</text>
      <text x="100" y="118" text-anchor="middle" font-size="13" letter-spacing="3">CIBER</text>
    </svg>`;

  /* ---------- Constructores de páginas ---------- */

  const portada = (A) => `
    <div class="tapa der portada">
      <div class="marco-oro"></div>
      <p class="org oro">${esc(A.organizacion)}</p>
      ${ESCUDO}
      <h1 class="oro">${esc(A.titulo)}</h1>
      <p class="sub oro">${esc(A.subtitulo)}</p>
      <p class="uni">${esc(A.universidad)} · ${esc(A.anio)}</p>
      <p class="prompt">&gt; ./abrir_album<span class="cursor">_</span></p>
    </div>`;

  const contraportada = (A) => `
    <div class="tapa izq contraportada">
      <div class="marco-oro"></div>
      ${ESCUDO}
      <p>hecho con cariño por el semillero</p>
      <p>${esc(A.anio)}</p>
      <div class="codigo-barras"><span></span>0x5EC-${esc(A.anio)}</div>
    </div>`;

  const intro = (A) => `
    ${SELLO}
    <p class="pertenece">este álbum pertenece a</p>
    <h2>${esc(A.subtitulo)}</h2>
    <div class="adorno"></div>
    <p>${esc(A.dedicatoria)}</p>
    <p class="cat">$ cat LEEME.txt</p>`;

  function paginaFoto(p, i) {
    const rot = (((i * 37) % 7) - 3) * 0.7;
    const washi = WASHI[i % WASHI.length];
    const cintas = i % 2 === 0
      ? `<span class="cinta-adhesiva cinta-centro"></span>`
      : `<span class="cinta-adhesiva cinta-esquinas-a"></span><span class="cinta-adhesiva cinta-esquinas-b"></span>`;
    const etiqueta = p.ocasion
      ? `<p class="etiqueta">▸ ${esc(p.ocasion)}${p.deTotal > 1 ? ` <span>${p.n}/${p.deTotal}</span>` : ""}</p>`
      : "";
    return `
      ${etiqueta}
      <div class="zona-foto">
        <figure class="polaroid" style="--rot:${rot}deg; --washi:${washi}">
          ${cintas}
          <img src="${esc(p.foto)}" alt="${esc(p.titulo)}" data-archivo="${esc(p.foto)}" loading="lazy" decoding="async">
          <span class="fecha">${esc(fechaCamara(p.fecha))}</span>
        </figure>
      </div>
      <div class="leyenda" data-foto="${esc(p.foto)}">
        <h2 data-campo="titulo" data-vacio="título">${esc(p.titulo)}</h2>
        <p data-campo="descripcion" data-vacio="escribe aquí qué pasó en esta foto...">${esc(p.descripcion)}</p>
        <p class="editar-fecha">fecha: <span data-campo="fecha" data-vacio="AAAA-MM-DD">${esc(p.fecha)}</span></p>
      </div>`;
  }

  // Página que abre una ocasión (solo si la ocasión tiene descripción)
  const paginaOcasion = (o) => `
    <p class="marca">— ocasión —</p>
    <h2>${esc(o.ocasion)}</h2>
    ${fechaLarga(o.fecha) || o.fecha ? `<p class="cuando">${esc(fechaLarga(o.fecha) || o.fecha)}</p>` : ""}
    <div class="adorno"></div>
    <p>${esc(o.descripcion)}</p>`;

  const paginaTexto = (p) => `
    <p class="marca">— ✦ —</p>
    <h2>${esc(p.titulo)}</h2>
    <div class="adorno"></div>
    <p>${esc(p.texto)}</p>`;

  const paginaFirmas = () => `<h2>Firmas &amp; notas</h2><p>déjale algo escrito al semillero...</p>`;

  const despedida = (A) => `
    <h2>Gracias.</h2>
    <div class="adorno"></div>
    <p>${esc(A.despedida)}</p>
    ${A.nota && A.nota.texto ? `
    <div class="nota">
      <p>${esc(A.nota.texto)}</p>
      ${A.nota.firma ? `<p class="firma">— ${esc(A.nota.firma)}</p>` : ""}
    </div>` : ""}
    <div class="terminal">
      <span class="ps">$</span> whoami<br>
      semillero_ciber<br>
      <span class="ps">$</span> exit<br>
      <span class="dim">logout — hasta la próxima :)</span>
    </div>`;

  /* ---------- Armar el libro ---------- */

  function construir(A) {
    // Páginas interiores: { clase, html, larga }
    const interiores = [{ clase: "p-intro", html: intro(A) }];

    let nFoto = 0; // para variar la inclinación y la cinta de cada foto
    const agregarFoto = (original) => {
      const p = conTextos(original);
      const larga = (p.descripcion || "").length > 140;
      interiores.push({ clase: "p-foto" + (larga ? " larga" : ""), html: paginaFoto(p, nFoto++), fecha: p.fecha });
    };

    (A.paginas || []).forEach((p) => {
      if (p.tipo === "texto") {
        interiores.push({ clase: "p-texto", html: paginaTexto(p) });
      } else if (Array.isArray(p.fotos)) {
        inicioOcasiones.push({ nombre: p.ocasion, cara: interiores.length + 1 }); // +1 por la portada
        // Ocasión: varias fotos del mismo evento. Cada foto hereda la fecha de la ocasión si no trae la suya.
        if (p.descripcion) interiores.push({ clase: "p-texto p-ocasion", html: paginaOcasion(p) });
        const fotos = p.fotos.filter(Boolean);
        fotos.forEach((f, k) =>
          agregarFoto({ ...f, fecha: f.fecha || p.fecha, ocasion: p.ocasion, n: k + 1, deTotal: fotos.length })
        );
      } else {
        agregarFoto(p);
      }
    });

    if (A.paginaDeFirmas) interiores.push({ clase: "p-firmas", html: paginaFirmas() });
    // Cada hoja tiene 2 caras: el número de páginas interiores debe ser par
    if (interiores.length % 2 === 0) interiores.push({ clase: "p-vacia", html: `<p>/* esta página se dejó en blanco intencionalmente */</p>` });
    interiores.push({ clase: "p-despedida", html: despedida(A) });

    const caras = [
      { tapa: portada(A) },
      ...interiores,
      { tapa: contraportada(A) },
    ];

    const hojas = [];
    for (let h = 0; h < caras.length / 2; h++) {
      const hoja = document.createElement("div");
      hoja.className = "hoja";
      [caras[2 * h], caras[2 * h + 1]].forEach((c, lado) => {
        const k = 2 * h + lado;
        const cara = document.createElement("div");
        cara.className = "cara " + (lado === 0 ? "frente" : "atras");
        if (c.tapa) {
          cara.innerHTML = c.tapa;
        } else {
          const lr = lado === 0 ? "der" : "izq";
          const extra = c.fecha && fechaLarga(c.fecha) ? ` · ${fechaLarga(c.fecha)}` : "";
          cara.innerHTML = `
            <div class="pagina ${lr} ${c.clase}">
              ${c.html}
              <span class="folio">${String(k).padStart(2, "0")}${extra}</span>
            </div>`;
        }
        hoja.appendChild(cara);
      });
      libro.appendChild(hoja);
      hojas.push(hoja);
    }

    // Fotos que no existen -> marcador que dice qué archivo falta
    libro.querySelectorAll("img[data-archivo]").forEach((img) => {
      img.addEventListener("error", () => {
        const d = document.createElement("div");
        d.className = "foto-falta";
        d.innerHTML = `<b>+</b>pon aquí:<br>${esc(img.dataset.archivo)}`;
        img.replaceWith(d);
      });
    });

    return hojas;
  }

  const inicioOcasiones = []; // { nombre, cara } para saltar directo a una ocasión
  const hojas = construir(ALBUM);
  const total = hojas.length;
  let actual = 0; // cuántas hojas están volteadas
  let capa = 0;

  function zReposo(i) {
    return hojas[i].classList.contains("volteada") ? i + 1 : total - i;
  }
  hojas.forEach((h, i) => {
    h.style.zIndex = zReposo(i);
    h.addEventListener("transitionend", (e) => {
      if (e.target === h && e.propertyName === "transform") h.style.zIndex = zReposo(i);
    });
    h.addEventListener("click", (e) => {
      if (editando && e.target.closest(".leyenda")) return; // clic para escribir, no para pasar la hoja
      h.classList.contains("volteada") ? anterior() : siguiente();
    });
  });

  function actualizar() {
    libro.classList.toggle("cerrado-inicio", actual === 0);
    libro.classList.toggle("cerrado-fin", actual === total);
    btnAnterior.disabled = actual === 0;
    btnSiguiente.disabled = actual === total;
    const ultima = 2 * total - 2;
    indicador.textContent =
      actual === 0 ? "portada" :
      actual === total ? "contraportada" :
      `${2 * actual - 1}–${2 * actual} / ${ultima}`;
  }

  function voltear(i, adelante) {
    const h = hojas[i];
    h.style.zIndex = total + 10 + ++capa;
    h.classList.toggle("volteada", adelante);
    sonidoHoja();
    actualizar();
  }

  function siguiente() {
    if (actual >= total) return;
    if (actual === 0 && !pausadaPorUsuario) reproducir();
    voltear(actual++, true);
  }
  function anterior() {
    if (actual <= 0) return;
    voltear(--actual, false);
  }

  btnSiguiente.addEventListener("click", siguiente);
  btnAnterior.addEventListener("click", anterior);

  document.addEventListener("keydown", (e) => {
    if (e.target.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
    if (e.key.toLowerCase() === "e") return alternarEdicion();
    if (e.key === "ArrowRight" || e.key === "PageDown") siguiente();
    else if (e.key === "ArrowLeft" || e.key === "PageUp") anterior();
    else if (e.key.toLowerCase() === "m") alternarMusica();
  });

  let toqueX = null;
  document.addEventListener("touchstart", (e) => (toqueX = e.touches[0].clientX), { passive: true });
  document.addEventListener("touchend", (e) => {
    if (toqueX === null) return;
    const dx = e.changedTouches[0].clientX - toqueX;
    if (Math.abs(dx) > 45) (dx < 0 ? siguiente : anterior)();
    toqueX = null;
  });

  // album.html#3 abre directamente con 3 hojas pasadas
  const inicial = Math.min(total, parseInt(location.hash.slice(1), 10) || 0);
  for (; actual < inicial; actual++) {
    hojas[actual].classList.add("volteada");
    hojas[actual].style.zIndex = zReposo(actual);
  }

  actualizar();

  // Salta sin animación hasta que se vea la cara número `cara`
  function irACara(cara) {
    const objetivo = Math.min(total, Math.ceil(cara / 2));
    hojas.forEach((h, i) => {
      h.classList.toggle("volteada", i < objetivo);
      h.style.zIndex = zReposo(i);
    });
    actual = objetivo;
    actualizar();
    if (objetivo > 0 && !pausadaPorUsuario) reproducir();
  }

  /* ---------- Modo edición: escribir títulos, descripciones y fechas viendo la foto ---------- */
  const panel = document.getElementById("panel-edicion");
  const btnEditar = document.getElementById("btn-editar");
  const btnGuardar = document.getElementById("btn-guardar");
  const estadoEdicion = document.getElementById("estado-edicion");
  const saltarA = document.getElementById("saltar-a");
  let editando = false;
  let archivoDestino = null; // se recuerda mientras la pestaña esté abierta

  inicioOcasiones.forEach((o) => saltarA.add(new Option(o.nombre, o.cara)));
  saltarA.addEventListener("change", () => {
    if (saltarA.value) irACara(+saltarA.value);
    saltarA.value = "";
    saltarA.blur();
  });

  function alternarEdicion() {
    editando = !editando;
    document.body.classList.toggle("editando", editando);
    btnEditar.textContent = editando ? "✓ terminar" : "✎ editar textos";
    libro.querySelectorAll("[data-campo]").forEach((el) => {
      if (editando) el.setAttribute("contenteditable", "plaintext-only");
      else el.removeAttribute("contenteditable");
    });
    actualizarEstado();
  }
  btnEditar.addEventListener("click", alternarEdicion);

  const nCambios = () => Object.keys(borrador).length;
  function actualizarEstado(msg) {
    estadoEdicion.textContent = msg || (nCambios() ? `${nCambios()} foto(s) sin guardar` : "todo guardado");
    btnGuardar.disabled = !nCambios();
  }

  libro.addEventListener("input", (e) => {
    const el = e.target.closest("[data-campo]");
    const ley = el && el.closest(".leyenda");
    if (!ley) return;
    const foto = ley.dataset.foto, campo = el.dataset.campo;
    const valor = el.innerText.replace(/\u00a0/g, " ").trim();
    if (!valor) el.textContent = ""; // para que vuelva a salir el texto de ayuda
    borrador[foto] = { ...borrador[foto], [campo]: valor };
    localStorage.setItem(CLAVE_BORRADOR, JSON.stringify(borrador));
    const pag = ley.closest(".pagina");
    if (campo === "fecha") pag.querySelector(".polaroid .fecha").textContent = fechaCamara(valor);
    if (campo === "descripcion") pag.classList.toggle("larga", valor.length > 140);
    actualizarEstado();
  });
  // Enter en el título o la fecha termina de escribir (en la descripción sí hace salto de línea)
  libro.addEventListener("keydown", (e) => {
    const el = e.target.closest && e.target.closest("[data-campo]");
    if (!el) return;
    e.stopPropagation();
    if (e.key === "Escape" || (e.key === "Enter" && el.dataset.campo !== "descripcion")) {
      e.preventDefault();
      el.blur();
    }
  });

  function generarArchivo() {
    const todo = JSON.parse(JSON.stringify(GUARDADAS));
    for (const [foto, cambios] of Object.entries(borrador)) todo[foto] = { ...todo[foto], ...cambios };
    const lineas = Object.entries(todo)
      .map(([foto, t]) => {
        const campos = CAMPOS.filter((c) => t[c]).map((c) => `${c}: ${JSON.stringify(t[c])}`);
        return campos.length ? `  ${JSON.stringify(foto)}: { ${campos.join(", ")} },` : null;
      })
      .filter(Boolean);
    return {
      todo,
      texto:
        "/* Textos escritos desde el modo edición del álbum (botón \"✎ editar textos\").\n" +
        "   Lo que está aquí tiene prioridad sobre fotos.js. También se puede editar a mano. */\n" +
        "const DESCRIPCIONES = {\n" + lineas.join("\n") + (lineas.length ? "\n" : "") + "};\n",
    };
  }

  btnGuardar.addEventListener("click", async () => {
    const { todo, texto } = generarArchivo();
    if (window.showSaveFilePicker) {
      try {
        archivoDestino = archivoDestino || await showSaveFilePicker({
          suggestedName: "descripciones.js",
          types: [{ description: "JavaScript", accept: { "text/javascript": [".js"] } }],
        });
        const w = await archivoDestino.createWritable();
        await w.write(texto);
        await w.close();
        // Ya quedó en el archivo: el borrador se puede limpiar
        Object.keys(GUARDADAS).forEach((k) => delete GUARDADAS[k]);
        Object.assign(GUARDADAS, todo);
        borrador = {};
        localStorage.removeItem(CLAVE_BORRADOR);
        actualizarEstado(`guardado en ${archivoDestino.name} ✓`);
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return; // canceló el diálogo
      }
    }
    // Navegador sin acceso a archivos: se descarga y hay que moverlo a la carpeta del álbum.
    // El borrador se conserva por si no se mueve.
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([texto], { type: "text/javascript" }));
    a.download = "descripciones.js";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    actualizarEstado("descargado: muévelo a la carpeta del álbum");
  });

  actualizarEstado();
  panel.hidden = false;

  /* ---------- Sonido de hoja (sintetizado, sin archivos) ---------- */
  let ctx = null;
  function sonidoHoja() {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const t = ctx.currentTime, dur = 0.42;
      const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 1.6);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filtro = ctx.createBiquadFilter();
      filtro.type = "bandpass";
      filtro.Q.value = 0.7;
      filtro.frequency.setValueAtTime(3200, t);
      filtro.frequency.exponentialRampToValueAtTime(700, t + dur);
      const vol = ctx.createGain();
      vol.gain.setValueAtTime(0.0001, t);
      vol.gain.exponentialRampToValueAtTime(0.16, t + 0.06);
      vol.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(filtro).connect(vol).connect(ctx.destination);
      src.start(t);
    } catch (_) { /* sin audio, no pasa nada */ }
  }

  /* ---------- Música ---------- */
  const C = ALBUM.cancion || {};
  document.getElementById("casete-titulo").textContent = C.titulo || "sin título";
  document.getElementById("casete-artista").textContent = C.artista || "";
  musica.src = C.archivo || "";
  const VOLUMEN = 0.55;
  let pausadaPorUsuario = false;
  let animVol = null;

  function fundir(objetivo, ms, alTerminar) {
    cancelAnimationFrame(animVol);
    const desde = musica.volume, t0 = performance.now();
    const paso = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      musica.volume = desde + (objetivo - desde) * k;
      if (k < 1) animVol = requestAnimationFrame(paso);
      else if (alTerminar) alTerminar();
    };
    animVol = requestAnimationFrame(paso);
  }

  function reproducir() {
    if (casete.classList.contains("sin-archivo")) return;
    musica.volume = musica.paused ? 0 : musica.volume;
    musica.play()
      .then(() => {
        casete.classList.add("sonando");
        estadoCasete.textContent = "❚❚ sonando";
        fundir(VOLUMEN, 2500);
      })
      .catch(() => {});
  }
  function pausar() {
    casete.classList.remove("sonando");
    estadoCasete.textContent = "▶ música";
    fundir(0, 700, () => musica.pause());
  }
  function alternarMusica() {
    if (casete.classList.contains("sonando")) {
      pausadaPorUsuario = true;
      pausar();
    } else {
      pausadaPorUsuario = false;
      reproducir();
    }
  }
  casete.addEventListener("click", alternarMusica);

  musica.addEventListener("error", () => {
    casete.classList.add("sin-archivo");
    estadoCasete.textContent = `falta ${C.archivo}`;
  });
})();
