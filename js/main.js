(function () {
  'use strict';

  // Café menu data (photos come from the café's own pictures)
  var DISHES = [
    { cat: 'Breakfast', name: 'Avocado toast with poached egg', text: 'Toasted sourdough, avocado, egg and a sprinkle of black sesame.', img: 'avocado-toast.jpg' },
    { cat: 'Breakfast', name: 'Granola and yogurt bowl', text: 'Crunchy granola, yogurt, honey and fresh seasonal fruit.', img: 'granola-bowl.jpg' },
    { cat: 'Breakfast', name: 'Mango and banana bowl', text: 'Granola topped with sliced banana and ripe mango.', img: 'mango-banana-bowl.jpg' },
    { cat: 'Breakfast', name: 'Shakshuka with toast', text: 'Eggs baked in spiced tomato sauce, served with toast.', img: 'shakshuka.jpg' },
    { cat: 'Breakfast', name: 'Scrambled eggs on toast', text: 'Peppered scrambled eggs, toast and peanut butter on the side.', img: 'eggs-on-toast.jpg' },
    { cat: 'Breakfast', name: 'Fruit pancakes', text: 'A stack of pancakes with honey, banana, mango and watermelon.', img: 'pancakes.jpg' },
    { cat: 'Mains', name: 'Chicken noodles', text: 'A generous plate of stir-fried noodles with chicken and vegetables.', img: 'noodles.jpg' },
    { cat: 'Mains', name: 'Shakshuka, two eggs', text: 'The bigger serve, with mint and a choice of breads.', img: 'shakshuka-2.jpg' },
    { cat: 'Drinks', name: 'Fresh fruit smoothies', text: 'Blended to order. Best enjoyed at sunset.', img: 'sunset-smoothies.jpg' },
    { cat: 'Drinks', name: 'Cappuccino', text: 'Proper coffee, served with a view of the surf.', img: 'cappuccino.jpg' }
  ];
  var GALLERY = [
    ['dusk-lights.jpg', 'Café tables under string lights at dusk'],
    ['avocado-toast.jpg', 'Avocado toast, granola bowl and coffee on a beach table'],
    ['night-garden.jpg', 'Garden seating lit up at night'],
    ['pancakes.jpg', 'Pancakes with fresh fruit'],
    ['sunset-smoothies.jpg', 'Smoothies at sunset'],
    ['granola-bowl.jpg', 'Granola bowl with a view of the lawn and sea'],
    ['cappuccino.jpg', 'Cappuccino with the bay behind'],
    ['noodles.jpg', 'Noodles and iced coffee by the water'],
    ['shakshuka.jpg', 'Shakshuka with toast'],
    ['mango-banana-bowl.jpg', 'Mango and banana bowl above the bay'],
    ['eggs-on-toast.jpg', 'Scrambled eggs on toast']
  ];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };

  // Mobile nav
  var toggle = $('.nav-toggle'), nav = $('#nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });

  // Menu tabs
  var cats = ['Breakfast', 'Mains', 'Drinks'];
  var tabs = $('.tabs'), grid = $('#menu');
  function showCat(cat) {
    Array.prototype.forEach.call(tabs.children, function (b) { b.setAttribute('aria-selected', b.textContent === cat); });
    grid.innerHTML = '';
    DISHES.filter(function (d) { return d.cat === cat; }).forEach(function (d) {
      var card = el('article', 'dish');
      card.innerHTML = '<img loading="lazy" src="images/' + d.img + '" alt="' + d.name + '"><div><h3>' + d.name + '</h3><p>' + d.text + '</p></div>';
      grid.appendChild(card);
    });
  }
  cats.forEach(function (c) {
    var b = el('button', '', c);
    b.type = 'button'; b.setAttribute('role', 'tab');
    b.addEventListener('click', function () { showCat(c); });
    tabs.appendChild(b);
  });
  showCat('Breakfast');

  // Gallery and lightbox
  var gg = $('#gallery-grid'), lb = $('#lightbox'), lbImg = $('img', lb), idx = 0;
  GALLERY.forEach(function (g, i) {
    var b = el('button', '', '<img loading="lazy" src="images/' + g[0] + '" alt="' + g[1] + '">');
    b.type = 'button'; b.setAttribute('aria-label', 'Open photo: ' + g[1]);
    b.addEventListener('click', function () { show(i); lb.showModal(); });
    gg.appendChild(b);
  });
  function show(i) {
    idx = (i + GALLERY.length) % GALLERY.length;
    lbImg.src = 'images/' + GALLERY[idx][0]; lbImg.alt = GALLERY[idx][1];
  }
  $('.prev', lb).addEventListener('click', function () { show(idx - 1); });
  $('.next', lb).addEventListener('click', function () { show(idx + 1); });
  $('.lb-close', lb).addEventListener('click', function () { lb.close(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.open) return;
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  // Enquiry form: opens WhatsApp with a ready message
  var form = $('#enquiry'), note = $('#form-note');
  var today = new Date().toISOString().split('T')[0];
  form.in.min = today; form.out.min = today;
  form.in.addEventListener('change', function () { form.out.min = form.in.value || today; });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var text = 'Hello, I would like to ask about Surf Home Stay Hiriketiya.\n' +
      'Name: ' + f.name.value + '\n' +
      (f.in.value ? 'Check-in: ' + f.in.value + '\n' : '') +
      (f.out.value ? 'Check-out: ' + f.out.value + '\n' : '') +
      'Guests: ' + f.guests.value + '\n' + (f.msg.value ? 'Message: ' + f.msg.value : '');
    window.open('https://wa.me/94702528927?text=' + encodeURIComponent(text), '_blank', 'noopener');
    note.textContent = 'Opening WhatsApp. If it does not open, call +94 70 252 8927.';
  });
})();
