let user = ["james", "jane"];
const request = prompt(`Enter your registered name`);
let create = user.push(request);
if (user === request) {
  exe();
} else if (user != request) {
  let added = prompt(`you are not registered pls register`);
  exe2();
} else {
  exe3();
}

function exe() {
  alert(`Welcome back ${request}`);
}
function exe2() {
  alert(`${added} you were just registered`);
}
function exe3() {
  alert(`you cant leave input empty`);
}
