import {
	getTables,
	getItems,
	addItem,
	deleteItem,
	editItem,
	addTable,
	deleteTable,
	editTable,
} from "../db/queries.js"

export async function renderTables(req, res) {
	const tables = await getTables()
	res.render("index", { tables: tables.rows })
}

export async function renderItems(req, res) {
	const table = req.params.table
	const items = await getItems(table)
	res.render("items", { items: items.rows, table })
}

export async function insertItem(req, res) {
	if (req.body["add-item"] !== "") {
		const items = await getItems(req.params.table)
		const found = items.rows.find((item) => item.cars === req.body["add-item"])
		if (!found) await addItem(req.params.table, req.body["add-item"])
	}

	res.redirect(`/${req.params.table}`)
}

export async function removeItem(req, res) {
	const table = req.params.table
	const item = req.params.item
	await deleteItem(table, item)
	res.redirect(`/${req.params.table}`)
}

export async function updateItem(req, res) {
	const oldValue = req.params.item
	const newValue = req.body["updated-item"]
	await editItem(req.params.table, oldValue, newValue)
	res.redirect(`/${req.params.table}`)
}

export async function createTable(req, res) {
	await addTable(req.body["add-table"])
	res.redirect("/")
}

export async function removeTable(req, res) {
	await deleteTable(req.params.table)
	res.redirect("/")
}

export async function updateTable(req, res) {
	const oldValue = req.params.table
	const newValue = req.body["updated-table"]
	await editTable(oldValue, newValue)
	res.redirect(`/`)
}
