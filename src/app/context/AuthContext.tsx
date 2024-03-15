'use client'
import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    UserCredential,
} from "firebase/auth";
import { auth } from "../../config/firebase";

type User = {
    uid: string;
    email: string | null;
    displayName: string | null;
};

type AuthContextType = {
    user: User | null;
    googleSignIn: () => void;
    googleSignUp: () => void;
    emailSignIn: (email: string, password: string) => Promise<void>;
    emailSignUp: (email: string, password: string) => Promise<void>;
    logOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    googleSignIn: () => { },
    googleSignUp: async () => { },
    emailSignIn: async (email: string, password: string) => { },
    emailSignUp: async (email: string, password: string) => { },
    logOut: () => { },
});

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const googleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential: UserCredential = await signInWithPopup(auth, provider);
            setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
            });
        } catch (error) {
            console.error("Error signing up with Google:", error);
            throw error;
        }
    };

    const emailSignIn = async (email: string, password: string) => {
        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
            });
        } catch (error) {
            console.error("Error signing in with email and password:", error);
            throw error;
        }
    };

    const emailSignUp = async (email: string, password: string) => {
        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
            });
        } catch (error) {
            console.error("Error signing up with email and password:", error);
            throw error;
        }
    };

    const logOut = () => {
        signOut(auth);
    };

    const googleSignUp = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential: UserCredential = await signInWithPopup(auth, provider);
            setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
            });
        } catch (error) {
            console.error("Error signing up with Google:", error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, emailSignIn, emailSignUp, googleSignUp, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};