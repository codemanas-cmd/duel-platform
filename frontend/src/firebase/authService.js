import {signInWithPopup, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import {auth, googleProvider} from "./firebaseConfig"
import store from "../store/store";
import { setUser,clearUser } from "../store/authSlice";

class AuthService {
    
    constructor() {
        setPersistence(auth, browserLocalPersistence )
        .then(() => console.log("Auth persistence set"))
        .catch((error) => console.error("Persistence error:", error));
    }
    async signInWithGoogle () {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
            store.dispatch(setUser({
                      uid: user.uid,
                      email: user.email,
                      displayName: user.displayName,
                      photoURL: user.photoURL
                    }));
            return user;
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
            throw error;
        }
    }
    async signOutUser() {
        try {
          await signOut(auth);
          store.dispatch(clearUser());
        } catch (error) {
          console.error("Sign Out Error:", error.message);
          throw error;
        }
    }
    
      
    getCurrentUser() {
        return auth.currentUser; // Returns null if not logged in
    }
    
    async getToken() {
        const user = auth.currentUser;
        if (user) {
          return await user.getIdToken(); // Get JWT Token
        }
        return null;
    }
}

const authService  = new AuthService()
export default authService;