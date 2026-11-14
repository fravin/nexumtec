CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  topic text NOT NULL DEFAULT 'tecnologia',
  kind text NOT NULL DEFAULT 'autoral',
  status text NOT NULL DEFAULT 'draft',
  cover_path text,
  sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  source_key text UNIQUE,
  instagram_caption text,
  published_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are public" ON public.blog_posts FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.blog_job_state (
  id text PRIMARY KEY,
  locked_until timestamptz,
  paused_reason text,
  last_run_at timestamptz,
  last_error text
);
GRANT SELECT ON public.blog_job_state TO authenticated;
GRANT ALL ON public.blog_job_state TO service_role;
ALTER TABLE public.blog_job_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view job state" ON public.blog_job_state FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
INSERT INTO public.blog_job_state (id) VALUES ('generate-blog-drafts');