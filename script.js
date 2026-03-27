document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const subjectContents = document.querySelectorAll('.subject-content');
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && prefersDark)) document.documentElement.classList.add('dark');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

           
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            subjectContents.forEach(content => content.classList.remove('active'));

          
            link.classList.add('active');

       
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if(target){
                target.classList.add('active');
                target.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });

    
        link.addEventListener('mousemove', (ev)=>{
            const rect = link.getBoundingClientRect();
            const x = (ev.clientX - rect.left - rect.width/2)/8;
            const y = (ev.clientY - rect.top - rect.height/2)/16;
            link.style.transform = `translate(${x}px, ${y}px)`;
        });
        link.addEventListener('mouseleave', ()=> link.style.transform='');
    });

  
    if(themeToggle){
        themeToggle.addEventListener('click', ()=>{
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
           
            themeToggle.animate([{transform:'scale(0.98)'},{transform:'scale(1)'}],{duration:150});
        });

   
        window.addEventListener('keydown', (e)=>{
            if(e.key.toLowerCase()==='t') themeToggle.click();
        });
    }

    
    subjectContents.forEach((sec, idx)=>{
        sec.style.animationDelay = `${idx*40}ms`;
    });
});
