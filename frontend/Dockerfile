# Use Node.js official image as base
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the frontend will run on (adjust port if necessary)
EXPOSE 5173

# Run the React app (assuming you're using npm)
CMD ["npm", "run", "dev"]
