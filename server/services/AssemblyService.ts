import { sqlToDB } from "../util/PgDatabase"
import { Assembly, AssemblyFilter } from "../../utils/classes/assemblies"
import Guid from "../../utils/classes/common/guid"
import { QueryResultRow } from "pg"
import { RecipeController } from "./RecipeService"
import { RecipeStepController } from "./RecipeStepService"
import { Body, Controller, Delete, Hidden, Post, Put, Route, Tags } from "tsoa"
import { extractBaseFields, genBaseFields, updateBaseFields, validateBaseFields } from "../util/baseDataUtil"
import { RecipeStepFilter } from "utils/classes/recipeSteps"
import { AssemblyStep } from "utils/classes/assemblySteps"

@Tags("Assembly")
@Route("Assembly")
export class AssemblyController extends Controller {
  recipeService: RecipeController
  recipeStepService: RecipeStepController
  constructor() {
    super()
    this.recipeService = new RecipeController()
    this.recipeStepService = new RecipeStepController()
  }
  dbToAssembly(assemblyRow: QueryResultRow) {
    const assembly: Assembly = new Assembly()
    genBaseFields(assemblyRow, assembly)
    assembly.id = Guid.fromString(assemblyRow.assembly_id)
    assembly.name = assemblyRow.assembly_name
    assembly.description = assemblyRow.assembly_description
    assembly.complete = assemblyRow.assembly_complete
    assembly.parentId = assemblyRow.assembly_parent_id ? Guid.fromString(assemblyRow.assembly_parent_id) : undefined
    assembly.recipeId = assemblyRow.assembly_recipe_id ? Guid.fromString(assemblyRow.assembly_recipe_id) : undefined
    assembly.recipeProductId = assemblyRow.assembly_recipe_product_id
      ? Guid.fromString(assemblyRow.assembly_recipe_product_id)
      : undefined
    // console.log("assemblyRow", assemblyRow)
    // console.log("ASSEMBLYGG", assembly)

    return assembly
  }

  async addAssembly(assembly: Assembly) {
    // const fieldParams = assemblyToDb(assembly)
    if (assembly.id.value === Guid.createEmpty().value) {
      assembly.id = Guid.create()
    }
    return await sqlToDB(
      `INSERT INTO assemblies (
assembly_id ,assembly_name, assembly_description, assembly_complete, assembly_parent_id, assembly_recipe_id, assembly_recipe_product_id, version_no) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        assembly.id.value,
        assembly.name,
        assembly.description,
        assembly.complete,
        assembly.parentId?.value,
        assembly.recipeId?.value,
        assembly.recipeProductId?.value,
        ...extractBaseFields(assembly)
      ]
    )
  }
  @Post("get")
  async getAssembly(@Body() assemblyId: Guid) {
    const result = await sqlToDB("SELECT * FROM assemblies WHERE assembly_id = $1", [assemblyId.value])
    console.log(
      "result.rows.map(assemblyResult => dbToAssembly(assemblyResult))[0]",
      result.rows.map((assemblyResult) => this.dbToAssembly(assemblyResult))[0]
    )
    const assembly = result.rows.map((assemblyResult) => this.dbToAssembly(assemblyResult))[0]
    return assembly
  }

  @Post("get-by")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAssembliesByFilter(@Body() filter?: AssemblyFilter) {
    let query = "SELECT DISTINCT ON (assemblies.assembly_id) assemblies.* FROM assemblies \
    "
    // LEFT JOIN resource_assemblies ON (assemblies.assembly_id = resource_assemblies.assembly_id)\
    const queryClauses: string[] = []
    // if (filter.resourceIds?.length) {
    //   queryClauses.push(`resource_assemblies.resource_id IN (${filter.resourceIds.map(ri => `'${ri.value}'`)})`)
    // }
    query += queryClauses.length ? " WHERE " + queryClauses.join(" AND ") : ";"
    const result = await sqlToDB(query)
    return result.rows.map((assemblyResult) => this.dbToAssembly(assemblyResult))
  }

  @Delete("delete")
  async deleteAssembly(@Body() assemblyId: Guid) {
    const result = await sqlToDB("DELETE FROM assemblies WHERE assembly_id = $1", [assemblyId.value])
    return !!result.rowCount
  }

  @Put("update")
  async updateOrCreateAssembly(@Body() assembly: Assembly) {
    if (assembly.id.value === Guid.createEmpty().value || !(await this.getAssembly(assembly.id))) {
      return await this.addAssembly(assembly)
    }
    if (!(await validateBaseFields(assembly, "SELECT * FROM assemblies WHERE assembly_id = $1", [assembly.id.value]))) {
      this.setStatus(412)
    }
    assembly = updateBaseFields(assembly)
    // @TODO: Look at validation Updates
    return await sqlToDB(
      "UPDATE assemblies SET assembly_name = $2, assembly_description = $3, assembly_complete = $4, assembly_parent_id = $5, assembly_recipe_id = $6, assembly_recipe_product_id = $7, version_no = $8  WHERE assembly_id = $1;",
      [
        assembly.id.value,
        assembly.name,
        assembly.description,
        assembly.complete,
        assembly.parentId?.value,
        assembly.recipeId?.value,
        assembly.recipeProductId?.value,
        ...extractBaseFields(assembly)
      ]
    )
  }
  async createFromRecipe(recipeId: Guid, parentId?: Guid) {
    const assemblyId = Guid.create()
    const recipe = await this.recipeService.getRecipe(recipeId)
    const assembly = await new Assembly(assemblyId, recipe.name, recipe.description, false, recipeId, parentId)

    await this.updateOrCreateAssembly(assembly)
    return await this.getAssembly(assemblyId)
  }

  async createFromRecipes(recipeIds: Guid[]) {
    const assemblies = recipeIds.map((rid) => this.createFromRecipe(rid))
    return await Promise.all(assemblies)
  }
}
