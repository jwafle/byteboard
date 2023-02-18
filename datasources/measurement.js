const knex = require("../database/knex");
const { DataSource } = require("apollo-datasource");

class measurementAPI extends DataSource {
    constructor({ knexInstance }) {
        super();
        this.knex = knexInstance;
      }

    async getAllMeasurements() {
        const measurements = await this.knex.select().from('measurements');
        return measurements;
    }

    async getMeasurementsById(id) {
        const measurements = await this.knex
          .select()
          .from('measurements')
          .where({ id });
        return measurements;
    }

    async getMeasurementsByName(firstName, lastName) {
        const measurements = await this.knex
            .select()
            .from('measurements')
            .where({ first_name: firstName, last_name: lastName });
        return measurements;
    }
}

module.exports = measurementAPI;