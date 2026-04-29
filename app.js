let allProducts = [];
let selectedProduct = null;

function formatPriceFull(priceStr) {
    if (!priceStr) return 'Rp 0';
    let str = priceStr.toLowerCase().trim();
    let num = parseFloat(str.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return 'Rp 0';
    if (str.includes('k')) num = num * 1000;
    return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof portfolioData !== 'undefined') {
            allProducts = portfolioData;
            renderProducts(allProducts);
        }
    }, 500);

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => p.title.toLowerCase().includes(query));
        renderProducts(filtered);
    });
});

const BASE_URL = 'https://tokoundangan.pages.dev/template';

function renderProducts(products) {
    const grid = document.getElementById('catalog-grid');
    document.getElementById('resultsCount').innerHTML = `<span class="font-semibold text-gray-700">${products.length}</span> produk ditemukan`;

    grid.innerHTML = products.map(p => {
        // Logika Badge
        const badgeHTML = p.badge && p.badge !== "none" 
            ? `<span class="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm z-10">${p.badge}</span>` 
            : '';

        return `
            <article class="product-card p-3 flex gap-3 fade-in border border-gray-100 relative">
                <div class="thumb-wrap relative">
                    ${badgeHTML}
                    <img src="${BASE_URL}/${p.folder}/${p.thumbnail}" onerror="this.src='https://via.placeholder.com/120'">
                </div>
                <div class="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                        <h3 class="font-semibold text-sm text-gray-800 truncate">${p.title}</h3>
                        <div class="text-blibli-blue font-bold text-base mt-0.5">${formatPriceFull(p.price)}</div>
                        <p class="text-[10px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">${p.description || ''}</p>
                    </div>
                    <div class="flex gap-2 mt-3">
                        <a href="${BASE_URL}/${p.folder}/index.html" target="_blank" class="flex-1 border border-blibli-blue text-blibli-blue text-[10px] font-bold py-2 rounded-lg text-center hover:bg-blibli-light">DEMO</a>
                        <button onclick="openOrderModal('${p.id}')" class="flex-[1.5] bg-blibli-blue text-white text-[10px] font-bold py-2 rounded-lg">ORDER</button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function openOrderModal(id) {
    selectedProduct = allProducts.find(p => p.id === id);
    document.getElementById('modalProductTitle').innerText = selectedProduct.title;
    document.getElementById('orderModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.add('hidden');
    document.body.style.overflow = '';
}

function sendOrderWA() {
    const val = (id) => document.getElementById(id).value || '-';
    const check = (id) => document.getElementById(id).checked ? '✅ Ya' : '❌ Tidak';
    
    const now = new Date();
    const formatTime = now.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) + ' pukul ' + now.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'}) + ' WIB';

    const textWA = `🎊 *ORDER UNDANGAN DIGITAL* 🎊
━━━━━━━━━━━━━━━━━━━━━

👤 *IDENTITAS PEMESAN*
▸ Nama      : ${val('order_nama')}
▸ WhatsApp  : ${val('order_wa')}

🎨 *DESAIN DIPILIH*
▸ Template  : ${selectedProduct.title}

━━━━━━━━━━━━━━━━━━━━━
👰 *PENGANTIN WANITA*
▸ Nama Lengkap : ${val('w_nama')}
▸ Panggilan    : ${val('w_panggilan')}
▸ Putri dari   : ${val('w_ortu')}

🤵 *PENGANTIN PRIA*
▸ Nama Lengkap : ${val('p_nama')}
▸ Panggilan    : ${val('p_panggilan')}
▸ Putra dari   : ${val('p_ortu')}

━━━━━━━━━━━━━━━━━━━━━
💍 *AKAD NIKAH*
▸ Tanggal : ${val('akad_tgl')}
▸ Waktu   : ${val('akad_jam')}
▸ Lokasi  : ${val('akad_lok')}

🎉 *RESEPSI*
▸ Tanggal : ${val('resep_tgl')}
▸ Waktu   : ${val('resep_jam')}
▸ Lokasi  : ${val('resep_lok')}

━━━━━━━━━━━━━━━━━━━━━
📌 *FITUR TAMBAHAN*
▸ ♥️ Kisah Cinta (Story)  : ${check('f_story')}
▸ 🎁 Hadiah / Rekening    : ${check('f_gift')}
▸ 🖼️ Galeri Foto          : ${check('f_galeri')}
▸ 📸 Foto Pengantin       : ${check('f_foto')}

━━━━━━━━━━━━━━━━━━━━━
🎵 *BACKSOUND:*
${val('back_music')}

⏰ *Waktu Order:* ${formatTime}
━━━━━━━━━━━━━━━━━━━━━
_Terima kasih, pesanan Anda segera kami proses! 🙏_`;

    window.open(`https://wa.me/6282333180072?text=${encodeURIComponent(textWA)}`, '_blank');

    // Menutup modal otomatis setelah mengirim order
    closeOrderModal();
}