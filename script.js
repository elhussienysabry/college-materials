
const SUBJECTS = [
    {
        id: 'management-accounting',
        name: 'Management Accounting',
        icon: 'fa-calculator',
        color: '#d4af37',
        gradient: 'linear-gradient(135deg, #d4af37, #f4d03f)',
        description: 'Cost analysis and financial planning'
    },
    {
        id: 'analysis-design',
        name: 'Analysis & Design',
        icon: 'fa-project-diagram',
        color: '#06b6d4',
        gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        description: 'System design and architecture'
    },
    {
        id: 'international-economic',
        name: 'Int. Economic',
        icon: 'fa-globe',
        color: '#10b981',
        gradient: 'linear-gradient(135deg, #10b981, #059669)',
        description: 'Global economics and trade'
    },
    {
        id: 'international-accounting',
        name: 'Int. Accounting',
        icon: 'fa-book',
        color: '#f97316',
        gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
        description: 'International accounting standards'
    },
    {
        id: 'hr-management',
        name: 'HR Management',
        icon: 'fa-users',
        color: '#f43f5e',
        gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)',
        description: 'Human resources management'
    },
    {
        id: 'programming-2',
        name: 'Programming 2',
        icon: 'fa-code',
        color: '#8b5cf6',
        gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        description: 'Advanced programming concepts'
    },
    {
        id: 'statistical-analysis',
        name: 'Statistics',
        icon: 'fa-chart-bar',
        color: '#6366f1',
        gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        description: 'Statistical analysis and data'
    }
];


function renderSubjects() {
    const subjectsList = document.getElementById('subjects-list');
    if (!subjectsList) return;

  
    subjectsList.innerHTML = '';

    // Create list item for each subject
    SUBJECTS.forEach((subject, index) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        
        // Link attributes
        link.href = `#${subject.id}`;
        link.className = 'nav-link' + (index === 0 ? ' active' : '');
        link.setAttribute('data-subject', subject.id);
        link.setAttribute('title', subject.description);
        
        // Icon container with color
        const iconSpan = document.createElement('span');
        iconSpan.className = 'nav-icon';
        iconSpan.setAttribute('data-color', subject.color);
        iconSpan.setAttribute('data-gradient', 'true');
        
        // Set CSS custom properties for this icon
        iconSpan.style.setProperty('--subject-color', subject.color);
        iconSpan.style.setProperty('--subject-gradient', subject.gradient);
        
        // Icon element
        const icon = document.createElement('i');
        icon.className = `fas ${subject.icon}`;
        
        // Label
        const labelSpan = document.createElement('span');
        labelSpan.className = 'nav-label';
        labelSpan.textContent = subject.name;
        
        // Build structure
        iconSpan.appendChild(icon);
        link.appendChild(iconSpan);
        link.appendChild(labelSpan);
        li.appendChild(link);
        subjectsList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSubjects();
    initializeSidebar();
    initializeThemeSystem();
    initializeNavigation();
    initializeEditable();
});


function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

   
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;

   
    const openSidebar = () => {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        if (sidebarToggle) {
            sidebarToggle.setAttribute('aria-expanded', 'true');
        }
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        // Move focus into sidebar for accessibility
        const firstNavLink = navLinks[0];
        if (firstNavLink) {
            firstNavLink.focus();
        }
    };

 
    const closeSidebar = () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        if (sidebarToggle) {
            sidebarToggle.setAttribute('aria-expanded', 'false');
            sidebarToggle.focus();
        }
        // Re-enable body scroll
        document.body.style.overflow = '';
    };

 
    const toggleSidebar = () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    };


    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });

        sidebarToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSidebar();
            }
        });
    }

    // Close Button
    if (sidebarClose) {
        sidebarClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar();
        });
    }

    // Close sidebar when clicking on overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', (e) => {
            if (e.target === sidebarOverlay) {
                closeSidebar();
            }
        });
    }

    // Close sidebar when clicking on a nav link (mobile only)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    closeSidebar();
                }, 100);
            }
        });

        // Keyboard navigation in sidebar
        link.addEventListener('keydown', (e) => {
            const linksArray = Array.from(navLinks);
            const currentIndex = linksArray.indexOf(link);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextLink = linksArray[currentIndex + 1];
                if (nextLink) nextLink.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevLink = linksArray[currentIndex - 1];
                if (prevLink) prevLink.focus();
            } else if (e.key === 'Home') {
                e.preventDefault();
                linksArray[0].focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                linksArray[linksArray.length - 1].focus();
            }
        });
    });

    // Close sidebar with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });


    // Touch Start
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
    }, false);

    // Touch End
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const touchDuration = Date.now() - touchStartTime;
        const touchDistance = touchEndX - touchStartX;
        const minDistance = 50; // Minimum swipe distance
        const maxDuration = 500; // Maximum duration for swipe

        
        if (
            touchStartX < window.innerWidth * 0.15 &&
            touchDistance > minDistance &&
            touchDuration < maxDuration &&
            window.innerWidth <= 768 &&
            !sidebar.classList.contains('active')
        ) {
            e.preventDefault();
            openSidebar();
        }

        // Swipe left → close
        if (
            touchDistance < -minDistance &&
            touchDuration < maxDuration &&
            window.innerWidth <= 768 &&
            sidebar.classList.contains('active')
        ) {
            e.preventDefault();
            closeSidebar();
        }
    }, false);


    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    });

    // Initialize aria-expanded attribute
    if (sidebarToggle) {
        sidebarToggle.setAttribute('aria-expanded', 'false');
    }
}


function initializeThemeSystem() {
    const themeSelect = document.getElementById('theme-select');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    setTheme(savedTheme);
    
    if (themeSelect) {
        themeSelect.value = savedTheme;
        themeSelect.addEventListener('change', (e) => {
            setTheme(e.target.value);
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Keyboard shortcut: Cmd/Ctrl + Shift + T to cycle through themes
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === 'KeyT') {
            e.preventDefault();
            cycleTheme();
        }
    });
}


function setTheme(theme) {
    const root = document.documentElement;
    const validThemes = ['light', 'dark', 'gold', 'blue', 'purple'];
    
    // Remove all theme classes
    validThemes.forEach(t => root.classList.remove(t));
    
    // Add selected theme
    if (theme !== 'light') {
        root.classList.add(theme);
    }
    
    localStorage.setItem('theme', theme);
    
    // Add smooth transition animation
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}


function cycleTheme() {
    const themes = ['light', 'dark', 'gold', 'blue', 'purple'];
    const root = document.documentElement;
    let currentTheme = 'light';
    
    for (const theme of themes) {
        if (root.classList.contains(theme)) {
            currentTheme = theme;
            break;
        }
    }
    
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    setTheme(nextTheme);
    
    if (document.getElementById('theme-select')) {
        document.getElementById('theme-select').value = nextTheme;
    }
}

/**
 * Initialize Subject Navigation
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const subjectContents = document.querySelectorAll('.subject-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            subjectContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Show corresponding content
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.classList.add('active');
                
                // Smooth scroll to top of main content
                document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        // Add hover animation effect
        link.addEventListener('mouseenter', (e) => {
            if (window.innerWidth > 768) {
                const rect = link.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 10;
                const y = (e.clientY - rect.top - rect.height / 2) / 10;
                link.style.transform = `translate(${x}px, ${y}px)`;
            }
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });

    // Set initial active section
    const firstLink = navLinks[0];
    if (firstLink) {
        firstLink.click();
    }
}

/**
 * Initialize Editable Content
 */
function initializeEditable() {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');

    editableElements.forEach(element => {
        // Save content to sessionStorage
        element.addEventListener('blur', () => {
            const key = `editable-${element.textContent.slice(0, 10)}`;
            sessionStorage.setItem(key, element.textContent);
        });

        // Restore content from sessionStorage
        const key = `editable-${element.textContent.slice(0, 10)}`;
        const saved = sessionStorage.getItem(key);
        if (saved) {
            element.textContent = saved;
        }

        // Prevent breaking paragraph structure
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    });
}

/**
 * Utility: Check if screen is mobile
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * Utility: Smooth scroll polyfill for older browsers
 */
if (!('scrollIntoView' in Element.prototype)) {
    Element.prototype.scrollIntoView = function () {
        this.scrollIntoViewIfNeeded(true);
    };
}
