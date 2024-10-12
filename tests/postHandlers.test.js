// eslint-disable-next-line no-undef
const config = require('../config');

const requestBodyForWarehouseAmount = {
  ids: [1, 4, 44],
};
const incorrectRequestBodyForWarehouseAmount = {
  ids: [-1],
};

const expectedQuantityResult = {
  'Everything You Need': {
    'Sprite Soft Drink': 9,
    'Gourmet Popcorn Kernels': 6,
  },
  'Food City': {
    'Orange Juice - Cold-Pressed, No Added Sugar, Preservative Free': 3,
    'Sprite Soft Drink': 12,
  },
  'Big World': {
    'Orange Juice - Cold-Pressed, No Added Sugar, Preservative Free': 1,
  },
  'Fresh Food': {
    'Orange Juice - Cold-Pressed, No Added Sugar, Preservative Free': 3,
    'Sprite Soft Drink': 12,
  },
};

test('Receive response code 500 at POST request on "/api/v1/warehouses/amount" endpoint with incorrect data', async () => {
  const response = await fetch(`${config.API_URL}/api/v1/warehouses/amount`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(incorrectRequestBodyForWarehouseAmount),
  });
  expect(response.status).toBe(500);
});

test('Receive expected quantity at each warehouse result at POST request and response code 200 on "/api/v1/warehouses/amount" endpoint', async () => {
  const response = await fetch(`${config.API_URL}/api/v1/warehouses/amount`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBodyForWarehouseAmount),
  });
  const actualResult = await response.json();
  expect(response.status).toBe(200);
  // Check if the response is an object
  expect(typeof actualResult).toBe('object');

  // Check if the response keys match the expected result keys
  expect(Object.keys(actualResult)).toEqual(
    Object.keys(expectedQuantityResult)
  );

  // Check if each warehouse in the response has the expected products and quantities
  for (const warehouseName in actualResult) {
    expect(actualResult[warehouseName]).toEqual(
      expectedQuantityResult[warehouseName]
    );
  }
});
