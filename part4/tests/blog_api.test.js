const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('the correct amount of blog posts are returned in the JSON format', async () => {

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
    expect(response.body).toHaveLength(2)
})

afterAll(async () => {
    await mongoose.connection.close()
})