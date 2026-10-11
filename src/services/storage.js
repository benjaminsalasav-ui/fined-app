// Capa de almacenamiento local (AsyncStorage).
// Centraliza el acceso para que sea fácil de mantener o reemplazar.
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw != null ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('storage.getItem error', key, e);
    return null;
  }
};

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('storage.setItem error', key, e);
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn('storage.removeItem error', key, e);
  }
};
