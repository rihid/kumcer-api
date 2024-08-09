# Use the official Bun image with Debian Linux
# Oven is the company name, the creator of Bun
FROM oven/bun:debian

# Create and change to the app directory
WORKDIR /app

# TODO: Reorder the COPY and RUN command to make use of Docker cache
COPY bun.lockb package.json ./

# Install app dependencies
RUN bun install

# Copy app files
COPY . .

# Run the application
CMD ["bun", "start"]