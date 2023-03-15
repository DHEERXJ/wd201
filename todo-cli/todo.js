const adate = d => {
    return d.toISOString().split("T")[0]
  }
const todoList = () => {
    all = []
    const add = (todoItem) => {
      all.push(todoItem)
    }
    const markAsComplete = (index) => {
      all[index].completed = true
    }
    
    var dateToday = new Date()
    const today = adate(dateToday)
    const yesterday = adate(
      new Date(new Date().setDate(dateToday.getDate() - 1))
    )
    const tomorrow = adate(
      new Date(new Date().setDate(dateToday.getDate() + 1))
    )

    
    //console.log(tomorrow);
    const overdue = () => {
      // Write the date check condition here and return the array
      // of overdue items accordingly.
      lst=[];
      finals=""
      for (let i = 0; i < all.length; i++) {
        if (all[i].dueDate< adate(new Date())){
            if (all[i].completed==false){
                tick="[ ] "
            }
            else{
                tick="[x] "
            }



        finals+=tick+all[i].title+" "+all[i].dueDate+"\n"
        lst.push(finals);}}
        return lst[lst.length-1]
    
    };
  
    const dueToday = () => {
      // Write the date check condition here and return the array
      // of todo items that are due today accordingly.
      lst=[];
      finals=""
      for (let i = 0; i < all.length; i++) {
        if (all[i].dueDate== adate(new Date())){
            if (all[i].completed==false){
                tick="[ ] "
            }
            else{
                tick="[x] "
            }



        finals+=tick+all[i].title+" "+"\n"
        lst.push(finals);}}
        return lst[lst.length-1]
    
    }
  
    const dueLater = () => {
      // Write the date check condition here and return the array
      // of todo items that are due later accordingly.
      lst=[];
      finals=""
      for (let i = 0; i < all.length; i++) {
        if (all[i].dueDate>adate(new Date())){
            if (all[i].completed==false){
                tick="[ ] "
            }
            else{
                tick="[x] "
            }



        finals+=tick+all[i].title+" "+all[i].dueDate+"\n"
        lst.push(finals);}}
        return lst[lst.length-1]
    
    }
  
    const toDisplayableList = (list) => {
      // Format the To-Do list here, and return the output string
      // as per the format given above.
      j=""
      for (let i = 0; i <list.length; i++){
        j+=list[i];
        
      }
      st=j.slice(0,-1);
      return st
    }
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList
    };
  };
  
  module.exports = todoList;
// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = d => {
  return d.toISOString().split("T")[0]
}

var dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
)

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })
console.log("My Todo-list\n")

console.log("Overdue")
var overdues = todos.overdue()
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")
