// path: src/services/auth.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

/**
 * Sign up a new user with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<UserCredential>}
 */
export const registerWithEmail = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Sign in an existing user
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<UserCredential>}
 */
export const loginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign in with Google
 * @returns {Promise<UserCredential>}
 */
export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  return await firebaseSignOut(auth);
};

/**
 * Update the user's display name or photo
 * @param {User} user 
 * @param {Object} profileData - { displayName, photoURL }
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (user, profileData) => {
  return await updateProfile(user, profileData);
};

/**
 * Send password reset email
 * @param {string} email 
 * @returns {Promise<void>}
 */
export const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};