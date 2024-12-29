"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import callApi from "@/services/apiService";

export default function GoogleSignIn({ category }: any) {
  const supabase = createClient();

  const searchParams = useSearchParams();

  const next = searchParams.get("next");

  const loginMutation = useMutation({
    mutationFn: async () =>
      supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/business?category=${category}`,
        },
      }),

    onSuccess: async (res) => {
      const { data } = res;

      console.log("data", data);
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  return (
    <button
      type="button"
      className={`
        w-full py-3 rounded-lg flex items-center justify-center
        transition-all duration-300 mt-4
         bg-blue-600 text-white hover:bg-blue-700
      `}
      //   variant="outline"
      onClick={() => {
        loginMutation.mutate();
      }}
      disabled={loginMutation.isPending}
    >
      {loginMutation.isPending ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2"
        />
      )}{" "}
      Sign in with Google
    </button>
  );
}
