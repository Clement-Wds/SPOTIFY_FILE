Logique Archi du microservice : 

Frontend
  ↓
Route Express
  ↓
MIDDLEWARE : Multer (upload disque)
  ↓
CONTROLLER : Appel du service
  ↓
SERVICE : filesService (logique métier fichier)

# Exemple type de ce que renvoie notre microservice FILE à DATA : 

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