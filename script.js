// Currently static example, will load files from manifest later
const files = [
    'assets/pumpkinstencil24.pdf',
    'owlStencil.png'
  ];
  
  const gallery = document.getElementById('gallery');
  
  files.forEach(file => {
    if (file.endsWith('.pdf')) {
      const iframe = document.createElement('iframe');
      iframe.src = file;
      iframe.title = file;
      iframe.width = '100%';
      iframe.height = '600px';
      iframe.style.border = '1px solid #444';
      iframe.style.borderRadius = '8px';
      iframe.style.marginBottom = '1em';
      gallery.appendChild(iframe);
    } else {
      const img = document.createElement('img');
      img.src = file;
      img.alt = file;
      img.loading = 'lazy';
      gallery.appendChild(img);
    }
  });
  