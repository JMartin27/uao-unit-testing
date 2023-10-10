import { describe, test, expect, jest } from '@jest/globals';
import { generateFibonacciSequence, getUsers } from '../moduleTwo.mjs';
import axios from 'axios';

describe('generateFibonacciSequence', () => {
  test('genera la secuencia de Fibonacci correctamente', () => {
    const limit = 10;
    const expected = [0, 1, 1, 2, 3, 5, 8];
    const result = generateFibonacciSequence(limit);

    expect(result).toEqual(expected);
  });


  test('lanza un error si el límite es menor o igual a 0', () => {
    const limit = 0;
    expect(() => generateFibonacciSequence(limit)).toThrow('Limit must be greater than 0');
  });
});


describe('getUsers', () => {
  test('obtiene usuarios correctamente', async () => {
    const response = {
      status: 200,
      data: [{ name: 'Alice' }, { name: 'Bob' }]
    };
    const axiosMock = jest.spyOn(axios, 'get');
    axiosMock.mockResolvedValue(response);

    const result = await getUsers();

    expect(result.length).toBe(2);

    axiosMock.mockRestore();
  });


  test('lanza un error si no se encuentran usuarios', async () => {
    const response = {
      status: 200,
      data: []
    };
    const axiosMock = jest.spyOn(axios, 'get');

    axiosMock.mockResolvedValue(response);

    await expect(getUsers()).rejects.toThrow('No users found');


    axiosMock.mockRestore();
  });

  test('lanza un error si el usuario es "Clementine"', async () => {
    const response = {
      status: 200,
      data: [{ name: 'Clementine' }]
    };
    const axiosMock = jest.spyOn(axios, 'get');
    axiosMock.mockResolvedValue(response);

    await expect(getUsers()).rejects.toThrow('Clementine is not allowed');


    axiosMock.mockRestore();
  });
});