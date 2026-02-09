function showSection(id) {
  document.getElementById("fatwas").style.display = "none";
  document.getElementById("ai").style.display = "none";
  document.getElementById(id).style.display = "block";
}

function renderFatwas(list) {
  const container = document.getElementById("fatwaList");
  container.innerHTML = "";
  list.forEach(f => {
    container.innerHTML += `
      <div class="fatwa">
        <strong>سؤال:</strong> ${f.q}<br>
        <strong>الجواب:</strong> ${f.a}<br>
        <em>المصدر: ${f.src}</em>
      </div>
    `;
  });
}

renderFatwas(fatwas);

function searchFatwa() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  const filtered = fatwas.filter(f =>
    f.q.toLowerCase().includes(value) ||
    f.a.toLowerCase().includes(value)
  );
  renderFatwas(filtered);
}

function filterCategory(cat) {
  if (cat === "all") {
    renderFatwas(fatwas);
  } else {
    renderFatwas(fatwas.filter(f => f.category === cat));
  }
}

function answerQuestion() {
  document.getElementById("answer").innerText =
    "سيتم ربط الذكاء الاصطناعي لاحقًا إن شاء الله.";
}
