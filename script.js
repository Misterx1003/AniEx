// === Блок: Вход / Регистрация ===
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    localStorage.setItem("user", JSON.stringify({ username, password }));
    alert("Вы зарегистрированы! Теперь войдите.");
    window.location.href = "login.html";
  });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.username === username && user.password === password) {
      localStorage.setItem("loggedInUser", username);
      alert("Добро пожаловать, " + username + "!");
      window.location.href = "index.html";
    } else {
      alert("Неверный логин или пароль.");
    }
  });
}

// Показываем имя пользователя, если он вошел
const loggedUser = localStorage.getItem("loggedInUser");
if (loggedUser && document.getElementById("user-greeting")) {
  document.getElementById("user-greeting").textContent = `Привет, ${loggedUser}`;
}

async function fetchPopularAnime() {
  const query = `
    query {
      Page(perPage: 12) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          title {
            romaji
          }
          coverImage {
            large
          }
        }
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  const animeList = data.data.Page.media;

  const container = document.getElementById("anime-list");
  animeList.forEach(anime => {
    const card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
      <img src="${anime.coverImage.large}" alt="${anime.title.romaji}" />
      <h3>${anime.title.romaji}</h3>
    `;
    container.appendChild(card);
  });
}

fetchPopularAnime();
