const knex = require("../database/knex");
const { DataSource } = require("apollo-datasource");

class userAPI extends DataSource {
    constructor({ knexInstance }) {
        super();
        this.knex = knexInstance;
      }

    async getAllUsers() {
        try {
            const users = await this.knex.select().from('users');
            return users;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getUserById(id) {
        try {
            const user = await this.knex
                .select()
                .from('users')
                .where({ id })
                .first();
                return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getUserByName(firstName, lastName) {
        try {
            const user = await this.knex
                .select()
                .from('users')
                .where({ first_name: firstName, last_name: lastName })
                .first();
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createOrUpdateUser(user_info) {
        const { first_name: firstName, last_name: lastName , weight } = user_info;
        const user = await this.getUserByName(firstName, lastName);
        if (!user) {
            return this.createUser(user_info);
        } else {
            return this.updateUser(user_info);
        }
    }

    async createUser(user_info) {
        const { first_name: firstName, last_name: lastName , weight } = user_info;
        const user = await this.getUserByName(firstName, lastName);
        try {
            const newUser = await this.knex('users')
                .insert({
                    first_name: firstName,
                    last_name: lastName,
                    weight: weight
                })
                .returning('*');
            return {
                success: true,
                message: "User successfully created",
                user: newUser[0]
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "User creation failed",
                user: null
            }
        }
    }

    async updateUser(user_info) {
        const { first_name: firstName, last_name: lastName , weight } = user_info;
        try {
            const updatedUser = await this.knex('users')
                .where({ first_name: firstName, last_name: lastName })
                .update({
                    weight: weight
                })
                .returning('*');
                return {
                    success: true,
                    message: "User successfully updated",
                    user: updatedUser[0]
                }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "User update failed",
                user: null
            }
        }
    }

    async deleteUser(user_id) {
        try {
            const deletedUser = await this.knex('users')
                .where({ id: user_id })
                .del()
                .returning('*');
            if (deletedUser.length == 0) {
                return {
                    success: false,
                    message: "User not found",
                    user: null
                }
            }
            return {
                success: true,
                message: "User successfully deleted",
                user: deletedUser[0]
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "User deletion failed",
                user: null
            }
        }
    }

    async deleteUserByName(user_info) {
        const { first_name: firstName, last_name: lastName } = user_info;
        try {
            const deletedUser = await this.knex('users')
                .where({ first_name: firstName, last_name: lastName })
                .del()
                .returning('*');
            if (deletedUser.length == 0) {
                return {
                    success: false,
                    message: "User not found",
                    user: null
                }
            }
            return {
                success: true,
                message: "User successfully deleted",
                user: deletedUser[0]
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "User deletion failed",
                user: null
            }
        }
    }
}

module.exports = userAPI;