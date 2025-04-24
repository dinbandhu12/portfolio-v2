/* filepath: c:\Users\a1b2d\Desktop\page-transition\pageTransitionTwo.js */
class PageTransitionTwo {
    constructor(options = {}) {
        this.gradient = options.gradient || '90deg, #ff6b6b, #6b6bff';
        this.init();
    }

    init() {
        // Create transition container if it doesn't exist
        if (!document.querySelector('.transition-container')) {
            const container = document.createElement('div');
            container.className = 'transition-container';
            container.id = 'transitionContainer';
            
            // Create 5 slices
            for (let i = 1; i <= 5; i++) {
                const slice = document.createElement('div');
                slice.className = `transition-slice slice-${i}`;
                if (this.gradient) {
                    slice.style.background = `linear-gradient(${this.gradient})`;
                }
                container.appendChild(slice);
            }
            
            document.body.appendChild(container);
        }
        
        this.setupEventListeners();
        this.checkTransitionState();
    }

    handlePageTransition(e) {
        e.preventDefault();
        const targetHref = e.currentTarget.getAttribute('href');
        const transitionSlices = document.querySelectorAll('.transition-slice');
        
        // Start the transition by expanding slices
        transitionSlices.forEach(slice => {
            slice.style.height = '20%';
        });
        
        sessionStorage.setItem('pageTransition', 'true');
        
        setTimeout(() => {
            window.location.href = targetHref;
        }, 800);
    }

    setupEventListeners() {
        document.querySelectorAll('[data-transition="true"]').forEach(link => {
            link.addEventListener('click', (e) => this.handlePageTransition(e));
        });
    }

    checkTransitionState() {
        if (sessionStorage.getItem('pageTransition') === 'true') {
            const transitionSlices = document.querySelectorAll('.transition-slice');
            
            transitionSlices.forEach(slice => {
                slice.style.height = '20%';
            });
            
            setTimeout(() => {
                transitionSlices.forEach(slice => {
                    slice.style.height = '0';
                });
                
                setTimeout(() => {
                    sessionStorage.removeItem('pageTransition');
                }, 800);
            }, 1000);
        }
    }
}