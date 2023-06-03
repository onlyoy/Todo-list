//동기   : synchronous   , 시간적으로 딱 맞물린             윗 라인 코드의 실행이 종료되는 시점과, 아래 라인 코드의 실행이 시작되는 시점
//비동기 : asynchronous  , 시간적으로 딱 맞물리지 않는
const callBoaredAPI = async () => {
    let response = await fetch('https://www.boredapi.com/api/activity?type=recreational');
    let recommanded = await response.json();
    todoRecommand.innerHTML = recommanded.activity;
    return recommanded.activity;
}

btnRecommand.addEventListener('click', async ev => {
    let textTodo = await callBoaredAPI();
    let utterance = new SpeechSynthesisUtterance(textTodo);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
})