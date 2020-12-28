document.addEventListener('DOMContentLoaded', () => {
    let lang = document.documentElement.getAttribute('lang');
    setText(lang);

    console.log(langdata);
});

function setText(language) {
    document.querySelectorAll(`[data-langkey]`).forEach(element => {
        let key = element.getAttribute('data-langkey');
        if (key) {
            element.textContent = langdata.languages[language].strings[key];
        }
    });
}