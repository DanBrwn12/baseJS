const tabs = document.querySelectorAll(".tab")
const tabsContent = document.querySelectorAll(".tab__content")

for (let index = 0; index < tabs.length; index++) {
    const tab = tabs[index];
    
    tab.addEventListener("click", () => {

        for (let i = 0; i < tabsContent.length; i++) {
            tabs[i].classList.remove("tab_active");          
        }

        tab.classList.add("tab_active");

        for (let i = 0; i < tabsContent.length; i++) {
            tabsContent[i].classList.remove("tab__content_active");
        }

        tabsContent[index].classList.add("tab__content_active")
    })
}