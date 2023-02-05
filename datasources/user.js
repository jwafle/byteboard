const knex = require('../database/knex');
const { DataSource } = require('apollo-datasource');

class userAPI extends DataSource {
    constructor({ knexInstance }) {
        super();
        this.knex = knexInstance;
      }

    async getAllUsers() {
        const users = await this.knex.select().from('users');
        return users;
    }

    async getUserById(id) {
        const user = await this.knex
          .select()
          .from('users')
          .where({ id })
          .first();
        return user;
    }

    async getUserByName(firstName, lastName) {
        const user = await this.knex
            .select()
            .from('users')
            .where({ first_name: firstName, last_name: lastName })
            .first();
        return user;
    }
}

module.exports = userAPI;