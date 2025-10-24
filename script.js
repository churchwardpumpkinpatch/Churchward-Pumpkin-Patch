const files = [
  'assets/a_clockwork_skull_co__91054.png',
  'assets/abstract_flowing_line_co__63292.png',
  'assets/AGreatPairOfShoes.pdf',
  'assets/alien_birth_co__75467.png',
  'assets/alien_xenomorph_co__62942.png',
  'assets/angry_mummy_co__30597.png',
  'assets/athena_co__12762.png',
  'assets/a_clockwork_skull_co__91054.png',
  'assets/baby_bat_co__88600.png',
  'assets/balloon_animal_dog_co__66168.png',
  'assets/bigfoot_01_co__81423.png',
  'assets/black_cat_web_co__75643.png',
  'assets/bloody_hands_co__15169.png',
  'assets/celtic_knot_02_co__54959.png',
  'assets/cool_jc_co__85786.png',
  'assets/creation_of_adam_michelangelo_co__11732.png',
  'assets/cthulhu_02_co__27041.png',
  'assets/cute_kitty_01_co__56270.png',
  'assets/diamond_skull_co__13239.png',
  'assets/don_t_loose_your_head_02_co__96012.png',
  'assets/don_t_loose_your_head_co__66135.png',
  'assets/dragon_eye_left_co__06708.png',
  'assets/dragon_eye_right_co__90460.png',
  'assets/duck_pond_co__47345.png',
  'assets/earth_globe_co__28491.png',
  'assets/evil_clown_03_co__58840.png',
  'assets/facehugger_co__41501.png',
  'assets/five_ghost_co__40697.png',
  'assets/Frankenstein_CO.png',
  'assets/gargoyle_03_co__61185.png',
  'assets/glass_skull_co__84437.png',
  'assets/gorilla_squat_co__57385.png',
  'assets/grizzly_bear_trees_co__55001.png',
  'assets/haunted_house_04_co__33334.png',
  'assets/highland_cow_co__38028.png',
  'assets/hi_ya_kitty_co__61561.png',
  'assets/Jack-O_14_CO.png',
  'assets/jack_o_139_co__57134.png',
  'assets/jack_o_233_co__69272.png',
  'assets/jolly_pirate_co__36827.png',
  'assets/kabuki_co__55799.png',
  'assets/laughing_bat_co__53360.png',
  'assets/pacman_ghost_co__74364.png',
  'assets/peace_jack_face_co__29847.png',
  'assets/predator_co__90287.png',
  'assets/pumpkins_and_skulls_co__26019.png',
  'assets/Rise_Up_CO.png',
  'assets/scarebucks_co__74347.png',
  'assets/scarecrow_01_co__59309.png',
  'assets/scary_witch_with_pumpkin_co__73093.png',
  'assets/seven_gastly_ghost_co__06881.png',
  'assets/shhh_co__25576.png',
  'assets/sick_spiral_co__60367.png',
  'assets/skull_with_flames_co__48808.png',
  'assets/the_cats_meow_co__94345.png',
  'assets/vampire_fangs_01_co__03810.png',
  'assets/werewolf_02_co__24841.png',
  'assets/witch_and_cat_silhouette_co__84335.png',
  'assets/witch_and_spider_silhouette_co__55672.png',
  'assets/witches_cauldron_02_co__17853.png',
  'assets/Wizard_CO.png',
  'assets/zombie_sloth_co__67274.png'
  ];

const gallery = document.getElementById('gallery');
const BATCH_SIZE = 10;
let currentIndex = 0;
let count = 1;
let isLoading = false;

async function renderFile(file, number) {
  const container = document.createElement('div');
  container.classList.add('item-container');

  const ext = file.split('.').pop().toLowerCase();

  if (ext === 'pdf') {
    // === PDF Preview ===
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
    // === Image Preview ===
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

  // === Number Button ===
  const nmb = document.createElement('button');
  nmb.textContent = number;
  nmb.classList.add('nmb-btn');

  // === Print Button ===
  const btn = document.createElement('button');
  btn.textContent = 'Print';
  btn.classList.add('print-btn');
  btn.addEventListener('click', () => {
    // Open the original file directly for print, unscaled
    const newTab = window.open('', '_blank');
    if (!newTab) {
      alert('Please allow pop-ups to enable printing.');
      return;
    }

    // Write minimal markup depending on file type
    if (ext === 'pdf') {
      newTab.document.write(`
        <html><body style="margin:0;padding:0;">
        <embed src="${file}" type="application/pdf" width="100%" height="100%">
        </body></html>
      `);
    } else {
      newTab.document.write(`
        <html><body style="margin:0;padding:0;text-align:center;">
        <img src="${file}" style="max-width:100%;height:auto;">
        </body></html>
      `);
    }

    // Wait for content to load before printing
    newTab.document.close();
    newTab.onload = () => {
      newTab.focus();
      newTab.print();
    };
  });

  container.appendChild(nmb);
  container.appendChild(btn);
  gallery.appendChild(container);
}

async function loadNextBatch() {
  if (isLoading || currentIndex >= files.length) return;
  isLoading = true;

  const batch = files.slice(currentIndex, currentIndex + BATCH_SIZE);
  for (const file of batch) {
    await renderFile(file, count++);
  }
  currentIndex += batch.length;
  isLoading = false;
}

loadNextBatch();

window.addEventListener('scroll', async () => {
  if (
    !isLoading &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 400
  ) {
    await loadNextBatch();
  }
});
