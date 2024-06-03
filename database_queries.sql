
CREATE DATABASE kgkgroup
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.1252'
    LC_CTYPE = 'English_India.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


CREATE TABLE IF NOT EXISTS public.bids
(
    id character varying(30) COLLATE pg_catalog."default" NOT NULL,
    item_id character varying(30) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(30) COLLATE pg_catalog."default" NOT NULL,
    bid_amount double precision NOT NULL,
    created_at timestamp without time zone NOT NULL,
    CONSTRAINT bids_pkey PRIMARY KEY (id),
    CONSTRAINT bid_item_fk FOREIGN KEY (item_id)
        REFERENCES public.items (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bid_user_fk FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bids
    OWNER to postgres;

    
CREATE TABLE IF NOT EXISTS public.items
(
    id character varying(30) COLLATE pg_catalog."default" NOT NULL,
    name character varying(40) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    starting_price double precision NOT NULL,
    current_price double precision NOT NULL,
    image_url character varying(250) COLLATE pg_catalog."default",
    end_time timestamp without time zone NOT NULL,
    created_at timestamp without time zone NOT NULL,
    CONSTRAINT items_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.items
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.users
(
    id character varying(30) COLLATE pg_catalog."default" NOT NULL,
    username character varying(30) COLLATE pg_catalog."default" NOT NULL,
    password character varying(20) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    role character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT USER,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.notifications
(
    id character varying(30) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(30) COLLATE pg_catalog."default" NOT NULL,
    message character varying(150) COLLATE pg_catalog."default" NOT NULL,
    is_read boolean NOT NULL DEFAULT false,
    created_at timestamp without time zone NOT NULL,
    CONSTRAINT notifications_pkey PRIMARY KEY (id),
    CONSTRAINT notification_users_fk FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.notifications
    OWNER to postgres;