/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4o6yh3zvv155xld")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "os11ajlu",
    "name": "slider_1",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ubbk2xwv",
    "name": "slider_2",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ryfpsdct",
    "name": "slider_3",
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
  collection.schema.removeField("os11ajlu")

  // remove
  collection.schema.removeField("ubbk2xwv")

  // remove
  collection.schema.removeField("ryfpsdct")

  return dao.saveCollection(collection)
})
