const request = require('supertest')
const app = require('../routes/index.js');

describe('GET /api/users', () => {
    it('should show a list of users', async () => {
        return await request(app)
            .get('/api/users')
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200)
            });
    })
})