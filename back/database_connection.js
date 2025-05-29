// Dependencies
<<<<<<< HEAD
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
=======
const {MongoClient, ServerApiVersion} = require('mongodb');    
require('dotenv').config(); 
>>>>>>> d59c31104197bdbf4f8e66768a8e1e99c936e040

const dbkey = process.env.DATABASE_KEY;

class Connection {
<<<<<<< HEAD
  static #client;
  static #db;
  static #options = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };

  static async connect() {
    if (Connection.#db) return Connection.#db;
    try {
      Connection.#client = new MongoClient(dbkey, Connection.#options);
      await Connection.#client.connect();
      Connection.#db = Connection.#client.db("cnapp");
      return Connection.#db;
    } catch (e) {
      console.log(e);
    }
  }
  static async close() {
    if (Connection.#client) {
      await Connection.#client.close();
      Connection.#db = null;
    }
  }
}

module.exports = Connection;
=======
    static #client;
    static #db;
    static #options = {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    };

    static async connect(){
        if (Connection.#db) return Connection.#db;
        try{
            Connection.#client = new MongoClient(dbkey, Connection.#options);
            await Connection.#client.connect();
            Connection.#db = Connection.#client.db('cnapp');
            return Connection.#db;
        }catch(e){
            console.log(e);
        }         
    
    }
    static async close(){
        if(Connection.#client){
            await Connection.#client.close();
            Connection.#db = null;

        }
    }

}

module.exports = Connection;

>>>>>>> d59c31104197bdbf4f8e66768a8e1e99c936e040
