function validateWarehouseObject(obj, objPrototype) {
  const validateWorkingHours = (hours, prototypeHours) => {
    if (Object.keys(hours).length !== 2) return false;
    if (!hours.start || !hours.end) return false;
    return (
      typeof hours.start === typeof prototypeHours.start &&
      typeof hours.end === typeof prototypeHours.end
    );
  };

  for (const [property, value] of Object.entries(obj)) {
    const prototypeValue = objPrototype[property];

    if (prototypeValue === undefined || prototypeValue === null) {
      return false;
    }

    if (typeof value !== typeof prototypeValue) {
      return false;
    }

    if (property === 'workingHours') {
      if (!validateWorkingHours(value, prototypeValue)) {
        return false;
      }
    }
  }

  return true;
}

// eslint-disable-next-line no-undef
module.exports = {
  validateWarehouseObject,
};
