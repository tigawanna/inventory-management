# Docker commands 

> [!NOTE] 
> These commands should be run from the root directory of the monorepo

1. Build the image (current command)
   ```sh
   sudo docker build -t inventory-ui -f apps/frontend/Dockerfile .
   ```

2. Run the container
```sh
   sudo docker run -d \
     --name inventory-frontend \
     -p 3000:80 \
     inventory-ui
 ```

3. Verify container is running
```sh
    sudo docker ps
   ```

4. Check logs if needed
```sh
    sudo docker logs inventory-frontend
   ```

5. Access the application
   Open browser at [http://localhost:3000](http://localhost:3000)

6. Stop and remove the container
```sh
    sudo docker stop inventory-frontend
    sudo docker rm inventory-frontend
   ```
