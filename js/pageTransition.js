class PageTransition {
    constructor() {
        this.transitionContainer = document.getElementById('transitionContainer');
        if (!this.transitionContainer) {
            this.transitionContainer = document.createElement('div');
            this.transitionContainer.className = 'transition-container';
            this.transitionContainer.id = 'transitionContainer';
            document.body.appendChild(this.transitionContainer);
        }
        this.init();
    }

    init() {
        this.createSquareGrid();
        this.setupEventListeners();
        
        // Add resize listener to recreate grid when screen size changes
        window.addEventListener('resize', () => {
            this.createSquareGrid();
        });
    }

    createSquareGrid() {
        const container = this.transitionContainer;
        
        // Determine grid size based on screen width
        let rows, cols;
        if (window.innerWidth >= 768) {
            rows = 6;
            cols = 6;
        } else if (window.innerWidth >= 480) {
            rows = 7;
            cols = 5;
        } else {
            rows = 7;
            cols = 4;
        }
        
        container.innerHTML = '';
        
        for (let i = 0; i < rows * cols; i++) {
            const square = document.createElement('div');
            square.className = 'transition-square';
            
            const row = Math.floor(i / cols);
            const col = i % cols;
            
            const centerRow = Math.floor(rows / 2);
            const centerCol = Math.floor(cols / 2);
            const distance = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2));
            
            // Adjust delay for different grid sizes
            const delayMultiplier = window.innerWidth < 480 ? 0.04 : 0.03;
            square.style.transitionDelay = `${delayMultiplier * distance}s`;
            
            container.appendChild(square);
        }
    }

    setupEventListeners() {
        const links = document.querySelectorAll('a[data-transition="true"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.startTransition(e.currentTarget.getAttribute('href'));
            });
        });
    }

    startTransition(href) {
        const squares = document.querySelectorAll('.transition-square');
        
        // Add active class to container
        this.transitionContainer.classList.add('active');
        
        // Animate squares
        squares.forEach(square => {
            setTimeout(() => {
                square.classList.add('active');
            }, 50); // Small delay to ensure container is visible
        });
        
        // After animation, navigate to new page
        setTimeout(() => {
            window.location.href = href;
        }, 1500); // Match this with your animation duration
    }

    cleanup() {
        const squares = document.querySelectorAll('.transition-square');
        
        squares.forEach(square => {
            square.classList.remove('active');
        });
        
        setTimeout(() => {
            this.transitionContainer.classList.remove('active');
        }, 500);
    }
}

// Note: PageTransition is initialized manually in each HTML file
// This prevents double initialization