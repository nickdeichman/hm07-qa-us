const correctWarehouse = {

  name: 'string',
  workingHours: {
    start: 1,
    end: 1,
  },
};
const incorrectWarehouse = {
  name: 1,
  workingHours: {
    start: 1,
    end: 1,
  },
};

// eslint-disable-next-line no-undef
module.exports = {
  correctWarehouse: correctWarehouse,
  incorrectWarehouse: incorrectWarehouse,
};
