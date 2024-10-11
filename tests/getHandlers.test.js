// eslint-disable-next-line no-undef
const config = require('../config');
// eslint-disable-next-line no-undef
const entities = require('../entities/entities.js');
// eslint-disable-next-line no-undef
const getHandlersFuncs = require('../service/getHandlersFunctions.js');

test('Get response of a list of warehouses return status code 200', async () => {
  try {
    const response = await fetch(`${config.API_URL}/api/v1/warehouses`);
    const responseStatus = response.status;
    expect(responseStatus).toBe(200);
  } catch (error) {
    console.error(error);
  }
});

test('Get response of a list of warehouses return object array with correct object structure', async () => {
  const result = [];
  try {
    const response = await fetch(`${config.API_URL}/api/v1/warehouses`);
    const data = await response.json();
    data.map((warehouse) => {
      if (
        Object.keys(warehouse).length <
        Object.keys(entities.correctWarehouse).length
      ) {
        result.push(false);
        return;
      }
      result.push(
        getHandlersFuncs.validateWarehouseObject(
          warehouse,
          entities.correctWarehouse
        )
      );
    });
  } catch (error) {
    console.error(error);
  }
  expect(result).not.toContain(false);
});
