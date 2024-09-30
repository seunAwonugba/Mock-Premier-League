# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all files from the current directory to the working directory
COPY . .

# Development stage
FROM builder AS development
# Set NODE_ENV to development
ENV NODE_ENV=development

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application(in development)
CMD ["npm", "run", "dev"]

# Production stage
FROM builder AS production
# Set NODE_ENV to production
ENV NODE_ENV=production

# Run any production-specific build steps if needed here

# Run the production command
CMD ["npm", "start"]