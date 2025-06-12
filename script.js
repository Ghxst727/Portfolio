
// Cursor follower effect
const cursorFollower = document.getElementById("cursorFollower");

document.addEventListener("mousemove", (e) => {
  cursorFollower.style.left = e.clientX + "px";
  cursorFollower.style.top = e.clientY + "px";
});

// Navigation functionality
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".content-section");

// Enhanced navigation click handler
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove active class from all nav items
    navItems.forEach((nav) => nav.classList.remove("active"));
    // Add active class to clicked item
    item.classList.add("active");

    // Get target section
    const targetSection = item.getAttribute("data-section");
    const targetElement = document.getElementById(targetSection);

    if (targetElement) {
      // Smooth scroll with offset for better positioning
      const offset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Enhanced Intersection Observer for scroll-based navigation
const observerOptions = {
  threshold: [0.1, 0.5, 0.9],
  rootMargin: "-20% 0px -35% 0px",
};

const observer = new IntersectionObserver((entries) => {
  let maxRatio = 0;
  let activeEntry = null;

  // Find the section with the highest intersection ratio
  entries.forEach((entry) => {
    if (entry.intersectionRatio > maxRatio) {
      maxRatio = entry.intersectionRatio;
      activeEntry = entry;
    }
  });

  // Update active navigation item
  if (activeEntry && activeEntry.intersectionRatio > 0.1) {
    const sectionId = activeEntry.target.id;
    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("data-section") === sectionId) {
        item.classList.add("active");
      }
    });
  }
}, observerOptions);

// Observe all sections
sections.forEach((section) => {
  observer.observe(section);
});

// Throttled scroll handler for performance
let ticking = false;

function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;

  // Optional: Add scroll progress indicator
  document.documentElement.style.setProperty(
    "--scroll-progress",
    scrollPercent
  );

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollProgress);
    ticking = true;
  }
});

// Enhanced project and experience hover effects
const projectItems = document.querySelectorAll(".project-item");
const experienceItems = document.querySelectorAll(".experience-item");

projectItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    // Add subtle scale effect to project image
    const image = item.querySelector(".project-image");
    if (image) {
      image.style.transform = "scale(1.05)";
      image.style.transition = "transform 0.3s ease";
    }
    
    // Add lift effect to the entire project item
    item.style.transform = "translateY(-4px)";
  });

  item.addEventListener("mouseleave", () => {
    const image = item.querySelector(".project-image");
    if (image) {
      image.style.transform = "scale(1)";
    }
    
    // Reset lift effect
    item.style.transform = "translateY(0)";
  });
});

experienceItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    // Add lift effect to the experience item
    item.style.transform = "translateY(-4px)";
    // Add background highlight effect
    item.style.background = "linear-gradient(135deg, rgba(139, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.2) 100%)";
    item.style.boxShadow = "0 4px 12px -4px rgba(139, 0, 0, 0.3)";
  });

  item.addEventListener("mouseleave", () => {
    // Reset lift effect
    item.style.transform = "translateY(0)";
    // Reset background
    item.style.background = "transparent";
    item.style.boxShadow = "none";
  });

  item.addEventListener("click", ()=>{
    document.location.href = item.project-description.href;
  })
});

// Handle navigation visibility on scroll
let lastScrollTop = 0;
const navbar = document.querySelector(".nav");

window.addEventListener(
  "scroll",
  () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add subtle fade effect based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.opacity = "0.7";
    } else {
      // Scrolling up
      navbar.style.opacity = "1";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  },
  false
);

// Initialize active state based on current scroll position
document.addEventListener("DOMContentLoaded", () => {
  // Set initial active section
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    const aboutNavItem = document.querySelector('[data-section="about"]');
    if (aboutNavItem) {
      aboutNavItem.classList.add("active");
    }
  }
});

// Smooth scroll for archive and resume links
document.querySelectorAll(".view-archive, .view-resume").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Add any custom behavior here, such as opening in new tab
    console.log("Link clicked:", link.textContent);
  });
});

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    const activeNav = document.querySelector(".nav-item.active");
    const allNavItems = Array.from(navItems);
    const currentIndex = allNavItems.indexOf(activeNav);

    let nextIndex;
    if (e.key === "ArrowUp") {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : allNavItems.length - 1;
    } else {
      nextIndex = currentIndex < allNavItems.length - 1 ? currentIndex + 1 : 0;
    }

    // Simulate click on next nav item
    allNavItems[nextIndex].click();
    e.preventDefault();
  }
});
