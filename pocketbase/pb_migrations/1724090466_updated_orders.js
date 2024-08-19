/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("inm6px9wi00jucp")

  // remove
  collection.schema.removeField("j6kstd4r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wges2l7f",
    "name": "state",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("inm6px9wi00jucp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j6kstd4r",
    "name": "state",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("wges2l7f")

  return dao.saveCollection(collection)
})
