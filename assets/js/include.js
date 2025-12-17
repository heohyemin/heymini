function includeHTML(selector, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Include file not found');
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    includeHTML('#include-header', '../assets/include/header.html');
    includeHTML('#include-footer', '../assets/include/footer.html');
});
