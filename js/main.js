function renderFatwas(list) {
  const container = document.getElementById("fatwaList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>لا توجد فتاوى في هذا القسم</p>";
    return;
  }

  list.forEach(f => {
  const div = document.createElement("div");
  div.className = "fatwa";
  div.innerHTML = `
    <strong>السؤال:</strong> ${f.question}<br>
    <strong>الجواب:</strong> ${f.answer}<br>
    <em>التصنيف:</em> ${f.category}
  `;
  container.appendChild(div);
});
