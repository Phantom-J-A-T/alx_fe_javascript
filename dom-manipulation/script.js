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
  
    const quoteContainer = document.getElementById("quoteDisplay");
    quoteContainer.innerHTML = `
      <blockquote>"${quote.text}"</blockquote>
      <p><em>Category: ${quote.category}</em></p>
    `;
  }
  const reloadQuote = document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Function to create and display a form for adding quotes
  function createAddQuoteForm() {
    const formContainer = document.getElementById("formContainer");
  
    formContainer.innerHTML = `
      <h3>Add a New Quote</h3>
      <form id="quoteForm">
        <textarea id="quoteText" placeholder="Enter quote" required></textarea><br><br>
        <input type="text" id="quoteCategory" placeholder="Enter category" required><br><br>
        <button type="submit">Add Quote</button>
      </form>
    `;

    
  
    document.getElementById("quoteForm").addEventListener("submit", function (event) {
      event.preventDefault();
  
      const newText = document.getElementById("quoteText").value.trim();
      const newCategory = document.getElementById("quoteCategory").value.trim();
  
      if (newText && newCategory) {
        quotes.push({ text: newText, category: newCategory });
        alert("Quote added successfully!");
        showRandomQuote(); // Show the new quote immediately
        document.getElementById("quoteForm").reset();
      }
    });
  }
  
  // Optionally run these on load
  window.onload = function () {
    showRandomQuote();
    createAddQuoteForm();
  };
  