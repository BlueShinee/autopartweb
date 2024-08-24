/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfh80zq13hn96yq")

  // remove
  collection.schema.removeField("0wc4sgnc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vwcej9gm",
    "name": "filepaths",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfh80zq13hn96yq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0wc4sgnc",
    "name": "photos",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 99,
      "maxSize": 1000000000,
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("vwcej9gm")

  return dao.saveCollection(collection)
})
