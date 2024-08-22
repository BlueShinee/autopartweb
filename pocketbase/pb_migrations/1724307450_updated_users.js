/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xdtc15ullw3t3bd")

  // remove
  collection.schema.removeField("9ysbht2b")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xdtc15ullw3t3bd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9ysbht2b",
    "name": "userid",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
