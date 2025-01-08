# Use an official Node.js image as the base
FROM node:23-alpine

# Set the working directory to /app
WORKDIR /backend

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the API will run on
EXPOSE 5000

# Run the command to start the API when the container launches
CMD ["npm", "start"]
