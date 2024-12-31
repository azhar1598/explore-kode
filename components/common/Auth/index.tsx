import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";
import { callApi } from "@/services/apiService";
import { usePathname } from "next/navigation";

const supabase = createClient();

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuth(props: P) {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const hasFetchedUser = useRef(false); // <-- Track if fetchUser has run

    const checkStartupExists = async (userId: string) => {
      try {
        const response = await callApi.get(`/startup`);
        let exists = false;
        if (response.data?.data?.length > 0) {
          exists = true;
          return { exists, startupId: response.data?.data[0].id };
        }
        return false;
      } catch (error) {
        console.error("Error checking startup:", error);
        return false;
      }
    };

    useEffect(() => {
      if (hasFetchedUser.current) return; // <-- Prevent running twice
      hasFetchedUser.current = true;

      const fetchUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (pathname !== "/explore-startups") {
          setUser(user);
        }

        if (user) {
          const startupExists = await checkStartupExists(user?.id);
          setUser({ ...user, startupExists });
        }
        setIsLoading(false);
      };

      fetchUser();
    }, [pathname]); // Add pathname as a dependency if it's needed

    console.log("checkStartupExists", user);

    if (isLoading)
      return (
        <div className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center p-4 w-[100vw]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 animsate-pulse" />
          <div className="relsative flex flex-col items-center justify-center gap-2">
            <Loader2 className="h-16 w-16 animate-spin text-primary text-white" />
          </div>
        </div>
      );

    return <WrappedComponent {...props} user={user} />;
  };
}
