


(function($) {
    "use strict"

    // Fetch new products dynamically
    function fetchNewProducts() {
        fetch("http://localhost:5148/api/products?limit=5&sort=desc")
            .then(response => response.json())
            .then(products => {
                const newProductsList = document.getElementById('new-products-list');
                newProductsList.innerHTML = ''; // Clear any existing content

                products.forEach(product => {
                    const imageUrl = `http://localhost:5148${product.image}`;
                    const productElement = `
                        <div class="product">
                            <div class="product-img">
                                <img src="${imageUrl}" alt="${product.name}">
                                <div class="product-label">
                                    ${product.isOnSale ? '<span class="sale">-30%</span>' : ''}
                                    ${product.isNew ? '<span class="new">NEW</span>' : ''}
                                </div>
                            </div>
                            <div class="product-body">
                            
                                <h3 class="product-name"><a href="#">${product.name}</a></h3>
                                <h4 class="product-price">${product.price.toFixed(2)} JD
                                    ${product.oldPrice ? `<del class="product-old-price">$${product.oldPrice.toFixed(2)}</del>` : ''}
                                </h4>
                                <div class="product-rating">
                                    ${generateRating(product.rating)}
                                </div>
                                <div class="product-btns">
                                    <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                                    <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                                    <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                                </div>
                            </div>
                            <div class="add-to-cart">
                                <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                            </div>
                        </div>
                    `;
                    newProductsList.innerHTML += productElement;
                });

                // Initialize Slick after products are added
                initializeSlick('.products-slick');
            })
            .catch(error => console.error('Error fetching new products:', error));
    }

   

    // Helper function to generate product rating stars
    function generateRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? '<i class="fa fa-star"></i>' : '<i class="fa fa-star-o"></i>';
        }
        return stars;
    }

    // Initialize slick for dynamic products
    function initializeSlick(selector) {
        $(selector).each(function() {
            var $this = $(this),
                $nav = $this.attr('data-nav');

            $this.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                infinite: true,
                speed: 900,
                dots: false,
                arrows: true,
                appendArrows: $nav ? $nav : false,
                responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                ]
            });
        });
    }

    // Document ready
    $(document).ready(function() {
        fetchNewProducts();
        fetchTopSellingProducts();
    });

})(jQuery);



    document.addEventListener('DOMContentLoaded', function() {
    const accountBtn = document.getElementById('accountBtn');
    const accountText = document.getElementById('accountText');
    const logoutBtn = document.getElementById('logoutBtn');
    const username = localStorage.getItem('username');

    if (username) {
        // If logged in, update account text and link
        accountText.textContent = username;
        accountBtn.href = '/product detail/account.html';
        // Display Logout Button
        logoutBtn.style.display = 'inline-block'; // Make sure the logout button is visible
        logoutBtn.querySelector('a').addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('username'); // Remove username from localStorage
            window.location.href = 'home.html'; // Redirect to login page
        });
    } else {
        // If not logged in, redirect to login page on account button click
        accountBtn.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'login&register.html';
        });
    }
});
// Function to update cart count
function updateCartCount() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    fetch(`http://localhost:5148/api/Cart/GetCartItemCount/${userId}`)
    .then(response => response.json())
    .then(count => {
        const cartCountElement = document.querySelector('.cart-icon .qty');
        if (cartCountElement) {
            cartCountElement.textContent = count;  // Update the displayed count
        }
    })
    .catch(error => console.error('Error fetching cart count:', error));
}

// Initial call to set the cart count when the page loads
document.addEventListener('DOMContentLoaded', updateCartCount);
    
    



    
         // This function fetches categories and displays them on the homepage
    // Fetch categories and display them on the homepage
fetch("http://localhost:5148/api/Categories")
.then(response => response.json())
.then(categories => {
    const categoryCards = document.getElementById("categoryCards");
    categories.forEach(category => {
        const imageUrl = `http://localhost:5148${category.image}`;
        categoryCards.innerHTML += `
            <div class="col-md-3 col-sm-6 mb-4">
                <a href="products.html" class="category-item" onclick="storeCategoryId(${category.categoryId})">
                    <img src="${imageUrl}" alt="${category.name}" class="img-fluid rounded">
                    <p>${category.name}</p>
                </a>
            </div>
        `;
    });
})
.catch(error => console.error("Error fetching categories:", error));

// Function to store the category ID in local storage
function storeCategoryId(categoryId) {
localStorage.setItem('selectedCategoryId', categoryId);
}
