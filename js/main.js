// =========================================
//    main.js - التحكم الرئيسي في الموقع
// =========================================

// =========================================
//    التنقل بين الأقسام
// =========================================
function showSection(id) {
    const sections = ["fatwas", "ai", "sunna", "definitions"];
    
    sections.forEach(sec => {
        const el = document.getElementById(sec);
        if (el) el.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) {
        target.style.display = "block";
    }
}

// =========================================
//    فتح / إغلاق القائمة الجانبية
// =========================================
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    if (!menu) return;

    if (menu.style.right === "0px" || menu.style.right === "") {
        menu.style.right = "-260px";
    } else {
        menu.style.right = "0px";
    }
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener("click", function (e) {
    const menu = document.getElementById("sideMenu");
    const btn = document.querySelector(".menu-btn");

    if (!menu || !btn) return;

    const isOpen = menu.style.right === "0px" || menu.style.right === "";
    const clickedOutside = !menu.contains(e.target) && !btn.contains(e.target);

    if (isOpen && clickedOutside) {
        menu.style.right = "-260px";
    }
});

// =========================================
//    عرض الفتاوى
// =========================================
function renderFatwas(list) {
    const container = document.getElementById("fatwaList");
    if (!container) return;

    container.innerHTML = "";

    if (!list || list.length === 0) {
        container.innerHTML = "<p class='no-results'>🔍 لا توجد فتاوى مطابقة</p>";
        return;
    }

    list.forEach(fatwa => {
        const div = document.createElement("div");
        div.className = "fatwa";

        div.innerHTML = `
            <div class="question">
                <strong>❓ السؤال:</strong><br>${fatwa.q || "غير محدد"}
            </div>
            <div class="answer">
                <strong>✅ الجواب:</strong><br>${fatwa.a || "غير متوفر"}
            </div>
            ${fatwa.src ? `<div class="source"><em>📚 المصدر: ${fatwa.src}</em></div>` : ""}
            \( {fatwa.category ? `<div class="category-tag"> \){fatwa.category}</div>` : ""}
        `;

        container.appendChild(div);
    });
}

// البحث في الفتاوى (عند الكتابة)
function searchFatwa() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    const value = input.value.trim().toLowerCase();

    if (!value) {
        renderFatwas(fatwas);
        return;
    }

    const filtered = fatwas.filter(f => {
        return (
            (f.q || "").toLowerCase().includes(value) ||
            (f.a || "").toLowerCase().includes(value)
        );
    });

    renderFatwas(filtered);
}

// التصفية حسب الفئة
function filterCategory(category) {
    document.querySelectorAll(".categories button").forEach(btn => {
        btn.classList.remove("active");
    });

    const clickedBtn = event.currentTarget;
    if (clickedBtn) clickedBtn.classList.add("active");

    let listToShow = category === "all" ? fatwas : fatwas.filter(f => f.category === category);

    renderFatwas(listToShow);
}

// =========================================
//    عرض السنة
// =========================================
function renderSunna() {
    const container = document.getElementById("sunnaList");
    if (!container) return;

    container.innerHTML = "";

    if (!sunnaQuestions || sunnaQuestions.length === 0) {
        container.innerHTML = "<p class='no-results'>📖 لا توجد أسئلة في السنة حالياً</p>";
        return;
    }

    sunnaQuestions.forEach(item => {
        const div = document.createElement("div");
        div.className = "fatwa";

        div.innerHTML = `
            <div class="question">
                <strong>❓ السؤال:</strong><br>${item.q || "غير محدد"}
            </div>
            <div class="answer">
                <strong>📜 الجواب:</strong><br>${item.a || "غير متوفر"}
            </div>
            ${item.src ? `<div class="source"><em>المصدر: ${item.src}</em></div>` : ""}
        `;

        container.appendChild(div);
    });
}

function showSunna() {
    showSection("sunna");
    renderSunna();
}

// =========================================
//    عرض التعريفات
// =========================================
function renderDefinitions() {
    const container = document.getElementById("definitionsList");
    if (!container) return;

    container.innerHTML = "";

    if (!definitions || definitions.length === 0) {
        container.innerHTML = "<p class='no-results'>📚 لا توجد تعريفات حالياً</p>";
        return;
    }

    definitions.forEach(item => {
        const div = document.createElement("div");
        div.className = "definition fatwa";

        div.innerHTML = `
            <div class="term">
                <strong>📖 ${item.term}</strong>
            </div>
            <div class="meaning">
                ${item.meaning}
            </div>
            ${item.source ? `<div class="source"><em>المصدر: ${item.source}</em></div>` : ""}
        `;

        container.appendChild(div);
    });
}

function showDefinitions() {
    showSection("definitions");
    renderDefinitions();
}

// =========================================
//    المجيب الآلي (البحث في الفتاوى + السنة)
// =========================================
function answerQuestion() {
    const input = document.getElementById("question");
    const answerBox = document.getElementById("answer");

    if (!input || !answerBox) return;

    const questionText = input.value.trim();

    if (!questionText) {
        answerBox.innerHTML = "<p class='warning'>❗ من فضلك اكتب السؤال أولاً</p>";
        return;
    }

    const qLower = questionText.toLowerCase();
    answerBox.innerHTML = "<p class='loading'>جاري البحث...</p>";

    // البحث في الفتاوى أولاً
    const fatwaMatch = fatwas.find(f =>
        (f.q || "").toLowerCase().includes(qLower) ||
        qLower.includes((f.q || "").toLowerCase())
    );

    if (fatwaMatch) {
        answerBox.innerHTML = `
            <div class="fatwa result">
                <strong>✅ الجواب من الفتاوى:</strong><br><br>
                ${fatwaMatch.a}<br><br>
                <em>📚 المصدر: ${fatwaMatch.src || "غير محدد"}</em>
            </div>
        `;
        return;
    }

    // البحث في السنة
    const sunnaMatch = sunnaQuestions.find(s =>
        (s.q || "").toLowerCase().includes(qLower) ||
        qLower.includes((s.q || "").toLowerCase())
    );

    if (sunnaMatch) {
        answerBox.innerHTML = `
            <div class="fatwa result">
                <strong>📜 الجواب من السنة:</strong><br><br>
                ${sunnaMatch.a}<br><br>
                <em>📚 المصدر: ${sunnaMatch.src || "غير محدد"}</em>
            </div>
        `;
        return;
    }

    // لم يُوجد تطابق
    answerBox.innerHTML = `
        <p class='no-match'>
            ❌ لم يتم العثور على إجابة مباشرة مطابقة.<br>
            حاول صياغة السؤال بطريقة أخرى أو راجع أهل العلم.
        </p>
    `;
}

// =========================================
//    التهيئة عند تحميل الصفحة
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    // عرض الفتاوى افتراضياً
    if (typeof fatwas !== "undefined" && Array.isArray(fatwas)) {
        renderFatwas(fatwas);
        
        // تفعيل زر "الكل" افتراضياً
        const allBtn = document.querySelector('.categories button[onclick*="all"]');
        if (allBtn) allBtn.classList.add("active");
    } else {
        console.warn("متغير 'fatwas' غير معرف أو ليس مصفوفة");
    }

    // إذا أردت عرض قسم معين افتراضياً غير الفتاوى، يمكنك إضافة استدعاء هنا
    // مثال: showDefinitions();
});
