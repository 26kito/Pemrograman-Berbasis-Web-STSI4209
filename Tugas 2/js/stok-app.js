var app = new Vue({
    el: '#app',
    data: {
        ...dataSource,
        filterUpbjj: '',
        filterKategori: '',
        sortBy: 'judul',
        showMenipis: false,
        showKosong: false,
        editIndex: null,
        editItem: {},
        newItem: { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', qty: 0, safety: 0, harga: 0, catatanHTML: '' }
    },

    computed: {
        filteredStok() {
            return this.stok.filter(item => {
                const matchUpbjj = this.filterUpbjj ? item.upbjj === this.filterUpbjj : true;
                const matchKategori = this.filterKategori ? item.kategori === this.filterKategori : true;
                const matchMenipis = this.showMenipis ? item.qty < item.safety && item.qty > 0 : true;
                const matchKosong = this.showKosong ? item.qty === 0 : true;
                return matchUpbjj && matchKategori && matchMenipis && matchKosong;
            });
        },
        sortedStok() {
            let arr = [...this.filteredStok];
            if (this.sortBy === 'judul') arr.sort((a, b) => a.judul.localeCompare(b.judul));
            else if (this.sortBy === 'qty') arr.sort((a, b) => b.qty - a.qty);
            else if (this.sortBy === 'harga') arr.sort((a, b) => b.harga - a.harga);
            return arr;
        }
    },

    methods: {
        resetFilter() {
            this.filterUpbjj = '';
            this.filterKategori = '';
            this.sortBy = 'judul';
            this.showMenipis = false;
            this.showKosong = false;
        },
        startEdit(index) {
            this.editIndex = index;
            this.editItem = { ...this.stok[index] };
        },
        saveEdit(index) {
            if (this.editItem.qty < 0) {
                alert("Qty tidak boleh negatif!");
                return;
            }
            Vue.set(this.stok, index, { ...this.editItem });
            this.editIndex = null;
        },
        cancelEdit() {
            this.editIndex = null;
            this.editItem = {};
        },
        tambahItem() {
            if (!this.newItem.kode || !this.newItem.judul || !this.newItem.upbjj) {
                alert("Kode, Judul, dan UT-Daerah wajib diisi!");
                return;
            }
            this.stok.push({ ...this.newItem });
            this.newItem = { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', qty: 0, safety: 0, harga: 0, catatanHTML: '' };
        }
    }
});
