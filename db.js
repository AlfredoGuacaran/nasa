const pg = require('pg');
const { Pool } = pg;

const config = {
  user: 'postgres',
  host: 'localhost',
  password: '1234',
  database: 'nasa',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

async function postUser(name, email, password) {
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'insert into users (name, email, password) values ($1,$2,$3)',
      values: [name, email, password],
    });
    client.release();
    return res.rowCount
      ? { ok: true }
      : { ok: false, error: 'Email ya se encuentra registrado' };
  } catch (error) {
    return { ok: false, error: 'Email ya se encuentra registrado' };
  }
}

async function postUser(name, email, password) {
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'insert into users (name, email, password) values ($1,$2,$3)',
      values: [name, email, password],
    });
    client.release();
    return res.rowCount
      ? { ok: true }
      : { ok: false, error: 'Email ya se encuentra registrado' };
  } catch (error) {
    return { ok: false, error: 'Email ya se encuentra registrado' };
  }
}

async function getUser(email) {
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'select * from users where email = $1',
      values: [email],
    });
    client.release();
    return res.rows[0]
      ? { ok: true, data: res.rows[0] }
      : { ok: false, error: 'Contraseña o usuario incorrecto' };
  } catch (error) {
    return { ok: false, error: 'Contraseña o usuario incorrecto' };
  }
}

module.exports = { postUser, getUser };
