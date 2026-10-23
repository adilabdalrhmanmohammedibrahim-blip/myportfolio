// Shared by the dashboard and the blog page
const STORAGE_KEY = "techblogPosts";

const categories = {
  "technology":      { label: "Technology",      css: "tag-tech" },
  "design":          { label: "Design",          css: "tag-design" },
  "business":        { label: "Business",        css: "tag-business" },
  "personal growth": { label: "Personal Growth", css: "tag-growth" },
  "programming":     { label: "Programming",     css: "tag-code" }
};

// Shown the first time, before you add or delete anything
const starterPosts = [
  {
    id: 1,
    title: "Top 10 Web Development Trends in 2026",
    category: "technology",
    summary: "Discover the latest trends shaping the future of web development and how to stay ahead in your career.",
    date: "2026-10-01",
    image: "images/post1.png"
  },
  {
    id: 2,
    title: "The Power of UI/UX Design in Modern Apps",
    category: "design",
    summary: "Good design isn't just about looks. It's about creating experiences for your users.",
    date: "2026-09-24",
    image: "images/post2.png"
  },
  {
    id: 3,
    title: "5 Habits for a More Productive Life",
    category: "personal growth",
    summary: "Simple daily habits that can help you focus, stay motivated and achieve your goals.",
    date: "2026-09-15",
    image: "images/post3.png"
  }
];

function loadPosts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) {
      return saved;
    }
  } catch (error) {
    // damaged data: fall back to the starter posts
  }
  return starterPosts.slice();
}

function savePosts(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}