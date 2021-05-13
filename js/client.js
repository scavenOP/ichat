const socket = io('http://localhost:8000');

const form = document.getElementById('send-contain');
const messageinp = document.getElementById('msg-inp');
const container = document.querySelector('.msg-container');
var audio = new Audio('DING.mp3');

const append = (message, position)=>{
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    container.append(messageelement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageinp.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageinp.value = '';
})


const name = prompt("Enter your name");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');
})
socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`, 'left');
})
socket.on('left', user =>{
    append(`${user} left the chat`, 'right');
})