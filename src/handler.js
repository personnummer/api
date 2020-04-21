'use strict';

const personnummer = require('personnummer');

/**
 * Base response body.
 *
 * @var {object}
 */
const baseResBody = {
  meta: {
    name: 'personnummer-api',
    spec: '3.0.0',
    version: '1.0.0',
  },
  data: {},
};

/**
 * Convert class to object.
 *
 * @param {object} theClass
 *
 * @return {object}
 */
const classToObject = (theClass) => {
  const originalClass = theClass || {};
  const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(originalClass));
  return keys.reduce((classAsObj, key) => {
    classAsObj[key] = originalClass[key];
    return classAsObj;
  }, {});
};

module.exports = (event, context) => {
  const pin = event.body.ssn || event.body.pin;
  let resBody = baseResBody;

  switch (event.path) {
    case '/parse':
      try {
        const p = personnummer.parse(pin);

        resBody.data = Object.assign(
          {
            age: p.getAge(),
            coordination_number: p.isCoordinationNumber(),
            format_long: p.format(true),
            format_short: p.format(),
            female: p.isFemale(),
            male: p.isMale(),
            valid: true,
          },
          classToObject(p)
        );

        // use snake case.
        resBody.data.full_year = res.data.fullYear;
        delete resBody.data.fullYear;
      } catch (e) {
        resBody.data.valid = false;
      }
      break;
    case '/validate':
      resBody = Object.assign(baseResBody, {
        data: {
          valid: personnummer.valid(pin),
        },
      });
      break;
    default:
      break;
  }

  context
    .headers({
      'Content-Type': 'application/json',
    })
    .status(200)
    .succeed(resBody);
};
