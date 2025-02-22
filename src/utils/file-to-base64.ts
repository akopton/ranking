import { TImg } from "@/app/_components/create-ranking/create-ranking";

export const fileToBase64 = async (file: File): Promise<TImg> => {
  const buffer = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);

  // Budujemy string partiami, aby uniknąć przekroczenia call stacka
  for (let i = 0; i < bytes.length; i += 1024) {
    binary += String.fromCharCode(...bytes.slice(i, i + 1024));
  }

  return { name: file.name, mimeType: file.type, base64: btoa(binary) };
};
