/* ============================================
   RAN'S FITNESS CLUB - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ============================================
    // CONTACT FORM VALIDATION & SUBMISSION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const goal = document.getElementById('goal');
            
            // Basic validation
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                name.style.borderColor = '#e63946';
                isValid = false;
            } else {
                name.style.borderColor = '';
            }
            
            // Validate phone
            if (!phone.value.trim()) {
                phone.style.borderColor = '#e63946';
                isValid = false;
            } else if (!/^[0-9]{10}$/.test(phone.value.replace(/\s/g, ''))) {
                phone.style.borderColor = '#e63946';
                isValid = false;
            } else {
                phone.style.borderColor = '';
            }
            
            // Validate goal
            if (!goal.value) {
                goal.style.borderColor = '#e63946';
                isValid = false;
            } else {
                goal.style.borderColor = '';
            }
            
            // If valid, show success message
            if (isValid) {
                // Show success message
                if (formSuccess) {
                    formSuccess.classList.add('show');
                }
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    if (formSuccess) {
                        formSuccess.classList.remove('show');
                    }
                }, 5000);
                
                // Scroll to success message
                if (formSuccess) {
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        // Clear error styles on input
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================
    // ANIMATE STATS ON SCROLL
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const animateStats = function() {
            statNumbers.forEach(stat => {
                const rect = stat.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
                
                if (isVisible && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    
                    const finalValue = stat.textContent;
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                    const suffix = finalValue.replace(/[0-9]/g, '');
                    
                    if (!isNaN(numericValue)) {
                        let currentValue = 0;
                        const increment = numericValue / 50;
                        const duration = 1500;
                        const stepTime = duration / 50;
                        
                        const timer = setInterval(function() {
                            currentValue += increment;
                            if (currentValue >= numericValue) {
                                stat.textContent = finalValue;
                                clearInterval(timer);
                            } else {
                                stat.textContent = Math.floor(currentValue) + suffix;
                            }
                        }, stepTime);
                    }
                }
            });
        };
        
        // Run on load and scroll
        animateStats();
        window.addEventListener('scroll', animateStats);
    }
    
    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll('.service-card, .trainer-card, .pricing-card, .transformation-item, .testimonial-card');
    
    if (revealElements.length > 0) {
        const revealOnScroll = function() {
            revealElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - 100;
                
                if (isVisible) {
                    setTimeout(function() {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        };
        
        // Set initial state
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Run on load and scroll
        revealOnScroll();
        window.addEventListener('scroll', revealOnScroll);
    }
    
    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ============================================
    // WHATSAPP BUTTON TRACKING (Optional)
    // ============================================
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('WhatsApp button clicked');
        });
    });

    // ============================================
    // AUTHENTICATION STATE MANAGEMENT
    // ============================================
    function updateAuthUI() {
        const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
        const authNavItems = document.querySelectorAll('.nav-auth');
        
        authNavItems.forEach(navItem => {
            if (user) {
                // User is logged in - show profile dropdown
                navItem.innerHTML = `
                    <div class="user-nav-profile" style="position: relative;">
                        <button class="user-nav-btn" style="display: flex; align-items: center; gap: 8px; background: var(--dark-gray); border: 1px solid var(--medium-gray); border-radius: 25px; padding: 8px 15px; color: var(--pure-white); cursor: pointer; transition: var(--transition);">
                            <div style="width: 30px; height: 30px; background: var(--gradient-red); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.85rem;">${(user.name || 'U').charAt(0).toUpperCase()}</div>
                            <span style="font-size: 0.9rem;">${user.name || 'User'}</span>
                            <i class="fas fa-chevron-down" style="font-size: 0.75rem;"></i>
                        </button>
                        <div class="user-dropdown" style="position: absolute; top: 100%; right: 0; margin-top: 10px; background: var(--dark-gray); border: 1px solid var(--medium-gray); border-radius: 10px; padding: 10px 0; min-width: 180px; display: none; box-shadow: var(--shadow-dark); z-index: 1000;">
                            ${user.role === 'admin' ? `<a href="admin.html" style="display: flex; align-items: center; gap: 10px; padding: 10px 20px; color: var(--pure-white); transition: var(--transition);"><i class="fas fa-tachometer-alt" style="color: var(--primary-red); width: 20px;"></i> Admin Dashboard</a>` : ''}
                            <a href="profile.html" style="display: flex; align-items: center; gap: 10px; padding: 10px 20px; color: var(--pure-white); transition: var(--transition);"><i class="fas fa-user" style="color: var(--primary-red); width: 20px;"></i> My Profile</a>
                            <a href="programs.html" style="display: flex; align-items: center; gap: 10px; padding: 10px 20px; color: var(--pure-white); transition: var(--transition);"><i class="fas fa-dumbbell" style="color: var(--primary-red); width: 20px;"></i> My Programs</a>
                            <div style="border-top: 1px solid var(--medium-gray); margin: 10px 0;"></div>
                            <button id="navLogoutBtn" style="display: flex; align-items: center; gap: 10px; padding: 10px 20px; color: var(--primary-red); background: none; border: none; cursor: pointer; width: 100%; text-align: left; font-size: 1rem;"><i class="fas fa-sign-out-alt" style="width: 20px;"></i> Logout</button>
                        </div>
                    </div>
                `;
                
                // Add dropdown toggle functionality
                const userNavBtn = navItem.querySelector('.user-nav-btn');
                const userDropdown = navItem.querySelector('.user-dropdown');
                
                userNavBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function() {
                    userDropdown.style.display = 'none';
                });
                
                // Logout functionality
                const navLogoutBtn = document.getElementById('navLogoutBtn');
                if (navLogoutBtn) {
                    navLogoutBtn.addEventListener('click', function() {
                        if (confirm('Are you sure you want to logout?')) {
                            localStorage.removeItem('user');
                            sessionStorage.removeItem('user');
                            window.location.reload();
                        }
                    });
                }
            }
        });
    }
    
    // Initialize auth UI
    updateAuthUI();
    
});

// ============================================
// AUTHENTICATION HELPER FUNCTIONS
// ============================================

// Check if user is logged in
function isLoggedIn() {
    return !!(localStorage.getItem('user') || sessionStorage.getItem('user'));
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
}

// Check if user is admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Logout user
function logout() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Protect route - redirect to login if not authenticated
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Protect admin route - redirect to login if not admin
function requireAdmin() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    if (!isAdmin()) {
        window.location.href = 'profile.html';
        return false;
    }
    return true;
}

// ============================================
// USER MANAGEMENT FUNCTIONS (for Admin)
// ============================================

// Get all users
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

// Get user by ID
function getUserById(id) {
    const users = getAllUsers();
    return users.find(u => u.id === id);
}

// Get user by username
function getUserByUsername(username) {
    const users = getAllUsers();
    return users.find(u => u.username === username);
}

// Add new user (admin function)
function addUser(userData) {
    const users = getAllUsers();
    
    // Check if username exists
    if (users.find(u => u.username === userData.username)) {
        return { success: false, message: 'Username already exists' };
    }
    
    // Check if email exists
    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'Email already exists' };
    }
    
    const newUser = {
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, user: newUser };
}

// Update user
function updateUser(id, updates) {
    const users = getAllUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
        return { success: false, message: 'User not found' };
    }
    
    users[index] = { ...users[index], ...updates };
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, user: users[index] };
}

// Delete user
function deleteUser(id) {
    const users = getAllUsers();
    const filteredUsers = users.filter(u => u.id !== id);
    
    if (filteredUsers.length === users.length) {
        return { success: false, message: 'User not found' };
    }
    
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    
    // Also remove from pending users if exists
    const pendingUsers = JSON.parse(localStorage.getItem('pendingUsers') || '[]');
    const filteredPending = pendingUsers.filter(u => u.id !== id);
    localStorage.setItem('pendingUsers', JSON.stringify(filteredPending));
    
    return { success: true };
}

// Approve user
function approveUser(id) {
    const users = getAllUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
        return { success: false, message: 'User not found' };
    }
    
    users[index].status = 'active';
    localStorage.setItem('users', JSON.stringify(users));
    
    // Remove from pending
    const pendingUsers = JSON.parse(localStorage.getItem('pendingUsers') || '[]');
    const filteredPending = pendingUsers.filter(u => u.id !== id);
    localStorage.setItem('pendingUsers', JSON.stringify(filteredPending));
    
    return { success: true, user: users[index] };
}

// Reject user
function rejectUser(id) {
    // Remove from users
    const users = getAllUsers();
    const filteredUsers = users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    
    // Remove from pending
    const pendingUsers = JSON.parse(localStorage.getItem('pendingUsers') || '[]');
    const filteredPending = pendingUsers.filter(u => u.id !== id);
    localStorage.setItem('pendingUsers', JSON.stringify(filteredPending));
    
    return { success: true };
}

// Change user password
function changeUserPassword(id, newPassword) {
    const users = getAllUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
        return { success: false, message: 'User not found' };
    }
    
    users[index].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true };
}

// Change user role
function changeUserRole(id, newRole) {
    const users = getAllUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
        return { success: false, message: 'User not found' };
    }
    
    users[index].role = newRole;
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, user: users[index] };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Generate avatar initials
function getInitials(name) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}
