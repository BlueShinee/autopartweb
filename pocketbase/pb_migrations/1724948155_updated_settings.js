/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4o6yh3zvv155xld")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nk3rzlqu",
    "name": "location_embed",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4o6yh3zvv155xld")

  // remove
  collection.schema.removeField("nk3rzlqu")

  return dao.saveCollection(collection)
})
