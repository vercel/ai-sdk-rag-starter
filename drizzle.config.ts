import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  host: '127.0.0.1',
  port: 5432,
  username: 'lucamazzarello_',
  password: 'proyectotd8',
  database: 'ONWIP',
  schema: 'public', // Opcional: el esquema que estás utilizando, por defecto es 'public'
  ssl: false, // Añade esta línea para desactivar SSL
  out: './drizzle',
});
