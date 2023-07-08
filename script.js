function openTab(event, tabName) {
  //declare all
  let i, tabcontent, tablinks;
  //hide all tabcontent
  tabcontent = document.querySelectorAll(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  //remove class active
  tablinks = document.querySelectorAll(".tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  //show current tab and  add 'active' class to button that opened tab
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");
}

// Logika Validasi
async function validateForm(event) {
  event.preventDefault();

  const namaInput = document.getElementById("nama");
  const umurInput = document.getElementById("umur");
  const sanguInput = document.getElementById("sangu");
  const tableBody = document.querySelector("#myTable tbody");

  const nama = namaInput.value;
  const umur = parseInt(umurInput.value);
  const sangu = parseInt(sanguInput.value);

  if (nama.length < 10) {
    alert("Nama harus memiliki minimal 10 karakter!");
    namaInput.focus();
    return false;
  }

  if (umur < 25) {
    alert("Umur minimal 25 tahun!");
    umurInput.focus();
    return false;
  }

  if (sangu < 100000 || sangu > 1000000) {
    alert("Sangu Min 100rb dan Max 1jt!");
    sanguInput.focus();
    return false;
  }

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${nama}</td>
    <td>${umur}</td>
    <td>${sangu}</td>`;

  tableBody.appendChild(newRow);

  namaInput.value = "";
  umurInput.value = "";
  sanguInput.value = "";

  await hitungRataUmur();

  return true;
}

// Logika Validasi
function hitungRataUmur() {
  const rows = document.querySelectorAll("#myTable tbody tr");

  let totalUmur = 0;
  let jumlahDataUmur = 0;
  let jumlahDataSangu = 0;
  let totalSangu = 0;

  rows.forEach((row) => {
    const selUmur = row.querySelector("td:nth-child(2)");
    const selSangu = row.querySelector("td:nth-child(3)");

    const umur = parseInt(selUmur.textContent);
    const sangu = parseInt(selSangu.textContent);

    if (!isNaN(umur)) {
      totalUmur += umur;
      jumlahDataUmur++;
    }
    if (!isNaN(sangu)) {
      totalSangu += sangu;
      jumlahDataSangu++;
    }
  });
  const avgUmurEle = document.getElementById("rataUmur");
  const avgSanguEle = document.getElementById("rataSangu");

  if (jumlahDataUmur > 0) {
    const avgUmur = totalUmur / jumlahDataUmur;
    avgUmurEle.textContent = Math.round(avgUmur);
  } else {
    avgUmurEle.textContent = "";
  }
  if (jumlahDataSangu > 0) {
    const avgSangu = totalSangu / jumlahDataSangu;
    avgSanguEle.textContent = Math.round(avgSangu).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  } else {
    avgSanguEle.textContent = "";
  }
}

document.addEventListener("DOMContentLoaded", hitungRataUmur);
