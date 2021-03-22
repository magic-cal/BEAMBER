import { sqlToDB } from "../util/PgDatabase"
import { RecipeStep, RecipeStepFilter } from "../../utils/classes/recipeStep"
import Guid from "../../utils/classes/common/guid"
import { QueryResultRow } from "pg"
import { Body, Controller, Delete, Post, Put, Route, Tags } from "tsoa"

@Tags("RecipeStep")
@Route("RecipeStep")
export class RecipeStepController extends Controller {
  dbToRecipeStep(row: QueryResultRow) {
    const recipeStep: RecipeStep = new RecipeStep()
    recipeStep.id = Guid.fromString(row.recipe_step_id)
    recipeStep.name = row.recipe_step_name
    recipeStep.description = row.recipe_step_description
    recipeStep.recipeRequirementId = row.recipe_step_recipe_requirement_id
      ? Guid.fromString(row.recipe_step_recipe_requirement_id)
      : undefined
    recipeStep.tagId = row.recipe_step_tag_id ? Guid.fromString(row.recipe_step_tag_id) : undefined
    recipeStep.recipeId = Guid.fromString(row.recipe_step_recipe_id)
    recipeStep.resourceId = row.recipe_step_resource_id ? Guid.fromString(row.recipe_step_resource_id) : undefined
    recipeStep.duration = row.recipe_step_duration
    recipeStep.capacity = row.recipe_step_capacity
    recipeStep.start = row.recipe_step_start
    recipeStep.sequence = row.recipe_step_sequence ?? 0
    console.log("row", row)
    console.log("RECIPEGG", recipeStep)

    return recipeStep
  }

  // export async updateResourceRelation(resources: Resource[], recipeStepId: Guid) {
  //   // SIMILAR IMPL IN RESOURCE SERVICE
  //   // const insertionValues = resources.map(resource => (resource.id.value, recipeStepId.value))
  //   const insertionValues: string[] = []

  //   await sqlToDB("DELETE FROM resource_recipe_steps WHERE recipe_step_id = $1", [recipeStepId.value])
  //   //@TODO: Update Inserts into resources NOT PRETTY
  //   await resources.forEach(
  //     async resource =>
  //       await sqlToDB("INSERT INTO resource_recipe_steps (resource_id, recipe_step_id) VALUES ($1,$2)", [
  //         resource.id.value,
  //         recipeStepId.value
  //       ])
  //   )
  // }

  @Post("get")
  async getRecipeStep(@Body() recipeStepId: Guid) {
    const result = await sqlToDB("SELECT * FROM recipe_steps WHERE recipe_step_id = $1", [recipeStepId.value])
    console.log(
      "result.rows.map(recipeStepResult => dbToRecipeStep(recipeStepResult))[0]",
      result.rows.map((recipeStepResult) => this.dbToRecipeStep(recipeStepResult))[0]
    )
    return result.rows.map((recipeStepResult) => this.dbToRecipeStep(recipeStepResult))[0]
  }

  @Post("get-by")
  async getRecipeStepsByFilter(@Body() filter?: RecipeStepFilter) {
    let query =
      "\
SELECT DISTINCT ON (recipe_steps.recipe_step_id) recipe_steps.recipe_step_id,  recipe_step_name, recipe_step_description, recipe_step_recipe_requirement_id, recipe_step_tag_id, recipe_step_recipe_id, recipe_step_resource_id, recipe_step_duration, recipe_step_capacity, recipe_step_start, recipe_step_sequence \
FROM recipe_steps \
LEFT JOIN recipes ON (recipe_steps.recipe_step_recipe_id = recipes.recipe_id)\
"
    const queryClauses: string[] = []
    if (filter?.recipeIds?.length) {
      queryClauses.push(`recipes.recipe_id IN (${filter.recipeIds.map((ri) => `'${ri.value}'`)})`)
    }
    query += queryClauses.length ? " WHERE " + queryClauses.join(" AND ") : ";"
    const result = await sqlToDB(query)
    return result.rows.map((recipeStepResult) => this.dbToRecipeStep(recipeStepResult))
  }

  @Delete("delete")
  async deleteRecipeStep(@Body() recipeStepId: Guid) {
    // await updateResourceRelation([], recipeStepId)
    const result = await sqlToDB("DELETE FROM recipe_steps WHERE recipe_step_id = $1", [recipeStepId.value])
    return !!result.rowCount
  }

  @Put("update")
  async updateOrCreateRecipeStep(@Body() recipeStep: RecipeStep) {
    console.log(recipeStep.id.value !== Guid.createEmpty().value, "recipeStep.id.value !== Guid.createEmpty().value")
    if (recipeStep.id.value !== Guid.createEmpty().value && (await this.getRecipeStep(recipeStep.id))) {
      return await sqlToDB(
        "UPDATE recipe_steps SET recipe_step_id = $1, recipe_step_name = $2, recipe_step_description = $3, recipe_step_recipe_requirement_id = $4, recipe_step_tag_id = $5, recipe_step_recipe_id = $6, recipe_step_resource_id = $7, recipe_step_duration = $8, recipe_step_capacity = $9, recipe_step_start = $10, recipe_step_sequence = $11 WHERE recipe_step_id = $1;",
        [
          recipeStep.id.value,
          recipeStep.name,
          recipeStep.description,
          recipeStep.recipeRequirementId?.value,
          recipeStep.tagId?.value,
          recipeStep.recipeId.value,
          recipeStep.resourceId?.value,
          recipeStep.duration,
          recipeStep.capacity,
          recipeStep.start,
          recipeStep.sequence
        ]
      )
    }
    return await this.addRecipeStep(recipeStep)
  }

  async addRecipeStep(recipeStep: RecipeStep) {
    // const fieldParams = recipeStepToDb(recipeStep)
    return await sqlToDB(
      `INSERT INTO recipe_steps (
recipe_step_id,
recipe_step_name,
recipe_step_description,
recipe_step_recipe_requirement_id,
recipe_step_tag_id,
recipe_step_recipe_id,
recipe_step_resource_id,
recipe_step_duration,
recipe_step_capacity,
recipe_step_start,
recipe_step_sequence
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        recipeStep.id.value,
        recipeStep.name,
        recipeStep.description,
        recipeStep.recipeRequirementId?.value,
        recipeStep.tagId?.value,
        recipeStep.recipeId.value,
        recipeStep.resourceId?.value,
        recipeStep.duration,
        recipeStep.capacity,
        recipeStep.start,
        recipeStep.sequence
      ]
    )
  }
  // async Update(Id, RecipeStep){

  // }
  // async Delete(Id){

  // }

  // CREATE TABLE public.recipe_steps
  // (
  //     recipe_step_id uuid NOT NULL DEFAULT gen_random_uuid(),
  //     recipe_step_name character varying COLLATE pg_catalog."default",
  //     recipe_step_description character varying COLLATE pg_catalog."default",
  //     CONSTRAINT recipe_steps_pkey PRIMARY KEY (recipe_step_id)
  // )
}

// recipe_step.recipe_step_id,
// recipe_step.recipe_step_name,
// recipe_step.recipe_step_description,
// recipe_step.recipe_step_recipe_requirement_id,
// recipe_step.recipe_step_tag_id,
// recipe_step.recipe_step_recipe_id,
// recipe_step.recipe_step_resource_id,
// recipe_step.recipe_step_duration,
// recipe_step.recipe_step_capacity,
// recipe_step.recipe_step_start,

// recipe_step_id = $1,
// recipe_step_name = $2,
// recipe_step_description = $3,
// recipe_step_recipe_requirement_id = $4,
// recipe_step_tag_id = $5,
// recipe_step_recipe_id = $6,
// recipe_step_resource_id = $7,
// recipe_step_duration = $8,
// recipe_step_capacity = $9,
// recipe_step_start = $10,
