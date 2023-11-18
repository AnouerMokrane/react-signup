import { createContext, useContext, useState } from "react";

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
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
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
