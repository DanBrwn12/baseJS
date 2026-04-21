const tooltipTriggers = document.querySelectorAll('.has-tooltip');

let activeTooltip = null;


function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;

    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + window.scrollY) + 'px';
    
    return tooltip;
}

function removeActiveTooltip() {
    if (activeTooltip) {
        activeTooltip.remove();
        activeTooltip = null;
    }
}

tooltipTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        
        const isSameElement = activeTooltip && activeTooltip.parentElement === trigger;
        
        if (isSameElement) {
            removeActiveTooltip();
        } else {
            removeActiveTooltip();

            const tooltipText = trigger.getAttribute('title');
            const newTooltip = createTooltip(trigger, tooltipText);

            document.body.appendChild(newTooltip);

            newTooltip.classList.add('tooltip_active');
            
            activeTooltip = newTooltip;
        }
    });
});

document.addEventListener('click', (event) => {
    const isClickOnTrigger = event.target.closest('.has-tooltip');
    const isClickOnTooltip = event.target.closest('.tooltip');
    
    if (!isClickOnTrigger && !isClickOnTooltip && activeTooltip) {
        removeActiveTooltip();
    }
});

window.addEventListener('scroll', () => {
    if (activeTooltip) {
        const triggers = document.querySelectorAll('.has-tooltip');
        let currentTrigger = null;
        
        for (let trigger of triggers) {
            if (trigger.nextElementSibling === activeTooltip) {
                currentTrigger = trigger;
                break;
            }
        }
        
        if (currentTrigger) {
            const rect = currentTrigger.getBoundingClientRect();
            activeTooltip.style.left = rect.left + 'px';
            activeTooltip.style.top = (rect.bottom + window.scrollY) + 'px';
        }
    }
});