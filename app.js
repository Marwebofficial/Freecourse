let user = ["james"];
const request = prompt(`Enter your registered name`);
let create = user.push(request);
if (request === user) {
  exe();
} else if (request != user) {
  prompt(`you are not registered pls register`);
  exe2();
} else {
  exe3();
}

function exe() {
  alert(`Welcome back ${request}`);
}
function exe2() {
  alert(`${request} you were just registered`);
}
function exe3() {
  alert(`you cant leave input empty`);
}
