function generatePagination(baseUrl, totalItems, itemsPerPage, pageParam) {
  if (!baseUrl || !totalItems || !itemsPerPage || !pageParam) {
    return 'Please fill in all fields';
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let output = '';
  
  // Generate example for first page
  output += '<!-- First Page (page 1) -->\n';
  if (totalPages > 1) {
    output += `<link rel="next" href="${baseUrl}?${pageParam}=2" />\n\n`;
  }

  // Generate example for middle page
  if (totalPages > 2) {
    const middlePage = Math.ceil(totalPages / 2);
    output += `<!-- Middle Page (page ${middlePage}) -->\n`;
    output += `<link rel="prev" href="${baseUrl}?${pageParam}=${middlePage - 1}" />\n`;
    output += `<link rel="next" href="${baseUrl}?${pageParam}=${middlePage + 1}" />\n\n`;
  }

  // Generate example for last page
  if (totalPages > 1) {
    output += `<!-- Last Page (page ${totalPages}) -->\n`;
    output += `<link rel="prev" href="${baseUrl}?${pageParam}=${totalPages - 1}" />\n\n`;
  }

  // Add implementation notes
  output += '<!-- Implementation Notes:\n';
  output += '1. Add these link tags in your <head> section\n';
  output += '2. Update the href values based on the current page\n';
  output += '3. Only include rel="next" if there is a next page\n';
  output += '4. Only include rel="prev" if there is a previous page\n';
  output += '-->';

  return output;
}

document.addEventListener('DOMContentLoaded', function() {
  const form = {
    baseUrl: document.getElementById('baseUrl'),
    totalItems: document.getElementById('totalItems'),
    itemsPerPage: document.getElementById('itemsPerPage'),
    pageParam: document.getElementById('pageParam'),
    generateBtn: document.getElementById('generate'),
    output: document.getElementById('output'),
    copyBtn: document.getElementById('copy')
  };

  form.generateBtn.addEventListener('click', () => {
    const pagination = generatePagination(
      form.baseUrl.value,
      parseInt(form.totalItems.value),
      parseInt(form.itemsPerPage.value),
      form.pageParam.value
    );
    form.output.textContent = pagination;
  });

  form.copyBtn.addEventListener('click', () => {
    if (form.output.textContent) {
      navigator.clipboard.writeText(form.output.textContent)
        .then(() => {
          const originalText = form.copyBtn.textContent;
          form.copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            form.copyBtn.textContent = originalText;
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy text:', err);
        });
    }
  });
});