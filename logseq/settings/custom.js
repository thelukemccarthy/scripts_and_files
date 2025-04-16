const bullets = document.getElementsByClassName('bullet-container');

const bulletsObserver = new MutationObserver( ()=>{
    Array.prototype.forEach.call(bullets, (span)=>{
        if (span.dataset.unzoomable) return

        span.dataset.unzoomable = true
        span.addEventListener('click', (e)=>{
            if (!e.shiftKey && e.button === 0) {
                e.stopImmediatePropagation()
            }
        })
    })
});

bulletsObserver.observe(document.getElementById('app-container'), {
    childList: true,
    subtree: true
});

const changeThemeAndAccentColor = () => {
    // Valid Colours -> 'none', 'logseq', 'tomato', 'red', 'crimson', 'pink', 'plumb', 'purple', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'grass', 'orange'
    let ACCENT_COLOR = 'logseq';
    let THEME = 'dark'; // Valid Themes -> 'light', 'dark'

    if(logseq.api.get_current_graph().name !== 'logseq'){ 
        ACCENT_COLOR = 'red';
        THEME = 'light'; 
    }

    console.log(`Setting theme to ${THEME} and accent color to ${ACCENT_COLOR} for graph ${logseq.api.get_current_graph().name}`);

    const htmlTag = document.documentElement;
    const bodyTag = document.body;

    htmlTag.dataset.color = ACCENT_COLOR;
    htmlTag.dataset.theme = THEME; 

    const changeToLightTheme = () => {
        htmlTag.classList.remove('dark');
        bodyTag.classList.remove('dark-theme');

        bodyTag.classList.add('white-theme');
        bodyTag.classList.add('light-theme');
    }
    
    const changeToDarkTheme = () => {
        bodyTag.classList.remove('white-theme');
        bodyTag.classList.remove('light-theme');
    
        bodyTag.classList.add('dark-theme');
        htmlTag.classList.add('dark');
    }

    THEME === 'light' ? changeToLightTheme() : changeToDarkTheme();
};

const graphChangedObserver = new MutationObserver(() => {
    changeThemeAndAccentColor();
});

const graphChangedObserverConfig = { childList: true, subtree: true, characterDataOldValue: true, attributes: false };
const currentGraphElement = document.getElementById('repo-name');

graphChangedObserver.observe(currentGraphElement, graphChangedObserverConfig);

changeThemeAndAccentColor();