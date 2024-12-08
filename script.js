// Blogs Array and API URL
let blogs = [];
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// DOM Elements
const resultsContainer = document.getElementById("results");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const addBlogBtn = document.getElementById("addBlogBtn");
const addBlogForm = document.getElementById("addBlogForm");
const saveBlogBtn = document.getElementById("saveBlogBtn");
const toggleDarkModeBtn = document.getElementById("toggleDarkMode");

// Fetch Blogs from API
async function fetchBlogs() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        blogs = data.slice(0, 10).map((blog, index) => ({
            title: blog.title,
            content: blog.body,
            category: index % 3 === 0 ? "Technology" : index % 3 === 1 ? "Lifestyle" : "Health",
        }));
        displayBlogs(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
}

// Display Blogs
function displayBlogs(blogList) {
    resultsContainer.innerHTML = "";
    blogList.forEach((blog) => {
        const blogItem = document.createElement("div");
        blogItem.className = "blog-item";
        blogItem.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <span>Category: ${blog.category}</span>
        `;
        resultsContainer.appendChild(blogItem);
    });
}

// Filter Blogs
function filterBlogs() {
    const query = searchBox.value.toLowerCase();
    const category = categoryFilter.value;

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = blog.title.toLowerCase().includes(query);
        const matchesCategory = category === "All" || blog.category === category;
        return matchesSearch && matchesCategory;
    });

    displayBlogs(filteredBlogs);
}

// Add Blog
addBlogBtn.addEventListener("click", () => {
    addBlogForm.style.display = addBlogForm.style.display === "none" ? "block" : "none";
});

saveBlogBtn.addEventListener("click", () => {
    const title = document.getElementById("blogTitle").value;
    const content = document.getElementById("blogContent").value;
    const category = document.getElementById("blogCategory").value;

    if (title && content && category) {
        blogs.push({ title, content, category });
        addBlogForm.style.display = "none";
        filterBlogs();
        alert("Blog added successfully!");
    } else {
        alert("Please fill in all fields.");
    }
});

// Dark Mode Toggle
toggleDarkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Event Listeners
searchBox.addEventListener("input", filterBlogs);
categoryFilter.addEventListener("change", filterBlogs);

// Fetch Blogs on Page Load
fetchBlogs();
