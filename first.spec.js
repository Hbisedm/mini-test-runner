import {
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  describe,
  test,
  run,
  it,
  expect,
} from "./core.js";

beforeAll(() => {
  console.log("before all: 只会执行一次");
});

beforeEach(() => {
  console.log("before each: 每次执行test逻辑，都会执行一次");
});

test("first test case", () => {
  expect(2).toBe(3);
});

it("second test case", () => {
  expect(2).toBe(2);
});

// test.only("only test case", () => {
//   console.log("only run");
// });

describe("sub", () => {
  test("sub: first test case", () => {
    console.log("sub: first test case");
    expect(2).toBe(2);
  });
});

afterAll(() => {
  console.log("after all");
});

afterEach(() => {
  console.log("after each");
});

run();
