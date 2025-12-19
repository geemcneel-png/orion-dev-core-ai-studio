# Step 1: Build the React App
FROM node:18-alpine as build-step
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Set up the Python/Flask Server
FROM python:3.10-slim
WORKDIR /app
COPY --from=build-step /app/dist /app/dist
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

# Start the Flask API
CMD ["python", "main.py"]
