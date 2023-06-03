let validate = data => {
    if(!data.todoTitle){
        return {"isValid":false, "msg":"제목은 반드시 입력하셔야 합니다."};
    }

    if(data.todoStartedAt >= data.todoEndAt){
        return {"isValid":false, "msg":"종료시간은 시작시간 이후여야 합니다."};
    }

    return {"isValid":true};
}

let generateTodoObj = id => {
    let item = {};
    item.id = id;
    item.todoTitle = todoTitle.value;
    item.todoStartedAt = todoStartedAt.valueAsNumber;
    item.todoEndAt = todoEndAt.valueAsNumber;
    item.todoContent = todoContent.value;
    return item;
}

let initTodoForm = () => {
    todoId.value = '';
    todoTitle.value = '';
    todoStartedAt.value = '';
    todoEndAt.value = '';
    todoContent.value = '';
}

let fillTodoForm = e => {
    todoId.value = e.id;
    todoTitle.value = e.todoTitle;
    todoStartedAt.valueAsNumber = e.todoStartedAt?e.todoStartedAt:NaN;
    todoEndAt.valueAsNumber = e.todoEndAt?e.todoEndAt:NaN;
    todoContent.value = e.todoContent;
}

btnInpTodo.addEventListener('click', ev => {
    initTodoForm();
    btnModifyTodo.style.display = 'none';
    btnAddTodo.style.display = 'block';
    popInpTodo.style.display='flex';
})

let renderTodo = () => {
    let items = getLocalStorage('todoItems');
    //종료시간 순으로 데이터를 화면에 렌더링 
    todoItems.innerHTML = ''; //기존에 렌더링 되어있는 todo 클리어
    if(!items) return;
    
    items.sort((a,b) => a.todoEndAt - b.todoEndAt);
    items.forEach(e => {
        // attrs = {prop:{}, style:{}, text:str}
        let todoLi = createElement('li',{prop:{className:'btn-lightcoral item row-between'}});
        let todoDiv = createElement('div', {text:e.todoTitle});
        let trashIcon = createElement('i', {prop:{className:'fa-solid fa-trash-can icon-trash'}});

        //자바스크립트에서 함수는 1급객체
        // 1급객체 : 값으로 다룰 수 있는 것
        //        변수에 담을 수 있다.
        //        반환값으로 사용될 수 있다.
        //        매개변수로 전달할 수 있다.
        trashIcon.addEventListener('click', ev => {
            removeLocalStorage('todoItems', a => a.id != e.id);
            renderTodo();
            ev.stopPropagation();
        })

        todoLi.addEventListener('click', ev => {
            btnModifyTodo.style.display = 'block';
            btnAddTodo.style.display = 'none';
            fillTodoForm(e);
            popInpTodo.style.display='flex';
        })

        todoLi.appendChild(todoDiv);
        todoLi.appendChild(trashIcon);
        todoItems.appendChild(todoLi);
    });
}

btnPopInpTodoClose.addEventListener('click', ev => {
    popInpTodo.style.display='none';
})

btnAddTodo.addEventListener('click', ev => {

    let item = generateTodoObj(self.crypto.randomUUID());
    let validObj = validate(item);

    if(!validObj.isValid){
        alert(validObj.msg);
        return;
    } 
    
    addLocalStorage('todoItems', item);
    renderTodo();

    popInpTodo.style.display='none';
})

btnModifyTodo.addEventListener('click', ev => {
    let items = getLocalStorage('todoItems');
    let item = generateTodoObj(todoId.value);

    let validObj = validate(item);

    if(!validObj.isValid){
        alert(validObj.msg);
        return;
    } 

    items.splice(items.findIndex(e => e.id == item.id),1,item);
    localStorage.setItem('todoItems', JSON.stringify(items));
   
    popInpTodo.style.display='none';
    renderTodo();
})


renderTodo();