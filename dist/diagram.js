"use strict";
// Fungsi utama untuk menggambar diagram silsilah keluarga
function renderDiagram(currentUserId) {
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = allUsers.find((u) => u.id === currentUserId);
    if (!currentUser)
        return;
    const nodes = [];
    const added = new Set();
    // Fungsi untuk menambahkan node ke diagram
    function addNode(id, name, title, pid) {
        if (!added.has(id)) {
            nodes.push({ id, pid, name, title });
            added.add(id);
        }
    }
    allUsers.forEach((user) => {
        const relasi = JSON.parse(localStorage.getItem(`relasi_${user.id}`) || "[]");
        addNode(user.id, user.namaLengkap || user.email, user.id === currentUser.id ? "Saya" : "User");
        relasi.forEach((r) => {
            const target = allUsers.find((u) => u.namaLengkap === r.nama || u.email === r.nama);
            if (target) {
                let pid;
                switch (r.tipe) {
                    case "Anak":
                        pid = user.id;
                        break;
                    case "Ayah":
                    case "Ibu":
                        pid = target.id;
                        break;
                    case "Saudara":
                    case "Pasangan":
                        pid = undefined;
                        break;
                }
                addNode(target.id, target.namaLengkap || target.email, r.tipe, pid);
            }
        });
    });
    const treeContainer = document.getElementById("tree");
    if (treeContainer) {
        new OrgChart(treeContainer, {
            nodes,
            nodeBinding: {
                field_0: "name",
                field_1: "title"
            },
            template: "isla",
            enableSearch: true,
            scaleInitial: OrgChart.match.boundary,
            zoom: {
                speed: 90,
                smooth: 5
            },
            nodeMouseClick: OrgChart.action.none,
            mouseScrool: OrgChart.action.zoom,
            toolbar: {
                zoom: true,
                fit: true,
                expandAll: true,
                fullScreen: true,
            }
        });
    }
}
// Agar bisa dipanggil dari file profile
window.renderDiagram = renderDiagram;
