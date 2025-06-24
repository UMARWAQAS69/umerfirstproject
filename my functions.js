document.addEventListener('DOMContentLoaded', () => {
    const profileCard = document.querySelector('.profile-card');
    const contactMeBtn = document.getElementById('contactMeBtn');
    const contactInfoDiv = document.getElementById('contactInfo');
    const myEmail = "faizan032414@gmail.com"; // 

    // Add a simple class after content loads for a subtle fade-in effect (optional)
    // For this to work, your .profile-card in CSS needs initial opacity: 0 and transform: translateY(some_value)
    // setTimeout(() => {
    //     profileCard.style.opacity = '1';
    //     profileCard.style.transform = 'translateY(0)';
    // }, 100); // Small delay for the initial animation

    // Event listener for the Contact Me button
    contactMeBtn.addEventListener('click', () => {
        if (contactInfoDiv.classList.contains('show')) {
            // If already showing, hide it
            contactInfoDiv.classList.remove('show');
            // Optional: Clear content after transition for re-usability
            setTimeout(() => {
                contactInfoDiv.innerHTML = '';
            }, 700); // Wait for the transition to finish (matching CSS transition duration)
        } else {
            // If hidden, show it
            contactInfoDiv.innerHTML = `<p>My Email: <a href="mailto:${myEmail}">${myEmail}</a></p>`;
            contactInfoDiv.classList.add('show');
        }
    });
});