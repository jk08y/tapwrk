// path: src/services/firestore.js
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Check if a user document exists in Firestore
 * @param {string} uid 
 * @returns {Promise<boolean>}
 */
export const checkUserExists = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

/**
 * Create or overwrite a user document
 * @param {string} uid 
 * @param {Object} userData 
 * @returns {Promise<void>}
 */
export const createUserDocument = async (uid, userData) => {
  const userRef = doc(db, 'users', uid);
  
  const initialData = {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    onboardingCompleted: false,
    earnings: {
      total: 0,
      pending: 0,
      withdrawn: 0,
      available: 0
    },
    stats: {
      tasksCompleted: 0,
      tasksPending: 0,
      referrals: 0
    },
    role: 'user'
  };

  await setDoc(userRef, initialData, { merge: true });
};

/**
 * Get user profile data
 * @param {string} uid 
 * @returns {Promise<Object|null>}
 */
export const getUserProfile = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

/**
 * Update user profile data
 * @param {string} uid 
 * @param {Object} data 
 * @returns {Promise<void>}
 */
export const updateUserDocument = async (uid, data) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};