// List of PDF files
const files = [
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf'
];

const gallery = document.getElementById('gallery');

files.forEach(file => {
  const container = document.createElement('div');
  container.classList.add('item-container');

  // Display the PDF as an image
  // You must generate PNG/JPG previews for each PDF (same name, different extension)
  const previewFile = file.replace('.pdf', '.png'); 
  const img = document.createElement('img');
  img.src = previewFile;
  img.alt = file;
  img.classList.add('gallery-item');
  container.appendChild(img);

  // Print button for original PDF
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
