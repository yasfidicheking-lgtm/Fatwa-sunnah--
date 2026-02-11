/* =========================
   التنقل بين الأقسام
========================= */
function showSection(id) {
  const sections = ["fatwas", "sunna", "definitions", "ai"];

  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.style.display = "none";
  });

  const target = document.getElementById(id);
  if (target) target.style.display = "block";
}

/* =========================
   MENU ☰
========================= */
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  if (!menu) return;

  menu.style.right =
    menu.style.right === "0px" ? "-260px" : "0px";
}

/* إغلاق المينيو عند الضغط خارجها */
document.addEventListener("click", function (e) {
  const menu = document.getElementById("sideMenu");
  const btn = document.querySelector(".menu-btn");

  if (!menu || !btn) return;

  if (
    menu.style.right === "0px" &&
    !menu.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    menu.style.right = "-260px";
  }
});

/* =========================
   عرض الفتاوى
========================= */
function renderFatwas(list) {
  const container = document.getElementById("fatwaList");
  if (!container) return;

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

/* تشغيل افتراضي */
renderFatwas(fatwas);

/* =========================
   عرض السنة
========================= */
function renderSunna() {
  const container = document.getElementById("sunnaList");
  if (!container) return;

  container.innerHTML = "";

  sunnaQuestions.forEach(item => {
    const div = document.createElement("div");
    div.className = "fatwa";

    div.innerHTML = `
      <strong>❓ السؤال:</strong><br>
      ${item.q}<br><br>

      <strong>📜 الجواب:</strong><br>
      ${item.a}<br><br>

      <em>📚 المصدر: ${item.src}</em>
    `;

    container.appendChild(div);
  });
}

function showSunna() {
  showSection("sunna");
  renderSunna();
}

/* =========================
   عرض التعريفات
   (بلا بحث – بحال السنة)
========================= */
function renderDefinitions(list) {
  const container = document.getElementById("definitionList");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "fatwa";

    div.innerHTML = `
      <strong>📌 المصطلح:</strong><br>
      ${item.term}<br><br>

      <strong>📖 التعريف:</strong><br>
      ${item.def}<br><br>

      <em>📚 المصدر: ${item.src}</em>
    `;

    container.appendChild(div);
  });
}

function showDefinitions() {
  showSection("definitions");
  renderDefinitions(definitions);
}

/* =========================
   المجيب الآلي
   (فتاوى + سنة + تعريفات)
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

  // البحث في الفتاوى
  const fatwaResult = fatwas.find(f =>
    f.q.toLowerCase().includes(questionInput) ||
    questionInput.includes(f.q.toLowerCase())
  );

  if (fatwaResult) {
    answerBox.innerHTML = `
      <div class="fatwa">
        <strong>✅ الجواب من الفتاوى:</strong><br><br>
        ${fatwaResult.a}<br><br>
        <em>📚 المصدر: ${fatwaResult.src}</em>
      </div>
    `;
    return;
  }

  // البحث في السنة
  const sunnaResult = sunnaQuestions.find(s =>
    s.q.toLowerCase().includes(questionInput) ||
    questionInput.includes(s.q.toLowerCase())
  );

  if (sunnaResult) {
    answerBox.innerHTML = `
      <div class="fatwa">
        <strong>📜 الجواب من السنة:</strong><br><br>
        ${sunnaResult.a}<br><br>
        <em>📚 المصدر: ${sunnaResult.src}</em>
      </div>
    `;
    return;
  }

  // البحث في التعريفات
  const defResult = definitions.find(d =>
    d.term.toLowerCase().includes(questionInput) ||
    questionInput.includes(d.term.toLowerCase())
  );

  if (defResult) {
    answerBox.innerHTML = `
      <div class="fatwa">
        <strong>📘 تعريف:</strong><br><br>
        ${defResult.def}<br><br>
        <em>📚 المصدر: ${defResult.src}</em>
      </div>
    `;
    return;
  }

  // لا يوجد جواب
  answerBox.innerHTML =
    "❌ لم يتم العثور على جواب مباشر. حاول صياغة السؤال بطريقة أخرى.";
     }
