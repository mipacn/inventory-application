#! /usr/bin/env node

import { Client } from "pg"
import "dotenv/config"

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  usernames VARCHAR ( 255 )
);

INSERT INTO usernames (usernames) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');

CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  cars VARCHAR ( 255 )
);

INSERT INTO cars (cars) 
VALUES
  ('honda'),
  ('toyota'),
  ('lambo');

CREATE TABLE IF NOT EXISTS billionaires (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  billionaires VARCHAR ( 255 )
);

INSERT INTO billionaires (billionaires) 
VALUES
  ('warren'),
  ('elon'),
  ('mark');
`
async function main() {
	console.log("seeding...")
	const client = new Client({ connectionString: process.env.DATABASE_URL })
	await client.connect()
	await client.query(SQL)
	await client.end()
	console.log("done")
}

main()
