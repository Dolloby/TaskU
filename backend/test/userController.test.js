const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

describe ('apideusuario', () => {
    let token 
    const user = {mail: 'kankun30@hotmail.com', pass: 'SegundaClave'}
    const baduser = { mail: 'prueba@example.com', pass: '123456' }

    //Prueba de Login
    test('Login exitoso', async () => {
        const response = await request(app).post('/api/user/login').send(user)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message', 'Login exitoso')
        token = response.body.token
    })

    test('Login fallido con credenciales incorrectas', async () => {
        const response = await request(app).post('/api/user/login').send(baduser)
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Credenciales incorrectas');
    });
    //Prueba de Registro
    test('Registro exitoso', async () => {
        const newuser = { 
            name: 'Felipe',
            lastname: 'Torres',
            mail: 'ftorres35@example.com',
            pass: '123456',
            phone: '3101234567',
            address: 'Medellin'
        }
        const response = await request(app).post('/api/user/register').send(newuser)
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', 'Usuario registrado exitosamente')
    })
    // test('Registro fallido con datos incorrectos', async () => {
    //     const newbaduser = { 
    //         name: 'Felipe',
    //         lastname: 'Torres',
    //         mail: 'ftorres3@example.com',
    //         pass: '123456',
    //         phone: '3101234567',
    //         address: 'Medellin'
    //     }
    //     const response = await request(app).post('/api/user/register').send({newbaduser})
    //     expect(response.status).toBe(500);
    //     expect(response.body).toHaveProperty('error', 'Error al registrar usuario');
    // });
})
