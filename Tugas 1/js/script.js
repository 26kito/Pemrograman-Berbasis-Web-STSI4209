$('.btn-login').on('click', function (e) {
    e.preventDefault();

    // ambil nilai dari input
    const email = $('#email').val();
    const password = $('#password').val();

    const user = dataPengguna.find(u => u.email === email && u.password === password);

    if (user) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", user.nama);
        window.location.href = "dashboard.html";
    } else {
        alert('Email atau password salah!');
    }
})

function checkLogin() {
    const loggedIn = sessionStorage.getItem("isLoggedIn");

    if (!loggedIn) {
        alert("Kamu harus login dulu!");
        window.location.href = "index.html"; // redirect ke halaman login
    }
}

function cariTracking() {
    const nomorDO = document.getElementById("inputNomorDO").value.trim();
    const hasilDiv = document.getElementById("hasilTracking");

    if (!nomorDO) {
        hasilDiv.innerHTML = `<div class="alert alert-warning">Masukkan nomor DO terlebih dahulu.</div>`;
        return;
    }

    const data = dataTracking[nomorDO];
    if (!data) {
        hasilDiv.innerHTML = `<div class="alert alert-danger">Data tidak ditemukan untuk nomor DO: <strong>${nomorDO}</strong></div>`;
        return;
    }

    // Tampilkan detail DO
    let html = `
        <div class="card p-3">
            <h6>Nomor DO: <strong>${data.nomorDO}</strong></h6>
            <p><strong>Nama:</strong> ${data.nama}</p>
            <p><strong>Status:</strong> ${data.status}</p>
            <p><strong>Ekspedisi:</strong> ${data.ekspedisi}</p>
            <p><strong>Tanggal Kirim:</strong> ${data.tanggalKirim}</p>
            <p><strong>Paket:</strong> ${data.paket}</p>
            <p><strong>Total:</strong> ${data.total}</p>
            <h6 class="mt-3">📦 Riwayat Perjalanan:</h6>
            <table class="table table-sm table-striped">
                <thead>
                <tr><th>Waktu</th><th>Keterangan</th></tr>
                </thead>
                <tbody>
  `;

    data.perjalanan.forEach((item) => {
        html += `<tr><td>${item.waktu}</td><td>${item.keterangan}</td></tr>`;
    });

    html += `
        </tbody>
      </table>
    </div>
  `;

    hasilDiv.innerHTML = html;
}

function tampilkanStok() {
    const container = document.getElementById("daftarBahanAjar");
    container.innerHTML = "";

    dataBahanAjar.forEach((item) => {
        const col = document.createElement("div");
        col.className = "col-md-4 col-lg-3";

        col.innerHTML = `
            <div class="card card-bahan">
              <img src="${item.cover}" class="card-img-top" alt="${item.namaBarang}">
              <div class="card-body">
                <h6 class="card-title">${item.namaBarang}</h6>
                <p class="mb-1"><strong>Kode Barang:</strong> ${item.kodeBarang}</p>
                <p class="mb-1"><strong>Lokasi:</strong> ${item.kodeLokasi}</p>
                <p class="mb-1"><strong>Jenis:</strong> ${item.jenisBarang}</p>
                <p class="mb-1"><strong>Edisi:</strong> ${item.edisi}</p>
                <span class="badge bg-success stok-badge">Stok: ${item.stok}</span>
              </div>
            </div>
          `;

        container.appendChild(col);
    });
}

function updateGreeting() {
    const greetingEl = document.getElementById("greeting");
    const username = sessionStorage.getItem("username") || "User";
    const now = new Date();
    const hour = now.getHours();
    let greeting = "";

    if (hour >= 4 && hour < 10) {
        greeting = "Selamat pagi";
    } else if (hour >= 10 && hour < 15) {
        greeting = "Selamat siang";
    } else if (hour >= 15 && hour < 18) {
        greeting = "Selamat sore";
    } else {
        greeting = "Selamat malam";
    }

    greetingEl.textContent = `${greeting}, ${username}!`;
}