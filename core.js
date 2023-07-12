// 测试集合
const tests = [];
const onlys = [];
const beforeAlls = [];
const beforeEachs = [];
const afterAlls = [];
const afterEachs = [];
export function test(name, callback) {
  tests.push({ name, callback });
}

test.only = (name, callback) => {
  onlys.push({ name, callback });
};

/** it = test */
export const it = test;

export function beforeAll(callback) {
  beforeAlls.push(callback);
}

export function beforeEach(callback) {
  beforeEachs.push(callback);
}

export function afterAll(callback) {
  afterAlls.push(callback);
}

export function afterEach(callback) {
  afterEachs.push(callback);
}

export function expect(actual) {
  return {
    toBe: function (expected) {
      // try {
      if (actual === expected) {
        return true;
      } else {
        throw new Error(`fail actual: ${actual} expected: ${expected}`);
      }
      // } catch (e) {
      //   console.log(e.message);
      // }
    },
    // toEqual
  };
}

export function describe(name, callback) {
  callback();
}

export function run() {
  // if (beforeAlls.length) {
  //   beforeAlls.forEach((i) => i());
  // }

  for (const beforeAllCallback of beforeAlls) {
    beforeAllCallback();
  }

  const suit = onlys.length > 0 ? onlys : tests;
  for (const test of suit) {
    for (const beforeEachCallback of beforeEachs) {
      beforeEachCallback();
    }

    try {
      test.callback();
      console.log(`ok: ${test.name}`);
    } catch (e) {
      console.log(`fail: ${test.name}`);
      console.log(`reason: ${e}`);
    }

    for (const afterEachCallback of afterEachs) {
      afterEachCallback();
    }
  }

  for (const afterAllCallback of afterAlls) {
    afterAllCallback();
  }
}
