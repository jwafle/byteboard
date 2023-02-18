const resolvers = {
    Query: {
      userById: (_, { id }, { dataSources }, info) => {
        return dataSources.userAPI.getUserById(id);
      },
      users: (_, __, { dataSources }, info) => {
        return dataSources.userAPI.getAllUsers();
      },
      userByName: (_, { first_name, last_name }, { dataSources }, info) => {
        return dataSources.userAPI.getUserByName(first_name, last_name);
      },
      measurement: (_, { measurement_id }, { dataSources }, info) => {
        return dataSources.measurementAPI.getMeasurementById(measurement_id);
      },
      measurements: (_, __, { dataSources }, info) => {
        return dataSources.measurementAPI.getAllMeasurements();
      },
      measurementsByID: (_, { user_id }, { dataSources }, info) => {
        return dataSources.measurementAPI.getMeasurementsById(user_id);
      },
      measurementsByName: (_, { user_id }, { dataSources }, info) => {
        return dataSources.measurementAPI.getMeasurementsByName(user_id);
      },
    },
    Mutation: {
      createOrUpdateUser: (_, user_info , { dataSources }, info) => {
        return dataSources.userAPI.createOrUpdateUser(user_info);
      },
      deleteUser: (_, { user_id }, { dataSources }, info) => {
        return dataSources.userAPI.deleteUser(user_id);
      },
      deleteUserByName: (_, user_info, { dataSources }, info) => {
        return dataSources.userAPI.deleteUserByName(user_info);
      }
  }
}

module.exports = resolvers;