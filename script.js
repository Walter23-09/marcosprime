(function(){
  'use strict';

  /* ---------- Ano ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Scroll para o menu (demonstração) ---------- */
  window.scrollToMenu = function(e){
    e.preventDefault();
    // Como é uma linktree autônoma, abrimos o WhatsApp pedindo o menu
    window.open(
      'https://wa.me/5511940028922?text=' +
      encodeURIComponent('Olá! Gostaria de receber o menu do Marcos Prime.'),
      '_blank'
    );
  };

  /* ---------- Compartilhar ---------- */
  const toast = document.getElementById('toast');

  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  window.sharePage = function(e){
    e.preventDefault();
    const url  = window.location.href;
    const data = {
      title: 'Marcos Prime — Churrascaria',
      text:  'Confira os links da churrascaria Marcos Prime 🥩🔥',
      url:   url
    };

    if (navigator.share) {
      navigator.share(data).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
        .then(() => showToast('Link copiado ✓'))
        .catch(() => showToast('Não foi possível copiar'));
    } else {
      // fallback antigo
      const tmp = document.createElement('input');
      tmp.value = url;
      document.body.appendChild(tmp);
      tmp.select();
      try { document.execCommand('copy'); showToast('Link copiado ✓'); }
      catch(_) { showToast('Copie o link da barra de endereço'); }
      document.body.removeChild(tmp);
    }
  };

  /* ---------- Ripple suave ao clicar nos links ---------- */
  document.querySelectorAll('.link').forEach(link => {
    link.addEventListener('click', function(e){
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top  - size / 2;

      ripple.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        left:${x}px;top:${y}px;
        background:radial-gradient(circle, rgba(200,162,74,.35), transparent 70%);
        border-radius:50%;
        transform:scale(0);
        animation:ripple .6s ease-out forwards;
        pointer-events:none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- Keyframes do ripple (injetado) ---------- */
  const style = document.createElement('style');
  style.textContent = '@keyframes ripple{to{transform:scale(2.4);opacity:0}}';
  document.head.appendChild(style);

})();
