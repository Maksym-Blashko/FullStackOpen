const { test, after, beforeEach, describe } = require('node:test')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const mocData = require('./test_moc_data')

const api = supertest(app)

describe('API tests User', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    describe('POST /api/users', () => {
        test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await User.find({})

            const newUser = {
                username: 'mluukkai',
                name: 'Matti Luukkainen',
                password: 'salainen',
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await User.find({})
            assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            assert(usernames.includes(newUser.username))
        })

        test('missing data returns appropriate error message', async () => {
            const newUser = mocData.invalidUserData.emptyData

            const response = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            assert(response.body.error === 'Username and password are required')
        })

        test('empty username returns appropriate error message', async () => {
            const newUser = mocData.invalidUserData.emptyUsername

            const response = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            assert(response.body.error === 'Username and password are required')
        })

        test('empty password returns appropriate error message', async () => {
            const newUser = mocData.invalidUserData.emptyPassword

            const response = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            assert(response.body.error === 'Username and password are required')
        })

        test('short username returns appropriate error message', async () => {
            const newUser = mocData.invalidUserData.shortUsername

            const response = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            assert(response.body.error === 'Username and password must be at least 3 characters long')
        })

        test('short password returns appropriate error message', async () => {
            const newUser = mocData.invalidUserData.shortPassword

            const response = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            assert(response.body.error === 'Username and password must be at least 3 characters long')
        })

        test('username must be unique', async () => {
            const newUser = mocData.invalidUserData.duplicateUsername

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})