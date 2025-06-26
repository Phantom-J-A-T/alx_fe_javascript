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
        quotes.push({ text: newText, category: newCategory });
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
  
    
  
  
  // Optionally run these on load
  window.onload = function () {
    showRandomQuote();
    createAddQuoteForm();
  };
  