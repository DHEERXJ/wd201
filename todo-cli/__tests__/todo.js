const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todo Test Suite", () => {
  const formattedDate = (datee) => {
    return datee.toISOString().split("T")[0];
  };
  let date_of_today = new Date();
  let x = new Date();
  const yesterday = formattedDate(
    new Date(date_of_today.setDate(date_of_today.getDate() - 1))
  );
  const today = formattedDate(date_of_today);
  
  const tomorrow = formattedDate(
    new Date(date_of_today.setDate(date_of_today.getDate() + 1))
  );
  beforeAll(() => {
    add({ title: "go to shop", dueDate: today, completed: true });
    add({ title: "submit wd201", dueDate: yesterday, completed: false });
    add({ title: "buy key", dueDate: today, completed: false });
    add({ title: "current bill", dueDate: tomorrow, completed: false });
    add({ title: "play fh", dueDate: tomorrow, completed: false });
    
  });
  test("Add new todo", () => {
    const len_p = all.length;
    add({ 
        title: "ask money", 
    dueDate: tomorrow,
     completed: false 
    });
    expect(all.length).toBe(len_p + 1);
  });
  test("should complete the mark", () => {
    expect(all[3]["completed"]).toBe(false);
    markAsComplete(3);
    expect(all[3]["completed"]).toBe(true);
  });
  test("retrivel of over dues", () => {
    expect(overdue().length).toBe(1);
  });
  test("retrivel of todays", () => {
    expect(dueToday().length).toBe(2);
  });
  test("retrivel of due later items", () => {
    expect(dueLater().length).toBe(3);
  });
});