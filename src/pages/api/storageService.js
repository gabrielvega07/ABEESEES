///storageService.js
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

// Función para listar archivos en un directorio específico
export const listFiles = async (path) => {
  const listRef = ref(storage, path);
  
  try {
    const res = await listAll(listRef);
    const files = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { name: itemRef.name, url };
      })
    );
    return files;
  } catch (error) {
    console.error("Error al listar archivos:", error);
    throw error;
  }
};