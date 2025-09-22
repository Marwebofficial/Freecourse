let user = ["james", "jane"];
const request = prompt(`Enter your registered name`);
let create = user.push(request);
if (user != request && null) {
  let added = prompt(request);
  exe2();
} else if (user == request) {
  exe();
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
