
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  searchInput.addEventListener('input', function() {
    const query = this.value;

    if (query.length === 0) {
      searchResults.innerHTML = '';
      return;
    }

    fetch(`/api/search?query=${query}`)
      .then(response => response.json())
      .then(data => {
        let html = '<ul>';
        data.forEach(faq => {
          html += `
            <li>
              <strong>Tidsmerke:</strong> ${faq.Tidsmerke}<br>
              <strong>Spørsmål:</strong> ${faq.Spørsmål}<br>
              <strong>Svar:</strong> ${faq.Svar}
            </li>`;
        });
        html += '</ul>';
        searchResults.innerHTML = html;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

