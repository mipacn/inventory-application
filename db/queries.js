import pool from "./pool.js"

export async function getTables() {
	const tables = await pool.query(
		"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' -- Replace 'public' with your schema name if different AND table_type = 'BASE TABLE'"
	)
	return tables
}

export async function getItems(table) {
	const items = await pool.query(`SELECT * FROM ${table}`)
	return items
}

export async function addItem(table, item) {
	await pool.query(`INSERT INTO ${table} (${table}) VALUES ($1)`, [item])
}

export async function deleteItem(table, item) {
	await pool.query(`delete from ${table} where ${table} = $1`, [item])
}

export async function editItem(table, oldValue, newValue) {
	await pool.query(
		`UPDATE "${table}" SET "${table}" = $1 WHERE "${table}" = '${oldValue}'`,
		[newValue]
	)
}

export async function addTable(tableName) {
	const tables = await getTables()
	let duplicate = false
	tables.rows.forEach((table) => {
		if (table.table_name === tableName) duplicate = true
	})
	if (duplicate) return

	const validIdentifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/
	if (!validIdentifierRegex.test(tableName)) return
	await pool.query(
		`CREATE TABLE ${tableName} (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,${tableName} VARCHAR ( 255 ) UNIQUE NOT NULL)`
	)
}

export async function deleteTable(table) {
	await pool.query(`drop table ${table}`)
}

export async function editTable(oldTable, newTable) {
	const tables = await getTables()
	let duplicate = false
	tables.rows.forEach((table) => {
		if (table.table_name === newTable) duplicate = true
	})
	if (duplicate) return

	const validIdentifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/
	if (!validIdentifierRegex.test(newTable)) return
	await pool.query(`ALTER TABLE "${oldTable}" RENAME TO "${newTable}"`)
	await pool.query(
		`ALTER TABLE "${newTable}" RENAME COLUMN "${oldTable}" TO "${newTable}"`
	)
}
