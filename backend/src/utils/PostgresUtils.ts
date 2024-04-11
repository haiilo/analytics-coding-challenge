import pg from 'pg';

let pool: pg.Pool;

function initPool(): void {
  const database = process.env.POSTGRES_DATABASE ?? 'postgres';
  const user = process.env.POSTGRES_USERNAME ?? 'user';
  const password = process.env.POSTGRES_PASSWORD ?? 'password';
  const host = process.env.POSTGRES_HOST ?? 'localhost';
  const port = Number(process.env.POSTGRES_PORT) || 5432;

  if (!database || !user || !password) {
    throw new Error('Missing Postgres config parameters');
  }

  console.log('Initialize Postgres connection.');

  const config: pg.PoolConfig = {
    database,
    user,
    password,
    host,
    port,

    min: 1,
    max: 100,
    idleTimeoutMillis: 60 * 60 * 1000, // close idle clients after X milliseconds
    connectionTimeoutMillis: 1000, // return an error after X milliseconds if connection could not be established
    maxUses: 7500, // close (and replace) a connection after it has been used X times
  };

  pool = new pg.Pool(config);

  doQuery('SELECT NOW()')
    .then(() => console.log('Postgres connection established.'))
    .catch(() => console.error('Postgres connection failed.'));
}

async function closePool() {
  await pool.end();
}

async function doQuery<T extends object>(sql: string): Promise<T[]> {
  return pool
    .query(sql)
    .then(result => {
      const { rows } = result;

      return rows ?? [];
    })
    .catch(error => {
      console.error(error);

      throw new Error('An unexpected error occurred.');
    });
}

export { initPool, doQuery, closePool };
