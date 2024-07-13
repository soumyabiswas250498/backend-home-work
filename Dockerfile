FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies including bcrypt
RUN npm install

# If bcrypt requires build tools, install them
RUN apt-get update && apt-get install -y python3 make g++

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the app
CMD ["node", "index.js"]
