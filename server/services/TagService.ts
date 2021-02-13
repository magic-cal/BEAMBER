import { sqlToDB } from "./../util/PgDatabase"
import { Tag, TagFilter } from "../../utils/classes/resources"
import Guid from "../../utils/classes/common/guid"
import { QueryResultRow } from "pg"

export interface FieldParams {
  fields: string[]
  params: string[]
}

function dbToTag(tagResultRow: QueryResultRow) {
  const tag: Tag = new Tag()
  tag.id = Guid.fromString(tagResultRow.tag_id)
  tag.name = tagResultRow.tag_name
  tag.description = tagResultRow.tag_description
  console.log("tagResultRow", tagResultRow)
  console.log("TAGGG", tag)

  return tag
}

function tagToDb(tag: Tag) {
  const fieldParams: FieldParams = { fields: [], params: [] }
  fieldParams.fields.push("tag_name")
  fieldParams.params.push(tag.name)
  fieldParams.fields.push("tag_description")
  fieldParams.params.push(tag.description)
  return fieldParams
}

export async function addTag(tag: Tag) {
  // const fieldParams = tagToDb(tag)
  return await sqlToDB(`INSERT INTO tags (tag_name ,tag_description) VALUES ($1, $2)`, [tag.name, tag.description])
}

export async function getTag(tagId: Guid) {
  const result = await sqlToDB("SELECT * FROM tags WHERE tag_id = $1", [tagId.value])
  return result.rows.map(tagResult => dbToTag(tagResult))[0]
}

export async function getTagsByFilter(filter: TagFilter = new TagFilter()) {
  let query =
    "SELECT DISTINCT ON (tags.tag_id) tags.tag_id, tag_name, tag_description FROM tags LEFT JOIN resource_tags ON (tags.tag_id = resource_tags.tag_id)"
  const queryClauses: string[] = []
  if (filter.resourceIds?.length) {
    queryClauses.push(`resource_tags.resource_id IN (${filter.resourceIds.map(ri => `'${ri.value}'`)})`)
  }
  query += queryClauses.length ? " WHERE " + queryClauses.join(" AND ") : ";"
  const result = await sqlToDB(query)
  return result.rows.map(tagResult => dbToTag(tagResult))
}

export async function deleteTag(tagId: Guid) {
  const result = await sqlToDB("DELETE FROM tags WHERE tag_id = $1", [tagId.value])
  return !!result.rowCount
}

export async function updateOrCreateTag(tag: Tag) {
  if (tag.id.value !== Guid.createEmpty().value || (await getTag(tag.id))) {
    return await sqlToDB("UPDATE tags SET tag_name = $1, tag_description = $2 WHERE tag_id = $3;", [
      tag.name,
      tag.description,
      tag.id.value
    ])
  }
  return await addTag(tag)
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
