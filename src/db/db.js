import pg from 'pg'
import dotenv from 'dotenv'


export class PostgresModel {
    #pg

    constructor() {
        this.#pg = new pg.Pool({
            connectionString:'postgres://vrmsbwqj:bLlVuZIupNWwkeT-H6uGuAbXwaE-nas3@kiouni.db.elephantsql.com/vrmsbwqj'
            
        })
    }

    async fetch(SQL, ...params) {
        const client = await this.#pg.connect()
        try {
            const { rows } = await client.query(SQL, params.length ? params : null)
            return rows
        } catch(err) {
            console.log(err)
        } finally {
            client.release()
        }
    }
}
