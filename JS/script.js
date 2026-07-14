document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initMobileDropdown();
    initLanguageToggle();
    translatePage();
    initScrollNavbar();
    renderAnnouncement();
    renderLocations();
    renderEmployeeResources();
    initScrollReveal();
});

function initMobileMenu() {
    const toggleButton = document.querySelector('.navbar .mobile-menu-toggle');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.navbar .mobile-menu-items');
    const navLinks = document.querySelectorAll('.mobile-menu-list a:not(.mobile-dropdown-toggle)');
    const mobileDropdown = document.querySelector('.mobile-dropdown');

    if (!toggleButton || !mobileMenu) {
        return;
    }

    toggleButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active')

        if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        } else {
        document.body.style.overflow = '';
        }

        if (!mobileMenu.classList.contains('active')) {
            mobileDropdown.classList.remove('active');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
            mobileDropdown.classList.remove('active');
        })
    })
}

function initScrollNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    if (!navbar) {
        return;
    }

    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;

        if (currentScrollY === 0) {
        navbar.classList.remove('navbar-hidden');
        } else if (currentScrollY > lastScrollY) {
        navbar.classList.add('navbar-hidden');
        } else {
        navbar.classList.remove('navbar-hidden');
        }

        lastScrollY = currentScrollY;

        if (window.scrollY > 0) {
            navbar.classList.add('navbar-scroll');
        } else {
            navbar.classList.remove('navbar-scroll');
        }
    });
}

function initMobileDropdown() {
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    

    mobileDropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        mobileDropdown.classList.toggle('active');
    })
}

let currentLanguage = localStorage.getItem('arcsLanguage') || 'en';

const translations = {
    en: {
        nav: {
            home: 'Home',
            locations: 'Locations',
            resources: 'Resources',
            careers: 'Careers',
            employees: 'Employees',
            about: 'About Us',
            contact: 'Contact'
        },
        home: {
        hero: {
            eyebrow: 'ARCS Restaurant Management',
            title: 'Growing teams. Serving communities. Building better restaurants.',
            locationsButton: 'View Locations',
            careersButton: 'Careers',
            cardOne: '18 Restaurants & Growing',
            cardTwo: 'Proudly Serving 2 Counties',
            cardThree: 'Team Growth'
            },
            locations: {
            eyebrow: 'Our Restaurants',
            heading: 'Proudly serving Riverside & San Bernardino',
            description: 'ARCS Restaurant Management proudly operates 18 restaurants across Riverside and San Bernardino. Our teams are focused on service, speed, quality, and operational excellence — building stronger restaurants and better guest experiences in every community we serve.'
            },
            careers: {
            eyebrow: 'Career Opportunities',
            heading: 'Your Best First Job Starts Here. Grow With Us!',
            positions: 'Positions Available:',
            crew: 'Crew',
            shiftLeaders: 'Shift Leaders',
            maintenance: 'Maintenance',
            note: 'Click on the McHire link below to apply at one of our locations. If you are an experienced manager looking for an opportunity, contact our office at 951-929-9934.',
            button: 'Apply With McHire'
            },
            employees: {
            heading: 'Employee Resources'
            }
        },
        footer: {
        tagline: 'Serving and Delivering Excellence Across Southern California.',
        officeHeading: 'Office Location',
        officeHours: 'Office Hours: Mon - Thurs (9AM - 3PM)',
        quickLinks: 'Quick Links',
        home: 'Home',
        locations: 'Locations',
        careers: 'Careers',
        employees: 'Employees',
        about: 'About Us',
        contact: 'Contact',
        follow: 'Follow Us',
        copyright: '© 2026 ARCS Restaurant Management. All Rights Reserved.',
        credit: 'Designed & Developed by Magaña Techforce'
        },
        about: {
            hero: {
                heading: 'About Us',
                description: 'At ARCS Restaurant Management, we are committed to creating opportunities, building strong teams, and delivering exceptional guest experiences across every restaurant we operate. Through leadership, service, and community involvement, we continue to grow while supporting the people who make our success possible.'
            },
            operators: {
                eyebrow: 'Leadership & Growth',
                heading: 'A Warm Welcome From Our Owner/Operators',
                description: 'Randy and Ramin began their McDonald’s careers as crew members before becoming approved Owner/Operators in 2010. Their journey reflects years of hard work, leadership, and dedication to the restaurant business. Today, they remain committed to building strong teams, creating growth opportunities, and maintaining a positive environment where every employee feels valued, supported, and proud to serve their community.'
            },
            mission: {
                eyebrow: 'Built on Excellence',
                heading: 'Our Mission',
                cardOneTitle: 'Mission',
                cardOneText: 'Our mission is to make delicious feel-good moments easy for everyone. This is how we uniquely feed and foster communities. We serve delicious food people feel good about eating, with convenient locations and hours and affordable prices, and by working hard to offer the speed, choice, and personalization our customers expect. At our best, we don’t just serve food, we serve moments of feel- good, all with the lighthearted, unpretentious, welcoming, dependable personality consumers know and love.',
                cardTwoTitle: 'Mission Statement',
                cardTwoText: 'To operate a profitable organization with the highest training standards, allowing our internal customers to give the best and friendliest service to our External guests with EXCEPTIONAL QSC.',
                cardThreeTitle: 'Operator Vision',
                cardThreeText: 'We will support and protect our D-Thru operations while maximizing sales and profit. We will continue to strengthen our team by providing growth and development opportunities to our employees, while continuing to maintain great working relationships with the Company and all suppliers.'
            },
            values: {
                eyebrow: 'Our Commitment',
                heading: 'Our Values',
                serveTitle: 'Serve',
                serveText: 'We Put Our Customers and People First. Every decision we make as an organization considers, “What does this mean for all of our customers and people?"',
                inclusionTitle: 'Inclusion',
                inclusionText: 'We Open Our Doors to Everyone. We want people to feel welcomed and supported in bringing their authentic selves to our restaurants and offices.',
                integrityTitle: 'Integrity',
                integrityText: 'We Do the Right Thing. We consider the impact of every decision we make as a company so we can stand by them with confidence.',
                communityTitle: 'Community',
                communityText: 'We Are Good Neighbors. In addition to many global initiatives, we support and serve our local communities.',
                familyTitle: 'Family',
                familyText: 'We are Better Together. With the three-legged stool (company staff, franchisees and supplier), we know none of us is as good as all of us.',
            },
            community: {
                eyebrow: 'Community & Care',
                heading: 'Our Resources',
                resourceTitleOne: 'Our Food',
                resourceTextOne: 'Explore how we at McDonalds commit to fresh, quality ingredients—like 100% real beef patties, freshly cracked eggs, and no artificial preservatives in our core burgers.',
                resourceLinkOne: 'Our Food',
                resourceTitleTwo: 'Nutrition Information',
                resourceTextTwo: 'Find full nutrition and ingredient details for every McDonald’s menu item—designed to help you make informed choices and check allergen info easily.',
                resourceLinkTwo: 'Nutrition Information',
                resourceTitleThree: 'Our Cause',
                resourceTextThree: 'We’re proud to support the Ronald McDonald House – Inland Empire through donations and community programs—helping families of seriously ill children in the Inland Empire region.',
                resourceLinkThree: 'Our Cause'
            }
        },
        contact: {
            hero: {
            eyebrow: 'Contact ARCS',
            heading: 'We’re Here To Help',
            description: 'Have a question for our office? Send us a message and our team will respond within two business days.',
            officeHours: 'Office Hours: Mon - Thurs (9AM - 3PM)'
            },
            form: {
            firstNameLabel: 'First Name',
            firstNamePlaceholder: 'First Name',
            lastNameLabel: 'Last Name',
            lastNamePlaceholder: 'Last Name',
            emailLabel: 'Email',
            emailPlaceholder: 'Enter Email',
            subjectLabel: 'Subject',
            subjectPlaceholder: 'Subject',
            messageLabel: 'Message',
            messagePlaceholder: 'Message',
            submit: 'Submit Message'
            }
        },
        common: {
            viewLocation: 'View Location'
        }
    },
    es: {
        nav: {
            home: 'Inicio',
            locations: 'Ubicaciones',
            resources: 'Recursos',
            careers: 'Empleos',
            employees: 'Empleados',
            about: 'Sobre Nosotros',
            contact: 'Contactenos'
        },
        home: {
        hero: {
            eyebrow: 'ARCS Restaurant Managament',
            title: 'Creciendo equipos. Mejorando restaurantes.',
            locationsButton: 'Ver Ubicaciones',
            careersButton: 'Empleos',
            cardOne: '18 Restaurantes y Creciendo',
            cardTwo: 'Orgullosamente Sirviendo 2 Condados',
            cardThree: 'Crecimiento del Equipo'
            },
            locations: {
            eyebrow: 'Nuestros Restaurantes',
            heading: 'Orgullosos de servir a los condados de Riverside y San Bernardino',
            description: 'ARCS Restaurant Management se enorgullece de operar 18 restaurantes en Riverside y San Bernardino. Nuestros equipos se centran en el servicio, la rapidez, la calidad y la excelencia operativa, con el objetivo de fortalecer nuestros restaurantes y ofrecer una mejor experiencia a los clientes en cada comunidad en la que prestamos servicio.'
            },
            careers: {
            eyebrow: 'Oportunidades Profesionales',
            heading: '¡Tu Mejor Primer Trabajo Comienza Aquí. Crece Con Nosotros!',
            positions: 'Posiciones Disponibles:',
            crew: 'Equipo',
            shiftLeaders: 'Líderes De Turno',
            maintenance: 'Mantenimiento',
            note: 'Haz clic en el enlace de McHire a continuación para solicitar empleo en una de nuestras ubicaciones. Si eres un gerente con experiencia en busca de una oportunidad, comunícate con nuestra oficina al 951-929-9934.',
            button: 'Aplicar Con McHire'
            },
            employees: {
            heading: 'Recursos Para Empleados'
            }
        },
        footer: {
        tagline: 'Sirviendo y ofreciendo excelencia en todo el sur de California.',
        officeHeading: 'Ubicación De La Oficina',
        officeHours: 'Horario De Oficina: Lun - Jue (9AM - 3PM)',
        quickLinks: 'Enlaces Rápidos',
        home: 'Inicio',
        locations: 'Ubicaciones',
        careers: 'Empleos',
        employees: 'Empleados',
        about: 'Sobre Nosotros',
        contact: 'Contacto',
        follow: 'Síguenos',
        copyright: '© 2026 ARCS Restaurant Management. Todos Los Derechos Reservados.',
        credit: 'Diseñado y desarrollado por Magaña Techforce'
        },
        about: {
            hero: {
                heading: 'Sobre Nosotros',
                description: 'En ARCS Restaurant Management, nos comprometemos a crear oportunidades, formar equipos sólidos y ofrecer una experiencia excepcional a los clientes en todos los restaurantes que gestionamos. A través del liderazgo, el servicio y la participación en la comunidad, seguimos creciendo al tiempo que apoyamos a las personas que hacen posible nuestro éxito.'
            },
            operators: {
                eyebrow: 'Liderazgo y Crecimiento',
                heading: 'Una Cordial Bienvenida De Parte De Nuestros Propietarios y Administradores',
                description: 'Randy y Ramin comenzaron su trayectoria profesional en McDonald’s como miembros del equipo antes de convertirse en propietarios-operadores autorizados en 2010. Su trayectoria refleja años de esfuerzo, liderazgo y dedicación al sector de la restauración. Hoy en día, siguen comprometidos con la formación de equipos sólidos, la creación de oportunidades de crecimiento y el mantenimiento de un ambiente positivo en el que cada empleado se sienta valorado, apoyado y orgulloso de servir a su comunidad.'
            },
             mission: {
                eyebrow: 'Construido con Excelencia',
                heading: 'Nuestra Misión',
                cardOneTitle: 'Misión',
                cardOneText: 'Nuestra misión es hacer que todo el mundo pueda disfrutar fácilmente de momentos deliciosos y agradables. Así es como alimentamos y apoyamos a las comunidades de una manera única. Ofrecemos comida deliciosa que la gente disfruta comer, con ubicaciones y horarios convenientes y precios accesibles, y nos esforzamos por brindar la rapidez, la variedad y la personalización que nuestros clientes esperan. En el mejor de los casos, no solo servimos comida, sino que servimos momentos de bienestar, todo ello con el carácter alegre, sencillo, acogedor y confiable que los consumidores conocen y aprecian.',
                cardTwoTitle: 'Declaración de Misión',
                cardTwoText: 'Operar una organización lucrativa con los más altos estándares de entrenamiento, permitiendo que nuestros clientes internos brinden el mejor y más cordial servicio a nuestros huéspedes externos con una calidad, servicio y cortesía (QSC) EXCEPCIONALES.',
                cardThreeTitle: 'Visión del Operador',
                cardThreeText: 'Apoyaremos y protegeremos nuestras operaciones de D-Thru, al tiempo que maximizamos las ventas y las ganancias. Seguiremos fortaleciendo nuestro equipo ofreciendo oportunidades de crecimiento y desarrollo a nuestros empleados, sin dejar de mantener excelentes relaciones de trabajo con la empresa y todos los proveedores.'
            },
             values: {
                eyebrow: 'Nuestro Comprpmiso',
                heading: 'Nuestro Valores',
                serveTitle: 'Servir',
                serveText: 'Para nosotros, nuestros clientes y nuestra gente son lo primero. Cada decisión que tomamos como organización tiene en cuenta la siguiente pregunta: «¿Qué significa esto para todos nuestros clientes y nuestra gente?».',
                inclusionTitle: 'Inclusión',
                inclusionText: 'Abrimos nuestras puertas a todo el mundo. Queremos que las personas se sientan bienvenidas y apoyadas para que puedan mostrarse tal y como son en nuestros restaurantes y oficinas.',
                integrityTitle: 'Integridad',
                integrityText: 'Hacemos lo correcto. Tenemos en cuenta el impacto de cada decisión que tomamos como empresa para poder respaldarlas con confianza.',
                communityTitle: 'Comunidad',
                communityText: 'Somos buenos vecinos. Además de numerosas iniciativas a nivel mundial, apoyamos y prestamos servicio a nuestras comunidades locales.',
                familyTitle: 'Familia',
                familyText: 'Juntos somos mejores. Con este modelo de tres pilares (el personal de la empresa, los franquiciados y los proveedores), sabemos que ninguno de nosotros es tan bueno como todos juntos.',
            },
             community: {
                eyebrow: 'Comunidad y Atención',
                heading: 'Nuestros Recursos',
                resourceTitleOne: 'Nuestra Comida',
                resourceTextOne: 'Descubre cómo en McDonalds nos comprometemos a utilizar ingredientes frescos y de calidad, como hamburguesas de carne 100 % auténtica, huevos recién cascanados y la ausencia de conservantes artificiales en nuestras hamburguesas principales.',
                resourceLinkOne: 'Nuestra Comida',
                resourceTitleTwo: 'Información Nutricional',
                resourceTextTwo: 'Consulta todos los detalles sobre los ingredientes y la información nutricional de cada producto del menú de McDonald’s, diseñados para ayudarte a tomar decisiones informadas y consultar fácilmente la información sobre alérgenos.',
                resourceLinkTwo: 'Info. Nutricional',
                resourceTitleThree: 'Nuestra Causa',
                resourceTextThree: 'Nos enorgullece apoyar a la Casa Ronald McDonald – Inland Empire a través de donaciones y programas comunitarios, ayudando a las familias de niños con enfermedades graves en la región de Inland Empire.',
                resourceLinkThree: 'Nuestra Causa'
            }
        },
        contact: {
                hero: {
                eyebrow: 'Contacto ARCS',
                heading: 'Estamos Aquí Para Ayudarte',
                description: '¿Tienes alguna pregunta para nuestra oficina? Envíanos un mensaje y nuestro equipo responderá dentro de dos días hábiles.',
                officeHours: 'Horario De Oficina: Lun - Jue (9AM - 3PM)'
                },
                form: {
                firstNameLabel: 'Nombre',
                firstNamePlaceholder: 'Nombre',
                lastNameLabel: 'Apellido',
                lastNamePlaceholder: 'Apellido',
                emailLabel: 'Correo Electrónico',
                emailPlaceholder: 'Ingresa Tu Correo',
                subjectLabel: 'Asunto',
                subjectPlaceholder: 'Asunto',
                messageLabel: 'Mensaje',
                messagePlaceholder: 'Mensaje',
                submit: 'Enviar Mensaje'
                }
        },
        common: {
            viewLocation: 'Ver Ubicación'
        }
    }
}

function getTranslation(key) {
    return key.split('.').reduce((object, part) => {
        return object[part];
    }, translations[currentLanguage]);
}

function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');


    elements.forEach((element) => {
        const key = element.dataset.i18n;
        const keyParts = key.split('.');

        const translatedText = getTranslation(key);

        element.textContent = translatedText;
    });

    placeholderElements.forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const translatedText = getTranslation(key);

    element.placeholder = translatedText;
});

}


const announcements = [
    {
        badge: {
            en: 'Now Open',
            es: 'Ya Abrimos'
        },
        title: {
            en: 'Our New San Jacinto Location Is Now Open',
            es: 'Nuestra Nueva Ubicación en San Jacinto Ya Está Abierta'
        },
        message: {
            en: 'We are excited to continue growing our team and serving more guests in the San Jacinto community.',
            es: 'Estamos emocionados de seguir creciendo nuestro equipo y atendiendo a más clientes en la comunidad de San Jacinto.'
        },
        location: {
            en: 'Now Open • San Jacinto, CA',
            es: 'Ya Abrimos • San Jacinto, CA'
        }
    },
    {
        badge: {
            en: 'Community Growth',
            es: 'Crecimiento Comunitario'
        },
        title: {
            en: '18 Restaurants Across Riverside & San Bernardino',
            es: '18 restaurantes en Riverside y San Bernardino'
        },
        message: {
            en: 'ARCS Restaurant Management continues to grow across Southern California while serving local communities with operational excellence and strong team leadership.',
            es: 'ARCS Restaurant Management sigue creciendo en todo el sur de California, al mismo tiempo que presta servicio a las comunidades locales con excelencia operativa y un sólido liderazgo de equipo.'
        },
        location: {
            en: '',
            es: ''
        }
    },
    {
        badge: {
            en: 'Operational Excellence',
            es: 'Excelencia Operacional'
        },
        title: {
            en: 'Focused On Speed, Service & Guest Experience',
            es: 'Enfocados en la rapidez, el servicio y la experiencia del cliente'
        },
        message: {
            en: 'Our restaurants are committed to delivering consistent quality, fast service, and exceptional guest experiences across every location we operate.',
            es: 'Nuestros restaurantes se comprometen a ofrecer calidad constante, servicio rápido y experiencias excepcionales para los clientes en cada ubicación que operamos.'
        },
        location: {
            en: '',
            es: ''
        }
    }
]

let currentAnnouncementIndex = 0;

function renderAnnouncement() {
    const announcementContainer = document.querySelector('#announcement-container');

    if (!announcementContainer) {
        return;
    }

    announcementContainer.innerHTML = '';

    const currentAnnouncement = announcements[currentAnnouncementIndex];

    const announcementCard = createAnnouncementCard(currentAnnouncement);

    announcementContainer.appendChild(announcementCard);

}

function nextAnnouncement() {
    const currentCard = document.querySelector('.announcement-card');

    if (currentCard) {
        currentCard.classList.add('slide-out');
    }

    setTimeout(function () {
        currentAnnouncementIndex++;

        if (currentAnnouncementIndex >= announcements.length) {
            currentAnnouncementIndex = 0;
        }

        renderAnnouncement();
    }, 400);
}

renderAnnouncement();

const interval = setInterval(nextAnnouncement, 4000);

function createAnnouncementCard(announcement) {
    const announcementCard = document.createElement('div');
    announcementCard.classList.add('announcement-card');

    const announcementBadge = document.createElement('p');
    announcementBadge.classList.add('announcement-badge');
    announcementBadge.textContent = announcement.badge[currentLanguage];

    const title = document.createElement('h2');
    title.classList.add('announcement-title');
    title.textContent = announcement.title[currentLanguage];

    const announcementMessage = document.createElement('p');
    announcementMessage.classList.add('announcement-message');
    announcementMessage.textContent = announcement.message[currentLanguage];

    const announcementLocation = document.createElement('small');
    announcementLocation.classList.add('announcement-location');
    announcementLocation.textContent = announcement.location[currentLanguage];

    announcementCard.appendChild(announcementBadge);
    announcementCard.appendChild(title);
    announcementCard.appendChild(announcementMessage);
    announcementCard.appendChild(announcementLocation);

    return announcementCard;
}

const locations = [
    {
        name: 'Lake Arrowhead',
        address: '28200 Highway 189',
        city: 'Lake Arrowhead',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/arPWSH6bPwJi6wqa6'
    },
    {
        name: 'Big Bear',
        address: '41412 Big Bear Blvd',
        city: 'Big Bear',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/LydPg8w9toAxDQwP8'
    },
    {
        name: 'Crestline',
        address: '24078 Lake Drive',
        city: 'Crestline',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/C4SaZ9YDhYHioUZR9'
    },
    {
        name: 'Highland',
        address: '27774 Base Line St',
        city: 'Highland',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/rTmvZhE2LMaLeXwC9'
    },
    {
        name: 'Colton',
        address: '1201 S Mt Vernon Ave',
        city: 'Colton',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/EHdUZAuwfXUXEn3t9'
    },
    {
        name: 'Colton',
        address: '225 W Valley Blvd',
        city: 'Colton',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/hwgWirjii8KN4nJo9'
    },
    {
        name: 'Riverside',
        address: '2246 Iowa Ave',
        city: 'Riverside',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/uxC1C91pxMRzvo6j6'
    },
    {
        name: 'Perris',
        address: '1675 N Perris Blvd',
        city: 'Perris',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/sDUTCRPBYtwjt3HH6'
    },
    {
        name: 'Perris',
        address: '1800 N Perris Blvd',
        city: 'Perris',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/PZrJVzxJsWwfNBYQ9'
    },
    {
        name: 'Perris',
        address: '64 E. Ramona Expy',
        city: 'Perris',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/2hfEWbMcPNuxwpxM9'
    },
    {
        name: 'San Jacinto',
        address: '611 N. State St',
        city: 'San Jacinto',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/TUgTz8SJTHqsqYFB9'
    },
    {
        name: 'San Jacinto',
        address: '1861 S San Jacinto',
        city: 'San Jacinto',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/emAgTUdn91HCA3Fq7'
    },
    {
        name: 'San Jacinto',
        address: '528 W Ramona Expy',
        city: 'San Jacinto',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/aUg784MrvX5327fs6'
    },
    {
        name: 'Hemet',
        address: '1231 S Sanderson Ave',
        city: 'Hemet',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/SUjf7DYwwBfheZcg7'
    },
    {
        name: 'Hemet',
        address: '1855 E Florida Ave',
        city: 'Hemet',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/tFh4hjzgqzSYNNG36'
    },
    {
        name: 'Hemet',
        address: '2321 W Florida Ave',
        city: 'Hemet',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/xxPB1FRwsK7F2gjd9'
    },
    {
        name: 'Hemet',
        address: '290 W Stetson Ave',
        city: 'Hemet',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/fQ7zUkbhxdF63Vxw6'
    },
    {
        name: 'Beaumont',
        address: '1492 2nd St',
        city: 'Beaumont',
        state: 'CA',
        mapLink: 'https://maps.app.goo.gl/1LURw9FmBJYuvZpF7'
    },
];

function renderLocations() {
     const locationsGrid = document.querySelector('#locations-grid');

    if (!locationsGrid) {
        return;
    }

    locationsGrid.innerHTML = '';

    locations.forEach((location, index) => {
        locationsGrid.appendChild(createLocationCard(location, index));
    });
}

function createLocationCard(location, index) {
        const card = document.createElement('div');
        card.classList.add('location-card');
    
        if (index % 2 === 0) {
            card.classList.add('location-card', 'reveal-left');
            } else {
            card.classList.add('location-card', 'reveal-right');
            }

        const h2 = document.createElement('h2');
        h2.textContent = location.name;
        h2.classList.add('location-heading');

        const address = document.createElement('p');
        address.textContent = location.address;
        address.classList.add('location-address');

        const city = document.createElement('p');
        city.textContent = `${location.city}, ${location.state}`;
        city.classList.add('location-city')

        const link = document.createElement('a');
        link.textContent = translations[currentLanguage].common.viewLocation;
        link.classList.add('location-link')
        link.href = location.mapLink;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    
        card.appendChild(h2);
        card.appendChild(address);
        card.appendChild(city);
        card.appendChild(link);

    return card;
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
}

async function fetchEmployeeResources() {
    try {
        const res = await fetch('/JSON/employees.json');

        if (!res.ok) {
            throw new Error('Failed to fetch employees resources');
        }

        const data = await res.json();

        return data;

    } catch (error) {
        console.log(error)
        return [];
    }
}

async function renderEmployeeResources() {
    const employeesGrid = document.querySelector('#employees-grid');
    const resources = await fetchEmployeeResources();

    if (!employeesGrid) {
        return;
    }

    employeesGrid.innerHTML = '';

    resources.forEach(resource => {
        employeesGrid.appendChild(createEmployeeResourceCard(resource))
    });
}

function createEmployeeResourceCard(resource) {
    const employeeCard = document.createElement('div');
    employeeCard.classList.add('employee-card');
    
    const title = document.createElement('h2')
    title.classList.add('resource-title');
    title.textContent = resource.title;

    const description = document.createElement('p');
    description.classList.add('resource-description')
    description.textContent = resource.description[currentLanguage];

    const button = document.createElement('a');
    button.classList.add('resource-btn')
    button.textContent = resource.buttonText;
    button.href = resource.buttonLink;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    
    employeeCard.appendChild(title);
    employeeCard.appendChild(description);
    employeeCard.appendChild(button);

    return employeeCard;
}

function initLanguageToggle() {
    const languageToggle = document.querySelectorAll('.language-toggle');
    const mobileMenu = document.querySelector('.mobile-menu-items');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileDropdown = document.querySelector('.mobile-dropdown');

    if (!languageToggle) {
        return;
    }

    languageToggle.forEach(language => {
        language.addEventListener('click', (e) => {
            e.preventDefault();
    
            if (currentLanguage === 'en') {
                currentLanguage = 'es';
            } else {
                currentLanguage = 'en';
            }
    
            localStorage.setItem('arcsLanguage', currentLanguage);
    
            renderEmployeeResources();
            translatePage();
            renderAnnouncement();
            renderLocations();
            initScrollReveal();

            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }

            if (menuToggle) {
                menuToggle.classList.remove('active');
            }

            if (mobileDropdown) {
                mobileDropdown.classList.remove('active');
            }

            document.body.style.overflow = '';
        })

    })
}