```sh
cd apps/frontend
npm run dev
```

- Vite
- Typescript
- React
- Tanstack router
    - with error boundaries
    - route loading state
    - typesafe query params as sharable state namagement
- Tanstack query
    - with error boundaries
    - query states + caching which makes it okey to call it in multiple components without trerging too many erquests
- Tanstack form
-    - state managemnet for the form
    - built in zod validation using the zod client generated from the openapi doc
- tailwind + daisyui + shadcn
- zod + [kubb for openapi client generation](https://github.com/kubb-labs/kubb#readme)


route structure is
 
- Authentication endpoints
src/routes/auth

- Dashboard
src/routes/dashboard/users/...
src/routes/dashboard/inventory/...

None admin users can't see the audit logs or do hard deletes

responsiveness is handled by having data lists as tables on larger screens

![table iew](https://github.com/tigawanna/inventory-management/raw/main/apps/frontend/docs/table-view.png)

and as cards on smaller screen 

![card view](https://github.com/tigawanna/inventory-management/raw/90bca8bce59d617925526ea2e7c3224518f22be4/apps/frontend/docs/cards-view.png)

Ahile the dialogs are modals on larger screesn

![modal view](https://github.com/tigawanna/inventory-management/raw/main/apps/frontend/docs/modal-view.png)

And drawers on smaller screens 

![drawer view](https://github.com/tigawanna/inventory-management/raw/main/apps/frontend/docs/drawer-view.png)
