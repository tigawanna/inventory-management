# Docker commands

> [!NOTE]
> These commands should be run from the root directory of the monorepo

1. Build the image (current command)

```sh
   sudo docker build -t inventory-hono -f apps/hono/Dockerfile .

```

2. Run the container

```sh
   sudo docker run -d \
     --name inventory-hono-api \
     -p 5000:80 \
     inventory-hono
```

3. Verify container is running

```sh
    sudo docker ps
```

4. Check logs if needed

```sh
    sudo docker logs inventory-hono-api
```

5. Access the application
   Open browser at [http://localhost:5000](http://localhost:5000)

6. Stop and remove the container

```sh
    sudo docker stop inventory-hono-api
    sudo docker rm inventory-hono-api
```
