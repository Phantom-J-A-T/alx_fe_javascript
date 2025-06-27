// Initial array of quote objects
let quotes = [
    { text: "Stay hungry, stay foolish.", category: "Inspiration" },
    { text: "Talk is cheap. Show me the code.", category: "Technology" },
    { text: "Simplicity is the soul of efficiency.", category: "Productivity" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    const container = document.getElementById("quoteDisplay");
    container.innerHTML = ""; // Clear previous quote
  
    const blockquote = document.createElement("blockquote");
    blockquote.textContent = `"${quote.text}"`;
  
    const category = document.createElement("p");
    category.innerHTML = `<em>Category: ${quote.category}</em>`;
  
    container.appendChild(blockquote);
    container.appendChild(category);

    const currentFilter = document.getElementById("categoryFilter").value || "all";
    filterQuotes(currentFilter);
  }
  

  const reloadQuote = document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Function to create and display a form for adding quotes
  function createAddQuoteForm() {
    const formContainer = document.getElementById("formContainer");
  
    const heading = document.createElement("h3");
    heading.textContent = "Add a New Quote";
  
    const form = document.createElement("form");
    form.id = "quoteForm";
  
    const inputText = document.createElement("textarea");
    inputText.id = "quoteText";
    inputText.placeholder = "Enter quote here";
    inputText.required = true;
  
    const inputCategory = document.createElement("input");
    inputCategory.type = "text";
    inputCategory.id = "quoteCategory";
    inputCategory.placeholder = "Enter related category";
    inputCategory.required = true;
  
    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.textContent = "Add Quote";
  
    form.appendChild(inputText);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(inputCategory);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(addButton);
  
    formContainer.appendChild(heading);
    formContainer.appendChild(form);
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const newText = inputText.value.trim();
      const newCategory = inputCategory.value.trim();
  
      if (newText && newCategory) {
        const newQuote = { text: newText, category: newCategory };
        quotes.push(newQuote);  
        postQuoteToServer(newQuote);
        alert("Quote added successfully!");
        showRandomQuote();
        form.reset();
        localStorage.setItem("quotes", JSON.stringify(quotes)); // Save to local storage
      }
      
    });
  }
    // Function to load quotes from local storage
    function loadQuotesFromLocalStorage() {
        const storedQuotes = localStorage.getItem("quotes");
        if (storedQuotes) {
            quotes = JSON.parse(storedQuotes);
        }
        }
        // Posting of Quotes to Servers
    function postQuoteToServer(quote) {
      fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
      })
    .then(response => response.json())
    .then(data => console.log("Quote posted to server:", data))
    .catch(error => console.error("Error posting quote:", error));

    // Simulate fetching quotes from a server
    function fetchQuotesFromServer() {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5") // mock GET
    .then(response => response.json())
    .then(data => {
      const fetchedQuotes = data.map(post => ({
        text: post.title,
        category: "Server Data"
      }));

      quotes = quotes.concat(fetchedQuotes);
      populateCategories();
      showRandomQuote();
      console.log("Quotes updated from server.");
    })
    .catch(error => console.error("Failed to fetch quotes:", error));
}

}


document.getElementById("exportQuotes").addEventListener("click", function () {
  const jsonData = JSON.stringify(quotes, null, 2); // Pretty-printed
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});


document.getElementById("importQuotes").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes = quotes.concat(importedQuotes.filter(q => q.text && q.category));
          alert("Quotes imported successfully!");
          showRandomQuote();
        } else {
          alert("Invalid file format. Expected an array of quotes.");
        }
      } catch (err) {
        alert("Error reading JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
  });
  
    // Function to filter quotes by category
  function populateCategories() {
    const dropdown = document.getElementById("categoryFilter");
  
    // Clear existing options except "All"
    dropdown.innerHTML = '<option value="all">All</option>';
  
    const categories = [...new Set(quotes.map(q => q.category))];
  
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      dropdown.appendChild(option);
    });
  
    // Restore last selected filter
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
      dropdown.value = savedCategory;
      filterQuotes(savedCategory);
    }
  }
  
  // Event listener for category filter based on category selection
  function filterQuotes(category) {
    const container = document.getElementById("quoteDisplay");
    container.innerHTML = ""; // Clear previous
  
    let filtered = category === "all" ? quotes : quotes.filter(q => q.category === category);
  
    if (filtered.length === 0) {
      container.textContent = "No quotes found in this category.";
      return;
    }
  
    const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  
    const blockquote = document.createElement("blockquote");
    blockquote.textContent = `"${randomQuote.text}"`;
  
    const cat = document.createElement("p");
    cat.innerHTML = `<em>Category: ${randomQuote.category}</em>`;
  
    container.appendChild(blockquote);
    container.appendChild(cat);
  }

  // Dropdown manager
  document.getElementById("categoryFilter").addEventListener("change", function () {
    const selectedCategory = this.value;
    localStorage.setItem("selectedCategory", selectedCategory);
    filterQuotes(selectedCategory);
  });

  

  
  populateCategories();

  // Fetch server quotes every 30 seconds
  setInterval(fetchQuotesFromServer, 30000);

  
  // Optionally run these on load
  window.onload = function () {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) quotes = JSON.parse(storedQuotes);
  
    populateCategories();
    showRandomQuote();
    createAddQuoteForm();
  
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);

    fetchQuotesFromServer(); // initial fetch
    setInterval(fetchQuotesFromServer, 30000); // repeat every 30 seconds
  };