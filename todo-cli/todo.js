const todoList = () => {
  let all = [];

  const add = (ii) => {
    all.push(ii);
  };
  
  const new_date = new Date();

  const markAsComplete = (index) => {
    all[index]["completed"] = true;
  };
  const overdue = () => {
    return all.filter(
      (item) => item.dueDate.split("-")[2] < new_date.getDate()
    );
  };

  const dueToday = () => {
    return all.filter(
      (item) => item.dueDate.split("-")[2] === String(new_date.getDate())
    );
  };
  const dueLater = () => {
    return all.filter(
      (item) => item.dueDate.split("-")[2] > new_date.getDate()
    );
  };

  const toDisplayableList = (list) => {
    const all_ls = list.map((item) => {
      if (item.completed==false){
        tick="[ ]"
    }
    else{
        tick="[x]"
    }
      const dat =
        item.dueDate.split("-")[2] === String(new_date.getDate())
          ? ""
          : item.dueDate;
      j=tick + " "+item["title"]+" "+dat;
      
      return j
    });
    return all_ls.join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
