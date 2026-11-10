import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export function useAdminAccess() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const requestRef = useRef(0);

  const reload = useCallback(async () => {
    const request = ++requestRef.current;
    setIsLoading(true);

    const { data: { user: verifiedUser }, error } = await supabase.auth.getUser();
    if (request !== requestRef.current) return;

    if (error || !verifiedUser) {
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    const [roleResult, profileResult] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", verifiedUser.id).eq("role", "admin").maybeSingle(),
      supabase.from("profiles").select("*").eq("id", verifiedUser.id).maybeSingle(),
    ]);
    if (request !== requestRef.current) return;

    setUser(verifiedUser);
    setIsAdmin(Boolean(roleResult.data));
    setProfile(profileResult.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void reload();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      setTimeout(() => void reload(), 0);
    });

    return () => subscription.unsubscribe();
  }, [reload]);

  return { user, profile, setProfile, isAdmin, isLoading, reload };
}
