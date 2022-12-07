CREATE SEQUENCE person_id_seq START WITH 1;

CREATE TABLE IF NOT EXISTS public.person
(
    id bigint NOT NULL DEFAULT nextval('person_id_seq'::regclass),
    birth_date date,
    email character varying(255) COLLATE pg_catalog."default",
    gender character varying(255) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    phone_number character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT person_pkey PRIMARY KEY (id)
)