/* =========================
   الاستيراد
========================= */
import { fatwas } from "./fatwas.js";
import { qaBank } from "./qa_bank.js";

/* =========================
   التنقل بين الأقسام
========================= */
function showSection(id) {
  document.getElementById("fatwas").style.display = "none";
  document.getElementById("ai").style.display = "none";
  document.getElementById(id).style.display = "block";
}

/* =========================
   عرض الفتاوى (fatwas فقط)
========================= */
function renderFatwas(list) {
  const container = document.getElementById("fatwaList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>🔍 لا توجد فتاوى مطابقة</p>";
    return;
  }

  list.forEach(fatwa => {
    const div = document.createElement("div");
    div.className = "fatwa";

    div.innerHTML = `
      <strong>❓ السؤال:</strong><br>
      ${fatwa.q}<br><br>

      <strong>✅ الجواب:</strong><br>
      ${fatwa.a}<br><br>

      <em>📚 المصدر: ${fatwa.src}</em>
    `;

    container.appendChild(div);
  });
}

/* =========================
   البحث العادي (fatwas فقط)
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
   التصفية حسب التصنيف
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
   المجيب الآلي
   (fatwas + qa_bank فقط)
========================= */
function answerQuestion() {
  const questionInput = document
    .getElementById("question")
    .value
    .trim()
    .toLowerCase();

  const answerBox = document.getElementById("answer");

  if (!questionInput) {
    answerBox.innerHTML = "❗ من فضلك اكتب السؤال أولاً";
    return;
  }

  // 🔹 مخزون المجيب الآلي فقط
  const AI_DATABASE = [
    ...fatwas,
    ...qaBank
  ];

  const stopWords = [
    "ما", "ماهو", "ماهي", "هل", "حكم", "كيف", "لماذا",
    "في", "على", "عن", "من", "إلى", "هذا", "هذه"
  ];

  const userWords = questionInput
    .split(" ")
    .filter(w => w.length > 2 && !stopWords.includes(w));

  let bestMatch = null;
  let bestRatio = 0;

  AI_DATABASE.forEach(item => {
    const itemWords = item.q
      .toLowerCase()
      .split(" ")
      .filter(w => w.length > 2 && !stopWords.includes(w));

    let match = 0;
    userWords.forEach(word => {
      if (itemWords.includes(word)) match++;
    });

    const ratio = match / userWords.length;

    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestMatch = item;
    }
  });

  // شرط التشابه الحقيقي
  if (bestMatch && bestRatio >= 0.6) {
    answerBox.innerHTML = `
      <div class="fatwa">
        <strong>❓ السؤال:</strong><br>
        ${bestMatch.q}<br><br>

        <strong>✅ الجواب:</strong><br>
        ${bestMatch.a}<br><br>

        <em>📚 المصدر: ${bestMatch.src || "غير محدد"}</em>
      </div>
    `;
  } else {
    answerBox.innerHTML =
      "❌ هذا السؤال غير موجود في المخزون.";
  }
}

/* =========================
   التشغيل الأولي
========================= */
document.addEventListener("DOMContentLoaded", () => {
  renderFatwas(fatwas);
});
