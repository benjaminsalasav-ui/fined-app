-- ============================================================================
-- FinEd · Configuración SQL de Supabase
-- ----------------------------------------------------------------------------
-- Cómo usarlo:
--   1. Entra a tu proyecto en https://supabase.com
--   2. Menú izquierdo → "SQL Editor" → "New query"
--   3. Pega TODO este archivo y presiona "Run".
-- Esto crea la función que permite a cada usuario eliminar su propia cuenta
-- (derecho de supresión / "Eliminar mi cuenta" dentro de la app).
-- ============================================================================

create or replace function public.delete_user()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Borra al usuario autenticado actual; auth.users elimina en cascada sus datos.
  delete from auth.users where id = auth.uid();
end;
$$;

-- Solo usuarios con sesión iniciada pueden ejecutarla (y solo se borran a sí mismos).
revoke all on function public.delete_user() from public, anon;
grant execute on function public.delete_user() to authenticated;
