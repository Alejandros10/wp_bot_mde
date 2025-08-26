# WhatsApp Media Scraper Bot

Este proyecto es un bot para WhatsApp que **extrae automáticamente enlaces externos** (YouTube, Bandcamp, SoundCloud, MP3/MP4) y archivos multimedia enviados en un grupo específico, y los exporta en formato **JSON** y **XML**.  
Está desarrollado en **Node.js** siguiendo los principios **SOLID** y **Clean Code**, usa variables de entorno y está preparado para ejecutarse en **Docker**.

---

## Características

- **Filtrado inteligente:** Solo guarda enlaces de YouTube, Bandcamp, SoundCloud y archivos MP3/MP4.
- **Captura archivos multimedia** enviados (audio, video, imágenes).
- **Exportación automática** a JSON y XML.
- **Configuración por variables de entorno** (`.env`).
- **Dockerizado** para facilitar el despliegue.
- **Arquitectura modular:** SOLID y Clean Code.

---

## Requisitos

- Node.js >= 18
- Docker y Docker Compose (opcional, recomendado)
- WhatsApp activo en tu móvil para escanear el QR la primera vez

---

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/whatsapp-media-scraper.git
cd whatsapp-media-scraper
```

### 2. Configura tu entorno

Copia el archivo de ejemplo `.env.example` a `.env` y edítalo:

```bash
cp .env.example .env
```

Edita `.env` y coloca el **ID de tu grupo** en `GROUP_ID`.
> Para obtener el ID del grupo, ejecuta el bot y usa el script de ejemplo para listar los grupos y sus IDs en consola.

### 3. Instala las dependencias

```bash
npm install
```

### 4. Ejecuta el bot (modo local)

```bash
npm start
```

La primera vez deberás escanear el QR con la app de WhatsApp de tu móvil.

---

## Uso con Docker

### 1. Construye el contenedor

```bash
docker-compose build
```

### 2. Inicia el servicio

```bash
docker-compose up
```

Escanea el QR en consola para autenticar.

---

## ¿Cómo funciona?

1. El bot se conecta a tu WhatsApp Web y escucha los mensajes del grupo configurado.
2. Filtra solo los enlaces externos de interés y archivos multimedia enviados.
3. Los resultados se exportan automáticamente a los archivos definidos en `.env` (`media_links.json`, `media_links.xml`).

---

## Estructura de archivos

```
src/
├── config/
├── domain/
├── services/
├── utils/
├── app.ts
.env.example
Dockerfile
docker-compose.yml
README.md
```

---

## Obtener el ID del grupo

Agrega este fragmento al script para listar los grupos y sus IDs:
```javascript
client.on('ready', async () => {
    const chats = await client.getChats();
    chats.forEach(chat => {
        if (chat.isGroup) {
            console.log(`Nombre: ${chat.name} | ID: ${chat.id._serialized}`);
        }
    });
});
```
Copia el ID del grupo que deseas monitorear y pégalo en tu `.env`.

---

## Notas importantes

- **Privacidad:** Respeta la privacidad y las normas de uso de WhatsApp.
- **WhatsApp Web debe estar abierto y autenticado** mientras el bot está en funcionamiento.
- **No uses este bot para fines comerciales o masivos**; WhatsApp puede bloquear tu número.

---

## Contribuciones

¡Las contribuciones son bienvenidas!  
Abre un issue o PR para sugerencias y mejoras.

---

## Licencia

MIT




rd /s /q dist


npx tsc

node dist/app.js
