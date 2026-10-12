export const USER_FIELDS = ['name', 'lastname', 'username', 'email'];

const users = [
	{ id: 1, name: 'Alice', lastname: 'Smith', username: 'alice123', email: 'alice@example.com' },
	{ id: 2, name: 'Bob', lastname: 'Johnson', username: 'bob456', email: 'bob@example.com' },
	{ id: 3, name: 'Charlie', lastname: 'Williams', username: 'charlie789', email: 'charlie@example.com' }
];

export class UserModel {
	static findAll({ limit, offset, name, lastname, username, email }) {
		let filteredUsers = users;

		if (name) {
			filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(String(name).toLowerCase()));
		}

		if (lastname) {
			filteredUsers = filteredUsers.filter(user => user.lastname.toLowerCase().includes(String(lastname).toLowerCase()));
		}

		if (username) {
			filteredUsers = filteredUsers.filter(user => user.username.toLowerCase().includes(String(username).toLowerCase()));
		}

		if (email) {
			filteredUsers = filteredUsers.filter(user => user.email.toLowerCase().includes(String(email).toLowerCase()));
		}

		return filteredUsers.slice(offset, offset + limit);
	}

	static emailExists(email, excludedId) {
		const normalizedEmail = email.trim().toLowerCase();
		return users.some(user =>
			user.id !== excludedId && user.email.toLowerCase() === normalizedEmail
		);
	}

	static findById(id) {
		return users.find(user => user.id === Number(id));
	}

	static create(data) {
		const user = {
			id: Math.max(0, ...users.map(existingUser => existingUser.id)) + 1,
			...Object.fromEntries(USER_FIELDS.map(field => [field, data[field].trim()]))
		};
		users.push(user);
		return user;
	}

	static update(id, updates) {
		const user = this.findById(id);
		if (!user) {
			return null;
		}

		Object.assign(user, Object.fromEntries(
			Object.keys(updates).map(field => [field, updates[field].trim()])
		));
		return user;
	}

	static replace(id, data) {
		const userIndex = users.findIndex(user => user.id === Number(id));
		if (userIndex === -1) {
			return null;
		}

		users[userIndex] = {
			id: users[userIndex].id,
			...Object.fromEntries(USER_FIELDS.map(field => [field, data[field].trim()]))
		};
		return users[userIndex];
	}

	static delete(id) {
		const userIndex = users.findIndex(user => user.id === Number(id));
		if (userIndex === -1) {
			return false;
		}

		users.splice(userIndex, 1);
		return true;
	}
}
