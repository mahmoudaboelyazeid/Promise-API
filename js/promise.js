// let myPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         document.getElementById("Title1").style.visibility = "visible";
//         resolve();
//     }, 1000)
// }).then(() => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             document.getElementById("Title2").style.visibility = "visible";
//             resolve();
//         }, 1000)
//     });
// }).then(() => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             document.getElementById("Title3").style.visibility = "visible";
//             resolve();
//         }, 1000)
//     }).then(() => {
//         setTimeout(() => {
//             document.getElementById("Title4").style.visibility = "visible";
//         }, 1000)
//     })
// })
let divClicked = document.querySelectorAll(".container .part-left div");
let result = document.querySelector(".result");

// funcation get number nuserid
function GetPosts(userId) {
    // remove content recent
    result.innerHTML = "";

    //  loading
    Swal.fire({
        title: 'جاري تحميل البيانات...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    // request API
    let request = new XMLHttpRequest();
    request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    request.responseType = "json";
    request.setRequestHeader("Accept", "application/json");
    request.send();
    // create element
    request.onload = function () {
        Swal.close();
        if (request.status >= 200 && request.status < 300) {
            let response = request.response;
            for (let post of response) {
                let mainDiv = document.createElement("div");
                let header = document.createElement("h3");
                let hr = document.createElement("hr");
                let text = document.createElement("p");

                header.textContent = post.title;
                text.textContent = post.body;

                mainDiv.appendChild(header);
                mainDiv.appendChild(hr);
                mainDiv.appendChild(text);
                result.appendChild(mainDiv);
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Some Thing Went Wrong",
            });
        }
    };
}

function GetUsers() {

    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.responseType = "json";
    request.send();
    request.onload = function () {

        if (request.status >= 200 && request.status < 300) {
            let response = request.response;

            for (let user of response) {

                let name = user.name;
                let email = user.email;

                // create elements
                let parnt = document.querySelector(".part-left");
                let divs = document.createElement("div");
                let h3 = document.createElement("h3")
                let prag = document.createElement("p")

                h3.textContent = name;
                prag.textContent = email;

                parnt.appendChild(divs);
                divs.appendChild(h3);
                divs.appendChild(prag);

                // when click in the user get id her
                divs.addEventListener("click", () => {
                    GetPosts(user.id)
                });
            }
        }
    };
}
GetUsers();
// when the open page foucs first id
GetPosts(1);
