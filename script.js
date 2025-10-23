const files = [
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf'
  // ...add as many as you like
];

const gallery = document.getElementById('gallery');
const BATCH_SIZE = 10; // how many to load at once
let currentIndex = 0;
let count = 1;

// Renders a single PDF preview (your existing logic)
async function renderPdf(file, number) {
  const container = document.createElement('div');
  container.classList.add('item-container');

  const canvas = document.createElement('canvas');
  canvas.classList.add('gallery-item');
  container.appendChild(canvas);

  try {
    const loadingTask = pdfjsLib.getDocument(file);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 1 });
    const maxWidth = Math.min(viewport.width, window.innerWidth - 32);
    const scale = maxWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    const context = canvas.getContext('2d');
    await page.render({ canvasContext: context, viewport: scaledViewport }).promise;
  } catch (err) {
    console.error(`Error loading ${file}`, err);
  }

  // Number button
  const nmb = document.createElement('button');
  nmb.textContent = number;
  nmb.classList.add('nmb-btn');

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

  container.appendChild(nmb);
  container.appendChild(btn);
  gallery.appendChild(container);
}

// Load next batch of files
async function loadNextBatch() {
  const batch = files.slice(currentIndex, currentIndex + BATCH_SIZE);
  for (const file of batch) {
    await renderPdf(file, count++);
  }
  currentIndex += BATCH_SIZE;
}

// Initial load
loadNextBatch();

// Auto-load next batch when near bottom
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
    if (currentIndex < files.length) {
      loadNextBatch();
    }
  }
});
