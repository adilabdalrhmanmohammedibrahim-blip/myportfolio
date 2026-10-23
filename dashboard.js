// ---------- 1. Welcome and log out ----------
const welcome = document.getElementById("welcome");
welcome.textContent = "Welcome, " + localStorage.getItem("userEmail");

document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";
});


// ---------- 3. Draw the table ----------
let posts = loadPosts();
const postsBody = document.getElementById("postsBody");


function formatDate(iso) {
  const date = new Date(iso + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function makeCell(className) {
  const cell = document.createElement("td");
  if (className) {
    cell.className = className;
  }
  return cell;
}

function renderPosts() {
  postsBody.textContent = ""; // empty the table

  posts.forEach(function (post) {
    const row = document.createElement("tr");

    const titleCell = makeCell("post-title");
    titleCell.textContent = post.title;

    const info = categories[post.category] || { label: post.category, css: "tag-code" };
    const categoryCell = makeCell();
    const tag = document.createElement("span");
    tag.className = "tag " + info.css;
    tag.textContent = info.label;
    categoryCell.appendChild(tag);

    const dateCell = makeCell();
    const time = document.createElement("time");
    time.dateTime = post.date;
    time.textContent = formatDate(post.date);
    dateCell.appendChild(time);

    const actionCell = makeCell("actions");
    const view = document.createElement("a");
    view.href = "blog.html";
    view.className = "link-btn";
    view.textContent = "View";

    const del = document.createElement("button");
    del.type = "button";
    del.className = "link-btn danger";
    del.textContent = "Delete";
    del.dataset.id = post.id;
    del.setAttribute("aria-label", "Delete " + post.title);

    actionCell.appendChild(view);
    actionCell.appendChild(del);

    row.appendChild(titleCell);
    row.appendChild(categoryCell);
    row.appendChild(dateCell);
    row.appendChild(actionCell);
    postsBody.appendChild(row);
  });

  statPosts.textContent = posts.length;
  emptyMsg.hidden = posts.length > 0;
}

renderPosts();

// ---------- 4. Delete a post ----------
const confirmBox = document.getElementById("confirmBox");
const confirmText = document.getElementById("confirmText");
let pendingId = null;

postsBody.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-id]");
  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);
  const post = posts.find(function (p) {
    return p.id === id;
  });
  if (!post) {
    return;
  }

  pendingId = id;
  confirmText.textContent = '"' + post.title + '" will be removed from your list.';
  confirmBox.showModal();
});

// runs when the box closes: Delete, Cancel or the Escape key
confirmBox.addEventListener("close", function () {
  if (confirmBox.returnValue === "ok" && pendingId !== null) {
    posts = posts.filter(function (p) {
      return p.id !== pendingId;
    });
    savePosts(posts);
    renderPosts();
  }

  pendingId = null;
  confirmBox.returnValue = "";
});

// ---------- 5. The new post form ----------
const form = document.getElementById("postForm");
const titleInput = document.getElementById("postTitle");
const categoryInput = document.getElementById("postCategory");
const summaryInput = document.getElementById("postSummary");
const summaryCount = document.getElementById("summaryCount");
const postMessage = document.getElementById("postMessage");
const fields = [titleInput, categoryInput, summaryInput];

function showMessage(text, type) {
  postMessage.textContent = text;
  postMessage.className = "form-message full " + type;
}

function setInvalid(input, isInvalid) {
  input.closest(".form-field").classList.toggle("invalid", isInvalid);
}

function updateCount() {
  summaryCount.textContent = summaryInput.value.length + " / 160";
}

function showError(input, text) {
  setInvalid(input, true);
  showMessage(text, "error");
  input.focus();
}

summaryInput.addEventListener("input", updateCount);

// remove the red border as soon as the person fixes the field
fields.forEach(function (input) {
  input.addEventListener("input", function () {
    setInvalid(input, false);
  });
  input.addEventListener("change", function () {
    setInvalid(input, false);
  });
});

// the Clear button
form.addEventListener("reset", function () {
  setTimeout(function () {
    updateCount();
    fields.forEach(function (input) {
      setInvalid(input, false);
    });
    showMessage("", "");
  }, 0);
});

// the Publish button
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const category = categoryInput.value;
  const summary = summaryInput.value.trim();

  fields.forEach(function (input) {
    setInvalid(input, false);
  });

  if (title.length < 5) {
    showError(titleInput, "Please write a title of at least 5 characters.");
    return;
  }

    if (category === "") {
    showError(categoryInput, "Please choose a category.");
    return;
  }

  if (summary.length < 20) {
    showError(summaryInput, "Please write a description of at least 20 characters.");
    return;
  }

  // today's date in the form 2026-10-07, using the local time zone
  
 
  const today = new Date().toLocaleDateString("en-CA");

  posts.unshift({
    id: Date.now(),
    title: title,
    category: category,
    summary: summary,
    date: today
  });

  savePosts(posts);
  renderPosts();

  // empty the form by hand, so the success message stays visible
  titleInput.value = "";
  categoryInput.value = "";
  summaryInput.value = "";
  updateCount();
  showMessage("Post saved. It is now in your list above.", "success");
});