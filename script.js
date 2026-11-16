let buku = [];
let nomorEdit = null;

function tambahBuku() {
    let judul = document.getElementById("judul").value;
    let penulis = document.getElementById("penulis").value;
    let tahun = document.getElementById("tahun").value;

    if (judul === "" || penulis === "" || tahun === "") {
        alert("Semua data harus diisi!");
        return;
    }

    if (nomorEdit === null) {
        buku.push({
            judul: judul,
            penulis: penulis,
            tahun: tahun,
            status: "Tersedia"
        });
    } else {
        buku[nomorEdit].judul = judul;
        buku[nomorEdit].penulis = penulis;
        buku[nomorEdit].tahun = tahun;
        nomorEdit = null;
    }

    document.getElementById("judul").value = "";
    document.getElementById("penulis").value = "";
    document.getElementById("tahun").value = "";

    tampilkanBuku();
}

function tampilkanBuku() {
    let tabel = document.getElementById("daftarBuku");
    let cari = document.getElementById("cari").value.toLowerCase();

    tabel.innerHTML = "";

    let jumlah = 0;

    buku.forEach((data, index) => {
        if (!data.judul.toLowerCase().includes(cari)) {
            return;
        }

        jumlah++;

        tabel.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${data.judul}</td>
                <td>${data.penulis}</td>
                <td>${data.tahun}</td>
                <td>${data.status}</td>
                <td>
                    <button class="edit"
                    onclick="editBuku(${index})">Edit</button>

                    <button class="hapus"
                    onclick="hapusBuku(${index})">Hapus</button>

                    <button class="pinjam"
                    onclick="ubahStatus(${index})">
                    ${data.status === "Tersedia" ? "Pinjam" : "Kembalikan"}
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("jumlahBuku").innerText = buku.length;
}

function editBuku(index) {
    document.getElementById("judul").value = buku[index].judul;
    document.getElementById("penulis").value = buku[index].penulis;
    document.getElementById("tahun").value = buku[index].tahun;

    nomorEdit = index;
}

function hapusBuku(index) {
    if (confirm("Yakin ingin menghapus buku ini?")) {
        buku.splice(index, 1);
        tampilkanBuku();
    }
}

function ubahStatus(index) {
    if (buku[index].status === "Tersedia") {
        buku[index].status = "Dipinjam";
    } else {
        buku[index].status = "Tersedia";
    }

    tampilkanBuku();
}
