document.addEventListener('DOMContentLoaded', () => {
    updateText();
});

function updateText() {
    let lang = document.documentElement.getAttribute('lang');
    document.querySelectorAll(`[data-langkey]`).forEach(element => {
        let key = element.getAttribute('data-langkey');
        if (key) {
            element.textContent = langdata.languages[lang].strings[key];
        }
    });
}

function toggleLanguage() {
    let currentLang = document.documentElement.getAttribute('lang');
    if (currentLang == 'en') {
        document.documentElement.setAttribute('lang', 'jp');
    } else {
        document.documentElement.setAttribute('lang', 'en');
    }

    updateText();
}