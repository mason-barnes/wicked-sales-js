--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
56	47	2	2595
57	47	6	830
58	48	1	2999
59	48	1	2999
60	48	1	2999
61	48	1	2999
62	48	2	2595
63	48	2	2595
64	48	2	2595
65	48	2	2595
66	49	1	2999
67	49	1	2999
68	49	1	2999
69	49	2	2595
70	49	3	2900
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
49	2020-11-17 10:32:39.324579-08
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
3	Martin 000-15M	139900	/images/martin-000-15m-streetmaster.jpg	This Martin 000-15M StreetMaster acoustic guitar is one of the most comfortable guitars out there, thanks to its compact Auditorium-style body.	This Martin 000-15M StreetMaster acoustic guitar is one of the most comfortable guitars out there, thanks to its compact Auditorium-style body — and it delivers surprising amplitude and focus, along with a forward, balanced tone. Built from solid mahogany and given a neat-looking distressed finish (a tip of the hat to the working musician), this great-sounding acoustic guitar imparts warm, lively characteristics to your playing, along with an amazingly rich tonal complexity. The 000-15M has always been popular here at Sweetwater, due to its versatility, playability, and real-world price tag, so we are confident you will fall in love with this Martin 000-15M StreetMaster acoustic guitar — right from the first strum!
4	Taylor 214ce Grand Auditorium	139900	/images/Taylor-214ce-Grand-Auditorium.jpg	Combine time-tested acoustic design and a natural-sounding pickup system, and you have the Taylor 214ce Deluxe.	Combine time-tested acoustic design and a natural-sounding pickup system, and you have the Taylor 214ce Deluxe. Its Grand Auditorium body has the width and depth of a dreadnought, but its tapered waist and graceful contours make it look like a smaller instrument and impart balance and presence to the big sound, making it a favorite of recording engineers at Sweetwater. With its slender and fast neck, the 214ce Deluxe plays like a Taylor, which is to say, effortlessly. With the 214ce Deluxe, you will feel well-equipped both on stage and in your studio.
5	Taylor 224ce-K DLX	159900	/images/Taylor-224ce-k-dlx.jpg	Like a fine wine, the Taylor 224ce-K DLX only gets better with age.	Like a fine wine, the Taylor 224ce-K DLX only gets better with age. The crisp snap, strong mids, and sparkling highs exhibited by this acoustic-electric guitar’s all-koa body will reach new levels of richness, sweetness, and resonance as this instrument ages. Of course, the 224ce-K DLX’s eminently comfortable sapele neck ensures that you’ll be playing this guitar for a long, long time. When it’s time to perform, ES2 electronics produce top-notch amplified tone. In addition to its stunning koa body, the 224ce-K DLX also features gorgeous black binding, a single-ring faux pearl rosette with interlocking “fishbone” pattern, and Italian acrylic, small Diamond fingerboard inlays.
6	Taylor GS Mini Mahogany	49900	/images/Taylor-GS-Mini.jpg	The Taylor GS Mini acoustic guitar gives you Taylor construction and sound in a compact package.	Looking for Taylor quality in a small-sized guitar? The Taylor GS Mini acoustic guitar gives you Taylor construction and sound in a compact package. Modeled after the popular Grand Symphony body style, the Taylor GS Mini is a portable acoustic guitar that will amaze you with its big sound. Typically, we expect small sounds from small acoustic guitars, but thanks to the luthiers at Taylor, the Taylor GS Mini bucks that trend. The mahogany top, layered sapele back and sides, and ebony fingerboard give the Taylor GS Mini a rich and full sound you will love. If you are looking for a compact guitar with great sound, the Taylor GS Mini acoustic guitar is for you.
7	Martin D-18E	289900	/images/Martin-D-18E.jpg	This special-edition D-18E from Martin adds elegant aesthetic touches and modern electronics to the classic stage and studio staple acoustic.	The D-18E 2020s rich and luxuriant sound derives from its mahogany back and sides, Sitka spruce top, and forward-shifted Sitka spruce X bracing, which allows for unimpeded resonance and hearty projection. The comfortable dreadnought body is adorned with an Old Style 18 multi-stripe rosette and covered in a gorgeous gloss finish. And, the High Performance Taper neck is finished in satin for smooth playability and capped with an East Indian Rosewood fingerboard styled with eye-catching abalone inlays. When its time to plug in, the D-16E 2020 is equipped with the LR Baggs Anthem Tru-Mic system, an advanced soundhole pickup with a proprietary noise-canceling technology indispensable for live performances. The D-18E is a favorite acoustic of guitarists at Sweetwater, and the 2020 special edition has an undeniable flair worthy of attention.
8	Fender Stratocaster	69900	/images/Fender-stratocaster-blue.jpg	The Fender Stratocaster is considered by many guitarists to be the classic solidbody electric guitar.	The Fender Stratocaster is considered by many guitarists to be the classic solidbody electric guitar. Introduced in 1954, the Strat has flaunted its svelte body curves, tonal dexterity, and expressive vibrato in the capable hands of guitarists cross-genre. At once a musical axe axe and cultural icon, the Fender Player Series Stratocaster takes the grand tradition into the future with a fast-action 22-fret maple neck, vibrant vintage-inspired finishes, and three Player Series Alnico 5 Strat pickups that deliver all the legendary spank and sparkle you expect from a Strat.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 70, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 49, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 8, true);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

