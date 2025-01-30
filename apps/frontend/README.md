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

responsiveness is handled by having data lists as tabeles on lagers screen and as cards on smaller screen 
![table iew](https://raw.github.com/tigawanna/inventory-management/blob/main/apps/frontend/docs/table-view.png)
![card view](https://raw.github.com/tigawanna/inventory-management/blob/main/apps/frontend/docs/card-view.png)
while the dialogs are modals on larger screesn and drawers on smaller screens 
![modal view](https://raw.github.com/tigawanna/inventory-management/blob/main/apps/frontend/docs/modal-view.png)
![drawer view](https://raw.github.com/tigawanna/inventory-management/blob/main/apps/frontend/docs/drawer-view.png)
