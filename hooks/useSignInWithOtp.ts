import { useSupabase } from "./useSupabase";

export const useSignInWithOtp = () => {
  const { isLoaded, supabase } = useSupabase();

  async function signInWithOtp({ email }: { email: string }) {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    if (error) throw error;
  }

  async function verifyOtp({ email, token }: { email: string; token: string }) {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) throw error;
  }

  return {
    isLoaded,
    signInWithOtp,
    verifyOtp,
  };
};
