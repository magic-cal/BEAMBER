-- Table: public.recipe_steps

-- DROP TABLE public.recipe_steps;

CREATE TABLE public.recipe_steps
(
    recipe_step_id uuid NOT NULL DEFAULT gen_random_uuid(),
    recipe_step_name character varying COLLATE pg_catalog."default",
    recipe_step_description character varying COLLATE pg_catalog."default",
    recipe_step_recipe_requirement_id uuid,
    recipe_step_tag_id uuid,
    recipe_step_recipe_id uuid,
    recipe_step_resource_id uuid,
    recipe_step_duration bigint DEFAULT 0,
    recipe_step_capacity integer DEFAULT 0,
    recipe_step_start bigint DEFAULT 0,
    CONSTRAINT recipe_steps_pkey PRIMARY KEY (recipe_step_id)
)

TABLESPACE pg_default;

ALTER TABLE public.recipe_steps
    OWNER to postgres;