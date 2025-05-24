document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-link');

    let refreshSlideInterval;
    let currentCssId = null;

    const header = document.querySelector(".header_right");
    const searchIcon = document.querySelector(".search-icon2");

    //search - box
    if (header && searchIcon) {
        searchIcon.addEventListener("click", () => {
            header.classList.toggle("openSearch");
        });
    } else {
        console.warn("Search elements (header_right or search-icon2) not found on initial load.");
    }

    function initializeCarousel() {
        if (refreshSlideInterval) {
            clearInterval(refreshSlideInterval);
            console.log("Cleared existing carousel interval.");
        }

        let list = document.querySelector('.slide .list');
        let items = document.querySelectorAll('.slide .list .item');
        let dots = document.querySelectorAll('.slide .dots li');
        let prev = document.getElementById('prev');
        let next = document.getElementById('next');

        // --- QUAN TRỌNG: Kiểm tra lại các phần tử có được tìm thấy không ---
        if (!list || items.length === 0 || !prev || !next || dots.length === 0) {
            console.warn("Carousel elements NOT found after rendering. Skipping carousel initialization.");
            return;
        } else {
            console.log("Carousel elements FOUND. Initializing carousel.");
        }

        let active = 0;

        function reloadSlide() {
            let checkLeft = items[active].offsetLeft;
            list.style.left = -checkLeft + 'px';

            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[active]) {
                dots[active].classList.add('active');
            }
        }

        prev.onclick = function () {
            active -= 1;
            if (active < 0) active = items.length - 1;
            reloadSlide();
            clearInterval(refreshSlideInterval);
            refreshSlideInterval = setInterval(() => { next.click() }, 3000);
        }

        next.onclick = function () {
            active += 1;
            if (active >= items.length) active = 0;
            reloadSlide();
            clearInterval(refreshSlideInterval);
            refreshSlideInterval = setInterval(() => { next.click() }, 3000);
        }

        dots.forEach((li, key) => {
            li.addEventListener('click', function () {
                active = key;
                reloadSlide();
                clearInterval(refreshSlideInterval);
                refreshSlideInterval = setInterval(() => { next.click() }, 3000);
            });
        });

        reloadSlide();
        refreshSlideInterval = setInterval(() => { next.click() }, 3000);
        console.log("Carousel auto-slide interval started.");
    }

    // --- Hàm quản lý CSS động---
    function addCssFile(href, id) {
        if (currentCssId === id) {
            console.log(`CSS file '${id}' is already current.`);
            return;
        }
        if (currentCssId) {
            const oldLink = document.getElementById(currentCssId);
            if (oldLink) {
                oldLink.remove();
                console.log(`Removed CSS file: ${currentCssId}`);
            }
        }
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = href;
        linkElement.id = id;
        document.head.appendChild(linkElement);
        currentCssId = id;
        console.log(`Added CSS file: ${id}`);
    }

    function removeCurrentCssFile() {
        if (currentCssId) {
            const link = document.getElementById(currentCssId);
            if (link) {
                link.remove();
                console.log(`Removed CSS file: ${currentCssId}`);
            }
            currentCssId = null;
        } else {
            console.log("No current CSS file to remove.");
        }
    }

    // Định nghĩa nội dung của sản phẩm
    const products = [
        {
            id: 1,
            name: 'Ao thun den',
            image: '/assets/images/product1.avif',
            price: '250.000 VND',
            description: 'dei ssc csija asjd saod aps dsfn hklds qhph hsad x bsjakd sabjk sabdxjc ojinxcq m hix bxia',
            colors: ['Den', 'Trang'],
            size: ['S', 'M', 'L']
        },
        {
            id: 2,
            name: 'Ao tay dai',
            image: '/assets/images/product2.avif',
            price: '300.000 VND',
            description: 'dei ssc csija asjd saod aps dsfn hklds qhph hsad x bsjakd sabjk sabdxjc ojinxcq m hix bxia',
            colors: ['Den', 'Trang'],
            size: ['S', 'M', 'L']
        },
        {
            id: 3,
            name: 'Quan short',
            image: '/assets/images/product3.webp',
            price: '200.000 VND',
            description: 'dei ssc csija asjd saod aps dsfn hklds qhph hsad x bsjakd sabjk sabdxjc ojinxcq m hix bxia',
            colors: ['Den', 'Trang'],
            size: ['S', 'M', 'L']
        },
        {
            id: 4,
            name: 'Quan dai',
            image: '/assets/images/product4.jpg',
            price: '350.000 VND',
            description: 'dei ssc csija asjd saod aps dsfn hklds qhph hsad x bsjakd sabjk sabdxjc ojinxcq m hix bxia',
            colors: ['Den', 'Trang'],
            size: ['S', 'M', 'L']
        }
    ]

    // --- Định nghĩa nội dung các trang---
    const render = {
        '/': /* html */`
            <section class="slide">
                <div class="list">
                    <div class="item"><img src="./assets/images/slideshow_1.webp" alt="photo"></div>
                    <div class="item"><img src="./assets/images/slideshow_2.webp" alt="photo"></div>
                    <div class="item"><img src="./assets/images/slideshow_3.jpg" alt="photo"></div>
                </div>
                <div class="buttons">
                    <button id="prev"><i class="fa fa-angle-left"></i></button>
                    <button id="next"><i class="fa fa-angle-right"></i></button>
                </div>
                <ul class="dots">
                    <li class="active"></li>
                    <li></li>
                    <li></li>
                </ul>
            </section>
            <section class="information">
                <img src="./assets/images/banner_top_img.webp" alt="">
                <div class="info__box">
                    <h1>Giới thiệu</h1>
                    <p> Ra đời vào ngày 15 tháng 5 năm 2015, chúng tôi thực hiện hóa giấc mơ bắt đầu từ một Start up, khởi đầu sứ mệnh tạo ra những giá trị mới mẻ và có ích cho cộng đồng mà không chỉ đơn thuần là tạo ra những sản phẩm chất lượng mà là "những sản phẩm hoàn hảo nhất do người Việt làm" </p>
                    <button class="info__button">XEM THÊM</button>
                </div>
            </section>
            <section class="scroll_product"></section>
        `,
        '/about': /* html */`
       <section id="about">
        <div>
            <h1>Về Chúng Tôi ?</h1>
            <p>Chào mừng bạn đến với [Tên trang web] – Thế giới thời trang dành riêng cho bạn! Tại [Tên trang web],
                chúng tôi mang đến những bộ sưu tập thời trang đa dạng, phong cách và luôn bắt kịp xu hướng mới nhất. Dù
                bạn yêu thích phong cách năng động, thanh lịch hay cá tính, chúng tôi đều có những lựa chọn hoàn hảo
                dành cho bạn. Sản phẩm của chúng tôi được chọn lọc kỹ lưỡng với chất lượng cao, giá cả hợp lý và dịch vụ
                chăm sóc khách hàng tận tâm. Hãy cùng [Tên trang web] biến mỗi ngày của bạn trở nên thật thời trang và
                khác biệt!

                <img src="./assets/images/img_about1.jpg" alt="about1">
            </p>

            <p>Chào mừng bạn đến với [Tên trang web] – Thế giới thời trang dành riêng cho bạn! Tại [Tên trang web],
                chúng tôi mang đến những bộ sưu tập thời trang đa dạng, phong cách và luôn bắt kịp xu hướng mới nhất. Dù
                bạn yêu thích phong cách năng động, thanh lịch hay cá tính, chúng tôi đều có những lựa chọn hoàn hảo
                dành cho bạn. Sản phẩm của chúng tôi được chọn lọc kỹ lưỡng với chất lượng cao, giá cả hợp lý và dịch vụ
                chăm sóc khách hàng tận tâm. Hãy cùng [Tên trang web] biến mỗi ngày của bạn trở nên thật thời trang và
                khác biệt!

                <img src="./assets/images/img_about2.jpg" alt="about2">
            </p>

            <p>Chào mừng bạn đến với [Tên trang web] – Thế giới thời trang dành riêng cho bạn! Tại [Tên trang web],
                chúng tôi mang đến những bộ sưu tập thời trang đa dạng, phong cách và luôn bắt kịp xu hướng mới nhất. Dù
                bạn yêu thích phong cách năng động, thanh lịch hay cá tính, chúng tôi đều có những lựa chọn hoàn hảo
                dành cho bạn. Sản phẩm của chúng tôi được chọn lọc kỹ lưỡng với chất lượng cao, giá cả hợp lý và dịch vụ
                chăm sóc khách hàng tận tâm. Hãy cùng [Tên trang web] biến mỗi ngày của bạn trở nên thật thời trang và
                khác biệt!</p>
        </div>

    </section>
        `,
        '/contact': /* html */`
<section id="contact">
        <h1>Liên Hệ</h1>
        <ul>
            <li>
                <a href="tel: 0857627231"><i class="fa-solid fa-phone"></i>: +84 857 6272 31</a>
            </li>
            <li>
                <a href="mailto: "><i class="fa-solid fa-envelope"></i>: nqsuktpm2311013@student.ctuet.edu.vn</a>
            </li>
            <li>
                <p><i class="fa-solid fa-location-dot"></i>: ABC, DEF, QQ</p>
            </li>
            <li>
                <a href="https://www.facebook.com/nguyen.quyen.su.2025/"><i class="fa-brands fa-facebook"></i>: Nguyen
                    Quyen Su</a>
            </li>
            
        </ul>


    </section>
        `,
        '/news': /* html*/ `
            <h1>Tin tuc</h1>
        `,
        '/product': /* html */ `
            <section id="products-list">
            <h1>Tất Cả Sản Phẩm</h1>
            <div class="product-grid">
                ${products.map(product => `
                    <a href="/product/${product.id}" class="product-card nav-link" data-path="/product/${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                    </a>
                `).join('')}
            </div>
        </section>
        `
    };

    // Hàm hiện thị chi tiết sản phẩm
    function renderProductDetail(productId) {
        const product = products.find(p => p.id === parseInt(productId)); // tim sp theo id 

        if (!product) {
            return /* html */ `
                <section class="product-detail non-found">
                    <h1>Sản phẩm không tồn tại</h1>
                    <p>eeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
                </section>
            `;
        }
        return /* html */ `
        <section id="product-detail">
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-info">
                <h1>${product.name}</h1>
                <p class="product-price">${product.price}</p>
                <p class="product-desc">${product.description}</p>
                <!-- <p>Màu sắc: ${product.colors.join(', ')}</p>
                <p>Kích thước: ${product.size.join(', ')}</p> -->
                <div class="add-to-cart">
                    <label for="color-select">Mau sac: </label>
                    <select name="color-select" id="color-select">
                        ${product.colors.map(c => `<option value="${c}">${c}</option>`).join('')}
                    </select>
                    <label for="size-select">Kich thuoc: </label>
                    <select name="size-select" id="size-select">
                        ${product.size.map(s => `<option value="${s}">${s}</option>`).join('')}
                    </select>
                    <button class="add-to-cart-btn">Them vao gio hang</button>
                </div>
            </div>
        </section>
        `
    }

    // --- Hàm xử lý sự kiện click cho nav-link ---
    function navLinkClickHandler(event) {
        event.preventDefault();
        const path = event.currentTarget.getAttribute('data-path');
        if (path) {
            history.pushState({}, '', path);
            displayContent(path);
        }
    }

    // --- Hàm hiển thị nội dung và khởi tạo lại các script cần thiết ---
    function displayContent(path) {
        removeCurrentCssFile(); // Xóa CSS cũ khi chuyển trang

        // xuly trang product detail 
        const productDetailMatch = path.match(/^\/product\/(\d+)$/);
        if (productDetailMatch) {
            const productId = productDetailMatch[1];
            content.innerHTML = renderProductDetail(productId);
            addCssFile('/styles/product-detail.css', 'product-detail-css');
            if (refreshSlideInterval) {
                clearInterval(refreshSlideInterval);
            }
            attachNavLinkListeners();
            return;
        }

        content.innerHTML = render[path] || render['/']; // Gán nội dung

        if (path === '/') {
            addCssFile('./assets/css/carousel.css', 'carousel-css'); // Thêm CSS cho carousel
            initializeCarousel(); // Khởi tạo carousel sau khi HTML đã được chèn
        } else {
            if (refreshSlideInterval) {
                clearInterval(refreshSlideInterval);
                console.log("Cleared carousel interval as not on homepage.");
            }
            // Thêm CSS và logic riêng cho từng trang nếu cần
            if (path === '/about') {
                addCssFile('./styles/about.css', 'about-css');
            }
            if (path === '/contact') {
                addCssFile('./styles/contact.css', 'contact-css')
            }
            if (path === '/product') {
                addCssFile('./styles/product.css', 'product-css')
            }
        }

        // Gán lại event listeners cho các link mới
        attachNavLinkListeners();
    }

    // Hàm này để tái gắn event listeners cho các nav-link mới được chèn vào DOM
    function attachNavLinkListeners() {
        const newlyAddedNavLinks = document.querySelectorAll('.nav-link');
        newlyAddedNavLinks.forEach(link => {
            // Đảm bảo không gắn listener nhiều lần cho cùng một link
            link.removeEventListener('click', navLinkClickHandler); // Xóa listener cũ (nếu có)
            link.addEventListener('click', navLinkClickHandler); // Gắn listener mới
        });
    }

    // --- Xử lý sự kiện điều hướng ban đầu ---
    navLinks.forEach(link => {
        link.addEventListener('click', navLinkClickHandler);
    });

    // --- Xử lý nút quay lại/tiếp theo của trình duyệt ---
    window.addEventListener('popstate', () => {
        displayContent(location.pathname);
    });

    // --- Lần tải trang đầu tiên ---
    // Gọi displayContent để hiển thị nội dung ban đầu dựa trên URL hiện tại
    displayContent(location.pathname);
    attachNavLinkListeners(); //gan Listeners cho cac link ban dau trong header
});