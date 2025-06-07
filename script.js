async function getProfile() {
  const username = document.getElementById("usernameInput").value.trim();
  const profileDiv = document.getElementById("profile");

  if (!username) {
    profileDiv.innerHTML = "<p style='color:red;'>Please enter a GitHub username</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    profileDiv.innerHTML = `
      <div class="profile-card">
        <img src="${data.avatar_url}" alt="${data.name}'s avatar" />
        <h2>${data.name || "Name Not Available"}</h2>
        <p>${data.bio || "No bio provided"}</p>
        <p>${data.location || "No location provided"}</p>
        <p>${data.followers} Followers</p>
        <p>${data.following} Following</p>
        <p>${data.public_repos} Public Repositories</p>
        <p>${data.company || "No Company Provided"}</p>
      </div>
      <button class="re-search-btn" onclick="resetSearch()">🔄 Re-Search</button>
    `;
  } catch (err) {
    profileDiv.innerHTML = `<p style='color:red;'>User not found. Please try again.</p>`;
  }
}

function resetSearch() {
  document.getElementById("usernameInput").value = "";
  document.getElementById("profile").innerHTML = "";
}
