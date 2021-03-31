import { add } from "./index"

test("add to integers", function () {
  expect(add(1, 5)).toEqual(6);
})