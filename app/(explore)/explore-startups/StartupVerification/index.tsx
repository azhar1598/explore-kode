import React, { useEffect, useState } from "react";

import { PlusCircle, Building, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

import { Button } from "@mantine/core";
import CreateStartup from "../CreateStartup";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/lib/providers/User/UserProvider";
import GoogleSignIn from "@/components/GoogleSignIn";
import BuildTeam from "../BuildTeam";

const StartupVerification = ({ onClose, showCreateForm, user }) => {
  const [hasStartup, setHasStartup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();
  // const user = useUser();
  //   useEffect(() => {
  //     if (!user) return;
  //     if (user?.startupExists) setShowCreateModal(true);
  //   }, [user]);

  // console.log("user---->", user, !user?.startupExists, !showCreateModal);

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 md:px-4 overflow-hidden">
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors duration-300"
        >
          <X className="absolute top-10 right-10 h-6 w-6 text-gray-400" />
        </button>
        <div className="md:w-72 flex flex-col">
          <p className="text-sm text-gray-400 mb-2">
            Please sign in to create project
          </p>
          <GoogleSignIn />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (!user?.startupExists && !showCreateModal) {
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
        </div>
      </div>
    );
  }

  if (user?.startupExists) {
    return (
      <BuildTeam
        onClose={onClose}
        // onSuccess={() => {
        //   setHasStartup(true);
        //   setShowCreateModal(false);
        // }}
      />
    );
  }

  //   {
  // (showCreateModal || user?.startupExists) && (
  return (
    <>
      <CreateStartup
        onClose={onClose}
        // onSuccess={() => {
        //   setHasStartup(true);
        //   setShowCreateModal(false);
        // }}
      />
    </>
  );
  // );
  //   }
};

export default StartupVerification;
