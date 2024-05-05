const nameP = document.getElementById("nom");
const email = document.getElementById("email");

const getMyProfile = async () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    window.location.href = "../Authentification/auth.html";
  }
  const response = await fetch("http://localhost:3000/getMyProfile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      console.log(response);
      if (response.status == 200) {
        const data = await response.json();
        nameP.innerText = "Nom:" + data.name;
        email.innerText = "Email:" + data.email;
      } else {
        window.location.href = "../Authentification/auth.html";
      }
    })
    .catch((error) => console.log(error));
};

getMyProfile();
