// DOM yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Resim yükleme kontrolü
    initImageLoading();
    
    // Hero slider fonksiyonalitesi
    initHeroSlider();
    
    // Proje detayları toggle fonksiyonalitesi
    initProjectDetails();
    
    // Hizmet detayları toggle fonksiyonalitesi
    initServiceDetails();
    
    // Mobil menü fonksiyonalitesi
    initMobileMenu();
    
    // Smooth scroll fonksiyonalitesi
    initSmoothScroll();
    
    // Form submit fonksiyonalitesi
    initContactForm();
    
    // Scroll animasyonları
    initScrollAnimations();
    
    // Showcase images initialization
    initShowcaseImages();
    
    // Debug: Resim yükleme durumunu kontrol et
    debugImageLoading();
});

// Resim Yükleme Kontrolü (Mobil uyumluluk için)
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Resim yüklenemediğinde gizle
        img.addEventListener('error', function() {
            console.log('Resim yüklenemedi:', this.src);
            this.style.display = 'none';
        });
        
        // Resim yüklendiğinde
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
            console.log('Resim yüklendi:', this.src);
        });
        
        // Başlangıçta opacity 0.3 (daha görünür) ve küçük scale
        img.style.opacity = '0.3';
        img.style.transform = 'scale(0.98)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Eğer resim zaten yüklenmişse (cache'den)
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }
    });
}

// Hero Slider Fonksiyonalitesi
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    const totalSlides = 12;
    
    // Otomatik slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 4000);
    
    // Dot click eventleri
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    function updateSlider() {
        const translateX = -(currentSlide * 8.333);
        slider.style.transform = `translateX(${translateX}%)`;
        
        // Aktif dot'u güncelle
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

// Proje Detayları Toggle
function initProjectDetails() {
    const projectButtons = document.querySelectorAll('.project-detail-btn');
    
    projectButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectCard = this.closest('.project-card');
            let projectDetails = projectCard.querySelector('.project-details');
            
            // Eğer detay bölümü yoksa oluştur
            if (!projectDetails) {
                projectDetails = createProjectDetails(projectCard);
            }
            
            const isVisible = projectDetails.style.display !== 'none';
            
            if (isVisible) {
                // Sadece bu kartın detaylarını gizle
                projectDetails.style.display = 'none';
                this.textContent = 'Detaylar';
                this.style.background = 'linear-gradient(135deg, #007bff, #0056b3)';
            } else {
                // Önce tüm diğer detayları kapat
                const allProjectDetails = document.querySelectorAll('.project-details');
                const allButtons = document.querySelectorAll('.project-detail-btn');
                
                allProjectDetails.forEach((details, i) => {
                    if (i !== index) {
                        details.style.display = 'none';
                    }
                });
                
                allButtons.forEach((btn, i) => {
                    if (i !== index) {
                        btn.textContent = 'Detaylar';
                        btn.style.background = 'linear-gradient(135deg, #007bff, #0056b3)';
                    }
                });
                
                // Bu kartın detaylarını aç
                projectDetails.style.display = 'block';
                this.textContent = 'Gizle';
                this.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
                
                // Smooth scroll to details
                setTimeout(() => {
                    projectDetails.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
        });
    });
}

// Proje detayları oluştur
function createProjectDetails(projectCard) {
    const projectTitle = projectCard.querySelector('h3').textContent;
    const projectDetails = document.createElement('div');
    projectDetails.className = 'project-details';
    projectDetails.style.display = 'none';
    
    // Proje türüne göre detaylar
    let detailsContent = '';
    
    if (projectTitle.includes('Kanalizasyon')) {
        detailsContent = `
            <h4>Proje Özellikleri</h4>
            <ul>
                <li>15 km atıksu hattı döşemesi</li>
                <li>En son teknoloji boru sistemleri</li>
                <li>Çevre dostu atıksu arıtma entegrasyonu</li>
                <li>Minimum çevresel etki</li>
            </ul>
            <h4>Proje Açıklaması</h4>
            <p>Bu proje, bölgedeki artan nüfusun ihtiyaçlarını karşılamak üzere tasarlanmıştır. Yüksek mühendislik standartlarıyla tamamlanan atıksu hattı, çevre sağlığını koruma altına alırken, gelecek nesillere temiz bir yaşam alanı sunmaktadır.</p>
        `;
    } else if (projectTitle.includes('Yağmur Suyu')) {
        detailsContent = `
            <h4>Proje Özellikleri</h4>
            <ul>
                <li>5 km yağmursuyu hattı</li>
                <li>Yüksek kapasiteli drenaj ızgaraları</li>
                <li>Otomatik su seviyesi kontrol sistemleri</li>
                <li>Kentsel altyapıya entegrasyon</li>
            </ul>
            <h4>Proje Açıklaması</h4>
            <p>Yoğun yağış dönemlerinde oluşabilecek su baskınlarını engellemek amacıyla tasarlanan bu drenaj sistemi, şehrin yaşam kalitesini artırmaktadır. Akıllı sensörler sayesinde su seviyeleri anlık olarak takip edilmekte ve olası riskler minimize edilmektedir.</p>
        `;
    } else if (projectTitle.includes('Su Hattı')) {
        detailsContent = `
            <h4>Proje Özellikleri</h4>
            <ul>
                <li>10 km temiz su hattı yenilemesi</li>
                <li>Sağlıklı ve dayanıklı boru malzemeleri</li>
                <li>Akıllı kaçak tespit sistemleri</li>
                <li>Kesintisiz su temini garantisi</li>
            </ul>
            <h4>Proje Açıklaması</h4>
            <p>Şehrin içme suyu altyapısını güçlendirmeyi hedefleyen bu proje, eskiyen boru hatlarını son teknoloji ürünlerle değiştirerek su kayıplarını engellemekte ve vatandaşlara daha sağlıklı su sağlamaktadır.</p>
        `;
    } else if (projectTitle.includes('Yağmursuyu Drenaj')) {
        detailsContent = `
            <h4>Proje Özellikleri</h4>
            <ul>
                <li>5 km yağmursuyu hattı</li>
                <li>Yüksek kapasiteli drenaj ızgaraları</li>
                <li>Otomatik su seviyesi kontrol sistemleri</li>
                <li>Kentsel altyapıya entegrasyon</li>
            </ul>
            <h4>Proje Açıklaması</h4>
            <p>Yoğun yağış dönemlerinde oluşabilecek su baskınlarını engellemek amacıyla tasarlanan bu drenaj sistemi, şehrin yaşam kalitesini artırmaktadır. Akıllı sensörler sayesinde su seviyeleri anlık olarak takip edilmekte ve olası riskler minimize edilmektedir.</p>
        `;
    } else if (projectTitle.includes('Temiz Su Temin')) {
        detailsContent = `
            <h4>Proje Özellikleri</h4>
            <ul>
                <li>10 km temiz su hattı yenilemesi</li>
                <li>Sağlıklı ve dayanıklı boru malzemeleri</li>
                <li>Akıllı kaçak tespit sistemleri</li>
                <li>Kesintisiz su temini garantisi</li>
            </ul>
            <h4>Proje Açıklaması</h4>
            <p>Şehrin içme suyu altyapısını güçlendirmeyi hedefleyen bu proje, eskiyen boru hatlarını son teknoloji ürünlerle değiştirerek su kayıplarını engellemekte ve vatandaşlara daha sağlıklı su sağlamaktadır.</p>
        `;
    } else {
        // Diğer projeler için genel detaylar
        detailsContent = `
            <h4>Proje Özellikleri</h4>
            <ul>
                <li>Modern altyapı çözümleri</li>
                <li>Yüksek kalite malzemeler</li>
                <li>Uzman ekip çalışması</li>
                <li>Zamanında teslimat garantisi</li>
            </ul>
            <h4>Proje Açıklaması</h4>
            <p>Bu proje, GALİP İNŞAAT'ın 20 yıllık tecrübesiyle gerçekleştirilmiştir. Modern teknoloji ve kaliteli malzemeler kullanılarak, uzun ömürlü ve güvenilir altyapı çözümleri sunulmuştur.</p>
        `;
    }
    
    projectDetails.innerHTML = detailsContent;
    
    // Detayları proje kartının sonuna ekle
    const projectContent = projectCard.querySelector('.project-content');
    projectContent.appendChild(projectDetails);
    
    return projectDetails;
}

// Hizmet Detayları Toggle
function initServiceDetails() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceDetails = this.querySelector('.service-details');
            if (serviceDetails) {
                const isVisible = serviceDetails.style.display !== 'none';
                
                if (isVisible) {
                    serviceDetails.style.display = 'none';
                    this.style.height = 'auto';
                } else {
                    serviceDetails.style.display = 'block';
                    this.style.height = 'auto';
                    
                    // Smooth scroll to details
                    serviceDetails.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }
        });
    });
}

// Mobil Menü Fonksiyonalitesi
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Menü açıkken hamburger ikonunu X yap
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Menü linklerine tıklandığında menüyü kapat
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }
}

// Smooth Scroll Fonksiyonalitesi
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// İletişim Formu Fonksiyonalitesi
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basit validasyon
            if (!name || !email || !phone || !message) {
                showNotification('Lütfen tüm alanları doldurun.', 'error');
                return;
            }
            
            // Email formatı kontrolü
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Lütfen geçerli bir email adresi girin.', 'error');
                return;
            }
            
            // Başarılı gönderim simülasyonu
            showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
            
            // Formu temizle
            this.reset();
        });
    }
}

// Bildirim Gösterme Fonksiyonu
function showNotification(message, type = 'info') {
    // Mevcut bildirimi kaldır
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // CSS stilleri ekle
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Bildirimi sayfaya ekle
    document.body.appendChild(notification);
    
    // Kapatma butonu eventi
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // 5 saniye sonra otomatik kapat
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Scroll Animasyonları
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Animasyon uygulanacak elementler
    const animateElements = document.querySelectorAll('.project-card, .service-card, .about-content, .contact-info');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Header scroll efekti
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Sayfa yüklendiğinde loading animasyonu
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// CSS Animasyonları için keyframes ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        padding: 2rem;
        gap: 1rem;
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex !important;
        }
    }
`;
document.head.appendChild(style);

// Sequential image rotation for showcase items
function initShowcaseImages() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const imageFiles = [
        './IMG-20250902-WA0003.jpg',
        './IMG-20250902-WA0004.jpg',
        './IMG-20250902-WA0005.jpg',
        './IMG-20250902-WA0006.jpg',
        './IMG-20250902-WA0007.jpg',
        './IMG-20250902-WA0008.jpg',
        './IMG-20250902-WA0009.jpg',
        './IMG-20250902-WA0010.jpg',
        './IMG-20250902-WA0011.jpg',
        './IMG-20250902-WA0012.jpg',
        './IMG-20250902-WA0013.jpg',
        './IMG-20250902-WA0014.jpg',
        './IMG-20250902-WA0015.jpg',
        './IMG-20250902-WA0016.jpg',
        './IMG-20250902-WA0017.jpg',
        './IMG-20250902-WA0018.jpg',
        './IMG-20250902-WA0019.jpg',
        './IMG-20250902-WA0020.jpg',
        './IMG-20250902-WA0021.jpg',
        './IMG-20250902-WA0022.jpg'
    ];

    // Her showcase item için farklı başlangıç indeksi
    showcaseItems.forEach((item, index) => {
        let currentImageIndex = index; // Her item farklı resimle başlar
        const overlay = item.querySelector('.showcase-overlay');
        
        if (overlay) {
            // İlk resmi ayarla
            overlay.style.backgroundImage = `url('${imageFiles[currentImageIndex]}')`;
            overlay.style.backgroundSize = 'cover';
            overlay.style.backgroundPosition = 'center';
            overlay.style.backgroundRepeat = 'no-repeat';
            
            // Her 5 saniyede bir sırayla resim değiştir
            setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % imageFiles.length;
                overlay.style.backgroundImage = `url('${imageFiles[currentImageIndex]}')`;
            }, 5000); // 5 saniye aralıklarla
        }
    });
}

// Debug fonksiyonu - resim yükleme durumunu kontrol eder
function debugImageLoading() {
    setTimeout(() => {
        const images = document.querySelectorAll('img');
        console.log('=== RESİM YÜKLEME DURUMU ===');
        images.forEach((img, index) => {
            console.log(`Resim ${index + 1}:`, {
                src: img.src,
                complete: img.complete,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                opacity: img.style.opacity,
                display: img.style.display
            });
        });
    }, 2000);
}


