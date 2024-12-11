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
            mail: 'ftorres3@example.com',
            pass: '123456',
            phone: '3101234567',
            address: 'Medellin'
        }
        const response = await request(app).post('/api/user/register').send(newuser)
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', 'Usuario registrado exitosamente')
    })
    test('Registro fallido con datos incorrectos', async () => {
        const newbaduser = { 
            name: 'Felipe',
            lastname: 'Torres',
            mail: 'ftorres3@example.com',
            pass: '123456',
            phone: '3101234567',
            address: 'Medellin'
        }
        const response = await request(app).post('/api/user/register').send({newbaduser})
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Error al registrar usuario');
    });
    // //Prueba de Actualizaci�n de Perfil
    // test('Actualizaci�n de perfil exitosa', async () => {
    //     const response = await request(app).patch('/api/user/update-profile').send({...newuser, telefono: '3107894567' }).set('Authorization', `Bearer ${token}`)
    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty('message', 'Usuario actualizado exitosamente')
    // })
    // test('Actualizaci�n de perfil fallida con datos incorrectos', async () => {
    //     const response = await request(app).patch('/api/user/update-profile').send({...newuser, telefono: '12345678901' }).set('Authorization', `Bearer ${token}`)
    //     expect(response.status).toBe(400);
    //     expect(response.body).toHaveProperty('message', 'El tel�fono debe tener 10 d�gitos');
    // });

})
