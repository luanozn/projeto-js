document.addEventListener('DOMContentLoaded', function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            var headerContainer = document.getElementById('header-container');
            headerContainer.innerHTML = data;
        });
});