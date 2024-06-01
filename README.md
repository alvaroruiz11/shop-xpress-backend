# ShopXpress Backend

## Development pasos

1. Clonar el proyecto
2. Crear `.env` basado `.env.template`
3. Levantar la base de datos con `docker compose up -d`
4. Ejecutar migración de prisma `npx prisma migrate dev`
5. Levantar servidor con `npm run dev`