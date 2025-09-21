let user = ["dave", "sam"];
let request = prompt("Enter your name");
if (request == user) {
  alert(`Welcome : ${request}`);
} else if (request != user) {
  user.push(request);
  alert(`you were added : ${request}`);
} else {
  alert("you are not allowed");
}
