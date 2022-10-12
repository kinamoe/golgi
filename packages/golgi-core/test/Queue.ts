import { StackQueue } from "../src/StackQueue.js";
import { AsyncStackQueue } from "../src/AsyncStackQueue.js";

test("StackQueue", () => {
  const q = new StackQueue<number>();
  expect(q.dequeue()).toBe(undefined);
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  expect(q.dequeue()).toBe(1);
  expect(q.getCount()).toBe(2);
  expect(q.dequeue()).toBe(2);
  expect(q.isEmpty()).toBe(false);
  q.clear();
  expect(q.isEmpty()).toBe(true);
  expect(q.dequeue()).toBe(undefined);
});

test("AsyncStackQueue", async () => {
  const q = new AsyncStackQueue<number>();
  const d1 = q.dequeue();
  await q.enqueue(1);
  await q.enqueue(2);
  await expect(d1).resolves.toBe(1);
  await q.enqueue(3);
  await expect(q.dequeue()).resolves.toBe(2);
  await expect(q.getCount()).resolves.toBe(1);
  await expect(q.isEmpty()).resolves.toBe(false);
  await q.clear();
  await expect(q.isEmpty()).resolves.toBe(true);
});
