-- Enlève l’accès au schéma public à tout le monde (via PUBLIC)
REVOKE ALL ON SCHEMA public FROM PUBLIC;
-- Enlève les droits sur la DB à tout le monde aussi (optionnel mais prudent)
REVOKE ALL ON DATABASE postgres FROM PUBLIC;
-- Créé le rôle app_backend (user)
CREATE ROLE “app_backend” WITH LOGIN PASSWORD ‘testUser’;

GRANT CONNECT ON DATABASE postgres TO “app_backend”;

GRANT USAGE ON SCHEMA public TO app_backend;

GRANT CREATE ON SCHEMA public TO “app_backend”;
-- Donner droits sur tables existantes
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO “app_backend”;
-- Donne les droits à l’utilisateur app_backend sur tous les objets de la base de données futurs
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO “app_backend”;
-- Créer le rôle admin avec pouvoir de création de rôle et base
CREATE ROLE “app_admin” WITH LOGIN CREATEDB CREATEROLE PASSWORD ‘chpaTEST’;
-- Donner la propriété de la DB app_admin
ALTER DATABASE “postgres” OWNER TO “app_admin”;
-- Donner accès au schéma public à l’admin
GRANT USAGE ON SCHEMA public TO “app_admin”;