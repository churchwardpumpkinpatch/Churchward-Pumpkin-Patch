


// Ensure pdf.js is loaded
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

// const pdfFiles = ["file1.pdf", "file2.pdf", "file3.pdf"]; // your PDFs here


const pdfFiles = [
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf',
  'assets/AGreatPairOfShoes.pdf'
];




const gallery = document.querySelector(".gallery");

async function renderPDFToImage(file, index) {
  const pdf = await pdfjsLib.getDocument(file).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 2 });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: context, viewport }).promise;

  const img = document.createElement("img");
  img.src = canvas.toDataURL();
  img.alt = `Preview of ${file}`;
  img.classList.add("gallery-item");

  // Create the container
  const container = document.createElement("div");
  container.classList.add("item-container");

  // Add the buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // Number button (auto-generated)
  const numBtn = document.createElement("button");
  numBtn.classList.add("num-btn");
  numBtn.textContent = index + 1;

  // Print button
  const printBtn = document.createElement("button");
  printBtn.classList.add("print-btn");
  printBtn.textContent = "Print";
  printBtn.onclick = () => {
    window.open(file, "_blank").print();
  };

  buttonContainer.appendChild(numBtn);
  buttonContainer.appendChild(printBtn);
  container.appendChild(img);
  container.appendChild(buttonContainer);
  gallery.appendChild(container);
}

// Render all PDFs in order
pdfFiles.forEach((file, index) => {
  renderPDFToImage(file, index);
});
