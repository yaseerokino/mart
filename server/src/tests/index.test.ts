import request from 'supertest';
import app from '../app';

describe('[GET] /api', () => {
  it('return message and status code', async () => {
    const res = await request(app).get(`/api`);
    expect(res.body.message).toBe('You have hit Mart API endpoint');
    expect(res.statusCode).toBe(200);
  });
});
