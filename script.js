/* ==========================================================================
   Tirumala Garden Restaurant - Premium Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navigation & Scroll Active Links ---
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header Effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when nav links are clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- 3. Scroll Reveal Animations (Intersection Observer) ---
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target); // Animates once
                }
            });
        }, observerOptions);

        scrollAnimateElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        scrollAnimateElements.forEach(el => el.classList.add('animated'));
    }

    // --- 4. Service Tabs Logic ---
    const serviceTabs = document.querySelectorAll('.service-tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanelId = tab.getAttribute('data-target');

            // Deactivate all tabs and panels
            serviceTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(p => p.classList.remove('active'));

            // Activate chosen tab and panel
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            document.getElementById(targetPanelId).classList.add('active');
        });
    });

    // --- 5. Menu Filter Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Animate showing/hiding
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else if (filterValue === 'veg' && category === 'veg') {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else if (filterValue === 'non-veg' && category === 'non-veg') {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else if (filterValue === 'tandoori' && category === 'tandoori') {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // --- 6. Dialog Modals Controller ---
    const bookingModal = document.getElementById('booking-modal');
    const cartDrawer = document.getElementById('cart-drawer');
    const successDialog = document.getElementById('success-dialog');

    const bookTriggers = document.querySelectorAll('.btn-book-trigger');
    const cartTriggers = document.querySelectorAll('.btn-cart-trigger');
    
    const modalCloseButtons = document.querySelectorAll('.modal-close, .drawer-close');
    const alertCloseBtn = document.getElementById('alert-close-btn');

    // Helper to open modal
    const openModal = (modal) => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    // Helper to close modal
    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Release background scroll
    };

    // Event Triggers for Booking Modal
    bookTriggers.forEach(btn => {
        btn.addEventListener('click', () => openModal(bookingModal));
    });

    // Event Triggers for Cart Drawer
    cartTriggers.forEach(btn => {
        btn.addEventListener('click', () => openModal(cartDrawer));
    });

    // Close buttons logic
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal-overlay'));
        });
    });

    // Close modals by clicking backdrop
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target);
        }
    });

    if (alertCloseBtn) {
        alertCloseBtn.addEventListener('click', () => {
            successDialog.classList.remove('active');
        });
    }

    // Set Default Booking Date (Today)
    const bookingDateInput = document.getElementById('book-date');
    if (bookingDateInput) {
        const today = new Date().toISOString().split('T')[0];
        bookingDateInput.value = today;
        bookingDateInput.min = today;
    }

    // Form Submission: Book a Table
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('book-name').value;
            const phone = document.getElementById('book-phone').value;
            const guests = document.getElementById('book-guests').value;
            const date = document.getElementById('book-date').value;
            const time = document.getElementById('book-time').value;
            const seating = document.getElementById('book-seating').value;

            // Close Booking Modal
            closeModal(bookingModal);
            
            // Format time display
            const formattedSeating = seating === 'garden' ? 'Open-Air Garden' : seating === 'ac' ? 'AC Seating' : 'Private Family Cubicle';
            
            // Populate Success dialog and display
            document.getElementById('alert-title').innerHTML = `<i class="fa-solid fa-circle-check gold-text"></i> Table Confirmed!`;
            document.getElementById('alert-message').innerHTML = `
                Thank you, <strong>${name}</strong>!<br> 
                We have reserved a table for <strong>${guests} guests</strong> on <strong>${date}</strong> at <strong>${time}</strong> in the <strong>${formattedSeating}</strong> section.<br><br>
                A confirmation SMS was sent to <strong>${phone}</strong>.
            `;
            
            successDialog.classList.add('active');
            bookingForm.reset();
            if (bookingDateInput) bookingDateInput.value = today;
        });
    }


    // --- 7. Interactive Cart / Online Ordering Logic ---
    let cart = [];
    const cartBadge = document.getElementById('cart-badge-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalText = document.getElementById('cart-subtotal');
    const gstText = document.getElementById('cart-gst');
    const totalText = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Mobile floating bar components
    const mobileFloatingBar = document.getElementById('mobile-floating-bar');
    const mobileCartCount = document.getElementById('mobile-cart-count');
    const mobileCartTotal = document.getElementById('mobile-cart-total');

    // Add item to cart
    const addToCart = (id, name, price) => {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ id, name, price: parseFloat(price), qty: 1 });
        }
        
        updateCartUI();
    };

    // Remove or decrement item from cart
    const decrementCartItem = (id) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.qty -= 1;
            if (item.qty <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
        }
        updateCartUI();
    };

    // Increment item from cart inside drawer
    const incrementCartItem = (id) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.qty += 1;
        }
        updateCartUI();
    };

    // Update entire Cart UI (drawer, mobile bar, counts)
    const updateCartUI = () => {
        // Calculate Totals
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const gst = subtotal * 0.05; // 5% GST
        const total = subtotal + gst;

        // Update Badge Count
        if (cartBadge) {
            cartBadge.innerText = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }

        // Render Cart Items
        if (cartItemsContainer) {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="cart-empty-state">
                        <i class="fa-solid fa-utensils"></i>
                        <p>Your cart is empty.</p>
                        <p class="sub">Add delicious specialties from our menu!</p>
                    </div>
                `;
                if (checkoutBtn) {
                    checkoutBtn.disabled = true;
                    checkoutBtn.innerText = "Proceed to Mock Checkout";
                }
            } else {
                let html = '';
                cart.forEach(item => {
                    html += `
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <span>₹${item.price} x ${item.qty}</span>
                            </div>
                            <div class="cart-item-actions">
                                <button class="qty-btn dec-qty" data-id="${item.id}"><i class="fa-solid fa-minus"></i></button>
                                <span>${item.qty}</span>
                                <button class="qty-btn inc-qty" data-id="${item.id}"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                    `;
                });
                cartItemsContainer.innerHTML = html;
                
                if (checkoutBtn) {
                    checkoutBtn.disabled = false;
                    checkoutBtn.innerText = `Checkout (₹${Math.round(total)})`;
                }

                // Add drawer button click listeners
                document.querySelectorAll('.dec-qty').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const itemId = parseInt(e.target.closest('.qty-btn').getAttribute('data-id'));
                        decrementCartItem(itemId);
                    });
                });

                document.querySelectorAll('.inc-qty').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const itemId = parseInt(e.target.closest('.qty-btn').getAttribute('data-id'));
                        incrementCartItem(itemId);
                    });
                });
            }
        }

        // Update Prices
        if (subtotalText) subtotalText.innerText = `₹${Math.round(subtotal)}`;
        if (gstText) gstText.innerText = `₹${Math.round(gst)}`;
        if (totalText) totalText.innerText = `₹${Math.round(total)}`;

        // Update Mobile Floating Bar
        if (mobileFloatingBar) {
            if (totalItems > 0) {
                mobileFloatingBar.classList.add('active');
                if (mobileCartCount) mobileCartCount.innerText = `${totalItems} Item${totalItems > 1 ? 's' : ''}`;
                if (mobileCartTotal) mobileCartTotal.innerText = `₹${Math.round(total)}`;
            } else {
                mobileFloatingBar.classList.remove('active');
            }
        }
    };

    // Attach click listeners to "Add" menu buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-cart-btn');
            const id = parseInt(btn.getAttribute('data-id'));
            const name = btn.getAttribute('data-name');
            const price = btn.getAttribute('data-price');
            
            addToCart(id, name, price);

            // Click micro-animation effect
            btn.innerHTML = `<i class="fa-solid fa-check"></i> Added`;
            btn.style.backgroundColor = 'var(--color-accent)';
            btn.style.color = 'var(--text-dark)';
            
            setTimeout(() => {
                btn.innerHTML = `<i class="fa-solid fa-plus"></i> Add`;
                btn.style.backgroundColor = 'rgba(243, 163, 0, 0.15)';
                btn.style.color = 'var(--color-accent)';
            }, 1000);
        });
    });

    // Mock Checkout Trigger
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const orderMode = document.getElementById('order-mode').value;
            let modeText = "Home Delivery";
            if (orderMode === 'takeout') modeText = "Self-Takeout";
            if (orderMode === 'drive-thru') modeText = "Drive-Through Pickup";
            
            // Close Cart Drawer
            closeModal(cartDrawer);

            // Show confirmation dialog
            document.getElementById('alert-title').innerHTML = `<i class="fa-solid fa-bag-shopping gold-text"></i> Order Placed!`;
            document.getElementById('alert-message').innerHTML = `
                Your mock order has been sent successfully.<br>
                Mode: <strong>${modeText}</strong><br>
                Total: <strong>${totalText.innerText} (incl. GST)</strong><br><br>
                <em>This is a visual checkout demonstration. Our staff will begin preparing the food immediately on actual deployment.</em>
            `;

            // Reset cart
            cart = [];
            updateCartUI();
            
            successDialog.classList.add('active');
        });
    }


    // --- 8. Leaflet Interactive Map Initialization ---
    // Coordinates for Nellore Rd, Pamuru: [15.0934, 79.4068]
    const pamuruCoords = [15.0934, 79.4068];
    
    try {
        const map = L.map('restaurant-map', {
            center: pamuruCoords,
            zoom: 15,
            scrollWheelZoom: false // Prevent zoom issues while scrolling page
        });

        // Use custom dark map tiles to fit the premium aesthetic
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Custom Leaflet icon styling
        const restaurantIcon = L.divIcon({
            html: `<div style="
                background-color: var(--color-accent);
                color: var(--text-dark);
                width: 38px;
                height: 38px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid var(--text-light);
                box-shadow: 0 0 15px var(--color-accent);
                font-size: 1.1rem;
            "><i class="fa-solid fa-utensils"></i></div>`,
            className: 'custom-map-marker',
            iconSize: [38, 38],
            iconAnchor: [19, 19]
        });

        // Add Marker
        const marker = L.marker(pamuruCoords, { icon: restaurantIcon }).addTo(map);
        
        // Popup Details
        marker.bindPopup(`
            <div style="font-family: 'Outfit', sans-serif; text-align: left; padding: 5px;">
                <h3 style="margin: 0 0 6px 0; font-family: 'Playfair Display', serif; font-size: 1.15rem;">Tirumala Garden</h3>
                <p style="margin: 0 0 4px 0; font-size: 0.85rem; color: #b3beba;"><i class="fa-solid fa-location-dot accent-text"></i> Nellore Rd, Pamuru</p>
                <p style="margin: 0 0 8px 0; font-size: 0.85rem; color: #b3beba;"><i class="fa-solid fa-phone accent-text"></i> 08309646462</p>
                <a href="https://maps.google.com/?q=Tirumala+Garden+Restaurant+Pamuru" target="_blank" style="
                    display: inline-block; 
                    background: var(--color-accent); 
                    color: var(--text-dark); 
                    padding: 4px 10px; 
                    border-radius: 4px; 
                    font-size: 0.75rem; 
                    font-weight: 700;
                ">Get Directions</a>
            </div>
        `).openPopup();

    } catch (err) {
        console.error("Leaflet Map failed to load: ", err);
        // Fallback placeholder display
        const mapContainer = document.getElementById('restaurant-map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    background-color: var(--bg-panel-light);
                    color: var(--text-muted);
                    padding: 20px;
                    text-align: center;
                ">
                    <i class="fa-solid fa-map-location-dot" style="font-size: 3rem; color: var(--color-accent); margin-bottom: 15px;"></i>
                    <h3>Tirumala Garden Restaurant Map</h3>
                    <p>Nellore Rd, Pamuru, Andhra Pradesh 523108</p>
                    <a href="https://maps.google.com/?q=Tirumala+Garden+Restaurant+Pamuru" target="_blank" class="btn btn-primary" style="margin-top: 15px;">Open Google Maps</a>
                </div>
            `;
        }
    }
});
