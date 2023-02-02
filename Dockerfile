# Use an official node image as the base image
FROM node:19.5.0

ARG PORT

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the app's dependencies in the container
RUN npm install

# Copy the rest of the app's files to the container
COPY . .

# Specify the command to run when the container starts
CMD ["node", "index.js"]

# Expose the app's default port
EXPOSE 3000
