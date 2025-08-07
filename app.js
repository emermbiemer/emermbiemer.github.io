const contentDiv = document.getElementById('content');

const templates = {
  home: `
    <section id="home">
      <div class="container">
        <div class="title-stack">
          <div class="name-large">ERGI</div>
          <div class="name-large offset">BEZHANI</div>
        </div>
        <div class="subtitle-grid">
          <div class="role">FRONTEND</div>
          <div class="role">DEVELOPER</div>
          <div class="year">2024</div>
        </div>
        <div class="description-block">
          <p>Computer Science graduate specializing in modern web technologies, interactive experiences, and creative coding.</p>
        </div>
      </div>
    </section>
  `,
  about: `
    <section id="about">
      <div class="container">
        <div class="section-header">
          <span class="section-num">02</span>
          <h2 class="section-title">ABOUT</h2>
        </div>
        <div class="about-layout">
          <div class="about-main">
            <p class="about-text">I create digital experiences through code and design. With a Computer Science degree and Master's in Web Technologies, I specialize in frontend development, UI/UX design, and creative coding.</p>
          </div>
          <div class="skills-list">
            <div class="skill-group">
              <span class="skill-label">LANGUAGES</span>
              <div class="skill-items">HTML5 / CSS3 / JavaScript / TypeScript</div>
            </div>
            <div class="skill-group">
              <span class="skill-label">FRAMEWORKS</span>
              <div class="skill-items">React / Vue.js / Next.js / Three.js</div>
            </div>
            <div class="skill-group">
              <span class="skill-label">ANIMATION</span>
              <div class="skill-items">GSAP / Framer Motion / WebGL / CSS</div>
            </div>
            <div class="skill-group">
              <span class="skill-label">TOOLS</span>
              <div class="skill-items">Figma / Git / Webpack / Vite</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  work: `
    <section id="work">
      <div class="container">
        <div class="section-header">
          <span class="section-num">03</span>
          <h2 class="section-title">WORK</h2>
        </div>
        <div class="work-list">
          <div class="work-item">
            <div class="work-header">
              <span class="work-num">001</span>
              <h3 class="work-title"><a href="kai-portfolio.html" class="work-link">KAI PORTFOLIO</a></h3>
              <span class="work-year">2024</span>
            </div>
            <div class="work-desc">Modern portfolio website with smooth animations and interactive elements</div>
            <div class="work-tech">NEXT.JS / FRAMER-MOTION / TAILWIND / TYPESCRIPT</div>
          </div>
          
          <div class="work-item">
            <div class="work-header">
              <span class="work-num">002</span>
              <h3 class="work-title"><a href="living-magazine.html" class="work-link">LIVING MAGAZINE</a></h3>
              <span class="work-year">2024</span>
            </div>
            <div class="work-desc">Editorial magazine website with dynamic layouts and content management</div>
            <div class="work-tech">REACT / NEXT.JS / CSS-MODULES / RESPONSIVE-DESIGN</div>
          </div>
          
          <div class="work-item">
            <div class="work-header">
              <span class="work-num">003</span>
              <h3 class="work-title"><a href="elena-portfolio.html" class="work-link">ELENA PORTFOLIO</a></h3>
              <span class="work-year">2024</span>
            </div>
            <div class="work-desc">Creative portfolio showcasing photography and design work with elegant UI</div>
            <div class="work-tech">REACT / GSAP / CSS-GRID / INTERSECTION-OBSERVER</div>
          </div>
        </div>
      </div>
    </section>
  `,
  contact: `
    <section id="contact">
      <div class="container">
        <div class="section-header">
          <span class="section-num">04</span>
          <h2 class="section-title">CONTACT</h2>
        </div>
        <div class="contact-layout">
          <div class="contact-main">
            <p class="contact-text">Currently seeking opportunities to contribute to innovative projects and collaborate with creative teams.</p>
          </div>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-label">EMAIL</span>
              <a href="mailto:ergiibezhanii@mail.com" class="contact-value">ERGIIBEZHANII@MAIL.COM</a>
            </div>
            <div class="contact-item">
              <span class="contact-label">LINKEDIN</span>
              <a href="https://www.linkedin.com/in/ergiibezhanii/" target="_blank" class="contact-value">ERGIIBEZHANII</a>
            </div>
            <div class="contact-item">
              <span class="contact-label">GITHUB</span>
              <a href="https://github.com/ergibezhanii" target="_blank" class="contact-value">ERGIBEZHANII</a>
            </div>
            <div class="contact-item">
              <span class="contact-label">LOCATION</span>
              <span class="contact-value">ALBANIA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};

const sectionOrder = ['home', 'about', 'work', 'contact'];
let currentSectionIdx = 0;

function renderActiveSection(idx) {
  const key = sectionOrder[idx] || 'home';
  contentDiv.innerHTML = templates[key];
  document.querySelectorAll('.nav-item').forEach((item, idx) => {
    item.classList.toggle('active', idx === currentSectionIdx);
  });
  setTimeout(() => {
    const section = contentDiv.querySelector('section');
    if (section) section.classList.add('fade-in');
  }, 10);
}

function smoothScrollTo(y, duration = 900) {
  const startY = window.scrollY;
  const change = y - startY;
  const startTime = performance.now();
  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + change * easeInOutQuad(progress));
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  requestAnimationFrame(animateScroll);
}

function goToSection(idx) {
  if (idx < 0 || idx >= sectionOrder.length) return;
  currentSectionIdx = idx;
  renderActiveSection(currentSectionIdx);
  // Smooth scroll to top of main#content
  const main = document.querySelector('main#content');
  if (main) {
    const rect = main.getBoundingClientRect();
    const scrollY = window.scrollY + rect.top;
    smoothScrollTo(scrollY, 900);
  }
}

window.addEventListener('load', () => {
  renderActiveSection(currentSectionIdx);

  let wheelAccumulator = 0;
  const WHEEL_THRESHOLD = 100;
  document.querySelector('main#content').addEventListener('wheel', (e) => {
    wheelAccumulator += e.deltaY;
    if (wheelAccumulator > WHEEL_THRESHOLD) {
      goToSection(currentSectionIdx + 1);
      wheelAccumulator = 0;
    } else if (wheelAccumulator < -WHEEL_THRESHOLD) {
      goToSection(currentSectionIdx - 1);
      wheelAccumulator = 0;
    }
    e.preventDefault();
  }, { passive: false });

  document.querySelectorAll('.nav-item').forEach((item, idx) => {
    item.addEventListener('click', () => {
      goToSection(idx);
    });
  });
});
