import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZS9ETqeTVIewnWhV68K9dw-bMcUoRmEY",
  authDomain: "citanova-f5a98.firebaseapp.com",
  projectId: "citanova-f5a98",
  storageBucket: "citanova-f5a98.firebasestorage.app",
  messagingSenderId: "1056828688404",
  appId: "1:1056828688404:web:25e847f47eb227aedb3f01",
  measurementId: "G-RXJK9Z86R9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Persistencia en localStorage
setPersistence(auth, browserLocalPersistence).catch((e) =>
  console.error("Persistencia:", e)
);

// Helpers de errores legibles
const asCode = (e) => (e && e.code) || "error/unknown";

// --- Email+Password: REGISTRO (con nombre y estado civil)
export async function registerWithEmail(email, password, name, maritalStatus) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name || "" });

  // Guarda extras
  await setDoc(doc(db, "users", cred.user.uid), {
    name: name || "",
    maritalStatus: maritalStatus || "",
    email,
    createdAt: serverTimestamp(),
  });

  return cred.user;
}

export function setSessionUser(user) {
  if (user) {
    localStorage.setItem("sessionUser", JSON.stringify({
      uid: user.uid,
      name: user.displayName || user.email.split("@")[0],
      email: user.email,
      maritalStatus: user.maritalStatus || ""
    }));
  } else {
    localStorage.removeItem("sessionUser");
  }
}

// --- Email+Password: LOGIN
export async function loginWithEmail(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

// --- Google: LOGIN
export async function loginWithGoogle() {
  const { user } = await signInWithPopup(auth, googleProvider);
  // merge mínimos
  await setDoc(
    doc(db, "users", user.uid),
    { name: user.displayName || "", email: user.email || "", updatedAt: serverTimestamp() },
    { merge: true }
  );
  return user;
}

// --- LOGOUT
export async function logout() {
  await signOut(auth);

  setSessionUser(null);
  return true;
}

// Exports agrupados (compatibilidad con tus imports)
export default app;
