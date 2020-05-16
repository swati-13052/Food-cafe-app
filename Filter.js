const FILTER = function(){
    let filterContainer = document.getElementById("filter");
    let filters = [];

    function filterCategories (event, subhead) {
        const isChecked = event.target.checked;
        if(isChecked){
            filters.push(subhead);
        } else {
            const index = filters.findIndex(filter => filter === subhead);
            filters.splice(index, 1);
        }

        CATEGORY.displayProducts(filters);
    }

    function displayFilters(categories) {
        categories.forEach(category => {
            let filterItem = document.createElement("div");
            let label = document.createElement("label")
            label.textContent = category.subhead;

            let input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.addEventListener("change", (event) => filterCategories(event,category.subhead));
            input.setAttribute("value", category.subhead);

            filterItem.appendChild(input);
            filterItem.appendChild(label);
            filterContainer.appendChild(filterItem);
        })
    }

    return {
        displayFilters: displayFilters
    }
}();