const fs = require('node:fs/promises');
const { v4: generateId } = require('uuid');

async function readData() {
  const data = await fs.readFile('users.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile('users.json', JSON.stringify(data));
}

async function getAll() {
  const storedData = await readData();
  return storedData.users ?? [];
}

async function add(user) {
  const storedData = await readData();
  storedData.users = storedData.users || [];
  storedData.users.unshift({ ...user, id: user.id ?? generateId() });
  await writeData(storedData);
}

module.exports = { getAll, add };
