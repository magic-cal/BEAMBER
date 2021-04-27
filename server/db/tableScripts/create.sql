-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Versioning~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Table: public.versioning

CREATE TABLE public.versioning
(
    version_no integer DEFAULT 1
)


-- COMMENT ON TABLE public.versioning
--     IS 'Table for all to inherit from ';


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Tags~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Table: public.tags

CREATE TABLE public.tags
(
    tag_id uuid NOT NULL DEFAULT gen_random_uuid(),
    tag_name character varying COLLATE pg_catalog."default",
    tag_description character varying COLLATE pg_catalog."default",
    -- Inherited from table public.versioning: version_no integer DEFAULT 1,
    CONSTRAINT tags_pkey PRIMARY KEY (tag_id)
)
    INHERITS (public.versioning)

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Resources~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Table: public.resources

CREATE TABLE public.resources
(
    resource_id uuid NOT NULL DEFAULT gen_random_uuid(),
    resource_name character varying COLLATE pg_catalog."default",
    -- Inherited from table public.versioning: version_no integer DEFAULT 1,
    resource_capacity integer NOT NULL DEFAULT 0,
    resource_current_lease uuid,
    resource_maintanance_required boolean,
    resource_is_active boolean,
    CONSTRAINT resources_pkey PRIMARY KEY (resource_id)
)
    INHERITS (public.versioning)


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Resource Tags~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Table: public.resource_tags

CREATE TABLE public.resource_tags
(
    tag_id uuid NOT NULL,
    resource_id uuid NOT NULL,
    -- Inherited from table public.versioning: version_no integer DEFAULT 1,
    CONSTRAINT resource_tags_pkey PRIMARY KEY (tag_id, resource_id),
    CONSTRAINT resouce_tag_fk FOREIGN KEY (tag_id)
        REFERENCES public.tags (tag_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT tag_resource_fk FOREIGN KEY (resource_id)
        REFERENCES public.resources (resource_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
    INHERITS (public.versioning)

COMMENT ON TABLE public.resource_tags
    IS 'Intersection entity many to many tags to resources ';


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Recipes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Table: public.recipes

CREATE TABLE public.recipes
(
    recipe_id uuid NOT NULL DEFAULT gen_random_uuid(),
    recipe_name character varying COLLATE pg_catalog."default",
    recipe_requirement_id uuid,
    recipe_is_assembly boolean,
    recipe_start_time bigint,
    recipe_end_time bigint,
    recipe_scheduled boolean,
    recipe_complete boolean,
    recipe_description character varying COLLATE pg_catalog."default",
    -- Inherited from table public.versioning: version_no integer DEFAULT 1,
    CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id)
)
    INHERITS (public.versioning)


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Recipe Steps~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Table: public.recipe_steps

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
    recipe_step_sequence integer,
    -- Inherited from table public.versioning: version_no integer DEFAULT 1,
    CONSTRAINT recipe_steps_pkey PRIMARY KEY (recipe_step_id)
)
    INHERITS (public.versioning)


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Maintenance Logs~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Table: public.maintenance_logs

CREATE TABLE public.maintenance_logs
(
    maintenance_log_id uuid NOT NULL DEFAULT gen_random_uuid(),
    maintenance_log_resource_id uuid NOT NULL,
    maintenance_log_type character varying COLLATE pg_catalog."default",
    maintenance_log_details character varying COLLATE pg_catalog."default",
    maintenance_log_timestamp character varying COLLATE pg_catalog."default",
    -- Inherited from table public.versioning: version_no integer DEFAULT 1,
    CONSTRAINT maintenance_logs_pkey PRIMARY KEY (maintenance_log_id)
)
    INHERITS (public.versioning)


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Leases~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Table: public.leases

CREATE TABLE public.leases
(
    -- Inherited from table public.versioning: version_no integer DEFAULT 1,
    lease_id uuid NOT NULL DEFAULT gen_random_uuid(),
    lease_name character varying COLLATE pg_catalog."default",
    lease_resource_id uuid,
    lease_end_time timestamp with time zone,
    lease_start_time timestamp with time zone,
    lease_maintenance_id uuid,
    lease_assembly_step_id uuid,
    lease_packaging_id uuid,
    lease_product_id uuid,
    lease_complete boolean DEFAULT false,
    lease_locked boolean DEFAULT false,
    CONSTRAINT leases_pkey PRIMARY KEY (lease_id)
)
    INHERITS (public.versioning)


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Business Hours~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Table: public.business_hours

CREATE TABLE public.business_hours
(
    -- Inherited from table public.versioning: version_no integer DEFAULT 1,
    business_hour_id uuid NOT NULL DEFAULT gen_random_uuid(),
    business_hour_tag_id uuid,
    business_hour_day integer,
    business_hour_start_time timestamp with time zone,
    business_hour_end_time timestamp with time zone,
    business_hour_is_open boolean
)
    INHERITS (public.versioning)


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Assembly Steps~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Table: public.assembly_steps

CREATE TABLE public.assembly_steps
(
    assembly_step_id uuid NOT NULL DEFAULT gen_random_uuid(),
    assembly_step_name character varying COLLATE pg_catalog."default",
    assembly_step_description character varying COLLATE pg_catalog."default",
    assembly_step_assembly_requirement_id uuid,
    assembly_step_tag_id uuid,
    assembly_step_assembly_id uuid,
    assembly_step_resource_id uuid,
    assembly_step_duration bigint DEFAULT 0,
    assembly_step_sequence integer,
    assembly_step_capacity integer DEFAULT 0,
    -- Inherited from table public.versioning: version_no integer DEFAULT 1,
    CONSTRAINT assembly_steps_pkey PRIMARY KEY (assembly_step_id)
)
    INHERITS (public.versioning)


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Assemblies~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Table: public.assemblies

CREATE TABLE public.assemblies
(
    assembly_id uuid NOT NULL DEFAULT gen_random_uuid(),
    assembly_name character varying COLLATE pg_catalog."default",
    assembly_description character varying COLLATE pg_catalog."default",
    assembly_complete boolean,
    assembly_parent_id uuid,
    assembly_recipe_id uuid,
    assembly_recipe_product_id uuid,
    -- Inherited from table public.versioning: version_no integer DEFAULT 1,
    CONSTRAINT assemblies_pkey PRIMARY KEY (assembly_id)
)
    INHERITS (public.versioning)