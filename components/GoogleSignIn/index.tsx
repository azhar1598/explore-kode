"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function GoogleSignIn({ category }: string) {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  const searchParams = useSearchParams();

  const next = searchParams.get("next");

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/business?category=${category}`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      //   toast({
      //     title: "Please try again.",
      //     description: "There was an error logging in with Google.",
      //     variant: "destructive",
      //   });
      setIsGoogleLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={`
        w-full py-3 rounded-lg flex items-center justify-center
        transition-all duration-300 mt-4
         bg-blue-600 text-white hover:bg-blue-700
            cursor-not-allowed

      `}
      //   variant="outline"
      onClick={signInWithGoogle}
      disabled={isGoogleLoading}
    >
      {isGoogleLoading ? (
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
