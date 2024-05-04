// menu-area classlı etiketi htmlden aldık
var menuList = document.querySelector(".menu-area");

// ürünlerin verisini bu değişkende tutalım
var menu = [];
// Parametre olarak aldığı ürünleri ekrana bastırdık
function renderMenu(data) {
  // Diziyi dön ve herbir eleman için cart htmli oluştur
  var menuHtml = data.map(function (item) {
    return `
    <div id="card">
        <img src="${item.img}" alt="" />
        <div class="card-info">
        <div class="name">
            <h3>${item.title}</h3>
            <p>$${item.price}</p>
        </div>
        <p class="desc">
            ${item.desc}
        </p>
        </div>
    </div>


    `;
  });

  menuHtml = menuHtml.join("");

  menuList.innerHTML = menuHtml;
}

// ürünleri veritabanından alıp getirir
function getMenu() {
  fetch("db.json")
    // istek başarılı olursa verileri erişmek için then ile veriyi yakalarız
    .then(function (cevap) {
      return cevap.json();
    })
    // verileri aldıktan sonra tekrardan yakalayıp kullanırız
    .then(function (data) {
      menu = data.menu; // menu değişkenine datamızı aktardık
      renderMenu(data.menu);
    });
}
//* Sayfanın yüklenme anını izledik ve getMenu fonksiyonunu çalıştırdık.
document.addEventListener("DOMContentLoaded", getMenu);

var buttons = document.querySelectorAll("label");
// seçilen kategoriye göre filtreleme yap
function filterCategory(e) {
  // seçilen kategoriye göre filtreleme yap
  var selected = e.target.dataset.id;
  console.log(selected);

  if (selected === "all") {
    // Hepsi butonuna tıklanıldığında bütün menüyü göster
    renderMenu(menu);
  } else {
    // menü dizisi içerisinde seçtiğimiz kategoriye göre ait ürünleri filtreleyip bir değişkene aktardık
    var filtred = menu.filter(function (item) {
      return item.category === selected;
    });

    // filtrelenmiş veriy ekrana aktardık.
    renderMenu(filtred);
  }
}
// bütün butonlara olay izleyici ekledik
buttons.forEach(function (btn) {
  btn.addEventListener("click", filterCategory);
});
