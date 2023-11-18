import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import GlobalLoading from "../components/GlobalLoading";

type AuthProviderType = {
  children: React.ReactNode;
};

type AuthUser = {
  userId: string;
  name: string;
};

type UserContextType = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

export const authContext = createContext({} as UserContextType);

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  const checkUserStatus = async () => {
    setIsLoading(true);
    try {
      const accountDetails = await account.get();
      setUser({
        userId: accountDetails.$id,
        name: accountDetails.name,
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    checkUserStatus();
  }, []);
  return (
    <authContext.Provider value={{ user, setUser }}>
      {isLoading ? <GlobalLoading /> : children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const userContext = useContext(authContext);
  if (!userContext) {
    throw console.error("your component should be inside provider");
  }
  return userContext;
};
