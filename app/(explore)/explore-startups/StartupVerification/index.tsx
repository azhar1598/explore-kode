import React, { useEffect, useState } from "react";

import { PlusCircle, Building } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

import { Button } from "@mantine/core";
import CreateStartup from "../CreateStartup";
import { useRouter } from "next/navigation";

const StartupVerification = ({ onClose }) => {
  const [hasStartup, setHasStartup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkStartup = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        // Check if user has a startup in the database
        // const { data: startup, error } = await supabase
        //   .from('startups')
        //   .select('id')
        //   .eq('user_id', user.id)
        //   .single();

        // if (error && error.code !== 'PGRST116') {
        //   console.error('Error checking startup:', error);
        // }

        // setHasStartup(!!startup);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in startup verification:", error);
        setIsLoading(false);
      }
    };

    checkStartup();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (!hasStartup) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 md:px-4 overflow-hidden">
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-purple-500/20">
          <Building className="h-16 w-16 text-purple-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Startup Not Listed
          </h2>
          <p className="text-gray-400 text-center mb-6 max-w-md">
            You need to list your startup before building your team. <br />
            Don't worry, it's quick and easy!
          </p>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            List My Startup
          </Button>

          {showCreateModal && (
            <CreateStartup
              onClose={() => setShowCreateModal(false)}
              // onSuccess={() => {
              //   setHasStartup(true);
              //   setShowCreateModal(false);
              // }}
            />
          )}
        </div>
      </div>
    );
  }

  // If user has a startup, render the team building interface
  return (
    <div className="p-6">{/* Your existing team building interface */}</div>
  );
};

export default StartupVerification;
