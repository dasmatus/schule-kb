--
-- PostgreSQL database dump
--

\restrict Q3d27ldRBPtCA5IciWxgZBHynQOzjP8aAetwau2ExAJMRSLijeVlMR0nGrgkU3w

-- Dumped from database version 17.10 (6a49db4)
-- Dumped by pg_dump version 18.4 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pg_session_jwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_session_jwt WITH SCHEMA public;


--
-- Name: EXTENSION pg_session_jwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_session_jwt IS 'pg_session_jwt: manage authentication sessions using JWTs';


--
-- Name: neon_auth; Type: SCHEMA; Schema: -; Owner: neon_auth
--

CREATE SCHEMA neon_auth;


ALTER SCHEMA neon_auth OWNER TO neon_auth;

--
-- Name: pgrst; Type: SCHEMA; Schema: -; Owner: neon_service
--

CREATE SCHEMA pgrst;


ALTER SCHEMA pgrst OWNER TO neon_service;

--
-- Name: pre_config(); Type: FUNCTION; Schema: pgrst; Owner: neon_service
--

CREATE FUNCTION pgrst.pre_config() RETURNS void
    LANGUAGE sql
    SET search_path TO ''
    AS $$
  SELECT
      set_config('pgrst.db_schemas', 'public', true)
    , set_config('pgrst.db_aggregates_enabled', 'true', true)
    , set_config('pgrst.db_anon_role', 'anonymous', true)
    , set_config('pgrst.jwt_role_claim_key', '.role', true)
$$;


ALTER FUNCTION pgrst.pre_config() OWNER TO neon_service;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: neon_auth; Owner: neon_auth
--

CREATE TABLE neon_auth.account (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "accountId" text NOT NULL,
    "providerId" text NOT NULL,
    "userId" uuid NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "idToken" text,
    "accessTokenExpiresAt" timestamp with time zone,
    "refreshTokenExpiresAt" timestamp with time zone,
    scope text,
    password text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE neon_auth.account OWNER TO neon_auth;

--
-- Name: invitation; Type: TABLE; Schema: neon_auth; Owner: neon_auth
--

CREATE TABLE neon_auth.invitation (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "organizationId" uuid NOT NULL,
    email text NOT NULL,
    role text,
    status text NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "inviterId" uuid NOT NULL
);


ALTER TABLE neon_auth.invitation OWNER TO neon_auth;

--
-- Name: jwks; Type: TABLE; Schema: neon_auth; Owner: neon_auth
--

CREATE TABLE neon_auth.jwks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "publicKey" text NOT NULL,
    "privateKey" text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "expiresAt" timestamp with time zone
);


ALTER TABLE neon_auth.jwks OWNER TO neon_auth;

--
-- Name: member; Type: TABLE; Schema: neon_auth; Owner: neon_auth
--

CREATE TABLE neon_auth.member (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "organizationId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    role text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL
);


ALTER TABLE neon_auth.member OWNER TO neon_auth;

--
-- Name: organization; Type: TABLE; Schema: neon_auth; Owner: neon_auth
--

CREATE TABLE neon_auth.organization (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    logo text,
    "createdAt" timestamp with time zone NOT NULL,
    metadata text
);


ALTER TABLE neon_auth.organization OWNER TO neon_auth;

--
-- Name: project_config; Type: TABLE; Schema: neon_auth; Owner: neon_auth
--

CREATE TABLE neon_auth.project_config (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    endpoint_id text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    trusted_origins jsonb NOT NULL,
    social_providers jsonb NOT NULL,
    email_provider jsonb,
    email_and_password jsonb,
    allow_localhost boolean NOT NULL,
    plugin_configs jsonb,
    webhook_config jsonb
);


ALTER TABLE neon_auth.project_config OWNER TO neon_auth;

--
-- Name: session; Type: TABLE; Schema: neon_auth; Owner: neon_auth
--

CREATE TABLE neon_auth.session (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "userId" uuid NOT NULL,
    "impersonatedBy" text,
    "activeOrganizationId" text
);


ALTER TABLE neon_auth.session OWNER TO neon_auth;

--
-- Name: user; Type: TABLE; Schema: neon_auth; Owner: neon_auth
--

CREATE TABLE neon_auth."user" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "emailVerified" boolean NOT NULL,
    image text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role text,
    banned boolean,
    "banReason" text,
    "banExpires" timestamp with time zone
);


ALTER TABLE neon_auth."user" OWNER TO neon_auth;

--
-- Name: verification; Type: TABLE; Schema: neon_auth; Owner: neon_auth
--

CREATE TABLE neon_auth.verification (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE neon_auth.verification OWNER TO neon_auth;

--
-- Name: article_revisions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.article_revisions (
    id bigint NOT NULL,
    article_id bigint NOT NULL,
    editor_id bigint,
    summary text,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.article_revisions OWNER TO neondb_owner;

--
-- Name: article_revisions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.article_revisions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.article_revisions_id_seq OWNER TO neondb_owner;

--
-- Name: article_revisions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.article_revisions_id_seq OWNED BY public.article_revisions.id;


--
-- Name: articles; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.articles (
    id bigint NOT NULL,
    slug character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    status character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    category_id bigint,
    author_id bigint,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.articles OWNER TO neondb_owner;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.articles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.articles_id_seq OWNER TO neondb_owner;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: cache; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO neondb_owner;

--
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO neondb_owner;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.categories OWNER TO neondb_owner;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO neondb_owner;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO neondb_owner;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO neondb_owner;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: job_batches; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE public.job_batches OWNER TO neondb_owner;

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO neondb_owner;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO neondb_owner;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO neondb_owner;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO neondb_owner;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_reset_tokens OWNER TO neondb_owner;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO neondb_owner;

--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.site_settings (
    key character varying(255) NOT NULL,
    value text
);


ALTER TABLE public.site_settings OWNER TO neondb_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255),
    is_admin boolean DEFAULT false NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: article_revisions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.article_revisions ALTER COLUMN id SET DEFAULT nextval('public.article_revisions_id_seq'::regclass);


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: neon_auth; Owner: neon_auth
--

COPY neon_auth.account (id, "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", scope, password, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: invitation; Type: TABLE DATA; Schema: neon_auth; Owner: neon_auth
--

COPY neon_auth.invitation (id, "organizationId", email, role, status, "expiresAt", "createdAt", "inviterId") FROM stdin;
\.


--
-- Data for Name: jwks; Type: TABLE DATA; Schema: neon_auth; Owner: neon_auth
--

COPY neon_auth.jwks (id, "publicKey", "privateKey", "createdAt", "expiresAt") FROM stdin;
\.


--
-- Data for Name: member; Type: TABLE DATA; Schema: neon_auth; Owner: neon_auth
--

COPY neon_auth.member (id, "organizationId", "userId", role, "createdAt") FROM stdin;
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: neon_auth; Owner: neon_auth
--

COPY neon_auth.organization (id, name, slug, logo, "createdAt", metadata) FROM stdin;
\.


--
-- Data for Name: project_config; Type: TABLE DATA; Schema: neon_auth; Owner: neon_auth
--

COPY neon_auth.project_config (id, name, endpoint_id, created_at, updated_at, trusted_origins, social_providers, email_provider, email_and_password, allow_localhost, plugin_configs, webhook_config) FROM stdin;
35ffec17-d6cb-4235-b6f1-f2ff76fc6ffd	projeky	ep-round-bonus-alib6qsn	2026-03-11 17:04:03.994+00	2026-03-11 17:04:03.994+00	[]	[{"id": "google", "isShared": true}]	{"type": "shared"}	{"enabled": true, "disableSignUp": false, "emailVerificationMethod": "otp", "requireEmailVerification": false, "autoSignInAfterVerification": true, "sendVerificationEmailOnSignIn": false, "sendVerificationEmailOnSignUp": false}	t	{"organization": {"config": {"creatorRole": "owner", "membershipLimit": 100, "organizationLimit": 10, "sendInvitationEmail": false}, "enabled": true}}	{"enabled": false, "enabledEvents": [], "timeoutSeconds": 5}
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: neon_auth; Owner: neon_auth
--

COPY neon_auth.session (id, "expiresAt", token, "createdAt", "updatedAt", "ipAddress", "userAgent", "userId", "impersonatedBy", "activeOrganizationId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: neon_auth; Owner: neon_auth
--

COPY neon_auth."user" (id, name, email, "emailVerified", image, "createdAt", "updatedAt", role, banned, "banReason", "banExpires") FROM stdin;
\.


--
-- Data for Name: verification; Type: TABLE DATA; Schema: neon_auth; Owner: neon_auth
--

COPY neon_auth.verification (id, identifier, value, "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: article_revisions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.article_revisions (id, article_id, editor_id, summary, created_at) FROM stdin;
1	1	1	Erste Version des Artikels	2026-04-11 09:22:32
2	2	1	Erste Version des Artikels	2026-04-11 09:22:32
3	3	2	Erste Version des Artikels	2026-04-11 09:22:32
4	4	1	Erste Version des Artikels	2026-04-11 09:22:32
5	5	2	Erste Version des Artikels	2026-04-11 09:22:32
6	6	1	Erste Version des Artikels	2026-04-11 09:22:33
7	7	3	Initial creation	2026-04-12 08:01:44
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.articles (id, slug, title, content, status, views, featured, category_id, author_id, created_at, updated_at) FROM stdin;
3	datenstrukturen-arrays-listen	Datenstrukturen: Arrays und Listen	# Datenstrukturen: Arrays und Listen\n\nDatenstrukturen sind fundamentale Bausteine in der Informatik, die festlegen, wie Daten organisiert und gespeichert werden.\n\n## Arrays\n\nEin Array ist eine Sammlung von Elementen, die unter einem einzigen Variablennamen gespeichert sind. Jedes Element kann über einen Index angesprochen werden.\n\n### Eigenschaften\n\n- Feste Größe (in den meisten Sprachen)\n- Schneller Zugriff über Index: O(1)\n- Homogene Datentypen\n\n## Linked Lists\n\nEine Linked List ist eine lineare Datenstruktur, bei der jedes Element (Knoten) einen Verweis auf das nächste Element enthält.\n\n### Vorteile gegenüber Arrays\n\n- Dynamische Größe\n- Effizientes Einfügen und Löschen: O(1)\n- Kein zusammenhängender Speicher nötig\n\n### Nachteile\n\n- Langsamer Zugriff: O(n)\n- Höherer Speicherbedarf durch Zeiger\n\n## Wann welche Struktur verwenden?\n\n| Verwendung | Empfohlene Struktur |\n|------------|-------------------|\n| Häufiger Indexzugriff | Array |\n| Häufiges Einfügen/Löschen | Linked List |\n| Unbekannte Größe | Linked List |	published	0	f	3	2	2026-04-11 09:22:32	2026-04-11 09:22:32
5	zellatmung	Zellatmung: Energiegewinnung in Zellen	# Zellatmung: Energiegewinnung in Zellen\n\nDie Zellatmung ist der Prozess, bei dem Zellen Nährstoffe in Energie (ATP) umwandeln.\n\n## Gesamtgleichung\n\nC₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energie (ATP)\n\n## Die drei Hauptphasen\n\n### 1. Glykolyse\n\n- Ort: Cytoplasma\n- Glukose wird zu zwei Pyruvat-Molekülen abgebaut\n- Netto: 2 ATP + 2 NADH\n\n### 2. Citratzyklus (Krebs-Zyklus)\n\n- Ort: Mitochondrienmatrix\n- Pyruvat wird zu CO₂ abgebaut\n- Pro Pyruvat: 3 NADH + 1 FADH₂ + 1 ATP\n\n### 3. Elektronentransportkette\n\n- Ort: Innere Mitochondrienmembran\n- NADH und FADH₂ geben Elektronen ab\n- Sauerstoff ist der finale Elektronenakzeptor\n- Ca. 32-34 ATP werden produziert\n\n## Bedeutung\n\nDie Zellatmung ist essentiell für das Überleben aller aeroben Organismen und liefert die Energie für zelluläre Prozesse.	published	0	f	5	2	2026-04-11 09:22:32	2026-04-11 09:22:32
2	newtons-gesetze	Newtons Gesetze der Bewegung	# Newtons Gesetze der Bewegung\n\nIsaac Newton formulierte im 17. Jahrhundert drei fundamentale Gesetze der klassischen Mechanik.\n\n## Erstes Gesetz: Trägheitsprinzip\n\nEin Körper bleibt in Ruhe oder bewegt sich mit konstanter Geschwindigkeit weiter, sofern keine äußere Kraft auf ihn wirkt.\n\n## Zweites Gesetz: Kraft = Masse × Beschleunigung\n\nDie Beschleunigung eines Körpers ist proportional zur wirkenden Kraft und umgekehrt proportional zur Masse des Körpers.\n\n**Formel:** F = m × a\n\n## Drittes Gesetz: Actio = Reactio\n\nKräfte treten immer paarweise auf. Übt Körper A eine Kraft auf Körper B aus, so übt Körper B eine gleich große, aber entgegengesetzte Kraft auf Körper A aus.\n\n## Bedeutung\n\nDiese Gesetze bilden die Grundlage der klassischen Mechanik und sind bis heute gültig für die meisten alltäglichen physikalischen Berechnungen.	published	1	t	2	1	2026-04-11 09:22:32	2026-04-11 10:04:47
1	einfuehrung-lineare-algebra	Einführung in die lineare Algebra	# Einführung in die lineare Algebra\n\nDie lineare Algebra ist ein fundamentales Gebiet der Mathematik, das sich mit Vektorräumen und linearen Abbildungen beschäftigt.\n\n## Vektoren\n\nEin Vektor ist ein mathematisches Objekt, das sowohl eine Richtung als auch eine magnitude (Länge) hat. Vektoren werden oft als Pfeile im Raum dargestellt.\n\n### Beispiel\n\nEin Vektor im zweidimensionalen Raum kann als `(x, y)` geschrieben werden, zum Beispiel `(3, 4)`.\n\n## Matrizen\n\nEine Matrix ist eine rechteckige Anordnung von Zahlen. Matrizen werden verwendet, um lineare Transformationen darzustellen.\n\n### Matrixmultiplikation\n\nDie Multiplikation zweier Matrizen A und B ist nur möglich, wenn die Spaltenzahl von A gleich der Zeilenzahl von B ist.\n\n## Anwendungen\n\nLineare Algebra wird in vielen Bereichen angewendet:\n\n- Computergrafiken\n- Maschinenlernen\n- Physik-Simulationen\n- Kryptographie\n\n## Zusammenfassung\n\nDie lineare Algebra bildet die Grundlage für viele moderne Technologien und ist ein essentielles Werkzeug für jeden Mathematikstudenten.	published	1	t	1	1	2026-04-11 09:22:32	2026-04-11 10:26:37
7	losos	LosOS	LosOS is an Linux operating system developed by [Matus Mastena](https://gitlab.com/TenTypekMatus). With the exception of kernel itself, it is written entirely in Rust.	draft	3	f	3	3	2026-04-12 08:01:44	2026-06-03 09:00:06
4	periodensystem	Das Periodensystem der Elemente	# Das Periodensystem der Elemente\n\nDas Periodensystem ist eine tabellarische Anordnung der chemischen Elemente, geordnet nach ihrer Ordnungszahl.\n\n## Aufbau\n\nDas Periodensystem besteht aus:\n\n- **Perioden**: Horizontale Reihen (1-7)\n- **Gruppen**: Vertikale Spalten (1-18)\n\n## Wichtige Elementgruppen\n\n### Alkalimetalle (Gruppe 1)\n\nSehr reaktive Metalle wie Lithium, Natrium und Kalium.\n\n### Halogene (Gruppe 17)\n\nReaktive Nichtmetalle wie Fluor, Chlor und Brom.\n\n### Edelgase (Gruppe 18)\n\nSehr reaktionsträge Gase wie Helium, Neon und Argon.\n\n## Periodische Trends\n\n- **Atomradius**: Nimmt von oben nach unten zu, von links nach rechts ab\n- **Elektronegativität**: Nimmt von links nach rechts zu\n- **Ionisierungsenergie**: Nimmt von links nach rechts zu\n\n## Bedeutung\n\nDas Periodensystem ermöglicht Vorhersagen über das Verhalten von Elementen und ist ein fundamentales Werkzeug der Chemie.	published	1	t	4	1	2026-04-11 09:22:32	2026-04-15 08:45:58
6	quantenmechanik-anfaenger	Quantenmechanik für Anfänger	# Quantenmechanik für Anfänger\n\nDie Quantenmechanik beschreibt das Verhalten von Materie und Energie auf atomarer und subatomarer Ebene.\n\n## Grundkonzepte\n\n### Welle-Teilchen-Dualismus\n\nLicht und Materie können sowohl Wellen- als auch Teilcheneigenschaften zeigen.\n\n### Heisenbergsche Unschärferelation\n\nMan kann nicht gleichzeitig den Ort und den Impuls eines Teilchens beliebig genau messen.\n\n### Superposition\n\nEin Quantensystem kann sich in mehreren Zuständen gleichzeitig befinden, bis es gemessen wird.\n\n## Berühmte Gedankenexperimente\n\n### Schrödingers Katze\n\nEine Katze in einer verschlossenen Kiste ist gleichzeitig lebendig und tot, bis jemand nachsieht.\n\n## Anwendungen\n\n- Laser\n- Transistoren\n- Quantencomputer\n- MRI-Scanner\n\nDie Quantenmechanik ist eine der erfolgreichsten Theorien der Physik und hat unsere technologische Welt grundlegend verändert.	published	2	t	2	1	2026-04-11 09:22:32	2026-06-03 09:00:57
\.


--
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.cache (key, value, expiration) FROM stdin;
laravel-cache-boost.roster.scan	YToyOntzOjY6InJvc3RlciI7TzoyMToiTGFyYXZlbFxSb3N0ZXJcUm9zdGVyIjozOntzOjEzOiIAKgBhcHByb2FjaGVzIjtPOjI5OiJJbGx1bWluYXRlXFN1cHBvcnRcQ29sbGVjdGlvbiI6Mjp7czo4OiIAKgBpdGVtcyI7YTowOnt9czoyODoiACoAZXNjYXBlV2hlbkNhc3RpbmdUb1N0cmluZyI7YjowO31zOjExOiIAKgBwYWNrYWdlcyI7TzozMjoiTGFyYXZlbFxSb3N0ZXJcUGFja2FnZUNvbGxlY3Rpb24iOjI6e3M6ODoiACoAaXRlbXMiO2E6MTI6e2k6MDtPOjIyOiJMYXJhdmVsXFJvc3RlclxQYWNrYWdlIjo4OntzOjk6IgAqAGRpcmVjdCI7YjoxO3M6MTM6IgAqAGNvbnN0cmFpbnQiO3M6NDoiXjIuMCI7czo5OiIAKgBzb3VyY2UiO0U6NDM6IkxhcmF2ZWxcUm9zdGVyXEVudW1zXFBhY2thZ2VTb3VyY2U6Q09NUE9TRVIiO3M6MTA6IgAqAHBhY2thZ2UiO0U6NDU6IkxhcmF2ZWxcUm9zdGVyXEVudW1zXFBhY2thZ2VzOklORVJUSUFfTEFSQVZFTCI7czoxNDoiACoAcGFja2FnZU5hbWUiO3M6MjU6ImluZXJ0aWFqcy9pbmVydGlhLWxhcmF2ZWwiO3M6MTA6IgAqAHZlcnNpb24iO3M6NjoiMi4wLjIxIjtzOjY6IgAqAGRldiI7YjowO3M6NzoiACoAcGF0aCI7czo4NToiL3Zhci9ob21lL21hdHVzL0Rva3VtZW50ZS9zY2h1bGUvbWF0dHdpa2kudmVyY2VsLmFwcC92ZW5kb3IvaW5lcnRpYWpzL2luZXJ0aWEtbGFyYXZlbCI7fWk6MTtPOjIyOiJMYXJhdmVsXFJvc3RlclxQYWNrYWdlIjo4OntzOjk6IgAqAGRpcmVjdCI7YjoxO3M6MTM6IgAqAGNvbnN0cmFpbnQiO3M6NToiXjEyLjAiO3M6OToiACoAc291cmNlIjtyOjExO3M6MTA6IgAqAHBhY2thZ2UiO0U6Mzc6IkxhcmF2ZWxcUm9zdGVyXEVudW1zXFBhY2thZ2VzOkxBUkFWRUwiO3M6MTQ6IgAqAHBhY2thZ2VOYW1lIjtzOjE3OiJsYXJhdmVsL2ZyYW1ld29yayI7czoxMDoiACoAdmVyc2lvbiI7czo3OiIxMi41My4wIjtzOjY6IgAqAGRldiI7YjowO3M6NzoiACoAcGF0aCI7czo3NzoiL3Zhci9ob21lL21hdHVzL0Rva3VtZW50ZS9zY2h1bGUvbWF0dHdpa2kudmVyY2VsLmFwcC92ZW5kb3IvbGFyYXZlbC9mcmFtZXdvcmsiO31pOjI7TzoyMjoiTGFyYXZlbFxSb3N0ZXJcUGFja2FnZSI6ODp7czo5OiIAKgBkaXJlY3QiO2I6MDtzOjEzOiIAKgBjb25zdHJhaW50IjtzOjc6InYwLjMuMTMiO3M6OToiACoAc291cmNlIjtyOjExO3M6MTA6IgAqAHBhY2thZ2UiO0U6Mzc6IkxhcmF2ZWxcUm9zdGVyXEVudW1zXFBhY2thZ2VzOlBST01QVFMiO3M6MTQ6IgAqAHBhY2thZ2VOYW1lIjtzOjE1OiJsYXJhdmVsL3Byb21wdHMiO3M6MTA6IgAqAHZlcnNpb24iO3M6NjoiMC4zLjEzIjtzOjY6IgAqAGRldiI7YjowO3M6NzoiACoAcGF0aCI7czo3NToiL3Zhci9ob21lL21hdHVzL0Rva3VtZW50ZS9zY2h1bGUvbWF0dHdpa2kudmVyY2VsLmFwcC92ZW5kb3IvbGFyYXZlbC9wcm9tcHRzIjt9aTozO086MjI6IkxhcmF2ZWxcUm9zdGVyXFBhY2thZ2UiOjg6e3M6OToiACoAZGlyZWN0IjtiOjE7czoxMzoiACoAY29uc3RyYWludCI7czo0OiJeMi4yIjtzOjk6IgAqAHNvdXJjZSI7cjoxMTtzOjEwOiIAKgBwYWNrYWdlIjtFOjM1OiJMYXJhdmVsXFJvc3RlclxFbnVtc1xQYWNrYWdlczpCT09TVCI7czoxNDoiACoAcGFja2FnZU5hbWUiO3M6MTM6ImxhcmF2ZWwvYm9vc3QiO3M6MTA6IgAqAHZlcnNpb24iO3M6NToiMi4yLjMiO3M6NjoiACoAZGV2IjtiOjE7czo3OiIAKgBwYXRoIjtzOjczOiIvdmFyL2hvbWUvbWF0dXMvRG9rdW1lbnRlL3NjaHVsZS9tYXR0d2lraS52ZXJjZWwuYXBwL3ZlbmRvci9sYXJhdmVsL2Jvb3N0Ijt9aTo0O086MjI6IkxhcmF2ZWxcUm9zdGVyXFBhY2thZ2UiOjg6e3M6OToiACoAZGlyZWN0IjtiOjA7czoxMzoiACoAY29uc3RyYWludCI7czo2OiJ2MC42LjEiO3M6OToiACoAc291cmNlIjtyOjExO3M6MTA6IgAqAHBhY2thZ2UiO0U6MzM6IkxhcmF2ZWxcUm9zdGVyXEVudW1zXFBhY2thZ2VzOk1DUCI7czoxNDoiACoAcGFja2FnZU5hbWUiO3M6MTE6ImxhcmF2ZWwvbWNwIjtzOjEwOiIAKgB2ZXJzaW9uIjtzOjU6IjAuNi4xIjtzOjY6IgAqAGRldiI7YjoxO3M6NzoiACoAcGF0aCI7czo3MToiL3Zhci9ob21lL21hdHVzL0Rva3VtZW50ZS9zY2h1bGUvbWF0dHdpa2kudmVyY2VsLmFwcC92ZW5kb3IvbGFyYXZlbC9tY3AiO31pOjU7TzoyMjoiTGFyYXZlbFxSb3N0ZXJcUGFja2FnZSI6ODp7czo5OiIAKgBkaXJlY3QiO2I6MTtzOjEzOiIAKgBjb25zdHJhaW50IjtzOjY6Il4xLjIuMiI7czo5OiIAKgBzb3VyY2UiO3I6MTE7czoxMDoiACoAcGFja2FnZSI7RTozNDoiTGFyYXZlbFxSb3N0ZXJcRW51bXNcUGFja2FnZXM6UEFJTCI7czoxNDoiACoAcGFja2FnZU5hbWUiO3M6MTI6ImxhcmF2ZWwvcGFpbCI7czoxMDoiACoAdmVyc2lvbiI7czo1OiIxLjIuNiI7czo2OiIAKgBkZXYiO2I6MTtzOjc6IgAqAHBhdGgiO3M6NzI6Ii92YXIvaG9tZS9tYXR1cy9Eb2t1bWVudGUvc2NodWxlL21hdHR3aWtpLnZlcmNlbC5hcHAvdmVuZG9yL2xhcmF2ZWwvcGFpbCI7fWk6NjtPOjIyOiJMYXJhdmVsXFJvc3RlclxQYWNrYWdlIjo4OntzOjk6IgAqAGRpcmVjdCI7YjoxO3M6MTM6IgAqAGNvbnN0cmFpbnQiO3M6NToiXjEuMjQiO3M6OToiACoAc291cmNlIjtyOjExO3M6MTA6IgAqAHBhY2thZ2UiO0U6MzQ6IkxhcmF2ZWxcUm9zdGVyXEVudW1zXFBhY2thZ2VzOlBJTlQiO3M6MTQ6IgAqAHBhY2thZ2VOYW1lIjtzOjEyOiJsYXJhdmVsL3BpbnQiO3M6MTA6IgAqAHZlcnNpb24iO3M6NjoiMS4yNy4xIjtzOjY6IgAqAGRldiI7YjoxO3M6NzoiACoAcGF0aCI7czo3MjoiL3Zhci9ob21lL21hdHVzL0Rva3VtZW50ZS9zY2h1bGUvbWF0dHdpa2kudmVyY2VsLmFwcC92ZW5kb3IvbGFyYXZlbC9waW50Ijt9aTo3O086MjI6IkxhcmF2ZWxcUm9zdGVyXFBhY2thZ2UiOjg6e3M6OToiACoAZGlyZWN0IjtiOjE7czoxMzoiACoAY29uc3RyYWludCI7czo1OiJeMS40MSI7czo5OiIAKgBzb3VyY2UiO3I6MTE7czoxMDoiACoAcGFja2FnZSI7RTozNDoiTGFyYXZlbFxSb3N0ZXJcRW51bXNcUGFja2FnZXM6U0FJTCI7czoxNDoiACoAcGFja2FnZU5hbWUiO3M6MTI6ImxhcmF2ZWwvc2FpbCI7czoxMDoiACoAdmVyc2lvbiI7czo2OiIxLjUzLjAiO3M6NjoiACoAZGV2IjtiOjE7czo3OiIAKgBwYXRoIjtzOjcyOiIvdmFyL2hvbWUvbWF0dXMvRG9rdW1lbnRlL3NjaHVsZS9tYXR0d2lraS52ZXJjZWwuYXBwL3ZlbmRvci9sYXJhdmVsL3NhaWwiO31pOjg7TzoyMjoiTGFyYXZlbFxSb3N0ZXJcUGFja2FnZSI6ODp7czo5OiIAKgBkaXJlY3QiO2I6MTtzOjEzOiIAKgBjb25zdHJhaW50IjtzOjc6Il4xMS41LjMiO3M6OToiACoAc291cmNlIjtyOjExO3M6MTA6IgAqAHBhY2thZ2UiO0U6Mzc6IkxhcmF2ZWxcUm9zdGVyXEVudW1zXFBhY2thZ2VzOlBIUFVOSVQiO3M6MTQ6IgAqAHBhY2thZ2VOYW1lIjtzOjE1OiJwaHB1bml0L3BocHVuaXQiO3M6MTA6IgAqAHZlcnNpb24iO3M6NzoiMTEuNS41NSI7czo2OiIAKgBkZXYiO2I6MTtzOjc6IgAqAHBhdGgiO3M6NzU6Ii92YXIvaG9tZS9tYXR1cy9Eb2t1bWVudGUvc2NodWxlL21hdHR3aWtpLnZlcmNlbC5hcHAvdmVuZG9yL3BocHVuaXQvcGhwdW5pdCI7fWk6OTtPOjIyOiJMYXJhdmVsXFJvc3RlclxQYWNrYWdlIjo4OntzOjk6IgAqAGRpcmVjdCI7YjoxO3M6MTM6IgAqAGNvbnN0cmFpbnQiO3M6NzoiXjIuMy4xNyI7czo5OiIAKgBzb3VyY2UiO0U6Mzg6IkxhcmF2ZWxcUm9zdGVyXEVudW1zXFBhY2thZ2VTb3VyY2U6TlBNIjtzOjEwOiIAKgBwYWNrYWdlIjtFOjQzOiJMYXJhdmVsXFJvc3RlclxFbnVtc1xQYWNrYWdlczpJTkVSVElBX1JFQUNUIjtzOjE0OiIAKgBwYWNrYWdlTmFtZSI7czoxNjoiQGluZXJ0aWFqcy9yZWFjdCI7czoxMDoiACoAdmVyc2lvbiI7czo2OiIyLjMuMjEiO3M6NjoiACoAZGV2IjtiOjA7czo3OiIAKgBwYXRoIjtzOjgyOiIvdmFyL2hvbWUvbWF0dXMvRG9rdW1lbnRlL3NjaHVsZS9tYXR0d2lraS52ZXJjZWwuYXBwL25vZGVfbW9kdWxlcy9AaW5lcnRpYWpzL3JlYWN0Ijt9aToxMDtPOjIyOiJMYXJhdmVsXFJvc3RlclxQYWNrYWdlIjo4OntzOjk6IgAqAGRpcmVjdCI7YjoxO3M6MTM6IgAqAGNvbnN0cmFpbnQiO3M6NzoiXjE5LjIuNCI7czo5OiIAKgBzb3VyY2UiO3I6OTI7czoxMDoiACoAcGFja2FnZSI7RTozNToiTGFyYXZlbFxSb3N0ZXJcRW51bXNcUGFja2FnZXM6UkVBQ1QiO3M6MTQ6IgAqAHBhY2thZ2VOYW1lIjtzOjU6InJlYWN0IjtzOjEwOiIAKgB2ZXJzaW9uIjtzOjY6IjE5LjIuNSI7czo2OiIAKgBkZXYiO2I6MDtzOjc6IgAqAHBhdGgiO3M6NzE6Ii92YXIvaG9tZS9tYXR1cy9Eb2t1bWVudGUvc2NodWxlL21hdHR3aWtpLnZlcmNlbC5hcHAvbm9kZV9tb2R1bGVzL3JlYWN0Ijt9aToxMTtPOjIyOiJMYXJhdmVsXFJvc3RlclxQYWNrYWdlIjo4OntzOjk6IgAqAGRpcmVjdCI7YjoxO3M6MTM6IgAqAGNvbnN0cmFpbnQiO3M6NjoiXjQuMi4xIjtzOjk6IgAqAHNvdXJjZSI7cjo5MjtzOjEwOiIAKgBwYWNrYWdlIjtFOjQxOiJMYXJhdmVsXFJvc3RlclxFbnVtc1xQYWNrYWdlczpUQUlMV0lORENTUyI7czoxNDoiACoAcGFja2FnZU5hbWUiO3M6MTE6InRhaWx3aW5kY3NzIjtzOjEwOiIAKgB2ZXJzaW9uIjtzOjU6IjQuMi4yIjtzOjY6IgAqAGRldiI7YjoxO3M6NzoiACoAcGF0aCI7czo3NzoiL3Zhci9ob21lL21hdHVzL0Rva3VtZW50ZS9zY2h1bGUvbWF0dHdpa2kudmVyY2VsLmFwcC9ub2RlX21vZHVsZXMvdGFpbHdpbmRjc3MiO319czoyODoiACoAZXNjYXBlV2hlbkNhc3RpbmdUb1N0cmluZyI7YjowO31zOjIxOiIAKgBub2RlUGFja2FnZU1hbmFnZXIiO0U6NDM6IkxhcmF2ZWxcUm9zdGVyXEVudW1zXE5vZGVQYWNrYWdlTWFuYWdlcjpOUE0iO31zOjk6InRpbWVzdGFtcCI7aToxNzc1ODk2Mzk2O30=	1775982796
laravel-cache-boost:mcp:database-schema:pgsql::1:0:0:0	a:2:{s:6:"engine";s:5:"pgsql";s:6:"tables";a:13:{s:17:"article_revisions";a:5:{s:2:"id";s:6:"bigint";s:10:"article_id";s:6:"bigint";s:9:"editor_id";s:6:"bigint";s:7:"summary";s:4:"text";s:10:"created_at";s:30:"timestamp(0) without time zone";}s:8:"articles";a:11:{s:2:"id";s:6:"bigint";s:4:"slug";s:22:"character varying(255)";s:5:"title";s:22:"character varying(255)";s:7:"content";s:4:"text";s:6:"status";s:22:"character varying(255)";s:5:"views";s:7:"integer";s:8:"featured";s:7:"boolean";s:11:"category_id";s:6:"bigint";s:9:"author_id";s:6:"bigint";s:10:"created_at";s:30:"timestamp(0) without time zone";s:10:"updated_at";s:30:"timestamp(0) without time zone";}s:5:"cache";a:3:{s:3:"key";s:22:"character varying(255)";s:5:"value";s:4:"text";s:10:"expiration";s:7:"integer";}s:11:"cache_locks";a:3:{s:3:"key";s:22:"character varying(255)";s:5:"owner";s:22:"character varying(255)";s:10:"expiration";s:7:"integer";}s:10:"categories";a:5:{s:2:"id";s:6:"bigint";s:4:"name";s:22:"character varying(255)";s:4:"slug";s:22:"character varying(255)";s:10:"created_at";s:30:"timestamp(0) without time zone";s:10:"updated_at";s:30:"timestamp(0) without time zone";}s:11:"failed_jobs";a:7:{s:2:"id";s:6:"bigint";s:4:"uuid";s:22:"character varying(255)";s:10:"connection";s:4:"text";s:5:"queue";s:4:"text";s:7:"payload";s:4:"text";s:9:"exception";s:4:"text";s:9:"failed_at";s:30:"timestamp(0) without time zone";}s:11:"job_batches";a:10:{s:2:"id";s:22:"character varying(255)";s:4:"name";s:22:"character varying(255)";s:10:"total_jobs";s:7:"integer";s:12:"pending_jobs";s:7:"integer";s:11:"failed_jobs";s:7:"integer";s:14:"failed_job_ids";s:4:"text";s:7:"options";s:4:"text";s:12:"cancelled_at";s:7:"integer";s:10:"created_at";s:7:"integer";s:11:"finished_at";s:7:"integer";}s:4:"jobs";a:7:{s:2:"id";s:6:"bigint";s:5:"queue";s:22:"character varying(255)";s:7:"payload";s:4:"text";s:8:"attempts";s:8:"smallint";s:11:"reserved_at";s:7:"integer";s:12:"available_at";s:7:"integer";s:10:"created_at";s:7:"integer";}s:10:"migrations";a:3:{s:2:"id";s:7:"integer";s:9:"migration";s:22:"character varying(255)";s:5:"batch";s:7:"integer";}s:21:"password_reset_tokens";a:3:{s:5:"email";s:22:"character varying(255)";s:5:"token";s:22:"character varying(255)";s:10:"created_at";s:30:"timestamp(0) without time zone";}s:8:"sessions";a:6:{s:2:"id";s:22:"character varying(255)";s:7:"user_id";s:6:"bigint";s:10:"ip_address";s:21:"character varying(45)";s:10:"user_agent";s:4:"text";s:7:"payload";s:4:"text";s:13:"last_activity";s:7:"integer";}s:13:"site_settings";a:2:{s:3:"key";s:22:"character varying(255)";s:5:"value";s:4:"text";}s:5:"users";a:7:{s:2:"id";s:6:"bigint";s:8:"username";s:22:"character varying(255)";s:5:"email";s:22:"character varying(255)";s:13:"password_hash";s:22:"character varying(255)";s:8:"is_admin";s:7:"boolean";s:10:"created_at";s:30:"timestamp(0) without time zone";s:10:"updated_at";s:30:"timestamp(0) without time zone";}}}	1775897932
\.


--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.categories (id, name, slug, created_at, updated_at) FROM stdin;
1	Mathematik	mathematik	2026-04-11 09:22:31	2026-04-11 09:22:31
2	Physik	physik	2026-04-11 09:22:31	2026-04-11 09:22:31
3	Informatik	informatik	2026-04-11 09:22:31	2026-04-11 09:22:31
4	Chemie	chemie	2026-04-11 09:22:31	2026-04-11 09:22:31
5	Biologie	biologie	2026-04-11 09:22:32	2026-04-11 09:22:32
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2026_01_01_000001_create_users_table	1
5	2026_01_01_000002_create_categories_table	1
6	2026_01_01_000003_create_articles_table	1
7	2026_01_01_000004_create_article_revisions_table	1
8	2026_01_01_000005_create_site_settings_table	1
9	2026_03_11_175934_make_password_hash_nullable_on_users	1
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
\.


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.site_settings (key, value) FROM stdin;
primary_hue	230
primary_chroma	0.15
primary_l	0.80
site_name	MatthiasWiki
site_description	A wiki you know, now 100% more nicer.
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, username, email, password_hash, is_admin, created_at, updated_at) FROM stdin;
1	admin	admin@mattwiki.local	$2y$12$SyCtfl5MpAGY.KPSN3Bl5eUoCvsG5E1NiLqZCrpy6uTmev6Vq4fa6	t	2026-04-11 09:22:31	2026-04-11 09:22:31
2	editor	editor@mattwiki.local	$2y$12$63mzCWMUQzyBr0xcp3No1uLICp7D62N0ZFpRg7ihehRQGTYymbv5C	f	2026-04-11 09:22:31	2026-04-11 09:22:31
3	dasmatus	Shadiness9530@proton.me	$2y$12$XwU/8SL6hfCQwriuCJc30.iam/ecJncFcHzlKhma2LQrj5gWs.RzK	t	2026-04-12 07:54:37	2026-04-12 07:54:37
\.


--
-- Name: article_revisions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.article_revisions_id_seq', 7, true);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.articles_id_seq', 7, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.categories_id_seq', 5, true);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.migrations_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: invitation invitation_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.invitation
    ADD CONSTRAINT invitation_pkey PRIMARY KEY (id);


--
-- Name: jwks jwks_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.jwks
    ADD CONSTRAINT jwks_pkey PRIMARY KEY (id);


--
-- Name: member member_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.member
    ADD CONSTRAINT member_pkey PRIMARY KEY (id);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);


--
-- Name: organization organization_slug_key; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.organization
    ADD CONSTRAINT organization_slug_key UNIQUE (slug);


--
-- Name: project_config project_config_endpoint_id_key; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.project_config
    ADD CONSTRAINT project_config_endpoint_id_key UNIQUE (endpoint_id);


--
-- Name: project_config project_config_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.project_config
    ADD CONSTRAINT project_config_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: session session_token_key; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.session
    ADD CONSTRAINT session_token_key UNIQUE (token);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: verification verification_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.verification
    ADD CONSTRAINT verification_pkey PRIMARY KEY (id);


--
-- Name: article_revisions article_revisions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.article_revisions
    ADD CONSTRAINT article_revisions_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: articles articles_slug_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_slug_unique UNIQUE (slug);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categories categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_unique UNIQUE (slug);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (key);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: account_userId_idx; Type: INDEX; Schema: neon_auth; Owner: neon_auth
--

CREATE INDEX "account_userId_idx" ON neon_auth.account USING btree ("userId");


--
-- Name: invitation_email_idx; Type: INDEX; Schema: neon_auth; Owner: neon_auth
--

CREATE INDEX invitation_email_idx ON neon_auth.invitation USING btree (email);


--
-- Name: invitation_organizationId_idx; Type: INDEX; Schema: neon_auth; Owner: neon_auth
--

CREATE INDEX "invitation_organizationId_idx" ON neon_auth.invitation USING btree ("organizationId");


--
-- Name: member_organizationId_idx; Type: INDEX; Schema: neon_auth; Owner: neon_auth
--

CREATE INDEX "member_organizationId_idx" ON neon_auth.member USING btree ("organizationId");


--
-- Name: member_userId_idx; Type: INDEX; Schema: neon_auth; Owner: neon_auth
--

CREATE INDEX "member_userId_idx" ON neon_auth.member USING btree ("userId");


--
-- Name: organization_slug_uidx; Type: INDEX; Schema: neon_auth; Owner: neon_auth
--

CREATE UNIQUE INDEX organization_slug_uidx ON neon_auth.organization USING btree (slug);


--
-- Name: session_userId_idx; Type: INDEX; Schema: neon_auth; Owner: neon_auth
--

CREATE INDEX "session_userId_idx" ON neon_auth.session USING btree ("userId");


--
-- Name: verification_identifier_idx; Type: INDEX; Schema: neon_auth; Owner: neon_auth
--

CREATE INDEX verification_identifier_idx ON neon_auth.verification USING btree (identifier);


--
-- Name: cache_expiration_index; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX cache_expiration_index ON public.cache USING btree (expiration);


--
-- Name: cache_locks_expiration_index; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX cache_locks_expiration_index ON public.cache_locks USING btree (expiration);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- Name: account account_userId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.account
    ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES neon_auth."user"(id) ON DELETE CASCADE;


--
-- Name: invitation invitation_inviterId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.invitation
    ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES neon_auth."user"(id) ON DELETE CASCADE;


--
-- Name: invitation invitation_organizationId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.invitation
    ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES neon_auth.organization(id) ON DELETE CASCADE;


--
-- Name: member member_organizationId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.member
    ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES neon_auth.organization(id) ON DELETE CASCADE;


--
-- Name: member member_userId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.member
    ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES neon_auth."user"(id) ON DELETE CASCADE;


--
-- Name: session session_userId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: neon_auth
--

ALTER TABLE ONLY neon_auth.session
    ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES neon_auth."user"(id) ON DELETE CASCADE;


--
-- Name: article_revisions article_revisions_article_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.article_revisions
    ADD CONSTRAINT article_revisions_article_id_foreign FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: article_revisions article_revisions_editor_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.article_revisions
    ADD CONSTRAINT article_revisions_editor_id_foreign FOREIGN KEY (editor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: articles articles_author_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_author_id_foreign FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: articles articles_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_category_id_foreign FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: SCHEMA pgrst; Type: ACL; Schema: -; Owner: neon_service
--

GRANT USAGE ON SCHEMA pgrst TO authenticator;


--
-- Name: FUNCTION pre_config(); Type: ACL; Schema: pgrst; Owner: neon_service
--

GRANT ALL ON FUNCTION pgrst.pre_config() TO authenticator;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

\unrestrict Q3d27ldRBPtCA5IciWxgZBHynQOzjP8aAetwau2ExAJMRSLijeVlMR0nGrgkU3w

