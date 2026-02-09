fetch("js/data/fatwas.json")
  .then(res => res.json())
  .then(fatwas => {
    const box = document.getElementById("fatwaList");
    if (!box) return;

    box.innerHTML = "";

    fatwas.forEach(f => {
      box.innerHTML += `
        <div class="fatwa">
          <h3>${f.question}</h3>
          <p>${f.answer}</p>
          <small>${f.category}</small>
        </div>
      `;
    });
  })
  .catch(err => {
    console.error("خطأ تحميل الفتاوى", err);
  });
