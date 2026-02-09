<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>موقع الفتاوى الإسلامية</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<header>
  <h1>📖 موقع الفتاوى الإسلامية</h1>
  <p>للاستئناس – الفتوى من أهل العلم</p>
</header>

<nav>
  <button onclick="showSection('fatwas')">الفتاوى</button>
  <button onclick="showSection('ai')">الذكاء الاصطناعي</button>
</nav>

<section id="fatwas">
  <h2>🔍 الفتاوى</h2>

  <input type="text" id="searchInput" placeholder="قلب على فتوى..." onkeyup="searchFatwa()">

  <div class="categories">
    <button onclick="filterCategory('all')">الكل</button>
    <button onclick="filterCategory('salat')">الصلاة</button>
    <button onclick="filterCategory('siyam')">الصيام</button>
    <button onclick="filterCategory('fiqh')">فقه عام</button>
  </div>

  <div id="fatwaList"></div>
</section>

<section id="ai" style="display:none;">
  <h2>🤖 اسأل الذكاء الاصطناعي</h2>
  <p class="note">تنبيه: الجواب آلي للاستئناس فقط</p>
  <textarea id="question" placeholder="اكتب سؤالك هنا..."></textarea>
  <button onclick="answerQuestion()">إرسال</button>
  <p id="answer"></p>
</section>

<footer>© 2026 موقع الفتاوى الإسلامية</footer>

<script src="js/fatwas.js"></script>
<script src="js/main.js"></script>
</body>
</html>
