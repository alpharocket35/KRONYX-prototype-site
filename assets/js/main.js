const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#nav');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('span').textContent=open?'−':'＋'});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.querySelector('span').textContent='＋'}));}

(() => {
    const loader = document.getElementById("kronyx-loader");

    if (!loader) return;

    // Masquer le chargement quand la page est prête
    window.addEventListener("load", () => {
        if (document.body.classList.contains("page-404")) {
            const loaderMessage = document.getElementById("loader-message");
            let secondes = 0;

            const compteARebours = setInterval(() => {
                secondes++;

                if (loaderMessage) {
                    loaderMessage.textContent =
                        `Recherche d'une page correspondant à votre requête… ${secondes} s`;
                }

                if (secondes >= 10) {
                    clearInterval(compteARebours);
                    loader.classList.add("hidden");
                }
            }, 1000);
        } else {
            loader.classList.add("hidden");
        }
    }, { once: true });

    // Afficher le chargement lors d'une navigation interne
    document.addEventListener("click", (event) => {
        const link = event.target.closest("a[href]");

        if (
            !link ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey ||
            link.target === "_blank" ||
            link.hasAttribute("download")
        ) return;

        const url = new URL(link.href, location.href);

        if (url.origin !== location.origin) return;

        if (
            url.pathname === location.pathname &&
            url.search === location.search
        ) return;

        loader.classList.remove("hidden");
    });

    // Restaurer correctement l'affichage avec précédent/suivant
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            loader.classList.add("hidden");
        }
    });
})();
