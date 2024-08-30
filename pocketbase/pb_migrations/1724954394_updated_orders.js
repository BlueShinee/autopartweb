/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("inm6px9wi00jucp")

  // remove
  collection.schema.removeField("xvpualat")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i2l6basi",
    "name": "quantity",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("inm6px9wi00jucp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xvpualat",
    "name": "amount",
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
  collection.schema.removeField("i2l6basi")

  return dao.saveCollection(collection)
})
