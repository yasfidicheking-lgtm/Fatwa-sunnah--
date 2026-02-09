/* =========================
   التنقل بين الأقسام
========================= */
function showSection(id) {
  document.getElementById("fatwas").style.display = "none";
  document.getElementById("ai").style.display = "none";
  document.getElementById(id).style.display = "block";
}

/* =========================
   عرض الفتاوى
========================= */
function renderFatwas(list) {
  const container = document.getElementById("fatwaList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>لا توجد فتاوى مطابقة 🔍</p>";
    return;
  }

  list.forEach(fatwa => {
    const div = document.createElement("div");
    div.className = "fatwa";

    div.innerHTML = `
      <strong>السؤال:</strong> ${fatwa.q}<br>
      <strong>الجواب:</strong> ${fatwa.a}<br>
      <em>المصدر: ${fatwa.src}</em>
    `;

    container.appendChild(div);
  });
}

/* =========================
   البحث
========================= */
function searchFatwa() {
  const value = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  const filtered = fatwas.filter(f =>
    f.q.toLowerCase().includes(value) ||
    f.a.toLowerCase().includes(value)
  );

  renderFatwas(filtered);
}

/* =========================
   التصنيفات
========================= */
function filterCategory(category) {
  if (category === "all") {
    renderFatwas(fatwas);
  } else {
    const filtered = fatwas.filter(
      f => f.category === category
    );
    renderFatwas(filtered);
  }
}

/* =========================
   الذكاء الاصطناعي (مؤقت)
========================= */
function answerQuestion() {
  const question = document.getElementById("question").value;

  if (question.trim() === "") {
    document.getElementById("answer").innerText =
      "❗ من فضلك اكتب سؤالاً أولاً";
    return;
  }

  document.getElementById("answer").innerText =
    "🤖 سيتم ربط الذكاء الاصطناعي الحقيقي لاحقًا، هذا الجواب للاستئناس فقط.";
}

/* =========================
   تشغيل أولي
========================= */
document.addEventListener("DOMContentLoaded", () => {
  renderFatwas(fatwas);
});
