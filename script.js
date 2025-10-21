const accessToken = 'sl.u.AGD0GPQt552qgwuH3SBagj6HXKtam6esuxhL3_YitC_beqv1jqMnnOBhbPp3fpsHGvVdjwLiGT-nNWpM4LavZIeq34JwjraBGFSnEio9yJPgQDvN7oZ_d8Yai7xO0QpgdL6W8aKK72odOwCV9a0_0e9msqImi5mUf5ppZy6EIK-VvNIF9I8zXPJy8xNfbGE-UmAkWBnPoOSbdyunWq5CM4hswvV5k1np1AekgijpHP6mf-LbUoI1NbuzQC7Nx8hCg-P4Ab-VDX32KhYABp7y3TGeNH5G6MzG-xCcikrqxXuFcPIa_2Yr0jXEl1ti_wTgQUUyUsXIZRKC2L8av6MmtlI4VLkj-XsNbY2Uz-XuQAgK7yZQQpmz_rj_Z5q_sFOrLZmWm_ZMoPhjaFpGitS1MJ6luDuOXjrqM1DP0d6Ol65NqqddrayiwqDbg-k2AbJP8b-mtSPlGzqdt6BTYl4X6GQ8UR6RxZrp4Givvel-F3X91tmSz6svVERJtnLx-0RV1nvvxzRYQ8_ez3qY0mIBvV2Wq3scKb7sVS_QX6FCTUY6gqZbkNHvDQyZcxMZucj6vl-nZD2gUdKau8_JLoY3yOym6YTC57Dea7oGqQ-Dj5JjfgfXuTX_01lO1huMvWlc7dBcO6fCMqRa6aZqSgNHGv_66MeuQihVFf87ZwRukpNzJDjA8ZvTuEonplaAWg0DSzmwZ7zYFdJcmFZS4RIUzu7CeY9gSkj3wYnbT2PkKAev0YNRs4LDKijU7K5Rhh2858zF_-Miaf9kdyKoOagOwfWnrX6P78Er8DEG2Bm3qlBF3Xw5eIxwP36Lx-rbI5BFKBPplRmmOMRMQuOUGVkbpB8a-avRMQsj8QkBhEngZimlLYiVYvtNmJkQFSNX2deXEuTpfuM0PbR-FnB88zeGliehEnJh6sjGX6U7KPE8RgcXFpOjqc4oY9tU5HXbzScplRW6upbOynLNW9HMhLOXoELzRzh8-gQ6q0VZY3yOJbkag3kv8P71FB6SorzVoQIHx1c9Dij6rKtzl9rFZSpq6cERAis4rRv1sIAxlqxNnWv03qkXxzxXWXWx-vOUzDw97Wk02QIOAsl479bFM5-biVDk-Zdlwpbla84kWLTvF2ymYLTZREnSKsgjA0EDjqqJM0NBwXZsvA3pTRTpphqMp92zi7zYsyjO2ZQW9FZyAtO2oklZw3HZFkWnsKb94bHnbC9WIJK-LwaKo1x2Exw7CDZvUtqW1NwGcQ4i88GnUmkXgWH2vW0EzVl1vBwurr0jwkazob4kjnts5hCypTvItEZBSkLgHdosewzFPNWOj_KT4T3ldC0agesrO1IXcnwQ8vFDGb605GICALfNIQCg-XMig1mi1Izph5yeAHzXRIuu9hfiPnkRAIWxcQL19w661hTNP5ZvrvOzIJni6pF4KikeysnkUORW18qXJmVZAjTr9G-dy-IaDFSQRzVbYSoQuVM'
const folderPath = '/stencils'; // e.g. '/photos' or '' for app root

async function loadImages() {
  const gallery = document.getElementById('gallery');

  try {
    // List files in the folder
    const res = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: folderPath })
    });

    const data = await res.json();
    if (!data.entries) {
      gallery.innerHTML = `<p>Unable to load images (check token or folder path)</p>`;
      return;
    }

    // For each image file, get a temporary link
    for (const entry of data.entries) {
      if (entry['.tag'] === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(entry.name)) {
        const linkRes = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ path: entry.path_lower })
        });

        const linkData = await linkRes.json();
        const img = document.createElement('img');
        img.src = linkData.link;
        img.alt = entry.name;
        img.loading = 'lazy';
        gallery.appendChild(img);
      }
    }
  } catch (err) {
    console.error('Error loading images:', err);
    gallery.innerHTML = `<p>Failed to load images.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadImages);
