import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import React, { createContext, useState, useEffect, useContext } from "react";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<UserContextType>({
    user: null,
    isLoading: true,
    error: null,
  });

  const supabase = createClient();

  useEffect(() => {
    // Listen for authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setState({
          user: session.user,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          isLoading: false,
          error: null,
        });
      }
    });

    // Initial session check
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        setState({
          user: session?.user ?? null,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          user: null,
          isLoading: false,
          error:
            error instanceof Error ? error : new Error("Authentication failed"),
        });
      }
    };

    initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Example usage:
// const { user, isLoading, error } = useUser();
