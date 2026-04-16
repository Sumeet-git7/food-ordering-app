# Base image
FROM node:18

# Working directory
WORKDIR /app

# Copy files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Expose port
EXPOSE 5000

# Run app
CMD ["node", "server.js"]