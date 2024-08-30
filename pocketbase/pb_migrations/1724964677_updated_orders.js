/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("inm6px9wi00jucp")

  // remove
  collection.schema.removeField("opskbbm5")

  // remove
  collection.schema.removeField("cvxxgluj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eshvcxf0",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e0kndnwv",
    "name": "itemid",
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
    "id": "opskbbm5",
    "name": "userid",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvxxgluj",
    "name": "itemid",
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
  collection.schema.removeField("eshvcxf0")

  // remove
  collection.schema.removeField("e0kndnwv")

  return dao.saveCollection(collection)
})
