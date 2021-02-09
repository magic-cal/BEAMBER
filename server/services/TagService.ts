import { sqlToDB } from "./../util/PgDatabase"
import { Tag } from "../../utils/classes/tags"
import Guid from "../../utils/classes/common/guid"

export async function addTag(tag: Tag) {
  return await sqlToDB("INSERT INTO tags (tag_name) VALUES ($1)", [tag.name])
  // Insert Tags Too
}

export async function getTag(tagId: Guid) {
  const result = await sqlToDB("SELECT * FROM tags WHERE tag_id = $1", [tagId.value])
  return result.rows.map(tagResult => {
    const newTag = new Tag()
    newTag.fromQueryResultRow(tagResult)
    return newTag
  })[0]
}

export async function getTagsByFilter(filter?: any) {
  const result = await sqlToDB("SELECT * FROM tags")
  return result.rows.map(tagResult => {
    const newTag = new Tag()
    newTag.fromQueryResultRow(tagResult)
    return newTag
  })
}
export async function deleteTag(tagId: Guid) {
  const result = await sqlToDB("DELETE FROM tags WHERE tag_id = $1", [tagId.value])
  return !!result.rowCount
}

export async function updateOrCreateTag(tag: Tag) {
  if (tag.id.value !== Guid.createEmpty().value || (await getTag(tag.id))) {
    return await sqlToDB("UPDATE tags SET tag_name = $1 WHERE tag_id = $2;", [tag.name, tag.id.value])
  }
  return await addTag(tag)
}
// export async function Update(Id, Tag){

// }
// export async function Delete(Id){

// }
