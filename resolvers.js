const resolvers = {
    Query: {
      userById: (_, { id }, { userAPI }, info) => {
        return userAPI.getUserById(id);
      },
      users: (_, __, { userAPI }, info) => {
        return userAPI.getAllUsers();
      },
      userByName: (_, { first_name, last_name }, { userAPI }, info) => {
        return userAPI.getUserByName(first_name, last_name);
      },
      measurement: (_, { measurement_id }, { measurementAPI }, info) => {
        return measurementAPI.getMeasurementById(measurement_id);
      },
      measurements: (_, __, { measurementAPI }, info) => {
        return measurementAPI.getAllMeasurements();
      },
      measurementsById: (_, { user_id }, { measurementAPI }, info) => {
        return measurementAPI.getMeasurementsById(user_id);
      },
      measurementsByName: (_, { user_id }, { measurementAPI }, info) => {
        return measurementAPI.getMeasurementsByName(user_id);
      },
    },
    Mutation: {
      createOrUpdateUser: (_, { input }, { userAPI }, info) => {
      },
    },
  };

module.exports = resolvers;