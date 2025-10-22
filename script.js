
  


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
    const embed = document.createElement('embed');
    embed.src = file;
    embed.type = 'application/pdf';
    embed.style.width = '100%';
    embed.style.height = 'auto';
    embed.style.aspectRatio = '8.5 / 11'; // standard PDF aspect ratio
    embed.style.border = '1px solid #444';
    embed.style.borderRadius = '8px';
    container.appendChild(embed);
  } else {
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
