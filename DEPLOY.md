# Guía de Despliegue en Vercel

## Requisitos Previos

1. Cuenta en [Vercel](https://vercel.com)
2. Cuenta en GitHub (ya tienes el repo)
3. Base de datos PostgreSQL (ver opciones gratis abajo)

## Paso 1: Crear Base de Datos PostgreSQL (GRATIS)

### Opción A: Neon (Recomendada)
1. Ve a [neon.tech](https://neon.tech) y regístrate gratis
2. Crea un nuevo proyecto
3. Crea una base de datos llamada `perfumeria_lujo`
4. En "Connection Details", copia la **Connection String** (URL)
5. Se verá algo así:
   ```
   postgresql://usuario:password@host.neon.tech/perfumeria_lujo?sslmode=require
   ```

### Opción B: Supabase
1. Ve a [supabase.com](https://supabase.com) y regístrate
2. Crea un nuevo proyecto
3. Ve a "Project Settings" → "Database"
4. Copia la "Connection string" del modo "URI"

### Opción C: Vercel Postgres
1. En tu dashboard de Vercel, ve a tu proyecto
2. Ve a "Storage" → "Create Database"
3. Selecciona "Neon" o "Postgres"
4. Copia la connection string

## Paso 2: Configurar Variables de Entorno en Vercel

1. En tu dashboard de Vercel, selecciona el proyecto
2. Ve a "Settings" → "Environment Variables"
3. Agrega las siguientes variables:

### Obligatorias:
- `DATABASE_URL` = [La URL de PostgreSQL que copiaste]
- `AUTH_SECRET` = `MnauRAyl7M+D3HgJwDKbJSa5NQdgtK/C97VVfD2EUiU=` (o genera una nueva con `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`)

### Opcionales (solo si quieres usarlas):
- `STRIPE_SECRET_KEY` = `sk_test_...` (si quieres pagos con Stripe)
- `NEXT_PUBLIC_APP_URL` = `https://tu-proyecto.vercel.app` (se detecta automáticamente si no está)
- `AUTH_GOOGLE_ID` y `AUTH_GOOGLE_SECRET` (para login con Google)
- `AUTH_APPLE_ID` y `AUTH_APPLE_SECRET` (para login con Apple)

## Paso 3: Reconstruir el Proyecto

Después de agregar las variables, ve a "Deployments" y haz clic en los 3 puntos de tu último deploy, luego selecciona "Redeploy".

O simplemente haz un nuevo push a GitHub.

## Paso 4: Migrar la Base de Datos

Una vez desplegado, necesitas correr las migraciones de Prisma en la base de datos de producción:

### Opción 1: Usando Vercel CLI
```bash
npx vercel env pull .env.production
npx prisma migrate deploy
```

### Opción 2: Desde el dashboard de Neon/Supabase
Usa el SQL Editor para correr las migraciones manualmente.

### Opción 3: Usando un script de seed (después de migrar)
```bash
DATABASE_URL="tu_url_de_produccion" npx prisma db seed
```

## Notas Importantes

- La app funciona **sin Stripe** - las órdenes se guardan como "pendientes de pago manual"
- La app funciona **sin OAuth** - solo con login por email/contraseña
- Solo necesitas PostgreSQL + AUTH_SECRET para que funcione
