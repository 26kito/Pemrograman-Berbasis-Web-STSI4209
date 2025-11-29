var app = new Vue({
    el: '#app',
    data: {
        kodeDO: '',
        hasilTracking: null,
        pencarianDilakukan: false,
        ...dataSource // ambil data global dari data.js
    },

    methods: {
        cekTracking() {
            this.pencarianDilakukan = true;
            const kode = this.kodeDO.trim();
            if (kode && this.tracking[kode]) {
                this.hasilTracking = this.tracking[kode];
            } else {
                this.hasilTracking = null;
            }
        }
    },

    watch: {
        kodeDO(newVal) {
            console.log("Input nomor DO berubah:", newVal);
        }
    }
});
