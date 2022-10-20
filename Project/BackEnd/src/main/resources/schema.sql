-- Table: public.levelinformation

-- DROP TABLE IF EXISTS public.levelinformation;

CREATE TABLE IF NOT EXISTS public.levelinformation
(
    id bigint NOT NULL,
    level bigint,
    leveldescription character varying(2000) COLLATE pg_catalog."default",
    levelhint character varying(2000) COLLATE pg_catalog."default",
    levelsolution character varying(2000) COLLATE pg_catalog."default",
    leveltitle character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT levelinformation_pkey PRIMARY KEY (id),
    CONSTRAINT uk_pmube7ck590fpo47cy4kk6xvv UNIQUE (level)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.levelinformation
    OWNER to postgres;