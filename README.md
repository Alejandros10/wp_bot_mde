# WhatsApp MedellinStyle Scrapie Bot

Bot for MedellinStyle **extracts external links from a WP group** (YouTube, Bandcamp, SoundCloud, Spotify, MP3/MP4) and media files sent in a specific group, and exports them in **JSON** and **XML**.

---

## Whatsd do

- **Filters:** Only saves links from YouTube, Bandcamp, SoundCloud, and MP3/MP4 files.
- **Captures media files** sent (audio, video, images).
- **Automatic export** to JSON and XML.
- **Configurable by environment variables** (`.env`).

---

## Requirements

- Node.js >= 18
- Docker and Docker Compose*
- WhatsApp in phone

---

## Installation

### 1. Clone repo

```bash
git clone https://github.com/Alejandros10/wp_bot_mde.git
```

### 2. Set up ENV

Example from `.env.example` to `.env`:

GROUP_ID=00000000000000000@g.us  
JSON_EXPORT_PATH=mde_links.json  
XML_EXPORT_PATH=mde_links.xml  
SESSION_PATH=session.json

```bash
cp .env.example .env
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the bot (local)

```bash
npm start
```

Scan the QR with the WhatsApp app on your phone.

---

## Using Docker

### 1. Build the container

```bash
docker-compose build
```

### 2. Start the server

```bash
docker-compose up
```

Scan the QR shown in the console to authenticate.

---

## How do I get the group ID?

To see the IDs:

```javascript
client.on('ready', async () => {
    const chats = await client.getChats();
    chats.forEach(chat => {
        if (chat.isGroup) {
            console.log(`Name: ${chat.name} | ID: ${chat.id._serialized}`);
        }
    });
});

```
