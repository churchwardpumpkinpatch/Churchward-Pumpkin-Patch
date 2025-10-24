const files = [
  'assets/AGreatPairOfShoes.pdf',
  'assets/cool_jc_co__85786.png'
  // ...add as many as you like
];

const gallery = document.getElementById('gallery');
const BATCH_SIZE = 10; // how many to load at once
let currentIndex = 0;
let count = 1;
let isLoading = false; // prevents overlap

async function renderFile(file, number) {
  const container = document.createElement('div');
  container.classList.add('item-container');

  const ext = file.split('.').pop().toLowerCase();

  if (ext === 'pdf') {
    // === PDF handling ===
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

  } else if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
    // === Image handling ===
    const img = document.createElement('img');
    img.src = file;
    img.classList.add('gallery-item');
    img.loading = 'lazy';
    img.alt = `Image ${number}`;
    container.appendChild(img);
  } else {
    console.warn(`Unsupported file type for ${file}`);
    return;
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

async function loadNextBatch() {
  if (isLoading || currentIndex >= files.length) return; // skip if already loading
  isLoading = true;

  const batch = files.slice(currentIndex, currentIndex + BATCH_SIZE);
  for (const file of batch) {
    await renderFile(file, count++);
  }
  currentIndex += batch.length;
  isLoading = false;
}

// initial load
loadNextBatch();

// lazy load on scroll
window.addEventListener('scroll', async () => {
  if (
    !isLoading &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 400
  ) {
    await loadNextBatch();
  }
});
