import { sqlToDB } from "../util/PgDatabase"
import { Recipe, RecipeFilter } from "../../utils/classes/recipes"
import Guid from "../../utils/classes/common/guid"
import { QueryResultRow } from "pg"
import { Body, Controller, Delete, Post, Put, Route, Tags } from "tsoa"
import { genBaseFields, updateBaseFields, validateBaseFields } from "../util/baseDataUtil"

@Tags("Recipe")
@Route("Recipe")
export class RecipeController extends Controller {
  dbToRecipe(recipeResultRow: QueryResultRow) {
    const recipe: Recipe = new Recipe()
    genBaseFields(recipeResultRow, recipe)
    recipe.id = Guid.fromString(recipeResultRow.recipe_id)
    recipe.name = recipeResultRow.recipe_name
    recipe.description = recipeResultRow.recipe_description
    recipe.requirementIds = recipeResultRow.recipe_requirement_id ?? []
    recipe.readOnly = {
      isAssembly: recipeResultRow.recipe_is_assembly ?? false,
      startTime: recipeResultRow.start_time ?? 0,
      endTime: recipeResultRow.end_time ?? 0,
      isComplete: recipeResultRow.complete ?? false,
      isScheduled: recipeResultRow.scheduled ?? false
    }
    // console.log("recipeResultRow", recipeResultRow)
    // console.log("RECIPEGG", recipe)

    return recipe
  }

  // export async updateResourceRelation(resources: Resource[], recipeId: Guid) {
  //   // SIMILAR IMPL IN RESOURCE SERVICE
  //   // const insertionValues = resources.map(resource => (resource.id.value, recipeId.value))
  //   const insertionValues: string[] = []

  //   await sqlToDB("DELETE FROM resource_recipes WHERE recipe_id = $1", [recipeId.value])
  //   //@TODO: Update Inserts into resources NOT PRETTY
  //   await resources.forEach(
  //     async resource =>
  //       await sqlToDB("INSERT INTO resource_recipes (resource_id, recipe_id) VALUES ($1,$2)", [
  //         resource.id.value,
  //         recipeId.value
  //       ])
  //   )
  // }

  async addRecipe(recipe: Recipe) {
    // const fieldParams = recipeToDb(recipe)
    if (recipe.id.value === Guid.createEmpty().value) {
      recipe.id = Guid.create()
    }
    return await sqlToDB(
      `INSERT INTO recipes (
recipe_id ,
recipe_name ,
recipe_description,
recipe_requirement_id,
recipe_is_assembly
) VALUES ($1, $2, $3, $4, $5)`,
      [recipe.id.value, recipe.name, recipe.description, null, recipe.readOnly?.isAssembly]
    )
  }
  @Post("get")
  async getRecipe(@Body() recipeId: Guid) {
    const result = await sqlToDB("SELECT * FROM recipes WHERE recipe_id = $1", [recipeId.value])
    return result.rows.map((recipeResult) => this.dbToRecipe(recipeResult))[0]
  }

  @Post("get-by")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getRecipesByFilter(@Body() filter?: RecipeFilter) {
    let query = "SELECT DISTINCT ON (recipes.recipe_id) recipes.* FROM recipes \
    "
    // LEFT JOIN resource_recipes ON (recipes.recipe_id = resource_recipes.recipe_id)\
    const queryClauses: string[] = []
    // if (filter.resourceIds?.length) {
    //   queryClauses.push(`resource_recipes.resource_id IN (${filter.resourceIds.map(ri => `'${ri.value}'`)})`)
    // }
    query += queryClauses.length ? " WHERE " + queryClauses.join(" AND ") : ";"
    const result = await sqlToDB(query)
    return result.rows.map((recipeResult) => this.dbToRecipe(recipeResult))
  }

  @Delete("delete")
  async deleteRecipe(@Body() recipeId: Guid) {
    const result = await sqlToDB("DELETE FROM recipes WHERE recipe_id = $1", [recipeId.value])
    return !!result.rowCount
  }

  @Put("update")
  async updateOrCreateRecipe(@Body() recipe: Recipe) {
    if (recipe.id.value !== Guid.createEmpty().value && (await this.getRecipe(recipe.id))) {
      if (!(await validateBaseFields(recipe, "SELECT * FROM recipes WHERE recipe_id = $1", [recipe.id.value]))) {
        this.setStatus(412)
      }
      recipe = updateBaseFields(recipe)
      // @TODO: Look at validation Updates
      return await sqlToDB(
        "UPDATE recipes SET recipe_name = $1, recipe_description = $2, recipe_requirement_id = $3, recipe_is_assembly = $4, version_no = $6 WHERE recipe_id = $5;",
        [recipe.name, recipe.description, null, recipe.readOnly?.isAssembly, recipe.id.value, recipe.versionNo]
      )
    }
    return await this.addRecipe(recipe)
  }
}
