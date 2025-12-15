import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { env } from '../config/env.js';

//CE qu'on retrouvait dans notre app.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //Path local

// uploadsRoot = <project-root>/<UPLOAD_DIR> -> Ça donne Path Local + Path dans le projet
const baseDir = env.uploadDir; //-> racine du stockage de nos fichiers définis dans le .env juste avant
const uploadsRoot = path.join(__dirname, '..', '..', baseDir);

//Si fichier et path existe
if (!fs.existsSync(uploadsRoot)) fs.mkdirSync(uploadsRoot, { recursive: true });

const storage = multer.diskStorage({
    //Définition du répertoire
    destination: (req, file, cb) => {
        // folder optionnel envoyé par le client service (musics, covers, avatars...) 
        // -> pour le moment on a juste musics mais ceci nous permet de garder un aspect générique
        const folder = (req.body.folder || 'misc').replace(/[^a-zA-Z0-9_-]/g, ''); //Si jamais on a rien, on stocke cela dans le dossier "misc"
        //La regex permet la suppression des caractères non autorisés pour un répertoire
        const dest = path.join(uploadsRoot, folder); //Path Local + Path Projet + Répertoire de destination
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        cb(null, dest); //CALLBACK -> C'est histoire de dire que tout c'est bien passé, en gros c'est pour dire à Multer, chill tu peux passer à la suite
    },
    //Définition du nom du fichier
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); //Recup extension file
        const base = path.basename(file.originalname, ext).replace(/\s+/g, '_'); //Suppresion et remplacement des espaces par des underscores
        cb(null, `${base}_${Date.now()}${ext}`); //Génération d'un nom unique grace au timestamp
    },

    //Grâce à cela nos callback "retourne" une destination et un nom de fichier unique
});

// Liste whitelist (audio + images)
// Sécurité on accepte pas n'importe quel type de fichier
const allowed = new Set([
  // images
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  // audio
  'audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aac', 'audio/ogg', 'audio/mp4',
]);

//Méthode de validation grace aux critères ci-dessous
const fileFilter = (req, file, cb) => {
  if (!allowed.has(file.mimetype)) {
    return cb(new Error(`MIME type non autorisé: ${file.mimetype}`), false);
  }
  cb(null, true);
};

//Upload du fichier avec Multer
export const uploadSingle = multer({
  storage,
  fileFilter,
  limits: { fileSize: Number(env.uploadMaxSize) },
}).single('file');
