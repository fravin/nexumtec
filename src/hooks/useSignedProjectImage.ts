import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { isExternalImage } from "@/lib/websiteProjects";

export function useSignedProjectImage(path?: string | null) {
  const [url, setUrl] = useState(isExternalImage(path) ? path ?? "" : "");

  useEffect(() => {
    let active = true;

    if (!path) {
      setUrl("");
      return () => { active = false; };
    }
    if (isExternalImage(path)) {
      setUrl(path);
      return () => { active = false; };
    }

    void supabase.storage.from("website-project-images").createSignedUrl(path, 3600).then(({ data, error }) => {
      if (active) setUrl(error ? "" : data.signedUrl);
    });

    return () => { active = false; };
  }, [path]);

  return url;
}
