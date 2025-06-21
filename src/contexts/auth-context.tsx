import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '@/config/firebase';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<User>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<User>;
  createUserWithEmailAndPassword: (email: string, password: string, displayName: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => { throw new Error('Not implemented'); },
  signInWithEmailAndPassword: async () => { throw new Error('Not implemented'); },
  createUserWithEmailAndPassword: async () => { throw new Error('Not implemented'); },
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Current user:", user);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign-in successful:", result.user);
      // Update user state immediately
      setUser(result.user);
      toast.success('Đăng nhập bằng Google thành công!');
      return result.user;
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      let errorMessage = 'Đăng nhập bằng Google thất bại. Vui lòng thử lại.';
      
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'Email này đã được sử dụng với phương thức đăng nhập khác.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'Đăng nhập bị hủy. Vui lòng thử lại.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Đăng nhập bị hủy. Vui lòng thử lại.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup đăng nhập bị chặn. Vui lòng cho phép popup và thử lại.';
          break;
      }
      
      toast.error(errorMessage);
      throw error;
    }
  };

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in with email and password:', error);
      throw error;
    }
  };

  const createUserWithEmailAndPassword = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
      // Cập nhật display name
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
      return userCredential.user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Đăng xuất thành công!');
      // Clear any stored user data or tokens if needed
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Đăng xuất thất bại. Vui lòng thử lại.');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signInWithGoogle, 
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};