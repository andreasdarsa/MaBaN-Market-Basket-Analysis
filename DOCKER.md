# Docker Setup for MaBaN

This document provides additional information about the Docker setup for the MaBaN Market Basket Analysis application.

## Quick Start

```bash
# Build and start the container
docker-compose up --build

# Access the application at http://localhost:5000
```

## Docker Files

### Dockerfile
- Based on `python:3.11-slim` for optimal size and performance
- Installs system dependencies (gcc, g++) required for some Python packages
- Sets up the Flask application to run on port 5000
- Configures environment variables for Docker environment detection

### docker-compose.yml
- Defines the MaBaN service
- Maps port 5000 from container to host
- Mounts the uploads directory for data persistence
- Sets Flask environment variables

### .dockerignore
- Excludes unnecessary files from the Docker build context
- Reduces build time and image size
- Excludes virtual environments, cache files, and development artifacts

## Usage Commands

### Start the application
```bash
docker-compose up
```

### Start in detached mode (background)
```bash
docker-compose up -d
```

### Rebuild the image
```bash
docker-compose up --build
```

### Stop the application
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

### Access container shell
```bash
docker exec -it maban-market-basket-analysis /bin/bash
```

## Environment Variables

- `FLASK_APP`: Points to the backend application
- `FLASK_ENV`: Set to development mode
- `FLASK_DEBUG`: Enables debug mode
- `DOCKER_ENV`: Indicates running in Docker (disables browser auto-open)
- `PYTHONUNBUFFERED`: Ensures Python output is not buffered

## Data Persistence

The `backend/uploads` directory is mounted as a volume, ensuring that uploaded CSV files persist even if the container is stopped or removed.

## Network Configuration

The application is configured to bind to `0.0.0.0:5000` inside the container, which is mapped to `localhost:5000` on the host machine.

## Troubleshooting

### Port already in use
If port 5000 is already in use, you can change it in `docker-compose.yml`:
```yaml
ports:
  - "8080:5000"  # Map host port 8080 to container port 5000
```

### Permission issues with uploads
Make sure the `backend/uploads` directory has appropriate permissions:
```bash
mkdir -p backend/uploads
chmod 777 backend/uploads  # Or more restrictive as needed
```

### Container doesn't start
Check the logs:
```bash
docker-compose logs
```

### Rebuild after requirements.txt changes
```bash
docker-compose down
docker-compose up --build
```

## Production Considerations

For production use, consider:
1. Using a production WSGI server like Gunicorn instead of Flask's development server
2. Setting `FLASK_ENV=production` and `FLASK_DEBUG=0`
3. Using multi-stage builds to reduce image size
4. Adding health checks
5. Using Docker secrets for sensitive configuration
6. Setting up proper logging and monitoring
