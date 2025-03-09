import { Platform } from 'react-native';

import RNFS from 'react-native-fs';

const sanitizeFileName = (name: string): string => {
  return name
    .split('?')[0] // Remove query string
    .replace(/[:]/g, '-') // Replace colons with hyphens
    .replace(/[^a-zA-Z0-9-_.]/g, '') // Remove other invalid characters
    .substring(0, 100); // Limit length to avoid issues
};

export const isFileExist = async (imageUrl?: string) => {
  if (!imageUrl) {
    return false;
  }

  const fileName = sanitizeFileName(imageUrl);

  const localImageUri = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  const exists = await RNFS.exists(localImageUri);

  return exists;
};

export const fetchImage = async (imageUrl?: string) => {
  if (!imageUrl) {
    return '';
  }

  const fileName = sanitizeFileName(imageUrl);

  const localImageUri = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  const isExist = await isFileExist(imageUrl);

  if (!isExist) {
    await RNFS.downloadFile({
      fromUrl: imageUrl,
      toFile: localImageUri,
    }).promise;
  }

  return localImageUri;
};

export const getImageUri = (imageUrl: string) => {
  const fileName = sanitizeFileName(imageUrl);

  const imagePath = `${Platform.OS === 'android' ? 'file://' : ''}${
    RNFS.DocumentDirectoryPath
  }/${fileName}`;

  return imagePath;
};

export const deleteFile = async (imageUrl?: string) => {
  if (!imageUrl) {
    return;
  }

  const fileName = sanitizeFileName(imageUrl);

  const localImageUri = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  const exists = await isFileExist(imageUrl);

  if (!exists) {
    return;
  }

  await RNFS.unlink(localImageUri);
  // console.log(`Successfully deleted file: ${localImageUri}`);
};
