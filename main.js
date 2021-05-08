// ======= NAVBAR INTERACTIVE ======= //
(function navbarInteractive(navbarToggle, navbarMenu, navbarItems,navbarLinks,buttonToTop,navbar){
    const navToggle = document.getElementById(navbarToggle),
    navMenu = document.getElementById(navbarMenu),
    navItems = document.querySelectorAll(navbarItems),
    navLinks = document.querySelectorAll(navbarLinks),
    btnToTop = document.getElementById(buttonToTop),
    nav = document.getElementById(navbar);

    navToggle.addEventListener('click', ()=> {
        navMenu.classList.toggle('show-navbar')
        navItems.forEach( (item,i)=> {
            if(navMenu.classList.contains('show-navbar')){
                item.style.animation = `linksFadeIn .25s ease forwards ${(i + 1) / 5}s`;
            } else{
                setTimeout(()=> {
                    item.style.animation = '';
                }, 250)
            };
        });
    });


    navLinks.forEach(link=> link.addEventListener('click', (e)=>{
        e.preventDefault();
        const startPosition = window.scrollY,
        targetPosition = document.querySelector(link.hash).offsetTop,
        distance = targetPosition - startPosition,
        duration = 1000;
        let start = null;

        window.requestAnimationFrame(step);
        function step(timestamp){
            if(!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if(progress < duration) window.requestAnimationFrame(step);
        }

        if(navMenu.classList.contains('show-navbar')){
            navToggle.click();
        };
    }));

    window.addEventListener('scroll', ()=> {
        let fromTop = window.scrollY;
        let sectionHeightHome = document.getElementById('home').offsetHeight;

        (fromTop > 10) ? nav.classList.add('scroll-header') : nav.classList.remove('scroll-header');
        (fromTop > sectionHeightHome) ? btnToTop.classList.add('btn-appear'): btnToTop.classList.remove('btn-appear');

        navLinks.forEach( link => {
            let section = document.querySelector(link.hash);
            let fix = 50;
            if(link.classList.contains('nav__link')){
                if( (section.offsetTop - fix) < fromTop && (section.offsetTop - fix) + section.offsetHeight >= fromTop){
                    link.classList.add('active-link');
                } else{
                    link.classList.remove('active-link');
                }
            }
        });
    });

    btnToTop.addEventListener('click', ()=> {
        const startPosition = window.scrollY,
        targetPosition = 0,
        distance = targetPosition - startPosition,
        duration = 1000;
        let start = null

        window.requestAnimationFrame(step);
        function step(timestamp){
            if(!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if(progress < duration) window.requestAnimationFrame(step);
        }
    });


    function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    };
        
})('nav__toggle', 'nav__menu','.nav__item','.nav__header a','btn-to-top','navbar');

// const sectionAbout = document.getElementById('about');

// const object = (sectionElement)=> {
//     let sectionFromTop = sectionElement.offsetTop;
//     let sectionHeight = sectionElement.offsetHeight;
//     let sectionWidth = sectionElement.offsetWidth;

//     return {sectionFromTop, sectionHeight, sectionWidth}
// }


// console.log(object(sectionAbout).sectionWidth)
