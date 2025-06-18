import {
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    NextFn,
  } from "firebase/auth";
  import { User } from "next-auth";
  import { useEnvContext } from "next-runtime-env";
  import { FirebaseConfigType, getFireBaseConfig } from "./firbase";
  
  export const GoogleResponse = () => {
    const {
      NEXT_PUBLIC_APIKEY,
      NEXT_PUBLIC_AUTHDOMAIN,
      NEXT_PUBLIC_PROJECT_ID,
      NEXT_PUBLIC_STORAGE_BUCKET,
      NEXT_PUBLIC_MESSAGING_SENDER_ID,
      NEXT_PUBLIC_APP_ID,
      NEXT_PUBLIC_MEASUREMENT_ID,
    } = useEnvContext();
  
    const firebaseConfig: FirebaseConfigType = {
      apiKey: NEXT_PUBLIC_APIKEY!,
      authDomain: NEXT_PUBLIC_AUTHDOMAIN!,
      projectId: NEXT_PUBLIC_PROJECT_ID!,
      storageBucket: NEXT_PUBLIC_STORAGE_BUCKET!,
      messagingSenderId: NEXT_PUBLIC_MESSAGING_SENDER_ID!,
      appId: NEXT_PUBLIC_APP_ID!,
      measurementId: NEXT_PUBLIC_MEASUREMENT_ID!,
    };
  
    const { auth, provider } = getFireBaseConfig(firebaseConfig);
  
    const onAuthStateChanged = (cb: NextFn<User | null>) => {
      return _onAuthStateChanged(auth, cb);
    };
  
    const logout = async () => {
      await auth.signOut();
    };
  
    const getSignInWithPopup = async (): Promise<any> => {
      const res: any = await signInWithPopup(auth, provider);
      const rawUserInfo = JSON.parse(res._tokenResponse.rawUserInfo);
      const userData: any = {
        email: res._tokenResponse?.email,
        name: rawUserInfo.firstname + " " + rawUserInfo.lastname,
        photoURL: res.user?.photoURL,
      };
      return userData;
    };
  
    const getSignUpUsingEmailPassword = async (
      email: string,
      password: string
    ): Promise<any> => {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        return {
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
  
    const getSignInUsingEmailPassword = async (
      email: string,
      password: string
    ): Promise<any> => {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        return {
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
  
    const sendForgotPasswordEmail = async (email: string): Promise<void> => {
      try {
        await sendPasswordResetEmail(auth, email);
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
  
    return {
      getSignInWithPopup,
      getSignUpUsingEmailPassword,
      getSignInUsingEmailPassword,
      logout,
      onAuthStateChanged,
      sendForgotPasswordEmail,
    };
  };
  