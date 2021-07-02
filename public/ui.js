const themeModeButton = document.getElementById('theme-mode-button');
var root = document.querySelector(':root');
var currentTheme = 'dark';

themeModeButton.addEventListener('click', () => {
    if (currentTheme === 'dark') {
        paintLightModeToUI();
        currentTheme = 'light';
    } else {
        paintDarkModeToUI();
        currentTheme = 'dark';
    }
})

function paintLightModeToUI() {
    root.style.setProperty('--bg-color', 'white');
    root.style.setProperty('--container-bg-color', 'white');
    root.style.setProperty('--theme-color', '#ffa600');
    root.style.setProperty('--text-color', 'black');
    root.style.setProperty('--left-bg', 'white');
    root.style.setProperty('--right-bg', '#ffa600');
    root.style.setProperty('--left-text', 'black');
    root.style.setProperty('--right-text', 'black');
    root.style.setProperty('--theme-icon-bg', 'rgb(31, 31, 31)');
    root.style.setProperty('--sender-text-color', 'rgb(65, 65, 65)');
    root.style.setProperty('--receiver-text-color', 'rgb(65, 65, 65)');
}

function paintDarkModeToUI() {
    root.style.setProperty('--bg-color', '#121212');
    root.style.setProperty('--container-bg-color', '#1d1d1d');
    root.style.setProperty('--theme-color', '#ffa600');
    root.style.setProperty('--text-color', 'white');
    root.style.setProperty('--left-bg', '#000');
    root.style.setProperty('--right-bg', '#ffc400');
    root.style.setProperty('--left-text', 'white');
    root.style.setProperty('--right-text', 'black');
    root.style.setProperty('--theme-icon-bg', 'rgb(255, 217, 0)');
    root.style.setProperty('--sender-text-color', 'rgb(61, 61, 61)');
    root.style.setProperty('--receiver-text-color', 'rgb(221, 221, 221)');
}