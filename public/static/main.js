(function () {
    var socket = io();
    var form = document.querySelector('.form');
    var messages = document.querySelector('.messages');
    var msg = document.querySelector('.msg')
    form.addEventListener('submit', onSubmit);

    socket.on('message', (data) => {
        var message = getMessageNode(data.msg);
        messages.appendChild(message);
    });

    function onSubmit (e) {
        e.preventDefault();
        var text = msg.value;
        if (text !== '') {
            socket.emit('message', {
                msg: msg.value
            });
        }
        msg.value = '';
    }

    function getMessageNode(text) {
        var messageNode = document.createElement("LI");                 // Create a <li> node
        var textNode = document.createTextNode(text);
        messageNode.appendChild(textNode);
        messageNode.classList.add('message');
        return messageNode;
    }
})();