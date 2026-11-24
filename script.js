/* ============================================================
       SHARED CHAPTER SIDEBAR (desktop: always open)
       Edit the CHAPTERS list below to add / rename chapters & topics.
       - id        : must match <body data-chapter="ID"> of that page
       - topics    : data-content ids used by that page's own JS
       - children  : sub-topics (shown indented under a topic)
       Pages need: <body class="has-chapter-nav" data-chapter="ID"> and
                   <aside class="chapter-sidebar" id="chapterSidebar"></aside>
    ============================================================ */
    
function renderChapterSidebar() {
        var CHAPTERS = [
            { id: 'preface',  label: 'Preface', href: 'Preface.html' },

            { id: 'chapter1', label: '2. Need and scope', href: 'chapter1.html', singlePage: true,
              topics: [
                  { id: 'intro',       label: 'The Need and scope' },
                  { id: 'not-covered', label: 'What is not covered' },
                  { id: 'covered',     label: 'What is covered' }
              ] },

            { id: 'chapter2', label: '3. How to use the manual', href: 'chapter2.html' },

            { id: 'chapter3', label: '4. Engaging the architect', href: 'chapter3.html', singlePage: true,
              topics: [
                  { id: 'intro', label: 'A. Introduction' },
                  { id: 'approval-process', label: 'B. Five Stage Process Integrated',
                    children: [
                        { id: 'preliminary-design', label: '1. Preliminary Design Submission' },
                        { id: 'concept-design',     label: '2. Concept Design Submission' },
                        { id: 'statutory-approval', label: '3. Statutory Approval Submission' }
                    ] },
                  { id: 'flowchart', label: 'C. Flow Chart' }
              ] },

            { id: 'chapter4', label: '5. High-level considerations', href: 'chapter4.html', singlePage: true,
              topics: [
                  { id: 'intro',                  label: 'Introduction' },
                  { id: 'functional-adequacy',    label: 'A) Functional adequacy' },
                  { id: 'operational-efficiency', label: 'B) Operational efficiency' },
                  { id: 'resources',              label: 'List of resources' }
              ] },

            { id: 'chapter6a', label: '6. Outpatient care', href: 'chapter6a.html', singlePage: true,
              topics: [
                  { id: 'intro', label: 'Introduction' },
                  { id: 'factors-influencing', label: 'A) Factors influencing space',
                    children: [
                        { id: 'service-levels',      label: '1. Service levels of care' },
                        { id: 'layout-design',       label: '2. Layout design' },
                        { id: 'investigation-area',  label: '3. Investigation & procedure area' }
                    ] },
                  { id: 'preferred-practices', label: 'B) Preferred practices' },
                  { id: 'resources',           label: 'List of resources' }
              ] },

            { id: 'chapter6b', label: '7. Operation theatre complex', href: 'chapter6b.html', singlePage: true,
              topics: [
                  { id: 'intro',                label: 'A. Introduction' },
                  { id: 'planning',             label: 'B. Planning for an OT Complex' },
                  { id: 'layout-considerations',label: 'C. Key Layout Design Considerations' },
                  { id: 'preferred-practices',  label: 'D. Preferred Practices' },
                  { id: 'resources',            label: 'List of Resources' }
              ] },

            { id: 'chapter6c', label: '8. Ambulatory and inpatient care', href: 'chapter6c.html', singlePage: true,
              topics: [
                  { id: 'intro',                 label: 'Introduction' },
                  { id: 'design-considerations', label: 'A) Ambulatory/inpatient care unit: design considerations' },
                  { id: 'safety-considerations', label: 'B) Key considerations to ensure safe stay' },
                  { id: 'resources',             label: 'List of resources' }
              ] },

            { id: 'chapter7', label: '9. Patient and staff safety', href: 'chapter7.html', singlePage: true,
              topics: [
                  { id: 'intro',                 label: 'A) Introduction' },
                  { id: 'safety-building-design',label: 'B) Safety considerations in building design' },
                  { id: 'safety-routine-work',   label: 'C) Safety considerations in routine work' },
                  { id: 'good-building-design',  label: 'D) Good building design' },
                  { id: 'references',            label: 'E) References' },
                  { id: 'resources',             label: 'F) List of Resources' }
              ] },

            { id: 'chapter8', label: '10. Energy efficient sustainable hospital infrastructure', href: 'chapter8.html', singlePage: true,
              topics: [
                  { id: 'intro',       label: 'Introduction' },
                  { id: 'procurement', label: '1. Procurement' },
                  { id: 'design',      label: '2. Design' },
                  { id: 'equipment',   label: '3. Equipment' },
                  { id: 'operations',  label: '4. Operations and Maintenance' },
                  { id: 'culture',     label: '5. Fostering a Culture of Sustainable Practices' }
              ] }
        ];

        window.CHAPTER_LIST = CHAPTERS;
        var sidebar = document.getElementById('chapterSidebar');
        if (!sidebar) return;

        var current = document.body.getAttribute('data-chapter');

        function esc(str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        var html = '' +
            '<div class="sidebar-header">' +
                '<div class="close-btn sidebar-close-btn" id="sidebarCloseBtn"><i class="fas fa-times"></i></div>' +
                '<h3>Contents</h3>' +
            '</div>' +
            '<nav class="sidebar-nav"><ul class="nav-list">';

        CHAPTERS.forEach(function (ch) {
            var isActive = ch.id === current;
            html += '<li class="nav-item chapter-item' + (isActive ? ' is-current' : '') + '">';
            html += '<a class="nav-link chapter-link' + (isActive ? ' current-chapter' : '') + '" href="' + esc(ch.href) + '">' +
                    '<span>' + esc(ch.label) + '</span></a>';

            // Topics are shown only under the chapter you are reading.
            if (isActive && ch.topics && ch.topics.length) {
                html += '<ul class="chapter-topics">';
                ch.topics.forEach(function (t) {
                    if (ch.singlePage) {
                        // Single-page chapter: topic (and sub-topic) = anchor that scrolls to the section
                        html += '<li><a class="nav-link topic-link single-link" data-section="content-' + esc(t.id) + '" href="#content-' + esc(t.id) + '">' +
                                '<span>' + esc(t.label) + '</span></a>';
                        if (t.children && t.children.length) {
                            html += '<ul class="chapter-subtopics">';
                            t.children.forEach(function (c) {
                                html += '<li><a class="nav-link subsection-link single-link" data-section="content-' + esc(c.id) + '" href="#content-' + esc(c.id) + '">' +
                                        '<span>' + esc(c.label) + '</span></a></li>';
                            });
                            html += '</ul>';
                        }
                        html += '</li>';
                        return;
                    }
                    html += '<li><div class="nav-link parent-link topic-link" data-content="' + esc(t.id) + '">' +
                            '<span>' + esc(t.label) + '</span></div>';
                    if (t.children && t.children.length) {
                        html += '<ul class="chapter-subtopics">';
                        t.children.forEach(function (c) {
                            html += '<li><div class="nav-link subsection-link" data-content="' + esc(c.id) + '">' +
                                    '<span>' + esc(c.label) + '</span></div></li>';
                        });
                        html += '</ul>';
                    }
                    html += '</li>';
                });
                html += '</ul>';
            }
            html += '</li>';
        });

        html += '</ul></nav>';
        sidebar.innerHTML = html;
    }

(function () {
    function ensureSidebar() {
        var sb = document.getElementById('chapterSidebar');
        if (!sb) {                                      // e.g. home page: only share the chapter list
            if (!window.CHAPTER_LIST) { try { renderChapterSidebar(); } catch (e) {} }
            return;
        }
        if (!sb.querySelector('.nav-list')) {
            try { renderChapterSidebar(); } catch (e) { console.error('Sidebar error:', e); }
        }
    }
    ensureSidebar();                                        // as soon as this script runs
    document.addEventListener('DOMContentLoaded', ensureSidebar);  // safety net 1
    window.addEventListener('load', ensureSidebar);                // safety net 2
})();

document.addEventListener('DOMContentLoaded', function() {

    /* ============================================================
       MOBILE DESKTOP-VIEW NOTICE
       Shows a dismissible top banner on every page load for
       mobile users — exactly like the warning bar style.
    ============================================================ */
    (function() {
        var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                             || window.innerWidth <= 768;

        if (!isMobileDevice) return;

        var banner = document.createElement('div');
        banner.id = 'mobileNoticeBanner';
        banner.style.cssText = [
            'position:fixed',
            'top:0',
            'left:0',
            'right:0',
            'z-index:99999',
            'background:#2c2c2c',
            'color:#fff',
            'padding:10px 16px',
            'display:flex',
            'align-items:center',
            'justify-content:space-between',
            'gap:12px',
            'font-family:"Source Sans Pro",sans-serif',
            'font-size:0.88rem',
            'line-height:1.4',
            'box-shadow:0 2px 10px rgba(0,0,0,0.4)'
        ].join(';');

        var msg = document.createElement('span');
        msg.innerHTML = '<span style="color:#c9a961;font-size:1.1rem;margin-right:6px;">&#9888;</span>'
                      + 'This site is best viewed on a <strong>desktop or laptop</strong> for the full experience.';

        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&#10005;';
        closeBtn.style.cssText = [
            'background:none',
            'border:none',
            'color:#c9a961',
            'font-size:1.1rem',
            'cursor:pointer',
            'flex-shrink:0',
            'padding:4px 6px',
            'line-height:1'
        ].join(';');
        closeBtn.setAttribute('aria-label', 'Dismiss notice');

        function dismissBanner() {
            banner.remove();
            document.body.style.paddingTop = '';
            var navbar = document.querySelector('.navbar');
            if (navbar) navbar.style.top = '';
        }

        closeBtn.addEventListener('click', dismissBanner);

        banner.appendChild(msg);
        banner.appendChild(closeBtn);
        document.body.insertBefore(banner, document.body.firstChild);

        /* Push content down so banner doesn't cover navbar */
        var bannerH = banner.offsetHeight || 44;
        document.body.style.paddingTop = bannerH + 'px';
        var navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.top = bannerH + 'px';

        /* Recalc on resize */
        window.addEventListener('resize', function() {
            if (!document.getElementById('mobileNoticeBanner')) return;
            var h = banner.offsetHeight || 44;
            document.body.style.paddingTop = h + 'px';
            if (navbar) navbar.style.top = h + 'px';
        });
    })();


    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeBtn');
    const menuItems = document.querySelectorAll('.menu-items a');

    // --- Global Navigation & Menu Logic ---
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeMenu() {
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    menuItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                closeMenu();
            }
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // Homepage animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.partner-group, .logo-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // --- CHAPTER PAGE FUNCTIONALITY ---
    if (document.querySelector('.chapter-sidebar')) {
        const currentPage = document.title;
        const isChapter1 = currentPage.includes('Need and Scope') || currentPage.includes('The Need and Scope');
        const isChapter2 = currentPage.includes('How to Use the Manual');
        const isChapter3 = currentPage.includes('Engaging the Architect') || currentPage.includes('Design Approval Process');
        const isChapter4 = currentPage.includes('High-level Considerations');
        const isChapter5 = currentPage.includes('Outpatient Care');
        const isChapter6 = currentPage.includes('Operation Theatre Complex');
        const isChapter7 = currentPage.includes('Ambulatory and Inpatient Care');
        const isChapter8 = currentPage.includes('Layout Guidelines for Support Functions');
        const isChapter9 = currentPage.includes('Patient and Staff Safety Considerations');
        const isChapter8Energy = currentPage.includes('Championing Responsible Healthcare');
        const isChapterPlaceholder8 = currentPage.includes('Update Soon');
        
        const __curCh = (window.CHAPTER_LIST || []).filter(function(c) { return c.id === document.body.getAttribute('data-chapter'); })[0];
        if (document.body.classList.contains('single-page') || (__curCh && __curCh.singlePage)) {
            initSinglePage();
        } else if (isChapter1) {
            initChapter1Page();
        } else if (isChapter2) {
            initChapter2Page();
        } else if (isChapter3) {
            initChapter3Page();
        } else if (isChapter4) {
            initChapter4Page();
        } else if (isChapter5) {
            initChapter5Page();
        } else if (isChapter6) {
            initChapter6Page();
        } else if (isChapter7) {
            initChapter7Page();
        } else if (isChapter8) {
            initChapter8Page();
        } else if (isChapter9) {
            initChapter9Page();
        } else if (isChapter8Energy) {
            initChapter8EnergyPage();
        } else if (isChapterPlaceholder8) {
            initChapterPlaceholder8Page();
        }
    }

    // ========================================
    // CHAPTER 1 - THE NEED AND SCOPE
    // ========================================
    // ------------------------------------------------------------
    // SINGLE-PAGE CHAPTER: all sections on one page, sidebar links
    // scroll to the section, active topic follows the scroll.
    // (Enable per page with <body class="single-page"> + singlePage:true in CHAPTERS)
    // ------------------------------------------------------------
    function initSinglePage() {
        initSidebarToggle();

        // Force single-page mode (so it works even if the HTML file is an older copy)
        document.body.classList.add('single-page');
        document.querySelectorAll('.content-block').forEach(function(b) { b.style.display = ''; });

        // Bottom bar = previous / next CHAPTER (taken from the CHAPTERS order)
        (function() {
            const list = window.CHAPTER_LIST || [];
            const id = document.body.getAttribute('data-chapter');
            let idx = -1;
            list.forEach(function(c, i) { if (c.id === id) idx = i; });
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            if (prevBtn) {
                if (idx > 0) {
                    prevBtn.style.display = 'flex';
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                    prevBtn.onclick = function() { window.location.href = list[idx - 1].href; };
                } else { prevBtn.style.display = 'none'; }
            }
            if (nextBtn) {
                if (idx > -1 && idx < list.length - 1) {
                    nextBtn.style.display = 'flex';
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                    nextBtn.onclick = function() { window.location.href = list[idx + 1].href; };
                } else if (idx === list.length - 1) {
                    nextBtn.style.display = 'flex';
                    nextBtn.innerHTML = '<i class="fas fa-home"></i><span>Home</span>';
                    nextBtn.onclick = function() { window.location.href = 'index.html'; };
                } else { nextBtn.style.display = 'none'; }
            }
        })();

        const links = Array.from(document.querySelectorAll('.single-link'));
        const sections = links
            .map(function(a) { return document.getElementById(a.getAttribute('data-section')); })
            .filter(Boolean);
        if (!links.length || !sections.length) return;

        let lockUntil = 0;

        function setActive(id) {
            links.forEach(function(a) {
                a.classList.toggle('active', a.getAttribute('data-section') === id);
            });
        }

        function updateActiveOnScroll() {
            if (Date.now() < lockUntil) return;
            let current = sections[0].id;
            sections.forEach(function(sec) {
                if (sec.getBoundingClientRect().top <= 140) current = sec.id;
            });
            const atBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4;
            if (atBottom) current = sections[sections.length - 1].id;
            setActive(current);
        }

        links.forEach(function(a) {
            a.addEventListener('click', function(e) {
                e.preventDefault();
                const id = a.getAttribute('data-section');
                const target = document.getElementById(id);
                if (!target) return;
                setActive(id);
                lockUntil = Date.now() + 800;
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                try { if (history.replaceState) history.replaceState(null, '', '#' + id); } catch (err) { /* file:// restriction - ignore */ }
                if (window.innerWidth <= 992 && window.closeSidebar) window.closeSidebar();
            });
        });

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function() {
                updateActiveOnScroll();
                ticking = false;
            });
        }, { passive: true });

        // On load: honour #section in the URL, otherwise highlight the first topic
        const hash = (location.hash || '').replace('#', '');
        const initial = document.getElementById(hash);
        if (initial && sections.indexOf(initial) !== -1) {
            setActive(hash);
            lockUntil = Date.now() + 800;
            setTimeout(function() { initial.scrollIntoView({ block: 'start' }); }, 50);
        } else {
            setActive(sections[0].id);
        }
    }

    function initChapter1Page() {
        const contentOrder = ['intro', 'not-covered', 'covered'];
        
        const contentTitles = {
            'intro': '2. Need and scope',
            'not-covered': 'What is not covered',
            'covered': 'What is covered'
        };

        const contentLinkMap = {
            'intro': '.nav-link[data-content="intro"]',
            'not-covered': '.nav-link[data-content="not-covered"]',
            'covered': '.nav-link[data-content="covered"]'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter1ContentSwitching();
        initChapter1NavigationButtons();
        
        updateChapter1Breadcrumb(contentOrder[currentContentIndex]);
        showChapter1Content(contentOrder[currentContentIndex]);

        function updateChapter1Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '2. Need and scope';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '2. Need and scope';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter1Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            const subsections = [
                { id: 'not-covered', title: 'What is not covered' },
                { id: 'covered', title: 'What is covered' }
            ];

            subsections.forEach((section) => {
                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';
                
                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter1Content(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }
                
                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function initChapter1ContentSwitching() {
            const allNavLinks = document.querySelectorAll('.parent-link');
            
            allNavLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const contentId = this.getAttribute('data-content');
                    if (!contentId) return;

                    showChapter1Content(contentId);
                    
                    document.querySelectorAll('.parent-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    const sidebar = document.getElementById('chapterSidebar');
                    if (window.innerWidth <= 992) {
                        if (window.closeSidebar) window.closeSidebar();
                    }
                });
            });
        }

        function showChapter1Content(contentId) {
            const allContents = document.querySelectorAll('.content-block');
            allContents.forEach(content => {
                content.style.display = 'none';
            });
            
            const selectedContent = document.getElementById('content-' + contentId);
            if (selectedContent) {
                selectedContent.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                currentContentIndex = contentOrder.indexOf(contentId);
                updateChapter1Breadcrumb(contentId);
                updateChapter1NavigationButtons();
                
                document.querySelectorAll('.parent-link').forEach(l => l.classList.remove('active'));
                const linkToActivate = document.querySelector(contentLinkMap[contentId]);
                if (linkToActivate) {
                    linkToActivate.classList.add('active');
                }
            }
        }

        function initChapter1NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'Preface.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter1Content(contentId);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter2.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter1Content(contentId);
                    }
                });
            }
            
            updateChapter1NavigationButtons();
        }

        function updateChapter1NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn && nextBtn) {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
                
                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
                
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 2 - HOW TO USE THE MANUAL
    // ========================================
    function initChapter2Page() {
        initSidebarToggle();
        updateChapter2Breadcrumb();
        
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        if (prevBtn) {
            prevBtn.style.display = 'flex';
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
            prevBtn.addEventListener('click', function() {
                window.location.href = 'chapter1.html';
            });
        }
        
        if (nextBtn) {
            nextBtn.style.display = 'flex';
            nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
            nextBtn.addEventListener('click', function() {
                window.location.href = 'chapter3.html';
            });
        }

        function updateChapter2Breadcrumb() {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator = document.createElement('span');
            separator.className = 'breadcrumb-dot';
            separator.textContent = '•';
            breadcrumbNav.appendChild(separator);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            const chapterLink = document.createElement('span');
            chapterLink.className = 'breadcrumb-link breadcrumb-primary active';
            chapterLink.textContent = '3. How to use the manual';
            chapterItem.appendChild(chapterLink);
            breadcrumbNav.appendChild(chapterItem);
        }
    }

    // ========================================
    // CHAPTER 3 - ENGAGING THE ARCHITECT
    // ========================================
    function initChapter3Page() {
        const contentOrder = ['intro', 'approval-process', 'preliminary-design', 'concept-design', 'statutory-approval', 'flowchart'];
        
        const breadcrumbTitles = {
            'intro': '4. Engaging the architect',
            'approval-process': 'The approval process',
            'preliminary-design': 'Preliminary design',
            'concept-design': 'Concept design',
            'statutory-approval': 'Statutory approval',
            'flowchart': 'Flow chart'
        };

        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'approval-process': '.parent-link[data-content="approval-process"]',
            'preliminary-design': '.subsection-link[data-content="preliminary-design"]',
            'concept-design': '.subsection-link[data-content="concept-design"]',
            'statutory-approval': '.subsection-link[data-content="statutory-approval"]',
            'flowchart': '.parent-link[data-content="flowchart"]'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter3Dropdown();
        initChapter3ContentSwitching();
        initChapter3NavigationButtons();
        
        updateChapter3Breadcrumb(contentOrder[currentContentIndex]);
        showChapter3Content(contentOrder[currentContentIndex]);
        
        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter3Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '4. Engaging the architect';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '4. Engaging the architect';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter3Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            const subsections = [
                { id: 'approval-process', title: 'The approval process' },
                { id: 'preliminary-design', title: 'Preliminary design' },
                { id: 'concept-design', title: 'Concept design' },
                { id: 'statutory-approval', title: 'Statutory approval' },
                { id: 'flowchart', title: 'Flow chart' }
            ];

            subsections.forEach((section) => {
                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';
                
                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter3Content(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }
                
                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function initChapter3Dropdown() {
            const approvalProcessLink = document.querySelector('.parent-link[data-content="approval-process"]');
            
            if (approvalProcessLink) {
                approvalProcessLink.addEventListener('click', function(e) {
                    const clickedIcon = e.target.classList.contains('dropdown-icon') || 
                                       e.target.closest('.dropdown-icon');
                    
                    if (clickedIcon) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        this.classList.toggle('open');
                        const sublist = this.nextElementSibling;
                        
                        if (sublist && sublist.classList.contains('nav-sublist-level2')) {
                            if (this.classList.contains('open')) {
                                sublist.style.maxHeight = sublist.scrollHeight + "px";
                            } else {
                                sublist.style.maxHeight = null;
                            }
                        }
                    } else {
                        showChapter3Content('approval-process');
                    }
                });
            }
        }

        function initChapter3ContentSwitching() {
            const allNavLinks = document.querySelectorAll('.parent-link, .subsection-link');

            allNavLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();

                    const contentId = this.getAttribute('data-content');
                    if (!contentId) return;

                    showChapter3Content(contentId);

                    document.querySelectorAll('.parent-link, .subsection-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    const sidebar = document.getElementById('chapterSidebar');
                    if (window.innerWidth <= 992) {
                        if (window.closeSidebar) window.closeSidebar();
                    }
                });
            });
        }

        function showChapter3Content(contentId) {
            const allContents = document.querySelectorAll('.content-block');
            allContents.forEach(content => {
                content.style.display = 'none';
            });
            
            const selectedContent = document.getElementById('content-' + contentId);
            if (selectedContent) {
                selectedContent.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                currentContentIndex = contentOrder.indexOf(contentId);
                
                updateChapter3Breadcrumb(contentId);
                updateChapter3NavigationButtons();
                
                document.querySelectorAll('.parent-link, .subsection-link').forEach(l => l.classList.remove('active'));
                const linkToActivate = document.querySelector(contentLinkMap[contentId]);
                if (linkToActivate) {
                    linkToActivate.classList.add('active');
                }
            }
        }

        function initChapter3NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter2.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter3Content(contentId);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter4.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter3Content(contentId);
                    }
                });
            }
            
            updateChapter3NavigationButtons();
        }

        function updateChapter3NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn && nextBtn) {
                prevBtn.style.display = 'flex';
                
                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
                
                nextBtn.style.display = 'flex';
                
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 4 - HIGH-LEVEL CONSIDERATIONS
    // ========================================
    function initChapter4Page() {
        const contentOrder = ['intro', 'functional-adequacy', 'operational-efficiency', 'resources'];
        
        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter4ContentSwitching();
        initChapter4NavigationButtons();
        
        updateChapter4Breadcrumb(contentOrder[currentContentIndex]);
        showChapter4Content(contentOrder[currentContentIndex]);

        function updateChapter4Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '5. High-level considerations';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '5. High-level considerations';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter4Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            const subsections = [
                { id: 'functional-adequacy', title: 'A) Functional adequacy' },
                { id: 'operational-efficiency', title: 'B) Operational efficiency' },
                { id: 'resources', title: 'List of resources' }
            ];

            subsections.forEach((section) => {
                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';
                
                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter4Content(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }
                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function showChapter4Content(contentId) {
            document.querySelectorAll('.content-block').forEach(block => {
                block.style.display = 'none';
            });

            const contentBlock = document.getElementById('content-' + contentId);
            if (contentBlock) {
                contentBlock.style.display = 'block';
            }

            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector('.nav-link[data-content="' + contentId + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }

            currentContentIndex = contentOrder.indexOf(contentId);
            updateChapter4Breadcrumb(contentId);
            updateChapter4NavigationButtons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Register globally so closeFileViewer can restore section + breadcrumb
        // WITHOUT calling showChapter4Content (which resets scroll to top)
        window._chapterShowContent    = showChapter4Content;
        window._chapterUpdateBreadcrumb = updateChapter4Breadcrumb;

        function initChapter4ContentSwitching() {
            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const contentId = this.getAttribute('data-content');
                    if (contentId) {
                        showChapter4Content(contentId);
                    }
                });
            });
        }

        function updateChapter4NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (!prevBtn || !nextBtn) return;

            if (currentContentIndex === 0) {
                prevBtn.style.display = 'flex';
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                nextBtn.style.display = 'flex';
                nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
            } else if (currentContentIndex < contentOrder.length - 1) {
                prevBtn.style.display = 'flex';
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                nextBtn.style.display = 'flex';
                nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
            } else {
                prevBtn.style.display = 'flex';
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                nextBtn.style.display = 'flex';
                nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
            }
        }

        function initChapter4NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter3.html';
                    } else {
                        showChapter4Content(contentOrder[currentContentIndex - 1]);
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter6a.html';
                    } else {
                        showChapter4Content(contentOrder[currentContentIndex + 1]);
                    }
                });
            }
        }
    }

    // ========================================
    // CHAPTER 5 - OUTPATIENT CARE
    // ========================================
    function initChapter5Page() {
        const contentOrder = ['intro', 'factors-influencing', 'service-levels', 'layout-design', 'investigation-area', 'preferred-practices', 'resources'];
        
        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'factors-influencing': '.parent-link[data-content="factors-influencing"]',
            'service-levels': '.subsection-link[data-content="service-levels"]',
            'layout-design': '.subsection-link[data-content="layout-design"]',
            'investigation-area': '.subsection-link[data-content="investigation-area"]',
            'preferred-practices': '.parent-link[data-content="preferred-practices"]',
            'resources': '.parent-link[data-content="resources"]'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter5Dropdown();
        initChapter5ContentSwitching();
        initChapter5NavigationButtons();
        
        updateChapter5Breadcrumb(contentOrder[currentContentIndex]);
        showChapter5Content(contentOrder[currentContentIndex]);
        
        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter5Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const subsectionParents = {
                'service-levels': 'factors-influencing',
                'layout-design': 'factors-influencing',
                'investigation-area': 'factors-influencing'
            };

            const sectionTitles = {
                'factors-influencing': 'A. Factors influencing space considerations for an outpatient clinic',
                'service-levels': '1. Service levels of care delivery',
                'layout-design': '2. Layout design of an outpatient consultation area',
                'investigation-area': '3. Investigation & procedure area',
                'preferred-practices': 'B. Preferred practices in designing an outpatient clinic',
                'resources': 'List of resources'
            };

            // Always show Home
            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            // Always show Chapter title
            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '6a. Outpatient care – design considerations and guidelines';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '6a. Outpatient care – design considerations and guidelines';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter5Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            // ALWAYS show all main sections (even on intro page)
            // Check if we should show subsections
            const showSubsections = (activeContentId === 'factors-influencing' || 
                                    subsectionParents[activeContentId] === 'factors-influencing');
            
            // Always show Section A
            const sep2 = document.createElement('span');
            sep2.className = 'breadcrumb-dot';
            sep2.textContent = '•';
            breadcrumbNav.appendChild(sep2);

            const sectionAItem = document.createElement('div');
            sectionAItem.className = 'breadcrumb-item';
            
            // Highlight Section A if it's the active content OR if a subsection of A is active
            const isSectionAActive = (activeContentId === 'factors-influencing') || 
                                     (subsectionParents[activeContentId] === 'factors-influencing');
            
            if (isSectionAActive) {
                const span = document.createElement('span');
                span.className = 'breadcrumb-link breadcrumb-secondary active';
                span.textContent = sectionTitles['factors-influencing'];
                sectionAItem.appendChild(span);
            } else {
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'breadcrumb-link breadcrumb-secondary';
                link.textContent = sectionTitles['factors-influencing'];
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter5Content('factors-influencing');
                });
                sectionAItem.appendChild(link);
            }
            breadcrumbNav.appendChild(sectionAItem);

            // Show subsections ONLY if Section A or subsection is active
            if (showSubsections) {
                const subsections = ['service-levels', 'layout-design', 'investigation-area'];
                subsections.forEach(subId => {
                    const sep = document.createElement('span');
                    sep.className = 'breadcrumb-dot';
                    sep.textContent = '•';
                    breadcrumbNav.appendChild(sep);
                    
                    const subItem = document.createElement('div');
                    subItem.className = 'breadcrumb-item';
                    
                    if (subId === activeContentId) {
                        const span = document.createElement('span');
                        span.className = 'breadcrumb-link breadcrumb-secondary active';
                        span.textContent = sectionTitles[subId];
                        subItem.appendChild(span);
                    } else {
                        const link = document.createElement('a');
                        link.href = '#';
                        link.className = 'breadcrumb-link breadcrumb-secondary';
                        link.textContent = sectionTitles[subId];
                        link.addEventListener('click', function(e) {
                            e.preventDefault();
                            showChapter5Content(subId);
                        });
                        subItem.appendChild(link);
                    }
                    breadcrumbNav.appendChild(subItem);
                });
            }

            // Always show Section B
            const sep3 = document.createElement('span');
            sep3.className = 'breadcrumb-dot';
            sep3.textContent = '•';
            breadcrumbNav.appendChild(sep3);

            const sectionBItem = document.createElement('div');
            sectionBItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'preferred-practices') {
                const span = document.createElement('span');
                span.className = 'breadcrumb-link breadcrumb-secondary active';
                span.textContent = sectionTitles['preferred-practices'];
                sectionBItem.appendChild(span);
            } else {
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'breadcrumb-link breadcrumb-secondary';
                link.textContent = sectionTitles['preferred-practices'];
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter5Content('preferred-practices');
                });
                sectionBItem.appendChild(link);
            }
            breadcrumbNav.appendChild(sectionBItem);

            // Always show Resources
            const sep4 = document.createElement('span');
            sep4.className = 'breadcrumb-dot';
            sep4.textContent = '•';
            breadcrumbNav.appendChild(sep4);

            const resourcesItem = document.createElement('div');
            resourcesItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'resources') {
                const span = document.createElement('span');
                span.className = 'breadcrumb-link breadcrumb-secondary active';
                span.textContent = sectionTitles['resources'];
                resourcesItem.appendChild(span);
            } else {
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'breadcrumb-link breadcrumb-secondary';
                link.textContent = sectionTitles['resources'];
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter5Content('resources');
                });
                resourcesItem.appendChild(link);
            }
            breadcrumbNav.appendChild(resourcesItem);
        }

        function initChapter5Dropdown() {
            const factorsLink = document.querySelector('.parent-link[data-content="factors-influencing"]');
            
            if (factorsLink) {
                factorsLink.addEventListener('click', function(e) {
                    const clickedIcon = e.target.classList.contains('dropdown-icon') || 
                                       e.target.closest('.dropdown-icon');
                    
                    if (clickedIcon) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        this.classList.toggle('open');
                        const sublist = this.nextElementSibling;
                        
                        if (sublist && sublist.classList.contains('nav-sublist-level2')) {
                            if (this.classList.contains('open')) {
                                sublist.style.maxHeight = sublist.scrollHeight + "px";
                            } else {
                                sublist.style.maxHeight = null;
                            }
                        }
                    } else {
                        showChapter5Content('factors-influencing');
                    }
                });
            }
        }

        function initChapter5ContentSwitching() {
            const allNavLinks = document.querySelectorAll('.parent-link, .subsection-link');

            allNavLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();

                    const contentId = this.getAttribute('data-content');
                    if (!contentId) return;

                    showChapter5Content(contentId);

                    document.querySelectorAll('.parent-link, .subsection-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    const sidebar = document.getElementById('chapterSidebar');
                    if (window.innerWidth <= 992) {
                        if (window.closeSidebar) window.closeSidebar();
                    }
                });
            });
        }

        function showChapter5Content(contentId) {
            const allContents = document.querySelectorAll('.content-block');
            allContents.forEach(content => {
                content.style.display = 'none';
            });
            
            const selectedContent = document.getElementById('content-' + contentId);
            if (selectedContent) {
                selectedContent.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                currentContentIndex = contentOrder.indexOf(contentId);
                
                updateChapter5Breadcrumb(contentId);
                updateChapter5NavigationButtons();
                
                document.querySelectorAll('.parent-link, .subsection-link').forEach(l => l.classList.remove('active'));
                const linkToActivate = document.querySelector(contentLinkMap[contentId]);
                if (linkToActivate) {
                    linkToActivate.classList.add('active');
                }
            }
        }

        // Register globally so closeFileViewer can restore section + breadcrumb
        // WITHOUT calling showChapter5Content (which resets scroll to top)
        window._chapterShowContent      = showChapter5Content;
        window._chapterUpdateBreadcrumb = updateChapter5Breadcrumb;

        function initChapter5NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter4.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter5Content(contentId);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter6b.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter5Content(contentId);
                    }
                });
            }
            
            updateChapter5NavigationButtons();
        }

        function updateChapter5NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn && nextBtn) {
                prevBtn.style.display = 'flex';
                
                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
                
                nextBtn.style.display = 'flex';
                
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 6 - OPERATION THEATRE COMPLEX
    // ========================================
    function initChapter6Page() {
        const contentOrder = ['intro', 'planning', 'layout-considerations', 'design-elements', 'preferred-practices', 'resources'];
        
        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'planning': '.parent-link[data-content="planning"]',
            'layout-considerations': '.parent-link[data-content="layout-considerations"]',
            'design-elements': '.parent-link[data-content="design-elements"]',
            'preferred-practices': '.parent-link[data-content="preferred-practices"]',
            'resources': '.parent-link[data-content="resources"]'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter6ContentSwitching();
        initChapter6NavigationButtons();
        
        updateChapter6Breadcrumb(contentOrder[currentContentIndex]);
        showChapter6Content(contentOrder[currentContentIndex]);
        
        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter6Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const sectionTitles = {
                'planning': 'B. Planning for an operation theatre complex',
                'layout-considerations': 'C. Key layout design considerations (1-3)',
                'design-elements': 'C. Key layout design considerations (4-6)',
                'preferred-practices': 'D. OT complex layout design: Preferred practices',
                'resources': 'List of resources'
            };

            // Always show Home
            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            // Always show Chapter title
            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '6b. Operation theatre complex – Design considerations and guidelines';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '6b. Operation theatre complex – Design considerations and guidelines';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter6Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            // ALWAYS show all main sections
            const sections = [
                { id: 'planning', title: sectionTitles['planning'] },
                { id: 'layout-considerations', title: sectionTitles['layout-considerations'] },
                { id: 'design-elements', title: sectionTitles['design-elements'] },
                { id: 'preferred-practices', title: sectionTitles['preferred-practices'] },
                { id: 'resources', title: sectionTitles['resources'] }
            ];

            sections.forEach((section) => {
                const sep = document.createElement('span');
                sep.className = 'breadcrumb-dot';
                sep.textContent = '•';
                breadcrumbNav.appendChild(sep);

                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';
                
                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter6Content(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }
                
                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function showChapter6Content(contentId) {
            document.querySelectorAll('.content-block').forEach(block => {
                block.style.display = 'none';
            });
            
            const contentBlock = document.getElementById('content-' + contentId);
            if (contentBlock) {
                contentBlock.style.display = 'block';
            }
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLinkSelector = contentLinkMap[contentId];
            if (activeLinkSelector) {
                const activeLink = document.querySelector(activeLinkSelector);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
            
            currentContentIndex = contentOrder.indexOf(contentId);
            updateChapter6Breadcrumb(contentId);
            updateChapter6NavigationButtons();
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function initChapter6ContentSwitching() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    const contentId = this.getAttribute('data-content');
                    if (contentId) {
                        showChapter6Content(contentId);
                    }
                });
            });
        }

        function initChapter6NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter6a.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter6Content(contentId);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter6c.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter6Content(contentId);
                    }
                });
            }
            
            updateChapter6NavigationButtons();
        }

        function updateChapter6NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn && nextBtn) {
                prevBtn.style.display = 'flex';
                
                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
                
                nextBtn.style.display = 'flex';
                
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 7 - AMBULATORY AND INPATIENT CARE
    // ========================================
    function initChapter7Page() {
        const contentOrder = ['intro', 'design-considerations', 'safety-considerations', 'resources'];
        
        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'design-considerations': '.parent-link[data-content="design-considerations"]',
            'safety-considerations': '.parent-link[data-content="safety-considerations"]',
            'resources': '.parent-link[data-content="resources"]'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter7ContentSwitching();
        initChapter7NavigationButtons();
        
        updateChapter7Breadcrumb(contentOrder[currentContentIndex]);
        showChapter7Content(contentOrder[currentContentIndex]);
        
        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter7Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const sectionTitles = {
                'design-considerations': 'A. Ambulatory/Inpatient care unit: design considerations',
                'safety-considerations': 'B. Key considerations to ensure the safe stay of patients',
                'resources': 'List of Resources'
            };

            // Always show Home
            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            // Always show Chapter title
            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '6c. Ambulatory and inpatient care – design considerations';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '6c. Ambulatory and inpatient care – design considerations';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter7Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            // ALWAYS show all main sections (A, B and Resources) and highlight active
            const sections = [
                { id: 'design-considerations', title: sectionTitles['design-considerations'] },
                { id: 'safety-considerations', title: sectionTitles['safety-considerations'] },
                { id: 'resources', title: sectionTitles['resources'] }
            ];

            sections.forEach((section) => {
                const sep = document.createElement('span');
                sep.className = 'breadcrumb-dot';
                sep.textContent = '•';
                breadcrumbNav.appendChild(sep);

                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';

                if (section.id === activeContentId) {
                    const span = document.createElement('span');
                    span.className = 'breadcrumb-link breadcrumb-secondary active';
                    span.textContent = section.title;
                    sectionItem.appendChild(span);
                } else {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.className = 'breadcrumb-link breadcrumb-secondary';
                    link.textContent = section.title;
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter7Content(section.id);
                    });
                    sectionItem.appendChild(link);
                }
                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function showChapter7Content(contentId) {
            document.querySelectorAll('.content-block').forEach(block => {
                block.style.display = 'none';
            });

            const activeContent = document.getElementById(`content-${contentId}`);
            if (activeContent) {
                activeContent.style.display = 'block';
            }

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            const linkSelector = contentLinkMap[contentId];
            if (linkSelector) {
                const activeLink = document.querySelector(linkSelector);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
            
            currentContentIndex = contentOrder.indexOf(contentId);
            updateChapter7Breadcrumb(contentId);
            updateChapter7NavigationButtons();
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function initChapter7ContentSwitching() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    const contentId = this.getAttribute('data-content');
                    if (contentId) {
                        showChapter7Content(contentId);
                    }
                });
            });
        }

        function initChapter7NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter6b.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter7Content(contentId);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter7.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter7Content(contentId);
                    }
                });
            }
            
            updateChapter7NavigationButtons();
        }

        function updateChapter7NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.style.display = 'flex';
                
                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
            }
            
            if (nextBtn) {
                nextBtn.style.display = 'flex';
                
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 8 - LAYOUT GUIDELINES FOR SUPPORT FUNCTIONS (dummy/placeholder)
    // ========================================
    function initChapter8Page() {
        initSidebarToggle();
        initChapter8NavigationButtons();
        updateChapter8Breadcrumb();

        function updateChapter8Breadcrumb() {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            const chapterSpan = document.createElement('span');
            chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
            chapterSpan.textContent = '9. Layout guidelines for support functions';
            chapterItem.appendChild(chapterSpan);
            breadcrumbNav.appendChild(chapterItem);
        }

        function initChapter8NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) {
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                prevBtn.addEventListener('click', function() {
                    window.location.href = 'chapter8.html';
                });
            }

            // Chapter 9 is the last chapter - no Next button.
            if (nextBtn) {
                nextBtn.style.display = 'none';
            }

            const homeBtn = document.getElementById('homeBtn');
            if (homeBtn) {
                homeBtn.addEventListener('click', function() {
                    window.location.href = 'index.html';
                });
            }
        }
    }

    // ========================================
    // CHAPTER 9 - PATIENT AND STAFF SAFETY CONSIDERATIONS (dummy/placeholder)
    // ========================================
    function initChapter9Page() {
        const contentOrder = ['intro', 'safety-building-design', 'safety-routine-work', 'good-building-design', 'references', 'resources'];

        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'safety-building-design': '.parent-link[data-content="safety-building-design"]',
            'safety-routine-work': '.parent-link[data-content="safety-routine-work"]',
            'good-building-design': '.parent-link[data-content="good-building-design"]',
            'references': '.parent-link[data-content="references"]',
            'resources': '.parent-link[data-content="resources"]'
        };

        const sectionTitles = {
            'intro': 'A. Introduction',
            'safety-building-design': 'B. Safety considerations in building design',
            'safety-routine-work': 'C. Safety considerations in routine work',
            'good-building-design': 'D. Good building design',
            'references': 'E. References',
            'resources': 'F. List of resources'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter9ContentSwitching();
        initChapter9NavigationButtons();

        updateChapter9Breadcrumb(contentOrder[currentContentIndex]);
        showChapter9Content(contentOrder[currentContentIndex]);

        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter9Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';

            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '7. Patient and staff safety considerations in the layout design of eye hospitals';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '7. Patient and staff safety considerations in the layout design of eye hospitals';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter9Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            const subsections = [
                { id: 'safety-building-design', title: sectionTitles['safety-building-design'] },
                { id: 'safety-routine-work',     title: sectionTitles['safety-routine-work'] },
                { id: 'good-building-design',    title: sectionTitles['good-building-design'] },
                { id: 'references',              title: sectionTitles['references'] },
                { id: 'resources',               title: sectionTitles['resources'] }
            ];

            subsections.forEach((section) => {
                const sep = document.createElement('span');
                sep.className = 'breadcrumb-dot';
                sep.textContent = '•';
                breadcrumbNav.appendChild(sep);

                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';

                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter9Content(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }

                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function showChapter9Content(contentId) {
            document.querySelectorAll('.content-block').forEach(block => {
                block.style.display = 'none';
            });

            const contentBlock = document.getElementById('content-' + contentId);
            if (contentBlock) {
                contentBlock.style.display = 'block';
            }

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            const activeLinkSelector = contentLinkMap[contentId];
            if (activeLinkSelector) {
                const activeLink = document.querySelector(activeLinkSelector);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }

            currentContentIndex = contentOrder.indexOf(contentId);
            updateChapter9Breadcrumb(contentId);
            updateChapter9NavigationButtons();

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function initChapter9ContentSwitching() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    const contentId = this.getAttribute('data-content');
                    if (contentId) {
                        showChapter9Content(contentId);
                    }
                });
            });
        }

        function initChapter9NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter6c.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter9Content(contentId);
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter8.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter9Content(contentId);
                    }
                });
            }

            updateChapter9NavigationButtons();
        }

        function updateChapter9NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (nextBtn) {
                nextBtn.style.display = 'flex';
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }

            if (prevBtn) {
                prevBtn.style.display = 'flex';

                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 8 - CHAMPIONING RESPONSIBLE HEALTHCARE (ENERGY EFFICIENCY)
    // ========================================
    function initChapter8EnergyPage() {
        const contentOrder = ['intro', 'procurement', 'design', 'equipment', 'operations', 'culture'];

        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'procurement': '.parent-link[data-content="procurement"]',
            'design': '.parent-link[data-content="design"]',
            'equipment': '.parent-link[data-content="equipment"]',
            'operations': '.parent-link[data-content="operations"]',
            'culture': '.parent-link[data-content="culture"]'
        };

        const sectionTitles = {
            'intro': 'Introduction',
            'procurement': '1. Procurement',
            'design': '2. Design',
            'equipment': '3. Equipment',
            'operations': '4. Operations and Maintenance',
            'culture': '5. Fostering a Culture of Sustainable Practices'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter8EnergyContentSwitching();
        initChapter8EnergyNavigationButtons();

        updateChapter8EnergyBreadcrumb(contentOrder[currentContentIndex]);
        showChapter8EnergyContent(contentOrder[currentContentIndex]);

        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter8EnergyBreadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';

            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '8. Championing Responsible Healthcare by Creating Energy Efficient Sustainable Hospital Infrastructure';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '8. Championing Responsible Healthcare by Creating Energy Efficient Sustainable Hospital Infrastructure';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter8EnergyContent('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            const subsections = [
                { id: 'procurement', title: sectionTitles['procurement'] },
                { id: 'design',      title: sectionTitles['design'] },
                { id: 'equipment',   title: sectionTitles['equipment'] },
                { id: 'operations',  title: sectionTitles['operations'] },
                { id: 'culture',     title: sectionTitles['culture'] }
            ];

            subsections.forEach((section) => {
                const sep = document.createElement('span');
                sep.className = 'breadcrumb-dot';
                sep.textContent = '•';
                breadcrumbNav.appendChild(sep);

                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';

                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter8EnergyContent(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }

                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function showChapter8EnergyContent(contentId) {
            document.querySelectorAll('.content-block').forEach(block => {
                block.style.display = 'none';
            });

            const contentBlock = document.getElementById('content-' + contentId);
            if (contentBlock) {
                contentBlock.style.display = 'block';
            }

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            const activeLinkSelector = contentLinkMap[contentId];
            if (activeLinkSelector) {
                const activeLink = document.querySelector(activeLinkSelector);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }

            currentContentIndex = contentOrder.indexOf(contentId);
            updateChapter8EnergyBreadcrumb(contentId);
            updateChapter8EnergyNavigationButtons();

            if (window.setMobileFloatActive) window.setMobileFloatActive(contentId);

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function initChapter8EnergyContentSwitching() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    const contentId = this.getAttribute('data-content');
                    if (contentId) {
                        showChapter8EnergyContent(contentId);
                    }
                });
            });
        }

        function initChapter8EnergyNavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter7.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter8EnergyContent(contentId);
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'index.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter8EnergyContent(contentId);
                    }
                });
            }

            updateChapter8EnergyNavigationButtons();
        }

        function updateChapter8EnergyNavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (nextBtn) {
                nextBtn.style.display = 'flex';
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<i class="fas fa-home"></i><span>Home</span>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }

            if (prevBtn) {
                prevBtn.style.display = 'flex';

                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 8 (PLACEHOLDER) - RESERVED SECTION (dummy/placeholder, heading TBD) — no longer used, kept for safety
    // ========================================
    function initChapterPlaceholder8Page() {
        initSidebarToggle();
        initChapterPlaceholder8NavigationButtons();
        updateChapterPlaceholder8Breadcrumb();

        function updateChapterPlaceholder8Breadcrumb() {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            const chapterSpan = document.createElement('span');
            chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
            chapterSpan.textContent = '8. Reserved section (heading to be confirmed)';
            chapterItem.appendChild(chapterSpan);
            breadcrumbNav.appendChild(chapterItem);
        }

        function initChapterPlaceholder8NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) {
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                prevBtn.addEventListener('click', function() {
                    window.location.href = 'chapter7.html';
                });
            }

            if (nextBtn) {
                nextBtn.innerHTML = '<i class="fas fa-home"></i><span>Home</span>';
                nextBtn.addEventListener('click', function() {
                    window.location.href = 'index.html';
                });
            }
        }
    }

    function initSidebarToggle() {
        const sidebarToggleBtn = document.getElementById('sidebarToggle');
        const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
        const sidebar = document.getElementById('chapterSidebar');
        const chapterContainer = document.querySelector('.chapter-container');
        const chapterLogo = document.querySelector('.chapter-logo-container');
        
        function toggleSidebar(open) {
            if (sidebar) sidebar.classList.toggle('sidebar-open', open);
            if (chapterContainer) chapterContainer.classList.toggle('sidebar-visible', open);
            // Hide logo when sidebar is open
            if (chapterLogo) chapterLogo.classList.toggle('logo-hidden', open);
            // Directly hide/show the toggle button
            if (sidebarToggleBtn) sidebarToggleBtn.style.display = open ? 'none' : 'flex';
        }

        // Expose globally so nav-item clicks across all chapters can also close cleanly
        window.closeSidebar = function() { toggleSidebar(false); };

        if (sidebarToggleBtn && sidebar) {
            sidebarToggleBtn.addEventListener('click', function() {
                toggleSidebar(true);
            });
        }
        
        if (sidebarCloseBtn) {
            sidebarCloseBtn.addEventListener('click', function() {
                toggleSidebar(false);
            });
        }
        
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 992 && sidebar && sidebar.classList.contains('sidebar-open') && 
                !sidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
                toggleSidebar(false);
            }
        });
    }

    function openViewModal(html, caption) {
        const modal = document.getElementById('viewModal');
        const body = document.getElementById('modalBody');
        const cap = document.getElementById('modalCaption');
        if (!modal || !body || !cap) return;
        cap.textContent = caption || '';
        body.innerHTML = html || '<p>Preview not available.</p>';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeViewModal() {
        const modal = document.getElementById('viewModal');
        const body = document.getElementById('modalBody');
        if (!modal) return;
        modal.style.display = 'none';
        if (body) body.innerHTML = '';
        document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only intercept clicks intended for in-page content previews (elements with data-content-id)
            const id = this.getAttribute('data-content-id');
            if (!id) return; // allow default behavior (anchor download/open or inline openFileViewer)

            e.preventDefault();
            const caption = this.getAttribute('data-caption') || '';
            const contentEl = document.getElementById('content-' + id);
            let preview = '';
            if (contentEl) {
                const firstPara = contentEl.querySelector('p');
                const heading = contentEl.querySelector('.article-title');
                preview += heading ? '<h2>' + heading.textContent + '</h2>' : '';
                preview += firstPara ? firstPara.outerHTML : '';
            } else {
                preview = '<p>Preview not available.</p>';
            }
            openViewModal(preview, caption);
        });
    });

    const viewModalClose = document.getElementById('viewModalClose');
    if (viewModalClose) viewModalClose.addEventListener('click', closeViewModal);
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'viewModal') closeViewModal();
    });
});

function openImageModal(src, caption) {
    var modal = document.getElementById('imageModal');
    var modalImg = document.getElementById('modalImage');
    var captionText = document.getElementById('modalCaption');
    
    if (modal && modalImg && captionText) {
        modal.style.display = "block";
        modalImg.src = src;
        captionText.innerHTML = caption;
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    var modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeImageModal();
        closeFileViewer();
    }
});


// ============================================
// FILE VIEWER AND DOWNLOAD FUNCTIONS
// ============================================

/**
 * Force download of any file - works on desktop, mobile, and tablets
 */
function forceDownload(filePath) {
    if (!filePath) {
        console.error('No file path provided for download');
        return;
    }
    
    // Normalize the path
    const normalizedPath = String(filePath).replace(/\\/g, '/');
    const fileName = normalizedPath.split('/').pop() || 'download';
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = normalizedPath;
    link.download = fileName; // This forces download instead of opening
    link.style.display = 'none';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(link);
    }, 100);
    
    console.log('Download initiated for:', fileName);
}

/**
 * openFileViewer – opens any file in the modal viewer on the SAME page.
 * Supports: PDF (iframe), MP4/WEBM/MOV (video player),
 *           XLSX/PPTX/DOCX (Microsoft Office Online viewer - works for publicly hosted files,
 *           falls back to download prompt for local/intranet files).
 *
 * IMPORTANT: saves which content-block is currently visible so closeFileViewer()
 * can restore it exactly (user returns to the same section + scroll position).
 */
function openFileViewer(filePath, fileType) {
    if (!filePath) {
        alert('Unable to open file: No file path specified');
        return;
    }

    // ── Save current visible section so we can restore on close ──
    // First try: block with display:block explicitly set
    let visibleBlock = null;
    document.querySelectorAll('.content-block').forEach(function(el) {
        if (el.style.display === 'block') visibleBlock = el;
    });
    // Second try: any block not hidden
    if (!visibleBlock) {
        document.querySelectorAll('.content-block').forEach(function(el) {
            if (el.style.display !== 'none') visibleBlock = el;
        });
    }
    window._savedSection = null;
    if (visibleBlock && visibleBlock.id) {
        window._savedSection = {
            id:     visibleBlock.id,
            scroll: window.scrollY || window.pageYOffset
        };
    }

    // ── Normalize path & detect type ──
    const normalizedPath = String(filePath).replace(/\\/g, '/');
    const ext = normalizedPath.split('.').pop().toLowerCase();
    const lowerType = (fileType || ext).toLowerCase().replace('.', '');
    const fileName   = normalizedPath.split('/').pop();

    // ── Get modal elements ──
    const modal    = document.getElementById('fileViewerModal');
    const frame    = document.getElementById('fileViewerFrame');
    const errorDiv = document.getElementById('fileViewerError');
    const titleEl  = document.getElementById('fileViewerTitle');

    if (!modal) {
        window.open(normalizedPath, '_blank');
        return;
    }

    if (titleEl) titleEl.textContent = fileName || 'File Viewer';

    // Reset
    if (frame)    { frame.style.display = 'none'; frame.src = 'about:blank'; }
    if (errorDiv) { errorDiv.style.display = 'none'; errorDiv.innerHTML = ''; }

    // ── Route by file type ──
    if (lowerType === 'pdf') {
        // PDF: open in new browser tab — full native viewer (zoom, rotate, landscape all work perfectly)
        // _savedSection is already set above so the page position is remembered.
        // We clear it immediately because the page never navigates away — user just switches tab.
        window._savedSection = null;
        window.open(normalizedPath, '_blank');
        return;

    } else if (lowerType === 'mp4' || lowerType === 'webm' || lowerType === 'mov') {
        // Video: native HTML5 player
        if (errorDiv) {
            errorDiv.style.cssText = 'display:block;width:100%;background:#000;text-align:center;padding:0;';
            errorDiv.innerHTML =
                '<video controls autoplay ' +
                '  style="width:100%;max-height:70vh;outline:none;display:block;margin:0 auto;">' +
                '  <source src="' + normalizedPath + '" type="video/' + (lowerType === 'mov' ? 'mp4' : lowerType) + '">' +
                '  Your browser does not support video playback.' +
                '</video>';
        }

    } else if (['xlsx','xls','pptx','ppt','docx','doc'].includes(lowerType)) {
        // Office files: Microsoft Office Online viewer
        // NOTE: This only works when the site is publicly accessible on the internet.
        // For local/intranet servers it will fail — we show a clear message + download button.
        const officeUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=' +
            encodeURIComponent(window.location.origin + '/' + normalizedPath);

        if (frame) {
            frame.style.cssText = 'width:100%;height:70vh;border:none;display:block;';
            frame.src = officeUrl;

            // If Office Online can't reach the file (local server) it shows an error page.
            // We detect load failure and fall back to a download prompt.
            frame.onload = function () {
                try {
                    // If we can read the frame doc title and it contains "error", show fallback
                    // (cross-origin will throw — that means it loaded an external page = OK or failed silently)
                } catch(e) { /* cross-origin — normal */ }
            };
            frame.onerror = function () { showOfficeFallback(normalizedPath, lowerType, errorDiv, frame); };
        }

        // Also show a small note below the viewer so users know they can download
        // We do this inside a timeout so the iframe gets a chance to load first
        window._officeViewerTimer = setTimeout(function () {
            // Only show fallback if frame still shows an error (heuristic: check if modal is still open)
            if (modal.style.display === 'block') {
                // We can't detect Google/MS error reliably cross-origin, so just show
                // a download bar at the bottom for convenience
                if (errorDiv && errorDiv.style.display === 'none') {
                    errorDiv.style.cssText = 'display:block;text-align:center;padding:10px;background:#fff8e1;border-top:1px solid #e0c97a;';
                    errorDiv.innerHTML =
                        '<small style="color:#555;">If the preview does not load (local server), ' +
                        'please download the file.</small>&nbsp;&nbsp;' +
                        '<button onclick="downloadFile(\'' + normalizedPath.replace(/'/g,"\\'") + '\')" ' +
                        '  style="padding:6px 14px;background:#c9a961;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.85rem;">' +
                        '  <i class="fas fa-download"></i> Download</button>';
                }
            }
        }, 3500);

    } else if (['jpg','jpeg','png','gif','webp'].includes(lowerType)) {
        if (errorDiv) {
            errorDiv.style.cssText = 'display:block;width:100%;text-align:center;background:#000;padding:0;';
            errorDiv.innerHTML =
                '<img src="' + normalizedPath + '" alt="' + fileName +
                '" style="max-width:100%;max-height:70vh;object-fit:contain;">';
        }

    } else {
        // Unknown – prompt download
        if (errorDiv) {
            errorDiv.style.cssText = 'display:block;text-align:center;padding:40px;';
            errorDiv.innerHTML =
                '<p style="color:#666;margin-bottom:20px;">Preview is not available for this file type (' + lowerType + ').</p>' +
                '<button onclick="downloadFile(\'' + normalizedPath.replace(/'/g,"\\'") + '\')" ' +
                '  style="padding:12px 24px;background:#c9a961;color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:1rem;">' +
                '  <i class="fas fa-download"></i> Download File</button>';
        }
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showOfficeFallback(path, type, errorDiv, frame) {
    if (frame) { frame.style.display = 'none'; }
    if (errorDiv) {
        errorDiv.style.cssText = 'display:block;text-align:center;padding:40px;';
        errorDiv.innerHTML =
            '<p style="color:#666;margin-bottom:8px;">This file cannot be previewed here because ' +
            'the server is not publicly accessible on the internet.</p>' +
            '<p style="color:#999;margin-bottom:24px;font-size:0.9rem;">Please download the file to view it on your device.</p>' +
            '<button onclick="downloadFile(\'' + path.replace(/'/g,"\\'") + '\')" ' +
            '  style="padding:12px 24px;background:#c9a961;color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:1rem;">' +
            '  <i class="fas fa-download"></i> Download File</button>';
    }
}

/**
 * closeFileViewer – hides the modal and restores the user to
 * the exact same content section and scroll position they were on.
 */
function closeFileViewer() {
    const modal    = document.getElementById('fileViewerModal');
    const frame    = document.getElementById('fileViewerFrame');
    const errorDiv = document.getElementById('fileViewerError');

    if (modal)    { modal.style.display = 'none'; }
    if (frame)    { frame.src = 'about:blank'; frame.style.display = 'none'; }
    if (errorDiv) {
        // Stop any playing video
        const video = errorDiv.querySelector('video');
        if (video) { video.pause(); video.src = ''; }
        errorDiv.innerHTML = ''; errorDiv.style.display = 'none';
    }

    // Cancel any pending office-viewer timer
    if (window._officeViewerTimer) {
        clearTimeout(window._officeViewerTimer);
        window._officeViewerTimer = null;
    }

    document.body.style.overflow = 'auto';

    // ── Restore the section the user was on before opening the viewer ──
    if (window._savedSection) {
        var savedId     = window._savedSection.id;
        var savedScroll = window._savedSection.scroll;
        var contentKey  = savedId.replace('content-', '');

        // Step 1: Show/hide blocks directly — do NOT call showChapterXContent()
        // because that function always calls scrollTo(top:0) and would override our saved position
        document.querySelectorAll('.content-block').forEach(function(b) {
            b.style.display = 'none';
        });
        var target = document.getElementById(savedId);
        if (target) { target.style.display = 'block'; }

        // Step 2: Sync sidebar highlight
        document.querySelectorAll('.nav-link, .parent-link, .subsection-link').forEach(function(l) {
            l.classList.remove('active');
        });
        var activeLink = document.querySelector('[data-content="' + contentKey + '"]');
        if (activeLink) activeLink.classList.add('active');

        // Step 3: Rebuild breadcrumb if chapter registered the function
        if (typeof window._chapterUpdateBreadcrumb === 'function') {
            window._chapterUpdateBreadcrumb(contentKey);
        }

        // Step 4: Restore exact scroll — use double rAF so layout has fully repainted
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                window.scrollTo(0, savedScroll);
            });
        });

        window._savedSection = null;
    }
}

/**
 * downloadFile – force-triggers browser download for any file path.
 */
function downloadFile(filePath) {
    if (!filePath) { alert('No file path specified'); return; }
    const path     = String(filePath).replace(/\\/g, '/');
    const fileName = path.split('/').pop() || 'download';
    const link     = document.createElement('a');
    link.href      = path;
    link.download  = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * downloadCurrentFile – used by the in-modal download button (chapter4 modal header).
 */
function downloadCurrentFile() {
    const frame    = document.getElementById('fileViewerFrame');
    const errorDiv = document.getElementById('fileViewerError');
    if (frame && frame.src && frame.src !== 'about:blank' && frame.src !== window.location.href) {
        downloadFile(frame.src);
        return;
    }
    if (errorDiv) {
        const src = errorDiv.querySelector('source');
        if (src) { downloadFile(src.getAttribute('src')); }
    }
}

/* ============================================================
   MOBILE STICKY SECTION TAB BAR
   Builds a tab bar below the breadcrumb on mobile only.
   Hooks into existing showChapterXContent() functions.
   Desktop: completely invisible (CSS display:none at >768px)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* Map each chapter to its sections */
    var CHAPTER_TABS = {
        'chapter1.html': [
            { id: 'intro',       label: 'The Need' },
            { id: 'not-covered', label: 'Not Covered' },
            { id: 'covered',     label: 'Covered' }
        ],
        'chapter2.html': [
            { id: 'intro', label: 'How to Use' }
        ],
        'chapter3.html': [
            { id: 'intro',              label: 'Introduction' },
            { id: 'approval-process',   label: 'Five Stage Process' },
            { id: 'preliminary-design', label: 'Preliminary' },
            { id: 'concept-design',     label: 'Concept Design' },
            { id: 'statutory-approval', label: 'Statutory' },
            { id: 'flowchart',          label: 'Flow Chart' }
        ],
        'chapter4.html': [
            { id: 'intro',                  label: 'Introduction' },
            { id: 'functional-adequacy',    label: 'Functional' },
            { id: 'operational-efficiency', label: 'Operational' },
            { id: 'resources',              label: 'Resources' }
        ],
        'chapter6a.html': [
            { id: 'intro',               label: 'Introduction' },
            { id: 'factors-influencing', label: 'Factors' },
            { id: 'service-levels',      label: 'Service Levels' },
            { id: 'layout-design',       label: 'Layout Design' },
            { id: 'investigation-area',  label: 'Investigation' },
            { id: 'preferred-practices', label: 'Preferred Practices' },
            { id: 'resources',           label: 'Resources' }
        ],
        'chapter6b.html': [
            { id: 'intro',                   label: 'Introduction' },
            { id: 'planning',                label: 'Planning' },
            { id: 'layout-considerations',   label: 'Layout' },
            { id: 'preferred-practices',      label: 'Preferred' },
            { id: 'resources',               label: 'Resources' }
        ],
        'chapter6c.html': [
            { id: 'intro',                   label: 'Introduction' },
            { id: 'design-considerations',   label: 'Design' },
            { id: 'safety-considerations',   label: 'Safety' },
            { id: 'resources',               label: 'Resources' }
        ],
        'chapter7.html': [
            { id: 'intro',                     label: 'Introduction' },
            { id: 'safety-building-design',    label: 'Building Design' },
            { id: 'safety-routine-work',       label: 'Routine Work' },
            { id: 'good-building-design',       label: 'Good Design' },
            { id: 'references',                label: 'References' },
            { id: 'resources',                 label: 'Resources' }
        ]
    };

    /* Show switcher functions exposed per chapter by existing code */
    var SHOW_FN = {
        'chapter1.html': function(id){ triggerNavLink(id); },
        'chapter2.html': function(id){ triggerNavLink(id); },
        'chapter3.html': function(id){ triggerNavLink(id); },
        'chapter4.html': function(id){ triggerNavLink(id); },
        'chapter6a.html': function(id){ triggerNavLink(id); },
        'chapter6b.html': function(id){ triggerNavLink(id); },
        'chapter6c.html': function(id){ triggerNavLink(id); },
        'chapter7.html': function(id){ triggerNavLink(id); }
    };

    /* Trigger the existing sidebar nav-link click to reuse all existing logic */
    function triggerNavLink(contentId) {
        var link = document.querySelector('.nav-link[data-content="' + contentId + '"]');
        if (link) {
            link.click();
        }
    }

    /* Detect current page filename */
    var page = window.location.pathname.split('/').pop() || 'index.html';
    var tabs = CHAPTER_TABS[page];
    if (!tabs || tabs.length <= 1) return; /* no tab bar needed for single-section pages */

    /* Only inject on mobile */
    function isMobile() { return window.innerWidth <= 768; }

    /* Build the tab bar DOM */
    function buildTabBar() {
        if (!isMobile()) return;
        if (document.getElementById('mobileSectionTabs')) return; /* already built */

        var contentHeader = document.querySelector('.content-header');
        if (!contentHeader) return;

        var bar = document.createElement('div');
        bar.id = 'mobileSectionTabs';
        bar.className = 'mobile-section-tabs';

        tabs.forEach(function (tab) {
            var btn = document.createElement('button');
            btn.className = 'mobile-tab-btn';
            btn.setAttribute('data-tab-id', tab.id);
            btn.textContent = tab.label;

            btn.addEventListener('click', function () {
                var fn = SHOW_FN[page];
                if (fn) fn(tab.id);
                setActiveTab(tab.id);
                /* scroll clicked tab into view */
                btn.scrollIntoView({ inline: 'center', behavior: 'smooth' });
            });

            bar.appendChild(btn);
        });

        /* Insert immediately after content-header */
        contentHeader.parentNode.insertBefore(bar, contentHeader.nextSibling);

        /* Mark chapter container so CSS can adjust */
        var container = document.querySelector('.chapter-container');
        if (container) container.classList.add('has-mobile-tabs');

        /* Set initial active tab */
        setActiveTab('intro');
    }

    /* Highlight the active tab */
    function setActiveTab(contentId) {
        var bar = document.getElementById('mobileSectionTabs');
        if (!bar) return;
        bar.querySelectorAll('.mobile-tab-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-tab-id') === contentId);
        });
    }

    /* Expose setActiveTab so existing showChapterXContent() can call it */
    window.setMobileActiveTab = setActiveTab;

    /* Build on load */
    buildTabBar();

    /* Rebuild / remove on resize */
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            var existing = document.getElementById('mobileSectionTabs');
            if (isMobile()) {
                if (!existing) buildTabBar();
            } else {
                if (existing) existing.remove();
                var container = document.querySelector('.chapter-container');
                if (container) container.classList.remove('has-mobile-tabs');
            }
        }, 150);
    });

    /* Keep tab in sync when sidebar nav links are clicked */
    document.querySelectorAll('.nav-link[data-content]').forEach(function (link) {
        link.addEventListener('click', function () {
            var id = this.getAttribute('data-content');
            if (id) setActiveTab(id);
        });
    });

});


/* ============================================================
   MOBILE FLOATING INDEX BUTTON — Idea A
   Gold FAB bottom-right → slides up section panel
   Works for all chapters. Desktop: hidden via CSS.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

    var SECTIONS = {
        'chapter1.html': [
            { id: 'intro',       name: 'The Need and Scope' },
            { id: 'not-covered', name: 'What is not covered' },
            { id: 'covered',     name: 'What is covered' }
        ],
        'chapter2.html': [
            { id: 'intro', name: 'How to use the manual' }
        ],
        'chapter3.html': [
            { id: 'intro',              name: 'Introduction' },
            { id: 'approval-process',   name: 'Five Stage Process' },
            { id: 'preliminary-design', name: '1. Preliminary Design' },
            { id: 'concept-design',     name: '2. Concept Design' },
            { id: 'statutory-approval', name: '3. Statutory Approval' },
            { id: 'flowchart',          name: 'Flow Chart' }
        ],
        'chapter4.html': [
            { id: 'intro',                  name: 'Introduction' },
            { id: 'functional-adequacy',    name: 'A) Functional Adequacy' },
            { id: 'operational-efficiency', name: 'B) Operational Efficiency' },
            { id: 'resources',              name: 'List of Resources' }
        ],
        'chapter6a.html': [
            { id: 'intro',               name: 'Introduction' },
            { id: 'factors-influencing', name: 'A) Factors Influencing Space' },
            { id: 'service-levels',      name: '1. Service Levels' },
            { id: 'layout-design',       name: '2. Layout Design' },
            { id: 'investigation-area',  name: '3. Investigation Area' },
            { id: 'preferred-practices', name: 'B) Preferred Practices' },
            { id: 'resources',           name: 'List of Resources' }
        ],

        
        'chapter6b.html': [
            { id: 'intro',                   name: 'Introduction' },
            { id: 'planning',                name: 'A) Planning' },
            { id: 'layout-considerations',   name: 'B) Layout Considerations' },
            { id: 'preferred-practices',      name: 'D) Preferred Practices' },
            { id: 'resources',               name: 'List of Resources' }
        ],

        'chapter6c.html': [
            { id: 'intro',                  name: 'Introduction' },
            { id: 'design-considerations',  name: 'A) Design Considerations' },
            { id: 'safety-considerations',  name: 'B) Safety Considerations' },
            { id: 'resources',              name: 'List of Resources' }
        ],

        'chapter7.html': [
            { id: 'intro',                    name: 'A) Introduction' },
            { id: 'safety-building-design',   name: 'B) Safety in Building Design' },
            { id: 'safety-routine-work',      name: 'C) Safety in Routine Work' },
            { id: 'good-building-design',     name: 'D) Good Building Design' },
            { id: 'references',               name: 'E) References' },
            { id: 'resources',                name: 'F) List of Resources' }
        ],

        'chapter8.html': [
            { id: 'intro',         name: 'Introduction' },
            { id: 'procurement',   name: '1) Procurement' },
            { id: 'design',        name: '2) Design' },
            { id: 'equipment',     name: '3) Equipment' },
            { id: 'operations',    name: '4) Operations and Maintenance' },
            { id: 'culture',       name: '5) Fostering a Culture of Sustainable Practices' }
        ]
    };

    var page = window.location.pathname.split('/').pop() || '';
    var sections = SECTIONS[page];

    /* Skip if no sections or only 1 section */
    if (!sections || sections.length <= 1) return;

    var activeId = 'intro';

    /* ---- Build DOM ---- */
    /* Overlay */
    var overlay = document.createElement('div');
    overlay.className = 'mob-panel-overlay';
    overlay.addEventListener('click', closePanel);

    /* Panel */
    var panel = document.createElement('div');
    panel.className = 'mob-section-panel';

    var handle = document.createElement('div');
    handle.className = 'mob-panel-handle';

    var panelTitle = document.createElement('div');
    panelTitle.className = 'mob-panel-title';
    panelTitle.textContent = 'Chapter Sections';

    panel.appendChild(handle);
    panel.appendChild(panelTitle);

    /* Section rows */
    sections.forEach(function (sec) {
        var row = document.createElement('div');
        row.className = 'mob-panel-item';
        row.setAttribute('data-id', sec.id);

        var dot = document.createElement('div');
        dot.className = 'mob-panel-dot' + (sec.id === activeId ? ' active' : '');

        var name = document.createElement('div');
        name.className = 'mob-panel-name' + (sec.id === activeId ? ' active' : '');
        name.textContent = sec.name;

        var arrow = document.createElement('div');
        arrow.className = 'mob-panel-arrow';
        arrow.textContent = '›';

        row.appendChild(dot);
        row.appendChild(name);
        row.appendChild(arrow);

        row.addEventListener('click', function () {
            var id = this.getAttribute('data-id');
            /* Trigger existing sidebar nav link */
            var link = document.querySelector('.nav-link[data-content="' + id + '"]');
            if (link) link.click();
            setActive(id);
            closePanel();
        });

        panel.appendChild(row);
    });

    /* Tooltip label */
    var label = document.createElement('div');
    label.className = 'mob-float-label';
    label.textContent = 'Sections';

    /* Float button */
    var fab = document.createElement('button');
    fab.className = 'mob-float-btn';
    fab.setAttribute('aria-label', 'Open section navigation');
    for (var i = 0; i < 3; i++) {
        var line = document.createElement('span');
        fab.appendChild(line);
    }

    fab.addEventListener('click', function () {
        if (panel.classList.contains('show')) {
            closePanel();
        } else {
            openPanel();
        }
    });

    /* Hide tooltip after 3 seconds */
    setTimeout(function () { label.classList.add('hide'); }, 3000);

    document.body.appendChild(overlay);
    document.body.appendChild(panel);
    document.body.appendChild(label);
    document.body.appendChild(fab);

    /* ---- Open / Close ---- */
    function openPanel() {
        panel.classList.add('show');
        overlay.classList.add('show');
        fab.classList.add('panel-open');
        label.classList.add('hide');
        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        panel.classList.remove('show');
        overlay.classList.remove('show');
        fab.classList.remove('panel-open');
        document.body.style.overflow = '';
    }

    /* ---- Highlight active section ---- */
    function setActive(id) {
        activeId = id;
        panel.querySelectorAll('.mob-panel-item').forEach(function (row) {
            var rid = row.getAttribute('data-id');
            row.querySelector('.mob-panel-dot').classList.toggle('active', rid === id);
            row.querySelector('.mob-panel-name').classList.toggle('active', rid === id);
        });
    }

    /* Sync when sidebar nav links clicked (desktop or programmatic) */
    document.querySelectorAll('.nav-link[data-content]').forEach(function (link) {
        link.addEventListener('click', function () {
            var id = this.getAttribute('data-content');
            if (id) setActive(id);
        });
    });

    /* Expose for next/prev button sync */
    window.setMobileFloatActive = setActive;

});


/* ============================================================
   BREADCRUMB MOBILE CLEANUP
   Hide secondary section breadcrumb items on mobile
   (JS fallback for browsers without :has() support)
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    function cleanBreadcrumbMobile() {
        if (window.innerWidth > 768) return;
        var breadcrumb = document.getElementById('breadcrumbNav');
        if (!breadcrumb) return;

        /* Hide any breadcrumb-item that contains a secondary link */
        breadcrumb.querySelectorAll('.breadcrumb-item').forEach(function (item) {
            if (item.querySelector('.breadcrumb-secondary')) {
                item.style.display = 'none';
            }
        });

        /* Hide extra dot separators — keep only the first */
        var dots = breadcrumb.querySelectorAll('.breadcrumb-dot');
        dots.forEach(function (dot, i) {
            if (i > 0) dot.style.display = 'none';
        });
    }

    /* Run on load */
    cleanBreadcrumbMobile();

    /* Re-run whenever content switches (breadcrumb gets rebuilt by JS) */
    var observer = new MutationObserver(function () {
        cleanBreadcrumbMobile();
    });
    var bc = document.getElementById('breadcrumbNav');
    if (bc) observer.observe(bc, { childList: true, subtree: true });

    /* Re-run on resize */
    window.addEventListener('resize', cleanBreadcrumbMobile);
});


// ------------------------------------------------------------
// HOME PAGE: "Explore the chapters" cards
// hover / focus / arrows change the highlighted card and the 01 / 03 counter
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    var box = document.getElementById('chapterExplorer');
    if (!box) return;

    var cards = Array.prototype.slice.call(box.querySelectorAll('.explore-card'));
    var counter = box.querySelector('.explore-counter');
    var prev = box.querySelector('.explore-prev');
    var next = box.querySelector('.explore-next');
    var current = 0;

    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function setActive(i) {
        current = (i + cards.length) % cards.length;
        cards.forEach(function (card, idx) { card.classList.toggle('active', idx === current); });
        if (counter) counter.textContent = pad(current + 1) + ' / ' + pad(cards.length);
    }

    cards.forEach(function (card, idx) {
        card.addEventListener('mouseenter', function () { setActive(idx); });
        card.addEventListener('focus', function () { setActive(idx); });
    });
    if (prev) prev.addEventListener('click', function () { setActive(current - 1); });
    if (next) next.addEventListener('click', function () { setActive(current + 1); });

    setActive(0);
});

// ============================================================
// SITE SEARCH
//  - search box on every page (home page: big box, other pages: in the top bar)
//  - typo tolerant, searches text + video / PDF / checklist / image names
//  - result click -> jumps to the section and highlights the words / the file
// The text it searches is in  search-index.js  (made by build_search_index.py).
// That file is only downloaded when someone clicks the search box, so normal
// page loading stays fast.
// ============================================================
(function () {
    var STOP = { a:1, an:1, the:1, and:1, or:1, of:1, for:1, in:1, on:1, to:1, is:1, are:1, at:1, by:1,
                 with:1, as:1, be:1, it:1, this:1, that:1, from:1, how:1, what:1, about:1 };

    // Short forms / other spellings  ->  word used in the manual   (add your own here)
    var SYN = { ot: 'theatre', theater: 'theatre', operating: 'operation',
                opd: 'outpatient', ipd: 'inpatient', ward: 'inpatient',
                ppt: 'powerpoint', xls: 'excel', excel: 'excel', movie: 'video', clip: 'video',
                vdo: 'video', vid: 'video', vids: 'video', vedio: 'video', videoes: 'video' };

    var MARK = '__manualSearch__';

    function tokenize(str) {
        return String(str).toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean);
    }
    function stem(w) {
        if (w.length > 4 && /ies$/.test(w)) w = w.slice(0, -3) + 'y';
        else if (w.length > 3 && /(ches|shes|xes|sses)$/.test(w)) w = w.slice(0, -2);
        else if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) w = w.slice(0, -1);
        if (w.length > 4 && /e$/.test(w)) w = w.slice(0, -1);
        return w;
    }
    function matches(wordStem, q) {
        return wordStem === q || (q.length >= 3 && wordStem.indexOf(q) === 0);
    }
    function esc(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    function reEscape(str) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
    function wordRegex(stems) {
        return new RegExp('\\b(?:' + stems.map(reEscape).join('|') + ')[a-z0-9]*', 'gi');
    }

    // edit distance (swapped letters count as 1 mistake; stops early when larger than max)
    function lev(a, b, max) {
        var la = a.length, lb = b.length, d = [], i, j;
        if (Math.abs(la - lb) > max) return max + 1;
        for (i = 0; i <= la; i++) d[i] = [i];
        for (j = 0; j <= lb; j++) d[0][j] = j;
        for (i = 1; i <= la; i++) {
            var rowMin = 99;
            for (j = 1; j <= lb; j++) {
                var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
                d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
                if (i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) {
                    d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
                }
                if (d[i][j] < rowMin) rowMin = d[i][j];
            }
            if (rowMin > max) return max + 1;
        }
        return d[la][lb];
    }

    // ---------- LIVE INDEXER ----------
    // When the site runs from a web server (online, or VS Code "Live Server"), the pages
    // themselves are read and indexed in the browser - so whatever you edit in a chapter
    // is searchable immediately, no extra file / tool needed.
    // (Opened as a plain file:// the browser blocks this, so search-index.js is used instead.)
    var KINDS = { mp4: 'Video', mov: 'Video', webm: 'Video', m4v: 'Video', pdf: 'PDF', xlsx: 'Excel', xls: 'Excel',
                  csv: 'Excel', pptx: 'PPT', ppt: 'PPT', docx: 'Word', doc: 'Word', jpg: 'Image', jpeg: 'Image',
                  png: 'Image', gif: 'Image', webp: 'Image', svg: 'Image' };
    var KIND_WORDS = { Video: 'video', PDF: 'pdf', Excel: 'excel spreadsheet', PPT: 'powerpoint presentation',
                       Word: 'word document', Image: 'image figure illustration' };
    var KIND_ORDER = ['Video', 'PDF', 'Excel', 'PPT', 'Word', 'Image'];

    function clean(t) { return String(t || '').replace(/\s+/g, ' ').trim(); }

    function pageEntries(ch, html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var out = [];
        Array.prototype.forEach.call(doc.querySelectorAll('.content-block[id^="content-"]'), function (b) {
            var titleEl = b.querySelector('.article-title');
            var secTitle = clean(titleEl && titleEl.textContent) || ch.label;

            var copy = b.cloneNode(true), junk = copy.querySelectorAll('.article-title, script, style'), j;
            for (j = 0; j < junk.length; j++) junk[j].parentNode.removeChild(junk[j]);
            var alts = [];
            Array.prototype.forEach.call(b.querySelectorAll('img[alt]'), function (im) { alts.push(im.getAttribute('alt')); });
            out.push({ c: ch.label, h: ch.href, s: b.id, t: secTitle, x: clean(copy.textContent + ' ' + alts.join(' ')) });

            var res = {}, order = [], parent = '', item = '';
            function labelAncestor(el) {
                for (var p = el.parentNode; p && p !== b; p = p.parentNode) {
                    var t = p.tagName && p.tagName.toLowerCase();
                    if (/^h[2-6]$/.test(t) || (t === 'p' && /font-weight/.test(p.getAttribute('style') || ''))) return true;
                }
                return false;
            }
            function addRes(path, alt) {
                path = String(path || '').trim();
                try { path = decodeURIComponent(path); } catch (e) {}
                if (!path || /^(https?:|#|mailto:|javascript:)/i.test(path)) return;
                var norm = path.replace(/\\/g, '/'), base = norm.split('/').pop();
                if (base.indexOf('.') === -1) return;
                var dot = base.lastIndexOf('.'), name = base.slice(0, dot), kind = KINDS[base.slice(dot + 1).toLowerCase()];
                if (!kind) return;
                if (kind === 'Image' && norm.indexOf('/') === -1) return;
                var key = name.toLowerCase();
                if (!res[key]) {
                    res[key] = { name: name, kinds: {}, title: item || parent || clean(alt) || clean(name.replace(/_for HTML/i, '').replace(/_/g, ' ')), parent: parent };
                    order.push(key);
                }
                res[key].kinds[kind] = 1;
            }

            Array.prototype.forEach.call(b.querySelectorAll('*'), function (el) {
                var tag = el.tagName.toLowerCase();
                if (el.classList && el.classList.contains('article-title')) return;
                var isParent = /^h[2-6]$/.test(tag);
                var isItem = tag === 'strong' || tag === 'b' || (tag === 'p' && /font-weight/.test(el.getAttribute('style') || ''));
                if ((isParent || isItem) && !labelAncestor(el)) {
                    var txt = clean(el.textContent);
                    if (txt && txt.length <= 170) { if (isParent) { parent = txt; item = ''; } else { item = txt; } }
                }
                if (tag === 'img') addRes(el.getAttribute('src'), el.getAttribute('alt'));
                else if (tag === 'video' || tag === 'source' || tag === 'audio') addRes(el.getAttribute('src'));
                else if (tag === 'a' && el.getAttribute('href')) addRes(el.getAttribute('href'));
                else if (tag === 'button' && el.getAttribute('onclick')) {
                    var re = /(?:openFileViewer|downloadFile)\(\s*['"]([^'"]+)['"]/g, m;
                    while ((m = re.exec(el.getAttribute('onclick')))) addRes(m[1]);
                }
            });

            order.forEach(function (key) {
                var r = res[key], kinds = KIND_ORDER.filter(function (k) { return r.kinds[k]; });
                out.push({ c: ch.label, h: ch.href, s: b.id, t: r.title, p: secTitle,
                           x: clean(r.parent + ' ' + r.name + ' ' + kinds.map(function (k) { return KIND_WORDS[k]; }).join(' ')),
                           k: kinds.join(' · '), f: r.name });
            });
        });
        return out;
    }

    function liveIndex(done) {
        var list = window.CHAPTER_LIST;
        if (!/^https?:$/.test(location.protocol) || !list || !list.length || typeof DOMParser === 'undefined') { done(null); return; }
        var parts = [], pending = list.length, failed = 0;
        list.forEach(function (ch, i) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', ch.href, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (xhr.status >= 200 && xhr.status < 300) {
                    try { parts[i] = pageEntries(ch, xhr.responseText); } catch (e) { failed++; }
                } else { failed++; }
                if (--pending === 0) {
                    var all = [];
                    parts.forEach(function (p) { if (p) all = all.concat(p); });
                    done(all.length && failed < list.length ? all : null);
                }
            };
            xhr.send();
        });
    }

    // ---------- load + build the index (only when needed) ----------
    var DOCS = [], VOCAB = {}, VOCAB_WORDS = [], STEMS = [];
    var indexState = 0, waiters = [];            // 0 = not loaded, 1 = loading, 2 = ready

    function buildIndex() {
        if (DOCS.length) return;
        var stemSet = {};
        (window.SEARCH_INDEX || []).forEach(function (d) {
            var tw = tokenize(d.t), lw = tokenize(d.c), xw = tokenize(d.x);
            var doc = { d: d, t: tw.map(stem), l: lw.map(stem), x: xw.map(stem), lowerText: (d.t + ' ' + d.x).toLowerCase() };
            DOCS.push(doc);
            tw.concat(lw, xw).forEach(function (w) {
                if (w.length < 3) return;
                VOCAB[w] = (VOCAB[w] || 0) + 1;
            });
            doc.t.concat(doc.l, doc.x).forEach(function (st) { stemSet[st] = 1; });
        });
        VOCAB_WORDS = Object.keys(VOCAB);
        STEMS = Object.keys(stemSet);
    }
    function flush(ok) { var w = waiters; waiters = []; w.forEach(function (fn) { fn(ok); }); }
    function ensureIndex(done) {
        if (indexState === 2) { done(true); return; }
        if (window.SEARCH_INDEX) { buildIndex(); indexState = 2; done(true); return; }
        waiters.push(done);
        if (indexState === 1) return;
        indexState = 1;
        var finish = function (ok) { if (ok) { buildIndex(); indexState = 2; } else { indexState = 0; } flush(ok); };
        var fromFile = function () {
            var sc = document.createElement('script');
            sc.src = 'search-index.js';
            sc.onload = function () { finish(true); };
            sc.onerror = function () { finish(false); };
            document.head.appendChild(sc);
        };
        liveIndex(function (entries) {
            if (entries) { window.SEARCH_INDEX = entries; window.SEARCH_SOURCE = 'live'; finish(true); }
            else { window.SEARCH_SOURCE = 'file'; fromFile(); }
        });
    }

    function known(q) {
        for (var i = 0; i < STEMS.length; i++) if (matches(STEMS[i], q)) return true;
        return false;
    }
    function closestWord(tok) {
        var max = tok.length <= 3 ? 0 : (tok.length <= 5 ? 1 : (tok.length <= 8 ? 2 : 3));
        if (!max) return null;
        var best = null, bestD = 99, bestF = 0;
        for (var i = 0; i < VOCAB_WORDS.length; i++) {
            var w = VOCAB_WORDS[i];
            if (Math.abs(w.length - tok.length) > max) continue;
            var dd = lev(tok, w, max);
            if (dd <= max && (dd < bestD || (dd === bestD && VOCAB[w] > bestF))) { best = w; bestD = dd; bestF = VOCAB[w]; }
        }
        return best;
    }

    // ---------- understand the query (fix spelling) ----------
    function analyse(query, allowFix) {
        var toks = tokenize(query).filter(function (t) { return !STOP[t] && t.length >= 2; });
        var groups = [], fixed = false;

        // "wheel chair" -> "wheelchair" (written apart in the question, together in the manual)
        var joined = [];
        for (var ti = 0; ti < toks.length; ti++) {
            if (ti + 1 < toks.length && VOCAB[toks[ti] + toks[ti + 1]]) { joined.push(toks[ti] + toks[ti + 1]); ti++; fixed = true; }
            else joined.push(toks[ti]);
        }
        toks = joined;

        toks.forEach(function (t) {
            var alts = [t];
            if (SYN[t] && SYN[t] !== t) alts.push(SYN[t]);
            var ok = alts.some(function (a) { return known(stem(a)); });
            if (!ok && allowFix) {
                var b = closestWord(t);
                if (b) { alts = [b]; fixed = true; }
                else {
                    // "wheelchair" -> "wheel chair" (written together in the question, apart in the manual)
                    for (var k = 3; k <= t.length - 3; k++) {
                        var p1 = t.slice(0, k), p2 = t.slice(k);
                        if (known(stem(p1)) && known(stem(p2))) {
                            groups.push({ orig: p1, alts: [p1] });
                            alts = [p2]; fixed = true;
                            break;
                        }
                    }
                }
            }
            groups.push({ orig: t, alts: alts });
        });
        return { groups: groups, fixed: fixed,
                 shown: groups.map(function (g) { return g.alts[0]; }).join(' ') };
    }

    // ---------- rank the entries ----------
    function scoreDoc(doc, groups, needAll) {
        var total = 0, matched = 0, labelHits = 0;
        groups.forEach(function (g) {
            var inT = false, inL = false, cnt = 0;
            g.alts.forEach(function (a) {
                var q = stem(a);
                if (!inT) inT = doc.t.some(function (w) { return matches(w, q); });
                if (!inL) inL = doc.l.some(function (w) { return matches(w, q); });
                for (var i = 0; i < doc.x.length; i++) if (matches(doc.x[i], q)) cnt++;
            });
            if (inT || inL || cnt) {
                matched++;
                if (inL) labelHits++;
                total += (inT ? 10 : 0) + (inL ? 6 : 0) + (cnt ? 2 + Math.min(cnt, 10) : 0);
            }
        });
        if (needAll ? matched < groups.length : matched === 0) return -1;
        var phrase = groups.map(function (g) { return g.alts[0]; }).join(' ');
        if (groups.length > 1 && doc.lowerText.indexOf(phrase) !== -1) total += 8;
        if (labelHits === groups.length && /intro/.test(doc.d.s) && !doc.d.f) total += 6;
        return total;
    }

    function search(query, allowFix) {
        var a = analyse(query, allowFix);
        if (!a.groups.length) return { a: a, results: [], partial: false };
        var run = function (needAll) {
            return DOCS.map(function (doc) { return { doc: doc, score: scoreDoc(doc, a.groups, needAll) }; })
                       .filter(function (r) { return r.score >= 0; })
                       .sort(function (x, y) { return y.score - x.score; });
        };
        var res = run(true), partial = false;
        if (!res.length && a.groups.length > 1) { res = run(false); partial = true; }
        return { a: a, results: res, partial: partial };
    }

    function stemsOf(a) {
        var out = [];
        a.groups.forEach(function (g) { g.alts.forEach(function (x) { var s = stem(x); if (s.length >= 2 && out.indexOf(s) === -1) out.push(s); }); });
        return out;
    }

    function snippet(doc, stems) {
        var d = doc.d;
        if (d.f) {      // a video / file / image entry
            var line = (d.p ? d.p + ' · ' : '') + d.f;
            return esc(line).replace(wordRegex(stems), function (w) { return '<mark>' + w + '</mark>'; });
        }
        var text = d.x, re = wordRegex(stems), m = re.exec(text), start = 0;
        if (m) start = Math.max(0, m.index - 70);
        if (start > 0) { var sp = text.indexOf(' ', start); if (sp !== -1 && sp < m.index) start = sp + 1; }
        var piece = text.substr(start, 190);
        if (start + 190 < text.length) { var ls = piece.lastIndexOf(' '); if (ls > 120) piece = piece.slice(0, ls); }
        var html = esc(piece).replace(wordRegex(stems), function (w) { return '<mark>' + w + '</mark>'; });
        return (start > 0 ? '… ' : '') + html + (start + piece.length < text.length ? ' …' : '');
    }

    // ---------- remember what was searched, so the next page can highlight it ----------
    function remember(stems, file) {
        try { window.name = MARK + JSON.stringify({ stems: stems, file: file || '', ts: Date.now() }); } catch (e) {}
    }
    function findResource(key) {
        var k = String(key).toLowerCase();
        var els = document.querySelectorAll('[onclick], a[href], video, source, img');
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            var s = ((el.getAttribute('onclick') || '') + ' ' + (el.getAttribute('href') || '') + ' ' + (el.getAttribute('src') || '')).toLowerCase();
            var dec = s;
            try { dec = decodeURIComponent(s); } catch (e) {}
            if (s.indexOf(k) !== -1 || dec.indexOf(k) !== -1) return el;
        }
        return null;
    }
    function applyHighlight() {
        var raw = window.name || '';
        if (raw.indexOf(MARK) !== 0) return;
        window.name = '';
        var data;
        try { data = JSON.parse(raw.slice(MARK.length)); } catch (e) { return; }
        if (!data || Date.now() - data.ts > 60000) return;

        // a video / checklist / file was searched -> scroll to it and flash it
        if (data.file) {
            var el = findResource(data.file);
            if (el) {
                var box = (el.closest && el.closest('.resource-buttons, .resource-simple-buttons')) || el.parentElement || el;
                box.classList.add('search-pulse');
                if (box.scrollIntoView) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(function () { box.classList.remove('search-pulse'); }, 5000);
                return;
            }
        }

        if (!data.stems || !data.stems.length) return;
        var hash = (location.hash || '').replace('#', '');
        var root = (hash && document.getElementById(hash)) || document.querySelector('.main-article') || document.body;
        var re = wordRegex(data.stems), nodes = [];
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
        var n;
        while ((n = walker.nextNode())) {
            var p = n.parentNode;
            if (!p || /^(SCRIPT|STYLE|BUTTON|MARK|SVG)$/i.test(p.nodeName)) continue;
            re.lastIndex = 0;
            if (re.test(n.nodeValue)) nodes.push(n);
        }
        nodes.forEach(function (node) {
            var frag = document.createDocumentFragment(), txt = node.nodeValue, last = 0, m;
            re.lastIndex = 0;
            while ((m = re.exec(txt))) {
                if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
                var mk = document.createElement('mark');
                mk.className = 'search-hit';
                mk.textContent = m[0];
                frag.appendChild(mk);
                last = m.index + m[0].length;
                if (m[0].length === 0) re.lastIndex++;
            }
            if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
            node.parentNode.replaceChild(frag, node);
        });
        var first = root.querySelector('mark.search-hit');
        if (first && first.scrollIntoView) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ---------- the search box ----------
    function makeNavSearch() {
        if (document.getElementById('siteSearch')) return document.getElementById('siteSearch');   // home page has its own
        var bar = document.querySelector('.nav-container');
        if (!bar) return null;
        var wrap = document.createElement('div');
        wrap.className = 'nav-search';
        wrap.id = 'siteSearch';
        wrap.innerHTML =
            '<button type="button" class="nav-search-toggle" aria-label="Search"><i class="fas fa-search"></i></button>' +
            '<div class="search-box">' +
                '<i class="fas fa-search search-icon"></i>' +
                '<input type="text" id="siteSearchInput" placeholder="Search the manual…" autocomplete="off" spellcheck="false" aria-label="Search the manual">' +
                '<button type="button" class="search-clear" aria-label="Clear search" hidden>&times;</button>' +
            '</div>' +
            '<div class="search-results" id="siteSearchResults" hidden></div>';
        var toggle = bar.querySelector('.menu-toggle');
        if (toggle) bar.insertBefore(wrap, toggle); else bar.appendChild(wrap);
        return wrap;
    }

    function initBox(wrap) {
        if (!wrap) return;
        var input = wrap.querySelector('input');
        var panel = wrap.querySelector('.search-results');
        var clear = wrap.querySelector('.search-clear');
        var toggleBtn = wrap.querySelector('.nav-search-toggle');
        var items = [], active = -1, lastStems = [], noFix = false;

        function close() { panel.hidden = true; active = -1; }
        function setActive(i) {
            if (!items.length) return;
            active = (i + items.length) % items.length;
            items.forEach(function (el, k) { el.classList.toggle('active', k === active); });
            if (items[active].scrollIntoView) items[active].scrollIntoView({ block: 'nearest' });
        }
        function go(el) {
            if (!el) return;
            remember(lastStems, el.getAttribute('data-file'));
            window.location.href = el.getAttribute('href');
        }
        function show(html) { panel.innerHTML = html; panel.hidden = false; items = []; active = -1; }

        function render() {
            var q = input.value.trim();
            clear.hidden = !q;
            if (!q) { close(); return; }
            if (indexState !== 2) {
                show('<div class="sr-empty">Loading search…</div>');
                ensureIndex(function (ok) {
                    if (!ok) { show('<div class="sr-empty">Search data (<b>search-index.js</b>) could not be loaded.<br>Please keep it in the same folder as the pages.</div>'); return; }
                    if (input.value.trim() === q) render();
                });
                return;
            }
            var r = search(q, !noFix);
            lastStems = stemsOf(r.a);
            if (!r.a.groups.length) { close(); return; }
            var html = '';

            if (r.a.fixed) {
                html += '<div class="sr-note">Showing results for <b>' + esc(r.a.shown) + '</b>' +
                        ' <button type="button" class="sr-nofix">Search for “' + esc(q) + '” instead</button></div>';
            } else if (r.partial) {
                html += '<div class="sr-note">No section has all the words - showing partial matches</div>';
            }

            if (!r.results.length) {
                show(html + '<div class="sr-empty">No results for <b>“' + esc(q) + '”</b>.<br>' +
                     'Try a different word, e.g. <i>operation theatre</i>, <i>checklist</i>, <i>lighting</i>.</div>');
            } else {
                var shown = r.results.slice(0, 10);
                shown.forEach(function (x) {
                    var d = x.doc.d;
                    var kind = d.k ? '<span class="sr-kind">' + esc(d.k) + '</span>' : '';
                    var title = (d.t && d.t !== d.c) ? esc(d.t) : '';
                    html += '<a class="sr-item" href="' + esc(d.h) + '#' + esc(d.s) + '"' + (d.f ? ' data-file="' + esc(d.f) + '"' : '') + '>' +
                            '<span class="sr-chapter">' + esc(d.c) + '</span>' +
                            ((title || kind) ? '<span class="sr-title">' + kind + title + '</span>' : '') +
                            '<span class="sr-snippet">' + snippet(x.doc, lastStems) + '</span></a>';
                });
                if (r.results.length > shown.length) {
                    html += '<div class="sr-more">+ ' + (r.results.length - shown.length) + ' more - add another word to narrow it down</div>';
                }
                panel.innerHTML = html; panel.hidden = false;
                items = Array.prototype.slice.call(panel.querySelectorAll('.sr-item'));
                active = -1;
                items.forEach(function (el) { el.addEventListener('click', function () { remember(lastStems, el.getAttribute('data-file')); }); });
                setActive(0);
            }
            var nf = panel.querySelector('.sr-nofix');
            if (nf) nf.addEventListener('click', function () { noFix = true; render(); input.focus(); });
        }

        input.addEventListener('input', function () { noFix = false; render(); });
        input.addEventListener('focus', function () { ensureIndex(function () {}); if (input.value.trim()) render(); });
        input.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
            else if (e.key === 'Enter') { e.preventDefault(); go(items[active] || items[0]); }
            else if (e.key === 'Escape') { close(); wrap.classList.remove('open'); input.blur(); }
        });
        clear.addEventListener('click', function () { input.value = ''; noFix = false; render(); input.focus(); });
        if (toggleBtn) toggleBtn.addEventListener('click', function () {
            var open = wrap.classList.toggle('open');
            if (open) input.focus(); else close();
        });
        document.addEventListener('click', function (e) {
            if (!wrap.contains(e.target)) { close(); wrap.classList.remove('open'); }
        });
        document.addEventListener('keydown', function (e) {
            var tag = (document.activeElement && document.activeElement.tagName) || '';
            if ((e.key === '/' && !/INPUT|TEXTAREA/.test(tag)) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
                e.preventDefault();
                wrap.classList.add('open');
                input.focus(); input.select();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initBox(makeNavSearch());
        setTimeout(applyHighlight, 450);
    });

    // for testing / future use
    window.ManualSearch = { search: search, ensureIndex: ensureIndex, pageEntries: pageEntries };
})();


// ============================================================
// BRAND (top bar)
//  - HOME page:      the ArchEye logo
//  - all other pages: the heading "Guidelines for Designing an Eye Care Facility"
//  - clicking either one goes to the home page
//  - browser tab title ends with "| ArchEye"
// Put your logo file in the same folder as the pages and name it  logo.jpg
// (the script also tries logo.png, Arch_Eye_2.jpg and Arch_Eye_2.png, in this order).
// ============================================================
(function () {
    // Put the exact name of YOUR logo file here (first in the list). If it is inside a folder, write the folder too,
    // e.g.  'Images -Home/ArchEye.jpg'   -  the other names are tried automatically after it.
    var LOGO_FILES = [
        'Images -Home/ArchEye.png',                // <- your logo (folder / file name)
        'Images -Home/Arch eye Logo .png',
        'logo.jpg', 'logo.png', 'Arch_Eye_2.jpg', 'Arch_Eye_2.png',
        'Images -Home/logo.jpg', 'Images -Home/logo.png', 'Images -Home/Arch_Eye_2.jpg', 'Images -Home/Arch_Eye_2.png',
        'Images -Home/ArchEye.jpg', 'Images -Home/ArchEye.png'
    ];
    var LOGO_HEIGHT = 52;              // logo height in px (the top bar is 64px high - keep this at 56 or less)
    var SITE_HEADING = 'Practical Considerations for Designing Efficient Eye Care Facilities';   // shown on all chapter pages
    var SHOW_TAGLINE = true;           // only for Arch_Eye_2.png: false = show just the big "ArchEye" word

    function setBrand() {
        var box = document.querySelector('.nav-logo');
        if (!box || box.querySelector('.brand-logo, .brand-title')) return;

        // logo on ALL pages (home + every chapter) - click = home page
        document.documentElement.style.setProperty('--logo-h', LOGO_HEIGHT + 'px');

        var a = document.createElement('a');
        a.href = 'index.html';
        a.setAttribute('aria-label', 'ArchEye - go to the home page');
        a.title = 'ArchEye - Home';
        var img = document.createElement('img');
        img.alt = 'ArchEye';
        a.appendChild(img);

        var n = 0;
        function tryNext() {
            if (n >= LOGO_FILES.length) {                 // no logo file found -> show the name as text
                a.className = 'brand-logo no-img';
                a.textContent = 'ArchEye';
                if (window.console && console.warn) {
                    console.warn('ArchEye logo NOT FOUND. These files were tried (next to the html pages): ' + LOGO_FILES.join(' | ') +
                                 '  ->  put your logo there, or add its exact name at the top of LOGO_FILES in script.js');
                }
                return;
            }
            var file = LOGO_FILES[n++];
            // "Arch Eye 2.png" has big white margins, which are cropped with CSS. Other files are shown as they are.
            var cropped = /(^|\/)arch[ _]eye[ _]2\.png$/i.test(file);
            a.className = 'brand-logo' + (cropped ? (SHOW_TAGLINE ? '' : ' brand-wordmark') : ' brand-plain');
            img.src = file;
        }
        img.onerror = tryNext;
        tryNext();
        box.innerHTML = '';
        box.appendChild(a);
    }

    function setTitle() {
        document.title = document.title.replace(/\s*\|\s*(Eye Care Design|LAICO Architectural Manual|Architectural Manual)\s*$/i, ' | ArchEye');
    }

    setBrand();                                         // as soon as the page is ready (no flicker)
    document.addEventListener('DOMContentLoaded', function () { setBrand(); setTitle(); });
})();


/* =====================================================================
   FEEDBACK POPUP  (works on every page that loads script.js)
   - Top-corner "Feedback" button (navbar) + footer link + menu "Feedback" link
   - User types only the message (email id NOT needed from the user)
   - Message is delivered to YOUR mail through Web3Forms (free)
   ===================================================================== */
(function () {
    'use strict';

    // ====== CHANGE ONLY THESE TWO LINES ======
    var ACCESS_KEY = 'PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE';   // from https://web3forms.com  (enter your mail id there, key comes to that mail)
    var SUBJECT    = 'Architectural Manual - New Feedback';
    // =========================================

    function pageName() {
        var h1 = document.querySelector('.article-title');
        var t = (h1 ? h1.textContent : document.title) || '';
        return t.replace(/\s+/g, ' ').trim();
    }

    function build() {
        if (document.getElementById('fbModal')) return;


        // top-corner: "Suggest feedback: email id" (click = opens the mail app with the To: address filled)
        var navBox = document.querySelector('.navbar .nav-container');
        if (navBox && !navBox.querySelector('.fb-nav-mail')) {
            var nb = document.createElement('a');
            nb.className = 'fb-nav-mail';
            nb.href = 'mailto:laicoinfo@aravind.org?subject=Feedback%20-%20Guidelines%20for%20Designing%20an%20Eye%20Care%20Facility';
            nb.setAttribute('aria-label', 'Suggest feedback by email: laicoinfo@aravind.org');
            nb.innerHTML = '<i class="fas fa-envelope"></i>' +
                           '<span class="fb-mail-label">Suggest feedback:</span>' +
                           '<span class="fb-mail-id">laicoinfo@aravind.org</span>';
            var mt = navBox.querySelector('.menu-toggle');
            if (mt) navBox.insertBefore(nb, mt); else navBox.appendChild(nb);
        }

        // modal
        var m = document.createElement('div');
        m.id = 'fbModal';
        m.className = 'fb-modal';
        m.setAttribute('role', 'dialog');
        m.setAttribute('aria-modal', 'true');
        m.setAttribute('aria-labelledby', 'fbTitle');
        m.innerHTML =
            '<div class="fb-box">' +
              '<button type="button" class="fb-close" id="fbClose" aria-label="Close">&times;</button>' +
              '<div id="fbFormWrap">' +
                '<h3 id="fbTitle">Share your feedback</h3>' +
                '<p class="fb-sub">Your suggestions help us improve this manual. No email id needed.</p>' +
                '<form id="fbForm" novalidate>' +
                  '<input type="checkbox" name="botcheck" id="fbBot" tabindex="-1" autocomplete="off" style="display:none">' +
                  '<label for="fbName">Name <span>(optional)</span></label>' +
                  '<input type="text" id="fbName" maxlength="80" placeholder="Your name">' +
                  '<label for="fbMsg">Feedback / Comments <b>*</b></label>' +
                  '<textarea id="fbMsg" rows="5" maxlength="2000" placeholder="Type your feedback here…"></textarea>' +
                  '<div class="fb-error" id="fbError" hidden></div>' +
                  '<button type="submit" class="fb-send" id="fbSend"><i class="fas fa-paper-plane"></i> Send Feedback</button>' +
                '</form>' +
              '</div>' +
              '<div id="fbThanks" class="fb-thanks" hidden>' +
                '<i class="fas fa-circle-check"></i>' +
                '<h3>Thank you!</h3>' +
                '<p>Your feedback has been sent to us.</p>' +
                '<button type="button" class="fb-send" id="fbDone">Close</button>' +
              '</div>' +
            '</div>';
        document.body.appendChild(m);

        var form = document.getElementById('fbForm');
        var msg = document.getElementById('fbMsg');
        var err = document.getElementById('fbError');
        var send = document.getElementById('fbSend');
        var wrap = document.getElementById('fbFormWrap');
        var thanks = document.getElementById('fbThanks');

        function open() {
            wrap.hidden = false; thanks.hidden = true; err.hidden = true;
            m.classList.add('open');
            document.body.style.overflow = 'hidden';
            setTimeout(function () { msg.focus(); }, 60);
        }
        function close() {
            m.classList.remove('open');
            document.body.style.overflow = '';
        }
        window.openFeedback = open;

        document.getElementById('fbClose').addEventListener('click', close);
        document.getElementById('fbDone').addEventListener('click', function () { close(); form.reset(); });
        m.addEventListener('click', function (e) { if (e.target === m) close(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && m.classList.contains('open')) close(); });

        // menu "Feedback" link, footer link, or any element with data-feedback / href="#feedback"
        document.addEventListener('click', function (e) {
            var a = e.target.closest && e.target.closest('a[href="#feedback"], [data-feedback]');
            if (a) { e.preventDefault(); open(); }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            err.hidden = true;
            var text = msg.value.trim();
            if (document.getElementById('fbBot').checked) return;   // spam bot
            if (text.length < 5) { err.textContent = 'Please type your feedback (at least a few words).'; err.hidden = false; return; }
            if (ACCESS_KEY.indexOf('PASTE_') === 0) { err.textContent = 'Feedback is not configured yet (access key missing).'; err.hidden = false; return; }

            send.disabled = true;
            send.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    subject: SUBJECT,
                    from_name: 'Architectural Manual Website',
                    name: document.getElementById('fbName').value.trim() || 'Anonymous',
                    message: text,
                    page: pageName(),
                    page_url: location.href
                })
            })
            .then(function (r) { return r.json(); })
            .then(function (d) {
                if (d && d.success) {
                    wrap.hidden = true; thanks.hidden = false; form.reset();
                } else {
                    throw new Error((d && d.message) || 'Failed');
                }
            })
            .catch(function () {
                err.textContent = 'Could not send right now. Please check your internet and try again.';
                err.hidden = false;
            })
            .then(function () {
                send.disabled = false;
                send.innerHTML = '<i class="fas fa-paper-plane"></i> Send Feedback';
            });
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();
})();

/* =====================================================================
   MOBILE / TABLET MENU  (the hamburger  ☰  in the top bar)
   ---------------------------------------------------------------------
   CHANGE ONLY THIS ONE WORD TO SWITCH BETWEEN THE TWO OPTIONS:

     'drawer'  ->  OPTION 1 : right-side drawer with the list of all chapters
                              (+ "Suggest feedback" mail link)
     'none'    ->  OPTION 2 : no hamburger at all (top bar = logo + mail icon only)
   ===================================================================== */
(function () {
    var MOBILE_MENU = 'none';            // <-- 'none' = no hamburger menu (simple)  |  'drawer' = chapters drawer

    document.documentElement.setAttribute('data-mobile-menu', MOBILE_MENU);
    if (MOBILE_MENU !== 'drawer') return;

    function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

    function buildDrawer() {
        var overlay = document.getElementById('menuOverlay');
        if (!overlay) return;
        var content = overlay.querySelector('.menu-content');
        if (!content || content.querySelector('.drawer-nav')) return;

        if (!window.CHAPTER_LIST && typeof renderChapterSidebar === 'function') {
            try { renderChapterSidebar(); } catch (e) {}
        }
        var list = window.CHAPTER_LIST || [];
        var current = document.body.getAttribute('data-chapter');

        var old = content.querySelector('.menu-items');
        if (old) old.parentNode.removeChild(old);

        var html = '<div class="drawer-title">Contents</div><nav class="drawer-nav"><ul>';
        list.forEach(function (ch) {
            html += '<li><a href="' + esc(ch.href) + '"' + (ch.id === current ? ' class="is-current"' : '') + '>' + esc(ch.label) + '</a></li>';
        });
        html += '</ul></nav>' +
                '<a class="drawer-mail" href="mailto:laicoinfo@aravind.org?subject=Feedback%20-%20Guidelines%20for%20Designing%20an%20Eye%20Care%20Facility">' +
                '<i class="fas fa-envelope"></i><span>Suggest feedback<br><b>laicoinfo@aravind.org</b></span></a>';
        content.insertAdjacentHTML('beforeend', html);

        // close the drawer after tapping a link, and with the Esc key
        function close() { overlay.classList.remove('active'); document.body.style.overflow = 'auto'; }
        content.querySelectorAll('.drawer-nav a, .drawer-mail').forEach(function (a) { a.addEventListener('click', close); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildDrawer);
    else buildDrawer();
})();


/* =====================================================================
   CHAPTER PAGES (phone / tablet, width <= 992px):
   ☰ at the LEFT of the top bar opens a small menu:
        Home        -> home page
        Chapters    -> opens the Table of Contents (the Contents sidebar)
        Feedback    -> opens the mail app (To: laicoinfo@aravind.org)
   On desktop the Contents sidebar is always open, so this ☰ is hidden there.
   ===================================================================== */
(function () {
    var MAIL = 'mailto:laicoinfo@aravind.org?subject=Feedback%20-%20Guidelines%20for%20Designing%20an%20Eye%20Care%20Facility';

    function init() {
        var sb  = document.getElementById('chapterSidebar');
        var bar = document.querySelector('.navbar .nav-container');
        var isHome = false;
        if (!bar || document.getElementById('navSidebarBtn')) return;

        // HOME page: no sidebar exists, so build a "Contents" panel from the same chapter list
        if (!sb) {
            if (document.querySelector('.chapter-container')) return;      // a chapter page without sidebar: nothing to do
            if (!window.CHAPTER_LIST && typeof renderChapterSidebar === 'function') { try { renderChapterSidebar(); } catch (e) {} }
            var list = window.CHAPTER_LIST || [];
            if (!list.length) return;
            function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
            sb = document.createElement('aside');
            sb.className = 'home-contents';
            var h = '<div class="drawer-title">Contents</div><nav class="drawer-nav"><ul>';
            list.forEach(function (ch) { h += '<li><a href="' + esc(ch.href) + '">' + esc(ch.label) + '</a></li>'; });
            sb.innerHTML = h + '</ul></nav>';
            document.body.appendChild(sb);
            document.body.classList.add('has-home-menu');
            isHome = true;
        }

        // ☰ button (left of the logo)
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'navSidebarBtn';
        btn.className = 'nav-sidebar-btn';
        btn.setAttribute('aria-label', 'Menu');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span></span><span></span><span></span>';
        bar.insertBefore(btn, bar.firstChild);

        // small menu: Home / Chapters / Feedback
        var menu = document.createElement('div');
        menu.className = 'nav-menu';
        menu.innerHTML =
            '<a class="nav-menu-item" href="index.html"><i class="fas fa-home"></i><span>Home</span></a>' +
            '<button type="button" class="nav-menu-item" id="navMenuChapters"><i class="fas fa-book-open"></i><span>Chapters</span><i class="fas fa-chevron-right nav-menu-arrow"></i></button>' +
            '<a class="nav-menu-item" href="' + MAIL + '"><i class="fas fa-envelope"></i><span>Feedback</span></a>';
        document.body.appendChild(menu);

        var bd = document.createElement('div');
        bd.className = 'nav-sidebar-backdrop';
        document.body.appendChild(bd);

        function setTop() {   // menu / sidebar start exactly under the top bar (also when the "best viewed on desktop" notice is shown)
            var nb = document.querySelector('.navbar');
            if (nb) document.body.style.setProperty('--nav-h', Math.round(nb.getBoundingClientRect().bottom) + 'px');
        }
        function sync() {
            var sOpen = sb.classList.contains('sidebar-open');
            var mOpen = menu.classList.contains('open');
            bd.classList.toggle('show', sOpen || mOpen);
            btn.setAttribute('aria-expanded', mOpen ? 'true' : 'false');
            document.body.style.overflow = (sOpen || mOpen) ? 'hidden' : '';
        }
        new MutationObserver(sync).observe(sb,   { attributes: true, attributeFilter: ['class'] });
        new MutationObserver(sync).observe(menu, { attributes: true, attributeFilter: ['class'] });

        function closeAll() { sb.classList.remove('sidebar-open'); menu.classList.remove('open'); }

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            setTop();
            if (sb.classList.contains('sidebar-open')) { closeAll(); return; }
            menu.classList.toggle('open');
        });

        // "Chapters" -> show the Table of Contents
        document.getElementById('navMenuChapters').addEventListener('click', function (e) {
            e.stopPropagation();
            setTop();
            menu.classList.remove('open');
            sb.classList.add('sidebar-open');
        });
        // Home / Feedback links close the menu
        menu.addEventListener('click', function (e) {
            if (e.target.closest && e.target.closest('a')) menu.classList.remove('open');
        });

        bd.addEventListener('click', closeAll);
        sb.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) closeAll(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
        window.addEventListener('resize', function () { if (window.innerWidth > 992) closeAll(); });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();

/* =====================================================================
   PHOTO CAROUSEL  (<div class="photo-carousel"> ... </div>)
   - small dots below the photo (active dot = photo being shown)
   - click a dot / swipe / drag / keyboard arrows to change the photo
   - CLICK ON THE PHOTO -> opens it big (lightbox) and you can still go
     through all the photos there (arrows, dots, swipe, keyboard); Esc / X closes
   Works for any number of photos and any number of carousels.
   ===================================================================== */
(function () {
    /* ---------- lightbox (one shared popup for all carousels) ---------- */
    var lb = null;
    function buildLightbox() {
        if (lb) return lb;
        var el = document.createElement('div');
        el.className = 'pc-lightbox';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-modal', 'true');
        el.setAttribute('aria-label', 'Photo viewer');
        el.innerHTML =
            '<button type="button" class="pcl-close" aria-label="Close"><i class="fas fa-times"></i></button>' +
            '<button type="button" class="pcl-arrow pcl-prev" aria-label="Previous photo"><i class="fas fa-chevron-left"></i></button>' +
            '<div class="pcl-stage"><img class="pcl-img" alt=""><div class="pcl-missing"></div></div>' +
            '<button type="button" class="pcl-arrow pcl-next" aria-label="Next photo"><i class="fas fa-chevron-right"></i></button>' +
            '<div class="pcl-dots"></div>';
        document.body.appendChild(el);

        lb = {
            el: el,
            img: el.querySelector('.pcl-img'),
            miss: el.querySelector('.pcl-missing'),
            dotsBox: el.querySelector('.pcl-dots'),
            prev: el.querySelector('.pcl-prev'),
            next: el.querySelector('.pcl-next'),
            close: el.querySelector('.pcl-close'),
            items: [], i: 0, onClose: null, lastFocus: null
        };

        lb.img.addEventListener('error', function () { lb.miss.textContent = 'Photo not found: ' + lb.img.getAttribute('src'); lb.el.classList.add('is-missing'); });
        lb.img.addEventListener('load',  function () { lb.el.classList.remove('is-missing'); });

        lb.show = function (k) {
            var n = lb.items.length;
            lb.i = (k + n) % n;
            lb.el.classList.remove('is-missing');
            lb.img.setAttribute('src', lb.items[lb.i].src);
            lb.img.setAttribute('alt', lb.items[lb.i].alt || '');
            var ds = lb.dotsBox.children;
            for (var j = 0; j < ds.length; j++) ds[j].classList.toggle('active', j === lb.i);
        };
        lb.open = function (items, start, onClose) {
            lb.items = items; lb.onClose = onClose || null;
            lb.lastFocus = document.activeElement;
            lb.dotsBox.innerHTML = '';
            items.forEach(function (it, k) {
                var d = document.createElement('button');
                d.type = 'button'; d.className = 'pcl-dot';
                d.setAttribute('aria-label', 'Show photo ' + (k + 1) + ' of ' + items.length);
                d.addEventListener('click', function (e) { e.stopPropagation(); lb.show(k); });
                lb.dotsBox.appendChild(d);
            });
            var single = items.length < 2;
            lb.prev.style.display = lb.next.style.display = lb.dotsBox.style.display = single ? 'none' : '';
            lb.show(start);
            lb.el.classList.add('open');
            document.body.style.overflow = 'hidden';
            lb.close.focus();
        };
        lb.hide = function () {
            if (!lb.el.classList.contains('open')) return;
            lb.el.classList.remove('open');
            document.body.style.overflow = '';
            var cb = lb.onClose; lb.onClose = null;
            if (cb) cb(lb.i);
            if (lb.lastFocus && lb.lastFocus.focus) { try { lb.lastFocus.focus({ preventScroll: true }); } catch (e) {} }
        };

        lb.prev.addEventListener('click', function (e) { e.stopPropagation(); lb.show(lb.i - 1); });
        lb.next.addEventListener('click', function (e) { e.stopPropagation(); lb.show(lb.i + 1); });
        lb.close.addEventListener('click', function (e) { e.stopPropagation(); lb.hide(); });
        // click on the dark background (not on the photo / buttons) closes
        el.addEventListener('click', function (e) { if (e.target === el || e.target.classList.contains('pcl-stage')) lb.hide(); });

        document.addEventListener('keydown', function (e) {
            if (!lb.el.classList.contains('open')) return;
            if (e.key === 'Escape')     { lb.hide(); }
            if (e.key === 'ArrowLeft')  { lb.show(lb.i - 1); e.preventDefault(); }
            if (e.key === 'ArrowRight') { lb.show(lb.i + 1); e.preventDefault(); }
        });

        // swipe inside the lightbox
        var x0 = null, y0 = null;
        el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
        el.addEventListener('touchend', function (e) {
            if (x0 === null) return;
            var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) lb.show(dx < 0 ? lb.i + 1 : lb.i - 1);
            x0 = y0 = null;
        }, { passive: true });

        return lb;
    }

    /* ---------- one carousel ---------- */
    function initCarousel(root) {
        var track  = root.querySelector('.pc-track');
        var slides = root.querySelectorAll('.pc-slide');
        var view   = root.querySelector('.pc-viewport');
        if (!track || !slides.length || !view) return;
        var i = 0, n = slides.length, suppressClick = false;

        // arrows / download button are not used any more - remove them if they are still in the HTML
        root.querySelectorAll('.pc-arrow, .pc-download').forEach(function (b) { b.parentNode.removeChild(b); });

        // if a photo file is not found, show which file name is missing
        slides.forEach(function (s) {
            var img = s.querySelector('img');
            if (!img) return;
            img.addEventListener('error', function () { s.classList.add('missing'); s.setAttribute('data-missing', img.getAttribute('src')); });
        });

        // dots
        var dotsBox = root.querySelector('.pc-dots');
        if (!dotsBox) { dotsBox = document.createElement('div'); dotsBox.className = 'pc-dots'; root.appendChild(dotsBox); }
        dotsBox.innerHTML = '';
        var dots = [];
        for (var k = 0; k < n; k++) {
            (function (k) {
                var d = document.createElement('button');
                d.type = 'button';
                d.className = 'pc-dot';
                d.setAttribute('aria-label', 'Show photo ' + (k + 1) + ' of ' + n);
                d.addEventListener('click', function () { go(k); });
                dotsBox.appendChild(d);
                dots.push(d);
            })(k);
        }
        if (n < 2) dotsBox.style.display = 'none';

        function go(k) {
            i = (k + n) % n;                                   // loops: after the last photo -> first
            track.style.transform = 'translateX(' + (-100 * i) + '%)';
            dots.forEach(function (d, j) {
                d.classList.toggle('active', j === i);
                if (j === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
            });
        }
        go(0);

        // swipe (phones / tablets)
        var x0 = null, y0 = null;
        view.addEventListener('touchstart', function (e) { suppressClick = false; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
        view.addEventListener('touchend', function (e) {
            if (x0 === null) return;
            var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { suppressClick = true; go(dx < 0 ? i + 1 : i - 1); }
            x0 = y0 = null;
        }, { passive: true });

        // mouse drag (desktop)
        var mx = null;
        view.addEventListener('mousedown', function (e) { suppressClick = false; mx = e.clientX; });
        window.addEventListener('mouseup', function (e) {
            if (mx === null) return;
            var dx = e.clientX - mx; mx = null;
            if (Math.abs(dx) > 50) { suppressClick = true; go(dx < 0 ? i + 1 : i - 1); }
            else if (Math.abs(dx) > 6) { suppressClick = true; }
        });
        view.addEventListener('dragstart', function (e) { e.preventDefault(); });

        // CLICK on the photo -> open big, in carousel format
        view.addEventListener('click', function () {
            if (suppressClick) { suppressClick = false; return; }
            // phone / tablet view (touch or narrow screen): tapping the photo does NOT open the big view
            if (window.matchMedia('(max-width: 768px), (pointer: coarse)').matches) return;
            var items = [];
            slides.forEach(function (s) {
                var img = s.querySelector('img');
                items.push({ src: img ? img.getAttribute('src') : '', alt: img ? img.getAttribute('alt') : '' });
            });
            buildLightbox().open(items, i, function (last) { go(last); });   // when closed, the small carousel shows the same photo
        });
        view.setAttribute('title', 'Click to enlarge');

        // keyboard arrows while the carousel has focus
        root.setAttribute('tabindex', '0');
        root.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft')  { go(i - 1); e.preventDefault(); }
            if (e.key === 'ArrowRight') { go(i + 1); e.preventDefault(); }
            if (e.key === 'Enter' && e.target === root) { view.click(); }
        });
    }

    function initAll() { document.querySelectorAll('.photo-carousel').forEach(initCarousel); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
    else initAll();
})();