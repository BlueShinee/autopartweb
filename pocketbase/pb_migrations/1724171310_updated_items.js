/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfh80zq13hn96yq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o70baypb",
    "name": "big_desc",
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

  // remove
  collection.schema.removeField("o70baypb")

  return dao.saveCollection(collection)
})
