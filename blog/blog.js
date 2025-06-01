const bookList = [
  {
    id: 1,
    title: "Septimus Heap Book One: Magyk",
    date: "July 5, 2022",
    description:
      "If you enjoy stories about seventh sons of seventh sons and magyk, this is the book for you.",
    imgSrc: "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg",
    imgAlt: "Book cover for Septimus Heap 1",
    ages: "10–14",
    genre: "Fantasy",
    stars: "★★★★"
  },
  {
    id: 2,
    title: "Magnus Chase Book One: Sword of Summer",
    date: "December 12, 2021",
    description:
      "The anticipated new novel by Rick Riordan... gives Norse mythology a fresh twist!",
    imgSrc: "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
    imgAlt: "Book cover for Magnus Chase 1",
    ages: "12–16",
    genre: "Fantasy",
    stars: "★★★★"
  },
  {
    id: 3,
    title: "Belgariad Book One: Pawn of Prophecy",
    date: "Feb 12, 2022",
    description:
      "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided... classic fantasy setup.",
    imgSrc: "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
    imgAlt: "Book cover for Pawn of Prophecy",
    ages: "12–16",
    genre: "Fantasy",
    stars: "★★★★★"
  }
];

function convertDate(dateStr) {
  return new Date(dateStr).toISOString().split('T')[0];
}

function renderReviews() {
  const container = document.getElementById("maincontent");
  if (!container) return;

  for (const book of bookList) {
    const article = document.createElement("article");
    article.classList.add("review");

    article.innerHTML = `
      <div class="review-meta">
        <time datetime="${convertDate(book.date)}">${book.date}</time>
        <p>Age: ${book.ages}</p>
        <p>Genre: ${book.genre}</p>
        <p>Rating: ${book.stars}</p>
      </div>
      <div class="review-content">
        <h2>${book.title}</h2>
        <img src="${book.imgSrc}" alt="${book.imgAlt}">
        <p>${book.description} <a href="#">Read More…</a></p>
      </div>
    `;

    container.appendChild(article);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderReviews();
});
