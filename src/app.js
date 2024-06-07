const hamburgerButton = document.getElementById('hamburger')
const navList = document.getElementById('nav-list')

function toggleButton() {
    navList.classList.toggle('show')
}

hamburgerButton.addEventListener('click',toggleButton)

document.getElementById('fs-frm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Assuming the form submission to Formspree is successful
    fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Hide the original form
            document.getElementById('fs-frm').classList.add('hidden');

            // Show the success message
            document.getElementById('success-message').classList.remove('hidden');

            // Show the new form (if required)
            document.getElementById('new-form').classList.remove('hidden');
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Oops! There was a problem submitting your form");
                }
            });
        }
    }).catch(error => {
        alert("Oops! There was a problem submitting your form");
    });
});