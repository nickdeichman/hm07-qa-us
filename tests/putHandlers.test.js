// eslint-disable-next-line no-undef
const config = require('../config');
const kitId = 5;
const nonExistedKitId = 7;

const expectedTrueResult = {
  ok: true,
};

const expectedFailResult = {
  code: 404,
  message: 'Not Found',
};

const correctRequestBody = {
  name: 'My modified kit',
  productsList: [
    {
      id: 1,
      quantity: 4,
    },
    {
      id: 5,
      quantity: 2,
    },
    {
      id: 3,
      quantity: 1,
    },
    {
      id: 4,
      quantity: 1,
    },
  ],
};

test('Response on changing the kit is successful with status code 200 and expected result', async () => {
  const response = await fetch(`${config.API_URL}/api/v1/kits/${kitId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(correctRequestBody),
  });

  expect(response.status).toBe(200);

  const actualResult = await response.json();
  expect(actualResult).toMatchObject(expectedTrueResult);
});


test('Response on changing the kit that not exists is code 404', async () => {
  const response = await fetch(`${config.API_URL}/api/v1/kits/${nonExistedKitId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(correctRequestBody),
  });

  expect(response.status).toBe(404);

  const actualResult = await response.json();
  expect(actualResult).toMatchObject(expectedFailResult);
});
