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
   البحث في الفتاوى
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
   الذكاء الاصطناعي (تشابه حقيقي)
========================= */
function answerQuestion() {
  const questionInput = document
    .getElementById("question")
    .value
    .trim()
    .toLowerCase();

  const answerBox = document.getElementById("answer");

  if (questionInput === "") {
    answerBox.innerHTML = "❗ من فضلك اكتب السؤال أولاً";
    return;
  }

  // كلمات عامة ما مهمّاش
  const stopWords = [
    "ما", "ماهو", "ماهي", "هل", "حكم", "كيف", "لماذا",
    "في", "على", "عن", "من", "إلى", "هذا", "هذه"
  ];

  // كلمات المستخدم المهمة
  const userWords = questionInput
    .split(" ")
    .filter(word =>
      word.length > 2 && !stopWords.includes(word)
    );

  let bestMatch = null;
  let bestRatio = 0;

  fatwas.forEach(fatwa => {
    const fatwaWords = fatwa.q
      .toLowerCase()
      .split(" ")
      .filter(word =>
        word.length > 2 && !stopWords.includes(word)
      );

    let matchCount = 0;

    userWords.forEach(word => {
      if (fatwaWords.includes(word)) {
        matchCount++;
      }
    });

    const ratio = matchCount / userWords.length;

    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestMatch = fatwa;
    }
  });

  // شرط التشابه الحقيقي (60%)
  if (bestMatch && bestRatio >= 0.6) {
    answerBox.innerHTML = `
      <div class="fatwa">
        <strong>❓ السؤال:</strong><br>
        ${bestMatch.q}<br><br>

        <strong>✅ الجواب:</strong><br>
        ${bestMatch.a}<br><br>

        <em>📚 المصدر: ${bestMatch.src}</em>
      </div>
    `;
  } else {
    answerBox.innerHTML = `
      ❌ لم يتم العثور على فتوى مطابقة لهذا السؤال.<br>
      حاول إعادة صياغة السؤال.
    `;
  }
}

/* =========================
   تشغيل أولي
========================= */
document.addEventListener("DOMContentLoaded", () => {
  renderFatwas(fatwas);
});
