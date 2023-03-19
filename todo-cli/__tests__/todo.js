/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todo Test Suite", () => {
  const d_date = (d) => {
    let x= d.toISOString().split("T")[0];
    return x;
  };
  let dateToday = new Date();
  const today = d_date(dateToday);
  const yesterday = d_date(
    new Date(new Date().setDate(dateToday.getDate() - 1))
  );
  const tomorrow = d_date(
    new Date(new Date().setDate(dateToday.getDate() + 1))
  );
  beforeAll(() => {
    [{ title: "Submit wd201", dueDate: today, completed: false },
    { title: "clean house", dueDate: tomorrow, completed: false },
    { title: "go to gym", dueDate: today, completed: true },
    { title: "car wash", dueDate: yesterday, completed: false },
    { title: "watch moive", dueDate: tomorrow, completed: false }
  ].forEach(add)
  });
  test("Take new check", () => {
    const prev = all.length;
    add({ title: "Add new todo", dueDate: tomorrow, completed: false });
    expect(all.length).toBe(prev + 1);
  });
  test("Mark as complete ", () => {
    markAsComplete(3);
    expect(all[3].completed).toBe(true);
  });
  test("OverDue Retrieval Items", () => {
    const over = overdue();
    expect(over.length).toBe(1);
  });
  test("Today Retrieval Items", () => {
    expect(dueToday().length).toBe(2);
  });
  test("Later Retrieval Items", () => {
    expect(dueLater().length).toBe(3);
  });
});