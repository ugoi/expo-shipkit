import { useContext, useEffect, useState } from "react";

import { SupabaseClient, Session } from "@supabase/supabase-js";

import { SupabaseContext } from "@/context/supabase-context";

interface UseSupabaseProps {
  isLoaded: boolean;
  session: Session | null | undefined;
  supabase: SupabaseClient;
  signOut: () => Promise<void>;
}

export const useSupabase = (): UseSupabaseProps => {
  const supabase = useContext(SupabaseContext);

  if (!supabase) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoaded(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return { isLoaded, session, supabase, signOut };
};
