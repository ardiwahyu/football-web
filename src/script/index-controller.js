import ApiServices from './api-services.js';
import LocalServices from './local-services.js';
import "../component/list-match.js";

function main() {
    const matchListElement = document.querySelector("list-match");
    const loader = document.querySelectorAll(".overlay", ".spanner");
    let page = window.location.hash.substr(1);
    if (page == "") page = "home";

    const getContent = async (page) => {
        loader.forEach(element => {
            element.classList.add("show");
        })
        let result;
        if (page == "home") {
            result = await ApiServices.getContent(2015);
        } else if (page == "favorite") {
            result = await LocalServices.getAllMatch();
        }

        console.log(result);
        renderResult(result);
        loader.forEach(element => {
            element.classList.remove("show");
        })
    }

    const renderResult = (result) => {
        if (result.length == 0) {
            matchListElement.innerHTML = `<h6 class="center mt-20">- Tidak ada data -</h6>`
        } else {
            matchListElement.from = page;
            matchListElement.items = result;
        }
    }

    document.addEventListener("DOMContentLoaded", function () {

        // Load page content
        getContent(page);

        // Activate sidebar nav
        const elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);
        loadNav();

        function loadNav() {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status != 200) return;

                    // Muat daftar tautan menu
                    document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                        elm.innerHTML = xhttp.responseText;
                    });


                    // Daftarkan event listener untuk setiap tautan menu
                    document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                        elm.addEventListener("click", function (event) {
                            // Tutup sidenav
                            const sidenav = document.querySelector(".sidenav");
                            M.Sidenav.getInstance(sidenav).close();

                            // Muat konten halaman yang dipanggil
                            page = event.target.getAttribute("href").substr(1);
                            getContent(page);
                        });
                    });
                }
            };
            xhttp.open("GET", "nav.html", true);
            xhttp.send();
        }
    });
}

export default main;