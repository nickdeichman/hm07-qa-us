// eslint-disable-next-line no-undef
const config = require('../config');
const expectedResult = [
  {
    name: 'Everything You Need',
    workingHours: {
      start: 7,
      end: 23,
    },
  },
  {
    name: 'Fresh Food',
    workingHours: {
      start: 8,
      end: 23,
    },
  },
  {
    name: 'Food City',
    workingHours: {
      start: 8,
      end: 21,
    },
  },
  {
    name: 'Big World',
    workingHours: {
      start: 5,
      end: 20,
    },
  },
];

test('Get response of a list of warehouses return status code 200 and object array with correct object structure', async () => {
  const response = await fetch(`${config.API_URL}/api/v1/warehouses`);
  expect(response.status).toBe(200);

  const actualResult = await response.json();
  expect(actualResult).toEqual(expectedResult);
});

test('Check the correctness of response structure', async () => {
  const response = await fetch(`${config.API_URL}/api/v1/warehouses`);
  const actualResult = await response.json();
  
  expect(Array.isArray(actualResult)).toBe(true);
  // Check if each object in the array has the correct structure
  actualResult.forEach((warehouse) => {
    expect(warehouse).toHaveProperty('name', expect.any(String));
    expect(warehouse).toHaveProperty('workingHours', expect.any(Object));
    expect(warehouse.workingHours).toHaveProperty('start', expect.any(Number));
    expect(warehouse.workingHours).toHaveProperty('end', expect.any(Number));
  });
});

test('Check the time of response on GET request less than 1 sec', async () => {
  const startTime = performance.now();
  // eslint-disable-next-line no-unused-vars
  const response = await fetch(`${config.API_URL}/api/v1/warehouses`);
  const endTime = performance.now();
  const responseTime = endTime - startTime;
  expect(responseTime).toBeLessThan(1000); // Response time should be less than 1 second
});
