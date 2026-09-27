# Álbum de memorias — Semillero de Ciberseguridad

1. Copia las fotos a `fotos/`
2. Abre `fotos.js` y agrega una entrada por foto (título, descripción y, si la sabes, la fecha — es opcional)
   - Si tienes varias fotos de la misma ocasión, agrúpalas con `ocasion` + `fotos: [...]` (el ejemplo está arriba en `fotos.js`)
   - **Escribir descripciones viendo la foto:** abre el álbum y dale a **✎ editar textos** (abajo a la izquierda, o tecla **E**).
     Haz clic en el título, la descripción o la fecha de cualquier foto y escribe. Con "ir a ocasión…" saltas directo a una carpeta.
     Todo se guarda solo en el navegador mientras escribes; al terminar dale a **💾 guardar** y elige el archivo
     `descripciones.js` de esta carpeta para reemplazarlo (en Chrome/Edge se queda guardando ahí mismo;
     en otros navegadores se descarga y tienes que moverlo a esta carpeta).
   - **Notas en la página de firmas:** en la página "Firmas & notas" dale a **+ dejar una nota**, escribe el texto y el nombre.
     La × borra una nota. Se guardan con el mismo botón **💾 guardar** (van en `descripciones.js`, en `NOTAS`).
   - **Notas en línea (para GitHub Pages):** para que cualquier visitante deje su nota y todos la vean:
     1. Crea un proyecto gratis en [supabase.com](https://supabase.com)
     2. En **SQL Editor** pega el contenido de `supabase.sql` y dale **Run**
     3. En **Project Settings → API Keys** copia la *Project URL* y la clave *publishable* (o *anon*) en `supabase.js`
        (nunca la *secret* / *service_role*)
     4. Sube los cambios a GitHub. Ahora **+ dejar una nota** abre una nota nueva y **📌 pegar nota** la publica.
        Las notas publicadas no se pueden editar ni borrar desde la página; para moderarlas usa **Table Editor → notas** en Supabase.
   - **Títulos y descripciones en línea (solo editores):**
     1. En **SQL Editor** corre `supabase-editores.sql`
     2. En **Authentication → Sign In / Providers** desactiva *Allow new users to sign up* (así nadie más se crea cuenta)
     3. En **Authentication → Users → Add user** crea tu usuario (correo + contraseña, con *Auto Confirm User*)
     4. Hazlo editor con la última línea de `supabase-editores.sql` (cambiando el correo)
     5. En el álbum presiona **E** (o abre la dirección con `#editar` al final, útil en el celular), entra y edita.
        **💾 guardar** los sube a Supabase y todos los ven. Los visitantes no ven el panel de edición.
3. Pon la canción en `musica/cancion.mp3`
4. Abre `index.html` en el navegador (doble clic)

- Pasar páginas: clic en la página, flechas ← →, o deslizar en el celular
- Música: clic en el casete o tecla **M** (arranca sola al abrir la portada)
- `index.html#3` abre el libro con 3 hojas ya pasadas
