window.onload = function () {

    const themeSwitch = document.getElementById('theme-switch');
    const toggleThumb = document.getElementById('toggle-thumb');
    const body = document.body;
    const svgImage = document.getElementById('svg-image');
    const svgURL = document.getElementById('gen-url');
    const usernameInput = document.getElementById('username');
    const styleSelect = document.getElementById('style');
    const durationInput = document.getElementById('duration');
    const copyUrlButton = document.getElementById('copy-url');

    const loadingIndicator = document.createElement('div'); // Add a loading indicator
    loadingIndicator.innerText = "Loading...";
    loadingIndicator.style.cssText = `
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.2rem;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 10px 20px;
        border-radius: 5px;
    `;
    document.body.appendChild(loadingIndicator);

    // Initialize theme to dark mode by default
    let isDark = true;

    // Function to update the SVG URL based on inputs
    const updateSVG = () => {
        const username = usernameInput.value || 'czampath';
        const style = styleSelect.value || 'hue-ripple';
        const duration = durationInput.value || 2;
        const url = `https://cz-git-anim.vercel.app/api/animated-commits?username=${username}&isDark=${isDark}&style=${style}&duration=${duration}`;

        // Show loading indicator
        svgImage.style.display = 'none'
        loadingIndicator.style.display = 'block';

        // Update the SVG image and URL field
        svgImage.setAttribute('xlink:href', url);
        svgURL.setAttribute('value', url);
    };

    // Listen for the SVG `onload` event to hide the loading indicator
    svgImage.onload = () => {
        loadingIndicator.style.display = 'none'; // Hide loading indicator
        svgImage.style.display = 'flex'
        copyUrlButton.disabled = false;
    };

    // Initialize with dark mode
    body.classList.remove('light-mode');

    themeSwitch.addEventListener('change', () => {
        isDark = themeSwitch.checked;
        if (isDark) {
            toggleThumb.style.left = '2px'; // Position for dark mode
            toggleThumb.style.background = '#343a40';
            body.classList.remove('light-mode');
        } else {
            toggleThumb.style.left = '27px'; // Position for light mode
            toggleThumb.style.background = '#f5f5f5';
            body.classList.add('light-mode');
        }
        updateSVG();
    });

    usernameInput.addEventListener('blur', updateSVG);
    styleSelect.addEventListener('change', updateSVG);
    durationInput.addEventListener('blur', updateSVG);

    // Copy URL to clipboard
    copyUrlButton.addEventListener('click', () => {

        svgURL.select();
        navigator.clipboard.writeText(svgURL.value).then(() => {
            console.info('URL Copied');
            copyUrlButton.setAttribute("value", "Copied!");
            setTimeout(() => {
                copyUrlButton.setAttribute("value", "Copy URL");
            }, 1500)
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
        });
    });
}