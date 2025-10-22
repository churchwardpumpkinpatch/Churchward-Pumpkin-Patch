
  


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
    // Show the PDF as an embedded object for scrolling
    const embed = document.createElement('embed');
    embed.src = file;
    embed.type = 'application/pdf';
    embed.width = '100%';
    embed.height = '600px';
    embed.style.border = '1px solid #444';
    embed.style.borderRadius = '8px';
    container.appendChild(embed);
  } else {
    const img = document.createElement('img');
    img.src = file;
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
