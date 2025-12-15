Logique Archi du microservice : 
````
Frontend
  ↓
Route Express
  ↓
MIDDLEWARE : Multer (upload disque)
  ↓
CONTROLLER : Appel du service
  ↓
SERVICE : filesService (logique métier fichier)
````
# Exemple type de ce que renvoie notre microservice FILE à DATA : 
```` json
{
  "id": "a7c9e6d1-9e3a-4d2f-8b8c-1c9b7c2e4f12",
  "scope": "musics",
  "path": "uploads/musics/track_173...mp3",
  "originalName": "track.mp3",
  "mimeType": "audio/mpeg",
  "size": 3249554,
  "createdAt": "2025-12-15T12:34:56.000Z",
  "url": "/api/files/a7c9e6d1-9e3a-4d2f-8b8c-1c9b7c2e4f12/download"
}
````

# Template .env
````
PORT=4002
NODE_ENV=development

AUTH_SERVICE_URL=http://localhost:4000
AUTH_SERVICE_TOKEN=

JWT_SECRET=
JWT_EXPIRES_IN=1d

UPLOAD_SERVICE_TOKEN=
UPLOAD_DIR=uploads
MAX_FILE_SIZE=52428800

DB_HOST=localhost
DB_PORT=3306
DB_NAME=spotify_file
DB_USER=root
DB_PASSWORD=
````
