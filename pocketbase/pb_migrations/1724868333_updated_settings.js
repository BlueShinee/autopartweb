/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4o6yh3zvv155xld")

  // remove
  collection.schema.removeField("1m6ubmgl")

  // remove
  collection.schema.removeField("lqu0o27d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "olafx2kh",
    "name": "buy_max_quantity",
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
  const collection = dao.findCollectionByNameOrId("4o6yh3zvv155xld")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1m6ubmgl",
    "name": "buy_max_quantity",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 1000000,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lqu0o27d",
    "name": "max_quantity",
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

  // remove
  collection.schema.removeField("olafx2kh")

  return dao.saveCollection(collection)
})
