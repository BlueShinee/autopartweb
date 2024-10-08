/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("inm6px9wi00jucp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "di6rkhan",
    "name": "email",
    "type": "email",
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
  const collection = dao.findCollectionByNameOrId("inm6px9wi00jucp")

  // remove
  collection.schema.removeField("di6rkhan")

  return dao.saveCollection(collection)
})
