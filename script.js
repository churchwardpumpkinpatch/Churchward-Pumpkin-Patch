
  


  // List of files in your gallery
// For now, you can hardcode some examples
const files = [
  'assets/owlStencil.png',
  'assets/owlStencil.png',
  'assets/owlStencil.png',
  'assets/owlStencil.png',
  'assets/owlStencil.png',
  'assets/owlStencil.png'
];

const gallery = document.getElementById('gallery');

files.forEach(file => {
  // Container for each item + button
  const container = document.createElement('div');
  container.classList.add('item-container');

  // Display PDF or image
  if (file.endsWith('.pdf')) {
    const iframe = document.createElement('iframe');
    iframe.src = `${file}`;
    iframe.title = file;
    iframe.width = '100%';
    iframe.height = '600px';
    iframe.style.border = '1px solid #444';
    iframe.style.borderRadius = '8px';
    iframe.style.marginBottom = '0.5em';
    container.appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.src = `${file}`;
    img.alt = file;
    img.loading = 'lazy';
    img.style.maxWidth = '100%';
    container.appendChild(img);
  }

  // Create Print button
  const btn = document.createElement('button');
  btn.textContent = 'Print';
  btn.classList.add('print-btn');

  // Event listener for printing
  
  btn.addEventListener('click', () => {
    const newWindow = window.open(file, '_blank');
    if (newWindow) newWindow.print();
  });

  container.appendChild(btn);
  gallery.appendChild(container);
});
