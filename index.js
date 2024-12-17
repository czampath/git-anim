window.onload = async function () {

    const base_url = "https://cz-git-anim.vercel.app";

    const themeSwitch = document.getElementById('theme-switch');
    const toggleThumb = document.getElementById('toggle-thumb');
    const body = document.body;
    const svgImage = document.getElementById('svg-image');
    const svgURL = document.getElementById('gen-url');
    const usernameInput = document.getElementById('username');
    let prevUsernameInput = usernameInput.value;

    const styleSelect = document.getElementById('style');
    const durationInput = document.getElementById('duration');
    let prevDurationInput = durationInput.value;
    const copyUrlButton = document.getElementById('copy-url');
    const downloadButton = document.getElementById('download');



    const loadingIndicator = document.createElement('div');
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

    loadingIndicator.style.display = 'block';
    await fetch(base_url+"/api/get-styles").then(data => data.json()).then(data=> {
        loadingIndicator.style.display = 'none';
        data.forEach((st) => {
            const option = document.createElement('option');
            option.value = st.id;
            option.textContent = st.name;
            styleSelect.appendChild(option);
        });
    });

    let isDark = true;

    const updateSVG = () => {
        const username = usernameInput.value || 'czampath';
        const style = styleSelect.value || 'hue-ripple';
        const duration = durationInput.value || 2;
        const url = `/api/animated-commits?username=${username}&isDark=${isDark}&style=${style}&duration=${duration}`;

        // Show loading indicator
        svgImage.style.display = 'none'
        loadingIndicator.style.display = 'block';


        svgImage.setAttribute('xlink:href', url);
        svgURL.setAttribute('value', base_url + url);
    };

    function handleInputChange(event) {
        let inputChanged = false;

        if (event.target === usernameInput) {
            inputChanged = usernameInput.value !== prevUsernameInput;
            if (inputChanged) {
                usernameInitialValue = usernameInput.value; 
            }
        } else if (event.target === durationInput) {
            inputChanged = durationInput.value !== prevDurationInput;
            if (inputChanged) {
                durationInitialValue = durationInput.value; 
            }
        }

        if (inputChanged) {
            updateSVG();
        }
    }

    // Listen for the SVG `onload` event
    svgImage.onload = () => {
        loadingIndicator.style.display = 'none';
        svgImage.style.display = 'flex'
        copyUrlButton.disabled = false;
    };

    // Initialize with dark mode
    body.classList.remove('light-mode');

    themeSwitch.addEventListener('change', () => {
        isDark = themeSwitch.checked;
        if (isDark) {
            toggleThumb.style.left = '2px';
            toggleThumb.style.background = '#343a40';
            body.classList.remove('light-mode');
        } else {
            toggleThumb.style.left = '27px'; 
            toggleThumb.style.background = '#f5f5f5';
            body.classList.add('light-mode');
        }
        updateSVG();
    });

    usernameInput.addEventListener('blur', handleInputChange);
    durationInput.addEventListener('blur', handleInputChange);

    usernameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleInputChange(event); 
        }
    });

    durationInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleInputChange(event);
        }
    });

    styleSelect.addEventListener('change', updateSVG);

    copyUrlButton.addEventListener('click', () => {

        svgURL.select();
        navigator.clipboard.writeText(svgURL.value).then(() => {
            console.info('URL Copied');
            copyUrlButton.setAttribute("style", 'background-color:rgb(94, 116, 89)');
            setTimeout(() => {
                copyUrlButton.setAttribute("style", 'background-color: #495057');
            }, 1000)
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
        });
    });

    downloadButton.addEventListener('click', function () {
        const url = svgURL.getAttribute('value');
        if(!url){
            return
        }
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch the SVG');
                }
                return response.text(); 
            })
            .then(svgContent => {
                const blob = new Blob([svgContent], { type: 'image/svg+xml' });
                const link = document.createElement('a');

                link.href = URL.createObjectURL(blob);
                link.download = 'image.svg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error downloading SVG:', error);
            });
    });
}