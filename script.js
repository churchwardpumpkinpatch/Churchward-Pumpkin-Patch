const files = [
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf'
];

const gallery = document.getElementById('gallery');

files.forEach(async file => {
  const container = document.createElement('div');
  container.classList.add('item-container');

  // Render PDF to canvas
  const canvas = document.createElement('canvas');
  canvas.classList.add('gallery-item');
  container.appendChild(canvas);

  const loadingTask = pdfjsLib.getDocument(file);
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1 });
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const context = canvas.getContext('2d');
  await page.render({ canvasContext: context, viewport: viewport }).promise;

  // Print button
  const btn = document.createElement('button');
  btn.textContent = 'Print';
  btn.classList.add('print-btn');

  btn.addEventListener('click', () => {
    const newTab = window.open(file, '_blank');
    if (newTab) {
      const checkReady = setInterval(() => {
        if (newTab.document && newTab.document.readyState === 'complete') {
          clearInterval(checkReady);
          newTab.focus();
          newTab.print();
        }
      }, 300);
    } else {
      alert('Please allow pop-ups to enable printing.');
    }
  });

  container.appendChild(btn);
  gallery.appendChild(container);
});
