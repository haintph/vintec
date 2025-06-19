/**
 * Product Catalog JavaScript - Backend Filtering
 * Version: 2.0.0 - VND Currency Support
 * Features: Backend filtering via AJAX, View Toggle, Mobile Support, VND Price Range (0-20M)
 */

const ProductCatalog = {
    // Configuration
    config: {
        selectors: {
            wrapper: '.product-catalog',
            productsGrid: '#productsGrid',
            productCard: '.pc-product-card',
            viewButtons: '.pc-view-btn',
            sortSelect: '#sortSelect',
            filterCheckboxes: '.pc-filter-checkbox',
            priceSliders: '.pc-slider',
            mobileFilterOverlay: '#mobileFilterOverlay',
            mobileFilterBtn: '.pc-btn-filter',
            sidebar: '.pc-sidebar',
            searchInput: '.pc-search-input',
            clearAllBtn: '.pc-btn-clear-all',
            productsSection: '.pc-products-section',
            productsCount: '.pc-products-count'
        },
        classes: {
            active: 'active',
            listView: 'list-view',
            fadeIn: 'pc-fade-in',
            loading: 'loading'
        },
        urls: {
            products: window.location.pathname, // Current products page
            search: window.location.pathname + '/search' // If you want separate search endpoint
        },
        // Price configuration for VND
        price: {
            min: 0,
            max: 20000000, // 20 triệu VND
            step: 100000,   // Bước nhảy 100k VND
            currency: '₫',
            locale: 'vi-VN'
        }
    },

    // State management
    state: {
        currentView: 'grid',
        currentFilters: {
            category: '',
            price_range: '',
            search: '',
            sort: 'name_asc',
            min_price: '',
            max_price: ''
        },
        isLoading: false,
        currentPage: 1
    },

    // Price formatting utilities
    priceUtils: {
        // Format number to VND currency
        formatVND(amount) {
            if (!amount && amount !== 0) return '';
            
            // Convert to number if string
            const num = typeof amount === 'string' ? parseInt(amount) : amount;
            
            if (num >= 1000000) {
                // Display as "X triệu" for millions
                const millions = num / 1000000;
                if (millions % 1 === 0) {
                    return `${millions} triệu₫`;
                } else {
                    return `${millions.toFixed(1)} triệu₫`;
                }
            } else if (num >= 1000) {
                // Display as "X nghìn" for thousands
                const thousands = num / 1000;
                if (thousands % 1 === 0) {
                    return `${thousands} nghìn₫`;
                } else {
                    return `${thousands.toFixed(0)} nghìn₫`;
                }
            } else {
                return `${num.toLocaleString('vi-VN')}₫`;
            }
        },

        // Format for display in slider
        formatSliderDisplay(amount) {
            if (!amount && amount !== 0) return '0₫';
            
            const num = typeof amount === 'string' ? parseInt(amount) : amount;
            
            if (num >= 1000000) {
                const millions = num / 1000000;
                return `${millions % 1 === 0 ? millions : millions.toFixed(1)}tr₫`;
            } else if (num >= 1000) {
                const thousands = num / 1000;
                return `${thousands % 1 === 0 ? thousands : thousands.toFixed(0)}k₫`;
            } else if (num === 0) {
                return '0₫';
            } else {
                return `${num.toLocaleString('vi-VN')}₫`;
            }
        },

        // Parse VND string back to number
        parseVND(vndString) {
            if (!vndString) return 0;
            
            // Remove currency symbols and convert Vietnamese text
            let cleanString = vndString.toString()
                .replace(/₫|VND|đ/gi, '')
                .replace(/triệu|tr/gi, '000000')
                .replace(/nghìn|k/gi, '000')
                .replace(/[,.\s]/g, '');
            
            return parseInt(cleanString) || 0;
        }
    },

    // Initialize
    init() {
        console.log('🚀 Initializing Product Catalog (VND Mode)...');
        this.cacheElements();
        this.bindEvents();
        this.initPriceSliders();
        this.initCurrentFilters();
        this.setupMobileFilters();
        console.log('✅ Product Catalog initialized successfully');
    },

    // Cache DOM elements
    cacheElements() {
        this.elements = {};
        Object.keys(this.config.selectors).forEach(key => {
            this.elements[key] = document.querySelector(this.config.selectors[key]);
        });
        
        // Cache multiple elements
        this.elements.allFilterCheckboxes = document.querySelectorAll(this.config.selectors.filterCheckboxes);
        this.elements.allViewButtons = document.querySelectorAll(this.config.selectors.viewButtons);
        this.elements.allProductCards = document.querySelectorAll(this.config.selectors.productCard);
    },

    // Initialize current filters from URL params
    initCurrentFilters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Set filters from URL
        this.state.currentFilters.category = urlParams.get('category') || '';
        this.state.currentFilters.price_range = urlParams.get('price_range') || '';
        this.state.currentFilters.search = urlParams.get('search') || '';
        this.state.currentFilters.sort = urlParams.get('sort') || 'name_asc';
        this.state.currentFilters.min_price = urlParams.get('min_price') || '';
        this.state.currentFilters.max_price = urlParams.get('max_price') || '';

        // Update UI to reflect current filters
        this.updateUIFromState();
    },

    // Update UI elements based on current state
    updateUIFromState() {
        // Update sort select
        if (this.elements.sortSelect) {
            this.elements.sortSelect.value = this.state.currentFilters.sort;
        }

        // Update filter checkboxes
        this.elements.allFilterCheckboxes.forEach(checkbox => {
            const filterType = checkbox.dataset.filter;
            const filterValue = checkbox.dataset.value;
            
            if (filterType === 'category') {
                checkbox.checked = this.state.currentFilters.category === filterValue;
            } else if (filterType === 'price') {
                checkbox.checked = this.state.currentFilters.price_range === filterValue;
            }
        });

        // Update price sliders if custom range is set
        if (this.state.currentFilters.min_price) {
            const minSlider = document.getElementById('priceMin');
            const minDisplay = document.getElementById('minPrice');
            if (minSlider && minDisplay) {
                minSlider.value = this.state.currentFilters.min_price;
                minDisplay.textContent = this.priceUtils.formatSliderDisplay(this.state.currentFilters.min_price);
            }
        }

        if (this.state.currentFilters.max_price) {
            const maxSlider = document.getElementById('priceMax');
            const maxDisplay = document.getElementById('maxPrice');
            if (maxSlider && maxDisplay) {
                maxSlider.value = this.state.currentFilters.max_price;
                maxDisplay.textContent = this.priceUtils.formatSliderDisplay(this.state.currentFilters.max_price);
            }
        }

        // Update search input
        const searchInputs = document.querySelectorAll(this.config.selectors.searchInput);
        searchInputs.forEach(input => {
            input.value = this.state.currentFilters.search;
        });

        this.updateFilterBadge();
    },

    // Bind all event listeners
    bindEvents() {
        // View toggle (grid/list) - Client-side only
        this.elements.allViewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleViewToggle(e));
        });

        // Sort functionality
        if (this.elements.sortSelect) {
            this.elements.sortSelect.addEventListener('change', (e) => this.handleSort(e));
        }

        // Filter checkboxes
        this.elements.allFilterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleFilterChange(e));
        });

        // Price sliders
        const priceSliders = document.querySelectorAll(this.config.selectors.priceSliders);
        priceSliders.forEach(slider => {
            slider.addEventListener('input', (e) => this.handlePriceSliderChange(e));
        });

        // Mobile filter toggle
        if (this.elements.mobileFilterBtn) {
            this.elements.mobileFilterBtn.addEventListener('click', () => this.toggleMobileFilter());
        }

        // Clear all filters
        const clearBtns = document.querySelectorAll(this.config.selectors.clearAllBtn);
        clearBtns.forEach(btn => {
            btn.addEventListener('click', () => this.clearAllFilters());
        });

        // Search functionality
        const searchInputs = document.querySelectorAll(this.config.selectors.searchInput);
        searchInputs.forEach(input => {
            input.addEventListener('input', this.debounce((e) => this.handleSearch(e), 500));
        });

        // Product actions (using event delegation)
        this.bindProductActions();

        // Close mobile filter on overlay click
        if (this.elements.mobileFilterOverlay) {
            this.elements.mobileFilterOverlay.addEventListener('click', (e) => {
                if (e.target === this.elements.mobileFilterOverlay) {
                    this.toggleMobileFilter();
                }
            });
        }

        // Browser back/forward
        window.addEventListener('popstate', (e) => this.handlePopState(e));

        // Pagination links
        this.bindPaginationEvents();
    },

    // Bind pagination events
    bindPaginationEvents() {
        document.addEventListener('click', (e) => {
            const paginationLink = e.target.closest('.pagination a');
            if (paginationLink && !paginationLink.href.includes('#')) {
                e.preventDefault();
                const url = new URL(paginationLink.href);
                const page = url.searchParams.get('page') || 1;
                this.loadPage(page);
            }
        });
    },

    // Handle view toggle (client-side only)
    handleViewToggle(e) {
        const view = e.target.closest('.pc-view-btn').dataset.view;
        
        // Update button states
        this.elements.allViewButtons.forEach(btn => 
            btn.classList.remove(this.config.classes.active)
        );
        e.target.closest('.pc-view-btn').classList.add(this.config.classes.active);
        
        // Update grid view
        if (view === 'list') {
            this.elements.productsGrid.classList.add(this.config.classes.listView);
        } else {
            this.elements.productsGrid.classList.remove(this.config.classes.listView);
        }
        
        this.state.currentView = view;
        this.animateProducts();
    },

    // Handle sorting
    handleSort(e) {
        this.state.currentFilters.sort = e.target.value;
        this.state.currentPage = 1;
        this.applyFilters();
    },

    // Handle filter changes
    handleFilterChange(e) {
        const checkbox = e.target;
        const filterType = checkbox.dataset.filter;
        const filterValue = checkbox.dataset.value;
        
        if (filterType === 'category') {
            // Only one category can be selected
            if (checkbox.checked) {
                this.state.currentFilters.category = filterValue;
                // Uncheck other category checkboxes
                document.querySelectorAll('.pc-filter-checkbox[data-filter="category"]').forEach(cb => {
                    if (cb !== checkbox) cb.checked = false;
                });
            } else {
                this.state.currentFilters.category = '';
            }
        } else if (filterType === 'price') {
            // Only one price range can be selected
            if (checkbox.checked) {
                this.state.currentFilters.price_range = filterValue;
                // Clear custom price range
                this.state.currentFilters.min_price = '';
                this.state.currentFilters.max_price = '';
                // Uncheck other price checkboxes
                document.querySelectorAll('.pc-filter-checkbox[data-filter="price"]').forEach(cb => {
                    if (cb !== checkbox) cb.checked = false;
                });
                // Reset sliders to default
                this.resetPriceSliders();
            } else {
                this.state.currentFilters.price_range = '';
            }
        }
        
        this.state.currentPage = 1;
        this.applyFilters();
    },

    // Handle price slider changes with VND formatting
    handlePriceSliderChange(e) {
        const slider = e.target;
        const isMin = slider.id === 'priceMin';
        const value = parseInt(slider.value);
        
        if (isMin) {
            const minDisplay = document.getElementById('minPrice');
            if (minDisplay) minDisplay.textContent = this.priceUtils.formatSliderDisplay(value);
            
            // Ensure min doesn't exceed max
            const maxSlider = document.getElementById('priceMax');
            if (maxSlider && value > parseInt(maxSlider.value)) {
                maxSlider.value = value;
                const maxDisplay = document.getElementById('maxPrice');
                if (maxDisplay) maxDisplay.textContent = this.priceUtils.formatSliderDisplay(value);
            }
        } else {
            const maxDisplay = document.getElementById('maxPrice');
            if (maxDisplay) maxDisplay.textContent = this.priceUtils.formatSliderDisplay(value);
            
            // Ensure max doesn't go below min
            const minSlider = document.getElementById('priceMin');
            if (minSlider && value < parseInt(minSlider.value)) {
                minSlider.value = value;
                const minDisplay = document.getElementById('minPrice');
                if (minDisplay) minDisplay.textContent = this.priceUtils.formatSliderDisplay(value);
            }
        }
        
        // Update state and apply filters with debounce
        clearTimeout(this.priceSliderTimeout);
        this.priceSliderTimeout = setTimeout(() => {
            const minSlider = document.getElementById('priceMin');
            const maxSlider = document.getElementById('priceMax');
            
            if (minSlider && maxSlider) {
                this.state.currentFilters.min_price = minSlider.value;
                this.state.currentFilters.max_price = maxSlider.value;
                this.state.currentFilters.price_range = ''; // Clear preset price range
                
                // Uncheck price preset checkboxes
                document.querySelectorAll('.pc-filter-checkbox[data-filter="price"]').forEach(cb => {
                    cb.checked = false;
                });
                
                this.state.currentPage = 1;
                this.applyFilters();
            }
        }, 500);
    },

    // Reset price sliders to default values
    resetPriceSliders() {
        const minSlider = document.getElementById('priceMin');
        const maxSlider = document.getElementById('priceMax');
        const minDisplay = document.getElementById('minPrice');
        const maxDisplay = document.getElementById('maxPrice');
        
        if (minSlider && maxSlider && minDisplay && maxDisplay) {
            minSlider.value = this.config.price.min;
            maxSlider.value = this.config.price.max;
            minDisplay.textContent = this.priceUtils.formatSliderDisplay(this.config.price.min);
            maxDisplay.textContent = this.priceUtils.formatSliderDisplay(this.config.price.max);
        }
    },

    // Handle search
    handleSearch(e) {
        this.state.currentFilters.search = e.target.value;
        this.state.currentPage = 1;
        this.applyFilters();
    },

    // Apply filters by making backend request
    applyFilters() {
        if (this.state.isLoading) return;
        
        this.showLoading();
        this.updateFilterBadge();
        
        const params = new URLSearchParams();
        
        // Add non-empty filters to params
        Object.keys(this.state.currentFilters).forEach(key => {
            if (this.state.currentFilters[key]) {
                params.append(key, this.state.currentFilters[key]);
            }
        });
        
        // Add page if not first page
        if (this.state.currentPage > 1) {
            params.append('page', this.state.currentPage);
        }
        
        // Add AJAX flag
        params.append('ajax', '1');
        
        const url = `${this.config.urls.products}?${params.toString()}`;
        
        // Update browser URL without page reload
        const newUrl = `${this.config.urls.products}?${params.toString().replace('ajax=1&', '').replace('&ajax=1', '').replace('ajax=1', '')}`;
        window.history.pushState({filters: this.state.currentFilters}, '', newUrl);
        
        // Make AJAX request
        fetch(url, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Filter response:', data); // Debug log
            this.updateProductsGrid(data.html);
            this.updateProductCount(data.showing || data.count, data.total, data.from, data.to);
            this.updatePagination(data.pagination);
            this.hideLoading();
            
            // Debug logging
            if (data.debug) {
                console.log('Debug info:', data.debug);
            }
        })
        .catch(error => {
            console.error('Error filtering products:', error);
            this.hideLoading();
            this.showNotification('Có lỗi xảy ra khi lọc sản phẩm', 'error');
        });
    },

    // Load specific page
    loadPage(page) {
        this.state.currentPage = parseInt(page);
        this.applyFilters();
    },

    // Update products grid with new HTML
    updateProductsGrid(html) {
        if (this.elements.productsGrid) {
            this.elements.productsGrid.innerHTML = html;
            this.animateProducts();
            this.bindProductActions(); // Re-bind events for new elements
        }
    },

    // Update product count display
    updateProductCount(showing, total, from = null, to = null) {
        if (this.elements.productsCount) {
            if (from && to) {
                this.elements.productsCount.textContent = `Hiển thị ${from}-${to} trong tổng số ${total} sản phẩm`;
            } else {
                this.elements.productsCount.textContent = `Hiển thị ${showing} trong tổng số ${total} sản phẩm`;
            }
        }
    },

    // Update pagination
    updatePagination(paginationHtml) {
        const paginationWrapper = document.querySelector('.pc-pagination-wrapper, .pagination-wrapper');
        if (paginationWrapper) {
            paginationWrapper.innerHTML = paginationHtml;
            this.bindPaginationEvents(); // Re-bind pagination events
        }
    },

    // Handle browser back/forward
    handlePopState(e) {
        if (e.state && e.state.filters) {
            this.state.currentFilters = e.state.filters;
            this.updateUIFromState();
            this.applyFilters();
        } else {
            // Reload page if no state
            window.location.reload();
        }
    },

    // Clear all filters
    clearAllFilters() {
        // Reset state
        this.state.currentFilters = {
            category: '',
            price_range: '',
            search: '',
            sort: 'name_asc',
            min_price: '',
            max_price: ''
        };
        this.state.currentPage = 1;
        
        // Update UI
        this.updateUIFromState();
        
        // Reset price sliders
        this.resetPriceSliders();
        
        // Apply filters (will show all products)
        this.applyFilters();
    },

    // Initialize price sliders with VND support
    initPriceSliders() {
        const minSlider = document.getElementById('priceMin');
        const maxSlider = document.getElementById('priceMax');
        const minDisplay = document.getElementById('minPrice');
        const maxDisplay = document.getElementById('maxPrice');
        
        if (minSlider && maxSlider && minDisplay && maxDisplay) {
            // Set slider attributes for VND range
            minSlider.min = this.config.price.min;
            minSlider.max = this.config.price.max;
            minSlider.step = this.config.price.step;
            
            maxSlider.min = this.config.price.min;
            maxSlider.max = this.config.price.max;
            maxSlider.step = this.config.price.step;
            
            // Set default values if not already set
            if (!minSlider.value) {
                minSlider.value = this.config.price.min;
            }
            if (!maxSlider.value) {
                maxSlider.value = this.config.price.max;
            }
            
            // Set initial display values with VND formatting
            minDisplay.textContent = this.priceUtils.formatSliderDisplay(minSlider.value);
            maxDisplay.textContent = this.priceUtils.formatSliderDisplay(maxSlider.value);
            
            // Add currency label if exists
            const priceLabel = document.querySelector('.pc-price-range-label');
            if (priceLabel && !priceLabel.textContent.includes('₫')) {
                priceLabel.textContent = 'Khoảng giá (₫)';
            }
        }
    },

    // Product actions
    bindProductActions() {
        // Quick view, wishlist, etc. - these remain client-side
        document.removeEventListener('click', this.productActionHandler);
        this.productActionHandler = (e) => {
            // Quick view
            if (e.target.closest('.pc-btn-quick-view')) {
                const card = e.target.closest('.pc-product-card');
                const productId = this.getProductIdFromCard(card);
                this.quickView(productId);
            }

            // Wishlist toggle
            if (e.target.closest('.pc-btn-wishlist')) {
                const card = e.target.closest('.pc-product-card');
                const productId = this.getProductIdFromCard(card);
                this.toggleWishlist(productId, e.target.closest('.pc-btn-wishlist'));
            }
        };
        document.addEventListener('click', this.productActionHandler);
    },

    // Get product ID from card
    getProductIdFromCard(card) {
        return card.dataset.productId || 
               card.querySelector('.pc-product-title a')?.href?.split('/').pop() ||
               Math.random().toString(36).substr(2, 9);
    },

    // Mobile filter functionality
    toggleMobileFilter() {
        if (this.elements.mobileFilterOverlay) {
            this.elements.mobileFilterOverlay.classList.toggle(this.config.classes.active);
            
            if (this.elements.mobileFilterOverlay.classList.contains(this.config.classes.active)) {
                document.body.style.overflow = 'hidden';
                this.cloneSidebarToMobile();
            } else {
                document.body.style.overflow = '';
            }
        }
    },

    cloneSidebarToMobile() {
        const mobileBody = document.querySelector('.pc-mobile-filter-body');
        
        if (mobileBody && this.elements.sidebar) {
            mobileBody.innerHTML = this.elements.sidebar.innerHTML;
            this.bindMobileFilterEvents();
            
            // Re-initialize price sliders in mobile
            this.initPriceSliders();
        }
    },

    bindMobileFilterEvents() {
        const mobileBody = document.querySelector('.pc-mobile-filter-body');
        if (!mobileBody) return;
        
        // Re-bind all filter events for mobile
        const checkboxes = mobileBody.querySelectorAll('.pc-filter-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleFilterChange(e));
        });
        
        const sliders = mobileBody.querySelectorAll('.pc-slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => this.handlePriceSliderChange(e));
        });
        
        const searchInput = mobileBody.querySelector('.pc-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => this.handleSearch(e), 500));
        }
    },

    // UI helpers
    showLoading() {
        this.state.isLoading = true;
        if (this.elements.productsSection) {
            this.elements.productsSection.classList.add(this.config.classes.loading);
        }
    },

    hideLoading() {
        this.state.isLoading = false;
        if (this.elements.productsSection) {
            this.elements.productsSection.classList.remove(this.config.classes.loading);
        }
    },

    animateProducts() {
        const productCards = document.querySelectorAll(this.config.selectors.productCard);
        productCards.forEach((card, index) => {
            card.classList.remove(this.config.classes.fadeIn);
            setTimeout(() => {
                card.classList.add(this.config.classes.fadeIn);
            }, index * 50);
        });
    },

    // Product actions (client-side)
    quickView(productId) {
        console.log('Quick view:', productId);
        // Implement your quick view modal logic here
        this.showNotification('Tính năng xem nhanh sẽ có sớm!', 'info');
    },

    toggleWishlist(productId, btnElement) {
        const icon = btnElement.querySelector('i');
        const isWishlisted = icon.classList.contains('fas');
        
        if (isWishlisted) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.showNotification('Đã xóa khỏi danh sách yêu thích', 'info');
        } else {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.showNotification('Đã thêm vào danh sách yêu thích', 'success');
        }
        
        // You can also make AJAX request to backend to save wishlist state
        // this.updateWishlistOnServer(productId, !isWishlisted);
    },

    // Notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #28a745;' : 
              type === 'error' ? 'background: #dc3545;' : 'background: #17a2b8;'}
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 10);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    // Filter badge
    updateFilterBadge() {
        const count = this.getActiveFilterCount();
        let badge = document.querySelector('.pc-filter-badge');
        const filterBtn = document.querySelector('.pc-btn-filter');
        
        if (count > 0) {
            if (!badge && filterBtn) {
                badge = document.createElement('span');
                badge.className = 'pc-filter-badge';
                badge.style.cssText = `
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: var(--pc-primary-color, #dc3545);
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                `;
                filterBtn.style.position = 'relative';
                filterBtn.appendChild(badge);
            }
            if (badge) badge.textContent = count;
        } else if (badge) {
            badge.remove();
        }
    },

    getActiveFilterCount() {
        let count = 0;
        if (this.state.currentFilters.category) count++;
        if (this.state.currentFilters.price_range) count++;
        if (this.state.currentFilters.search) count++;
        if (this.state.currentFilters.min_price || this.state.currentFilters.max_price) count++;
        return count;
    },

    // Setup mobile
    setupMobileFilters() {
        const mobileCloseBtn = document.querySelector('.pc-mobile-filter-header .pc-btn-close');
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', () => this.toggleMobileFilter());
        }
        
        const mobileClearBtn = document.querySelector('.pc-mobile-filter-footer .pc-btn-clear');
        const mobileApplyBtn = document.querySelector('.pc-mobile-filter-footer .pc-btn-apply');
        
        if (mobileClearBtn) {
            mobileClearBtn.addEventListener('click', () => this.clearAllFilters());
        }
        
        if (mobileApplyBtn) {
            mobileApplyBtn.addEventListener('click', () => this.toggleMobileFilter());
        }
    },

    // Utility
    debounce(func, wait) {
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
};

// Global functions for compatibility
window.toggleMobileFilter = () => ProductCatalog.toggleMobileFilter();
window.clearAllFilters = () => ProductCatalog.clearAllFilters();
window.quickView = (id) => ProductCatalog.quickView(id);
window.addToWishlist = (id) => {
    const card = document.querySelector(`[data-product-id="${id}"]`) || 
                 document.querySelector('.pc-product-card');
    const btn = card?.querySelector('.pc-btn-wishlist');
    if (btn) ProductCatalog.toggleWishlist(id, btn);
};

// Export price utilities for external use
window.PriceUtils = ProductCatalog.priceUtils;

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.product-catalog')) {
        ProductCatalog.init();
    }
});

// Export
window.ProductCatalog = ProductCatalog;