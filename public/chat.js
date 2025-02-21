var clients = [];
socket.emit("name", name);

function sendMessage() {
  socket.emit('chat message', { name: name, message: $textarea.value });
  $textarea.value = '';
  $textarea.focus();
}

socket.on('chat message', function(msg) {
  var d = getTime();
  const div = document.createElement('div');
  div.className = (msg.name == name) ? "me" : "you";
  const pre = document.createElement("pre");
  pre.setAttribute("style", "overflow:auto")
  const p = document.createElement("p");
  p.innerText = msg.message;
  div.innerHTML = `<b>${msg.name} </b><span style="color:gray; font-size:14px;">${d}</span>`;
  pre.appendChild(p);
  div.appendChild(pre);
  const br = document.createElement('br');
  $main.appendChild(div);
  $main.appendChild(br);
  $main.scrollTo(0, $main.scrollHeight);
});

socket.on("newuser", function(name) {

  var p = document.createElement('p');
  p.textContent = name;
  clients.push(p.textContent);

  const clientListElement = document.getElementById('clientList');

  const listHTML = clients.map((client) => `<li>${client}</li>`).join('');
  clientListElement.innerHTML = listHTML;


  var q = document.createElement('p');
  var d = getTime();

  q.textContent = d + " " + name + " " + " joined";
  var br = document.createElement("br");
  $main.appendChild(q);
  $main.appendChild(br);
  $main.scrollTo(0, $main.scrollHeight);
});


socket.on("left", function(message) {
  var p = document.createElement('p');
  p.textContent = message;
  clients.splice(clients.indexOf(p), 1);

  const clientListElement = document.getElementById('clientList');

  const listHTML = clients.map((client) => `<li>${client}</li>`).join('');
  clientListElement.innerHTML = listHTML;


  var x = document.createElement('p');
  var d = getTime();
  p.textContent = d + " " + message + " " + "left";
  var br = document.createElement("br");
  $main.appendChild(p);
  $main.appendChild(br);
  $main.scrollTo(0, $main.scrollHeight);

});



var elem = document.getElementById("yt-video");
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
