import { sqlToDB } from "../util/PgDatabase"
import { Resource, Tag, TagFilter } from "../../utils/classes/resources"
import Guid from "../../utils/classes/common/guid"
import { QueryResultRow } from "pg"
import { Body, Controller, Delete, Example, Post, Put, Route, Tags } from "tsoa"

interface FieldParams {
  fields: string[]
  params: string[]
}

@Tags("Tag")
@Route("tag")
export class TagController extends Controller {
  dbToTag(tagResultRow: QueryResultRow) {
    const tag: Tag = new Tag()
    tag.id = Guid.fromString(tagResultRow.tag_id)
    tag.name = tagResultRow.tag_name ?? ""
    tag.description = tagResultRow.tag_description ?? ""
    console.log("tagResultRow", tagResultRow)
    console.log("TAGGG", tag)

    return tag
  }

  tagToDb(tag: Tag) {
    const fieldParams: FieldParams = { fields: [], params: [] }
    fieldParams.fields.push("tag_name")
    fieldParams.params.push(tag.name)
    fieldParams.fields.push("tag_description")
    fieldParams.params.push(tag.description)
    return fieldParams
  }

  public async updateResourceRelation(resources: Resource[], tagId: Guid) {
    // SIMILAR IMPL IN RESOURCE SERVICE
    // const insertionValues = resources.map(resource => (resource.id.value, tagId.value))
    // const insertionValues: string[] = []

    await sqlToDB("DELETE FROM resource_tags WHERE tag_id = $1", [tagId.value])
    //@TODO: Update Inserts into resources NOT PRETTY
    await resources.forEach(
      async (resource) =>
        await sqlToDB("INSERT INTO resource_tags (resource_id, tag_id) VALUES ($1,$2)", [
          resource.id.value,
          tagId.value
        ])
    )
  }

  public async addTag(tag: Tag) {
    // const fieldParams = tagToDb(tag)
    return await sqlToDB(`INSERT INTO tags (tag_name ,tag_description) VALUES ($1, $2)`, [tag.name, tag.description])
  }

  @Post("get")
  public async getTag(@Body() tagId: Guid) {
    const result = await sqlToDB("SELECT * FROM tags WHERE tag_id = $1", [tagId.value])
    const value = result.rows.map((tagResult) => this.dbToTag(tagResult))[0]
    return value
  }

  @Post("get-by")
  public async getTagsByFilter(@Body() filter?: TagFilter) {
    let query =
      "SELECT DISTINCT ON (tags.tag_id) tags.tag_id, tag_name, tag_description FROM tags \
      LEFT JOIN resource_tags ON (tags.tag_id = resource_tags.tag_id)"
    const queryClauses: string[] = []
    if (filter?.resourceIds?.length) {
      queryClauses.push(`resource_tags.resource_id IN (${filter.resourceIds.map((ri) => `'${ri.value}'`)})`)
    }
    query += queryClauses.length ? " WHERE " + queryClauses.join(" AND ") : ";"
    const result = await sqlToDB(query)
    return result.rows.map((tagResult) => this.dbToTag(tagResult))
  }

  @Delete("delete")
  public async deleteTag(@Body() tagId: Guid) {
    await this.updateResourceRelation([], tagId)
    const result = await sqlToDB("DELETE FROM tags WHERE tag_id = $1", [tagId.value])
    return !!result.rowCount
  }

  @Example<Tag>({
    id: Guid.create(),
    name: "Mash Tun",
    description: "Mash Tun"
  })
  /**
   * Create a Tag or Update
   * @param tag Tag to update or create
   */
  @Put("update")
  public async updateOrCreateTag(@Body() tag: Tag) {
    if (tag.id.value !== Guid.createEmpty().value || (await this.getTag(tag.id))) {
      return await sqlToDB("UPDATE tags SET tag_name = $1, tag_description = $2 WHERE tag_id = $3;", [
        tag.name,
        tag.description,
        tag.id.value
      ])
    }
    return await this.addTag(tag)
  }
}

// export async function Update(Id, Tag){

// }
// export async function Delete(Id){

// }

// CREATE TABLE public.tags
// (
//     tag_id uuid NOT NULL DEFAULT gen_random_uuid(),
//     tag_name character varying COLLATE pg_catalog."default",
//     tag_description character varying COLLATE pg_catalog."default",
//     CONSTRAINT tags_pkey PRIMARY KEY (tag_id)
// )
