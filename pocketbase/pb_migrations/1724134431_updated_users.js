/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xdtc15ullw3t3bd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dkq3em6w",
    "name": "is_admin",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xdtc15ullw3t3bd")

  // remove
  collection.schema.removeField("dkq3em6w")

  return dao.saveCollection(collection)
})
