// import { User } from "@supabase/supabase-js";
// import { createClient } from "@/utils/supabase/client";
// import React, { createContext, useState, useEffect, useContext } from "react";
// import callApi from "@/services/apiService";
// import { Loader2 } from "lucide-react"; // Import loading icon

// // Loading component
// const LoadingScreen = () => (
//   <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
//     <div className="flex flex-col items-center gap-2">
//       <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       <p className="text-sm text-muted-foreground">Loading user data...</p>
//     </div>
//   </div>
// );

// interface ExtendedUser extends User {
//   startupExists: boolean;
// }

// interface UserContextType {
//   user: ExtendedUser | null;
//   isLoading: boolean;
//   error: Error | null;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [state, setState] = useState<UserContextType>({
//     user: null,
//     isLoading: true,
//     error: null,
//   });

//   const supabase = createClient();

//   const checkStartupExists = async (userId: string) => {
//     try {
//       const response = await callApi.get(`/startup`);
//       return response.data?.data?.length > 0 ? true : false;
//     } catch (error) {
//       console.error("Error checking startup:", error);
//       return false;
//     }
//   };

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (session?.user) {
//         const startupExists = await checkStartupExists(session.user.id);
//         setState({
//           user: { ...session.user, startupExists },
//           isLoading: false,
//           error: null,
//         });
//       } else {
//         setState({
//           user: null,
//           isLoading: false,
//           error: null,
//         });
//       }
//     });

//     const initializeAuth = async () => {
//       try {
//         const {
//           data: { session },
//           error: authError,
//         } = await supabase.auth.getSession();

//         if (authError) throw authError;

//         if (session?.user) {
//           const startupExists = await checkStartupExists(session.user.id);
//           setState({
//             user: { ...session.user, startupExists },
//             isLoading: false,
//             error: null,
//           });
//         } else {
//           setState({
//             user: null,
//             isLoading: false,
//             error: null,
//           });
//         }
//       } catch (error) {
//         setState({
//           user: null,
//           isLoading: false,
//           error:
//             error instanceof Error ? error : new Error("Authentication failed"),
//         });
//       }
//     };

//     initializeAuth();

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   console.log("state----->", state);

//   return (
//     <UserContext.Provider value={state}>
//       {/* {state.isLoading ? <LoadingScreen /> : children} */}
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };

// import callApi from "@/services/apiService";
import { callApi } from "@/services/apiService";
import { createClient } from "@/utils/supabase/client";
import React, { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext(null);
const supabase = createClient();

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // const [state, setState] = useState<any>(null);
  const [state, setState] = useState({
    user: {},
    isLoading: true,
    startupExists: {},
  });
  // const [loading, setLoading] = useState(true);

  const checkStartupExists = async (userId: string) => {
    try {
      const response = await callApi.get(`/startup`);
      return response.data?.data?.length > 0 ? true : false;
    } catch (error) {
      console.error("Error checking startup:", error);
      return false;
    }
  };

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      setState(JSON.parse(cachedUser));
    } else {
      const fetchUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setState({ isLoading: false });
        if (user) {
          const startupExists = await checkStartupExists(user?.id);
          setState({ ...user, startupExists });
          let cachedUser = { ...user, startupExists, isLoading: false };
          localStorage.setItem("user", JSON.stringify(cachedUser));
        }
      };
      fetchUser();
    }
  }, []);

  console.log("state---->", state);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

// Custom hook to easily access user context data
export const useUser = () => useContext(UserContext);
