document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product-item');
    let currentIndex = 0;

    const updateDisplay = () => {
        products.forEach((product, index) => {
            product.classList.remove('active');
            if (index === currentIndex) {
                product.classList.add('active');
            }
        });
    };

    document.getElementById('next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % products.length;
        updateDisplay();
    });

    document.getElementById('prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        updateDisplay();
    });

    // Initialize the first product as active
    updateDisplay();
});
// Add this to your script.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to handle page transitions
    function handlePageTransition() {
        document.body.classList.add('page-transition-enter');

        // Remove the class after the transition ends
        setTimeout(() => {
            document.body.classList.remove('page-transition-enter');
            document.body.classList.add('page-transition-enter-active');
        }, 100); // Slight delay to trigger the transition

        // Add an event listener for when the page unloads
        window.addEventListener('beforeunload', function() {
            document.body.classList.remove('page-transition-enter-active');
            document.body.classList.add('page-transition-exit');
        });
    }

    // Add the page transition effect on page load
    handlePageTransition();
});
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');

    // Function to check if element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to add the 'visible' class to elements in the viewport
    function animateMenuItems() {
        menuItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }

    // Add event listeners for scroll and resize
    window.addEventListener('scroll', animateMenuItems);
    window.addEventListener('resize', animateMenuItems);

    // Run animation on page load
    animateMenuItems();
});

const canvas = document.getElementById('eyeglassCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Eyeglass {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.dy = 1;
        this.dx = 1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width, this.height, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.y + this.height >= canvas.height || this.y - this.height <= 0) {
            this.dy = -this.dy;
        }
        if (this.x + this.width >= canvas.width || this.x - this.width <= 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

const eyeglasses = [];

for (let i = 0; i < 5; i++) {
    const width = 100;
    const height = 50;
    const x = Math.random() * (canvas.width - 2 * width) + width;
    const y = Math.random() * (canvas.height - 2 * height) + height;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    eyeglasses.push(new Eyeglass(x, y, width, height, color));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    eyeglasses.forEach(eyeglass => eyeglass.update());
    requestAnimationFrame(animate);
}

animate();