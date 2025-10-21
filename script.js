const accessToken = 'sl.u.AGAD0ojIWrjK8Uctnj8cOt0_x_6Uxy0vxuVG6vM_lh1n1_K7l39DlbSbn5D48kK4SAPnz9ED2kZtywbWDhye7aE8M3qP0zs9SXHLANKt3s3itTQjPdQJaJhHpAKd7qeghg0nLQWBq-RWsxBDF_KYaKGCc21NiKvMDN9b2eGhW-Q3nhfGcrNiWGChdKatqqPFh80wXUBTfxMFdqH215TThE87R_cv-NTUw0X6JCIDZMCUwpgKVfyqJzX_C-Blfv1e25XGTo3AkrGJy-NFPv2DWXnJnZHI2NUceqPjGs_5KC7ZuKRI19jbTMe6vOc9LvE-ZRYPZLhYhS8VDXR3cOkcTrt3kP1leqfpmdPLBO3YcJKMxORU92WWTAz-dqF70LXe_n2-oMu7UKxO5NeJ6vSAoIopY7sttDNUfypTP8a_e_t47h-IPXTyjV1C1nE5DJQSrRn2GjQub-7sEG8xjGVq-jA4L5CEcFRhN6g5LdZ-eniCbs9ALt1jU3JwY7F8DG7hertkkJqUagaRVDLntUY4_m0Y7FAK_-JYrGMDWLNAQhCrGFl_d_qjVOQhMpYkttU2Ftag5nd_TC8k8ot3w_q5bbtLeqqCfivZvcJnnYMkdyzQ3rUYHl0vW8cuZxrvYTVK1vYWGzuecS5ShwwTeL8rK_XLEpdk5W14A7XERZ5JIz8LOZpZ835exX9qKFMjA3ijE_2j-1phX9Z3U4sIERLihqM5qfAeMhlpp_WcBx9b8BXz8syI76NAVzYbewu--JfeUN_nY-BfdauvZXuW_OfR0kk63v3t4eDlcyFpz4IKNCjUXeW1Nmu8rZXg5gETbn0jthjtNMVqfYOTNAmS-j9QgAvS7QCqwyYrRxwVotvC6C3Q3EdtqgElTbAWozMY0ANhFbDpZXuq6aEpfPd-gfXlluGXWeVLbMtKDjCaaKU7aGMcw8Ta8s4oB2qe_Kw2QGcpamPIInoxDcStLRKse2ZdmVTjQhjibXHSdiAmjNCpa9Vyut0WqSMVGyHRvrfZ_tZLXvrOQk850Hjq59gV4b_T9CGLPRK38jd7JiWYexKnd2np2PhZvb1TPpA006ClEHx4BDAgluLnjd2kXaoGu2C9stDv2lUWEhfJ36JH0jaWtNcBL0rPR6SXXiF3TRg3wJx-xxSq8oedzWXycyK_ZYRkt91zJwUTxD1suFbh1dYEt4v0L5P5BcDAwdg20iLlf8rAsqoRBWSI4PIWMVZwFaIhLg2JphCq1UEsaqvI9603YgpfdFnQ75C3uKhCP18CmEpfZ1Hm0FmujW08sl3Xqol5-Sm_ENBui5dEJJi90ERo1Pzhxg6x-welF68I2eSdytThN3dKUVxJfALgs6vj2WZqoVSljQRmnpBA9i41hN8SIS768pXTu6zawUCcHNGKyJ90AWpUaXeMfb00C1Mn2PV3jvoUK-jxbGg71V3ws2iHC4zTMsuRm_ZRVkMgATRfPviyoBI'; 
const folderPath = 'stencils'; // e.g. '' for root or '/pumpkin_stencils'

async function loadImages() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '<p>Loading files...</p>';

  try {
    // List folder contents
    const res = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: folderPath })
    });

    const data = await res.json();
    gallery.innerHTML = '';

    if (!data.entries || !data.entries.length) {
      gallery.innerHTML = '<p>No files found.</p>';
      return;
    }

    for (const entry of data.entries) {
      if (entry['.tag'] === 'file' && /\.(jpg|jpeg|png|gif|pdf)$/i.test(entry.name)) {
        const linkRes = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ path: entry.path_lower })
        });

        const linkData = await linkRes.json();

        // Handle PDF files
        if (/\.pdf$/i.test(entry.name)) {
          const iframe = document.createElement('iframe');
          iframe.src = linkData.link;
          iframe.width = '100%';
          iframe.height = '600px';
          iframe.style.border = '1px solid #444';
          iframe.style.borderRadius = '8px';
          iframe.title = entry.name;
          gallery.appendChild(iframe);
        } else {
          // Handle image files
          const img = document.createElement('img');
          img.src = linkData.link;
          img.alt = entry.name;
          img.loading = 'lazy';
          gallery.appendChild(img);
        }
      }
    }
  } catch (err) {
    console.error('Error loading files:', err);
    gallery.innerHTML = '<p>Failed to load files.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadImages);
