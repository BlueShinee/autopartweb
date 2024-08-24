/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfh80zq13hn96yq")

  // remove
  collection.schema.removeField("vwcej9gm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "59xafk9z",
    "name": "images",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfh80zq13hn96yq")

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

  // remove
  collection.schema.removeField("59xafk9z")

  return dao.saveCollection(collection)
})
