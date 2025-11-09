let result = document.querySelector(".result");

// funcation get number nuserid
function GetPosts(userId) {
  // remove content recent
  result.innerHTML = "";

  // loading
  Swal.fire({
    title: 'جاري تحميل البيانات...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  // request API
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Some Thing Went Wrong",
        });
        throw new Error("Error loading posts");
      }
    })
    .then((posts) => {
      Swal.close();
      for (let post of posts) {
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
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    });
}

// function GetUsers
function GetUsers() {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch users");
        }
      })
      .then((users) => {
        let parent = document.querySelector(".part-left");
        parent.innerHTML = ""; // تنظيف القائمة قبل إعادة إنشائها

        for (let user of users) {
          let name = user.name;
          let email = user.email;

          // create elements
          let divs = document.createElement("div");
          let h3 = document.createElement("h3");
          let prag = document.createElement("p");

          h3.textContent = name;
          prag.textContent = email;

          divs.appendChild(h3);
          divs.appendChild(prag);
          parent.appendChild(divs);

          // when click on the user
          divs.addEventListener("click", () => {
            GetPosts(user.id);
          });
        }

        // ✅ resolve بعد ما يخلص كل المستخدمين
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

GetUsers()
  .then(() => {
    GetPosts(1);
  })
  .catch((error) => {
    console.log(error);
  });
