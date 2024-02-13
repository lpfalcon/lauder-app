const request = require('supertest')
const app = require('../routes/index.js')
const {rideData} = require('../utils/testDummyData.js')
const { configProcess } = require('../config/dotenvConfig.js')

describe('POST /api/rides/create', () => {
    it('should create a ride', async () => {
        return await request(app)
            .post('/api/rides/create')
            .set('Authorization',  `Bearer ${configProcess("USER_TOKEN")}`)
            .send(rideData)
            .then((res) => {
                expect([201, 202]).toContain(res.statusCode)
            });
    })
})