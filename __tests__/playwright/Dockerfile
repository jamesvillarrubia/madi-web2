# Use the official Node.js image as the base image
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the root directory
COPY ./package*.json ./

# Install dependencies
RUN npm ci

# Install Playwright and its dependencies
RUN npx playwright install --with-deps

# Copy the rest of the application code from the root directory
COPY . .

# Expose the port the app runs on (if applicable)
# EXPOSE 3000

# Command to run the Playwright tests
CMD ["npx", "playwright", "test"]

# docker build --progress=plain -t playwright-tests -f ./__tests__/playwright/Dockerfile .;
# docker run --rm -v $(pwd)/playwright-report:/app/playwright-report playwright-tests
