import mongoose  from "mongoose";
import supertest from "supertest"

import app              from "../app";
import User             from "../models/user.js";
import { initialUsers } from "./test_helper.js";

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})

	for (let user of initialUsers) {
		await api
			.post('/api/users')
			.send(user)
	}
})

describe('only valid users are added', () => {
	test('username should be unique', async () => {
		const user = {
			username: 'Michael',
			name: 'Michael Chan',
			password: '1234'
		}

		await api
			.post('/api/users')
			.send(user)
			.expect(400)
	})

	test("username and password must be 3 characters long", async () => {
		const user1 = {
			username: 'ab',
			name: 'test user',
			password: "1234"
		}

		await api
			.post('/api/users')
			.send(user1)
			.expect(400)

		const user2 = {
			username: 'abcde',
			name: 'test user',
			password: "123"
		}

		await api
			.post('/api/users')
			.send(user2)
			.expect(400)
	})

	test('username and password is required', async () => {
		const user1 = {
			name: "test user",
			password: '1234'
		}

		await api
			.post('/api/users')
			.send(user1)
			.expect(400)

		const user2 = {
			username: 'username',
			name: 'test user'
		}

		const res = await api
			.post('/api/users')
			.send(user2)
			.expect(400)
	})
})

afterAll(() => {
	mongoose.connection.close()
})