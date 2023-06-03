const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();

mic.addEventListener('click', ev => {
    recognition.start();
})

recognition.onresult = ev => {
    const todoTitle = ev.results[0][0].transcript;
    let item = generateTodoObj(self.crypto.randomUUID());
    item.todoTitle = todoTitle;
    addLocalStorage('todoItems', item);
    renderTodo();
} 