const { createClient, SchemaFieldTypes } = require("redis");
const config = require("../../config");

let client;

(async () => {
  client = createClient({
    password: config.redisPassword,
    socket: {
      host: config.redisHost,
      port: config.redisPort,
    },
  });
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
  const schema = {
    "$.name": {
      type: SchemaFieldTypes.TEXT,
      SORTABLE: true,
      AS: "name",
    },
    "$.amount": {
      type: SchemaFieldTypes.TEXT,
      AS: "amount",
    },
    "$.category": {
      type: SchemaFieldTypes.TAG,
      AS: "category",
    },
    "$.subcategory": {
      type: SchemaFieldTypes.TAG,
      AS: "subcategory",
    },
    "$.label": {
      type: SchemaFieldTypes.TAG,
      AS: "label",
    },
    "$.account": {
      type: SchemaFieldTypes.TAG,
      AS: "account",
    },
  };
  try {
    await client.ft.create("idx:record", schema, {
      ON: "JSON",
      PREFIX: "record:",
    });
  } catch (e) {
    if (e.message === "Index already exists") {
      console.log("Index exists already, skipped creation.");
    } else {
      // Something went wrong, perhaps RediSearch isn't installed...
      console.error(e);
      process.exit(1);
    }
  }
})();

module.exports = client;
