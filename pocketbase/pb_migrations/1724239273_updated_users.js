/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xdtc15ullw3t3bd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xqir0teb",
    "name": "field",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xdtc15ullw3t3bd")

  // remove
  collection.schema.removeField("xqir0teb")

  return dao.saveCollection(collection)
})
