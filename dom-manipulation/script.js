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
    
  
  
  // Optionally run these on load
  window.onload = function () {
    showRandomQuote();
    createAddQuoteForm();
  };
  