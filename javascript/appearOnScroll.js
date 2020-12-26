const fadingSections = document.querySelectorAll('.fade-in');

const options = {
    threshold: 0.5
};

const appearOnScroll = new IntersectionObserver(
    function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("appear");
                appearOnScroll.unobserve(entry.target);
            }
        })
    }, options);

fadingSections.forEach(section => {
    appearOnScroll.observe(section);
});