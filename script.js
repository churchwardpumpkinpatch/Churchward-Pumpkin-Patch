
  


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
    embed.classList.add('gallery-item');
    container.appendChild(embed);
  } else {
    const img = document.createElement('img');
    img.src = file;
    img.alt = file;
    img.classList.add('gallery-item');
    container.appendChild(img);
  }

  // Create Print button
  const btn = document.createElement('button');
  btn.textContent = 'Print';
  btn.classList.add('print-btn');

  btn.onclick = () => printFile(file);

  container.appendChild(btn);
  gallery.appendChild(container);
});

function printFile(file) {
  const newTab = window.open(file, '_blank');

  // wait until PDF is ready before triggering print
  if (newTab) {
    const checkReady = setInterval(() => {
      if (newTab.document && newTab.document.readyState === 'complete') {
        clearInterval(checkReady);
        newTab.focus();
        newTab.print();  // open native print dialog
      }
    }, 300);
  } else {
    alert('Please allow pop-ups to enable printing.');
  }
}
