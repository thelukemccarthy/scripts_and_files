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