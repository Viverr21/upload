document.addEventListener('DOMContentLoaded', () => {

    // ======================== FUNGSI UTAMA ========================
    async function upload() {
        const file = document.getElementById("file").files[0];
        const form = new FormData();
        form.append("file", file);

        const res = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: form
        });
        loadFiles();
    }
    // Wajib membuat global agar tombol HTML bisa memanggilnya
    window.upload = upload; 

    // 🔥 FUNGSI PERBAIKAN STABIL: Menggunakan document.createElement
    async function loadFiles() {
        const res = await fetch("http://localhost:3000/files");
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Gagal memuat file dari server. Status:", res.status, "Respons Server:", errorText);
            document.getElementById("list").innerHTML = "Error: Gagal memuat galeri (Cek konsol)";
            return;
        }
        
        const data = await res.json();
        const list = document.getElementById("list");
        list.innerHTML = "";

        data.forEach(f => {
            // Pastikan URL file statis Anda benar
            const fullUrl = `http://localhost:3000${f.path}`;
            let mediaElement;
            
            if (f.path.endsWith(".mp4") || f.path.endsWith(".mov")) {
                mediaElement = document.createElement("video");
                mediaElement.width = 300;
                mediaElement.controls = true;
                
                // Event listener ditambahkan secara JavaScript (stabil)
                mediaElement.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    e.stopPropagation();
                    openModal(fullUrl, 'video');
                });
                
            } else {
                mediaElement = document.createElement("img");
                mediaElement.width = 200;
                
                // Event listener ditambahkan secara JavaScript (stabil)
                mediaElement.addEventListener('click', () => openModal(fullUrl, 'image'));
            }

            mediaElement.src = fullUrl;
            mediaElement.classList.add('gallery-media'); // Tambahkan kelas untuk styling
            
            list.appendChild(mediaElement);
        });
    }

    loadFiles(); // Dipanggil setelah DOM siap


    // ======================== FUNGSI MODAL ========================
    function openModal(url, type) {
      document.getElementById("modal").classList.remove("hidden"); 
      const img = document.getElementById("modalImage");
      const vid = document.getElementById("modalVideo");
      img.classList.add("hidden"); 
      vid.classList.add("hidden");

      if (type === "image") {
        img.src = url;
        img.classList.remove("hidden");
      } else {
        vid.src = url;
        vid.classList.remove("hidden");
        vid.play();
      }
    }
    window.openModal = openModal;

    function closeModal() {
      document.getElementById("modal").classList.add("hidden");
      document.getElementById("modalVideo").pause();
    }
    window.closeModal = closeModal;


    // ======================== KODE ANIMASI BINTANG ========================
    const canvas = document.getElementById("stars");
      const ctx = canvas.getContext("2d");
      let stars = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        stars.forEach(s => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
            s.x += s.dx;
            s.y += s.dy;
            if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
            if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();
});