
  


  // List of files in your gallery
// For now, you can hardcode some examples
const files = [
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf'
];

const gallery = document.getElementById('gallery');

files.forEach(file => {
  // Container for each item + button
  const container = document.createElement('div');
  container.classList.add('item-container');

  // Display PDF or image
  if (file.endsWith('.pdf')) {
    const wrap = document.createElement('div');
    wrap.className = 'pdf-wrapper';
  
    const embed = document.createElement('embed');
    embed.src = file;
    embed.type = 'application/pdf';
    embed.className = 'pdf-embed';
  
    wrap.appendChild(embed);
    container.appendChild(wrap);
  }  else {
    const img = document.createElement('img');
    img.src = file;
    img.alt = file;
    img.loading = 'lazy';
    img.style.width = '100%';
    img.style.height = 'auto';
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
