## Invenrory manager
APIS are Aostly complete 

to run 
```sh
cd apps/backend
npm run dev
```
documnetation is on `/api/v1/ui`

 ### using docker 

```Dockerfile
 # Build image
docker build -t inventory-api -f apps/backend/Dockerfile .

# Run container
docker run -d \
  --name inventory-api \
  -p 5000:5000 \
  inventory-api

# Stop container
docker stop inventory-api

# Remove container
docker rm inventory-api

# Remove image
docker rmi inventory-api

# One-line cleanup
docker stop inventory-api && \
docker rm inventory-api && \
docker rmi inventory-api
```
