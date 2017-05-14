(function () {
    var socket = io();
    var form = document.querySelector('.form');
    var messages = document.querySelector('.messages');
    var msg = document.querySelector('.msg')
    form.addEventListener('submit', onSubmit);

    socket.on('message', (data) => {
        var message = getMessageNode(data);
        messages.appendChild(message);
    });

    function onSubmit (e) {
        e.preventDefault();
        socket.emit('message', {
            msg: msg.value
        });
        msg.value = '';
    }

    function formatMsg(user, text) {
        return user + ": " + text;
    }

    function getMessageNode(data) {
        var text = formatMsg(data.user, data.msg);
        var messageNode = document.createElement("LI");                 // Create a <li> node
        var textNode = document.createTextNode(text);
        messageNode.appendChild(textNode);
        messageNode.classList.add('message');
        return messageNode;
    }
})();