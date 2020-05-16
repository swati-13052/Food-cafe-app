const CATEGORY = function () {
    const fetchUrl = `https://demo6817798.mockable.io/getproductdetail`;
    let categories = [];
    const ImageMap = {
        Pizza: "pizza.png",
        Burger: "burger.png",
        Icecream: "icecream.png",
        Drinks: "drinks.png"
    }

    displayProducts = (filters) => {
        let categoriesToShow = [];
        if(filters && filters.length){
            categoriesToShow = categories.filter(category => filters.includes(category.subhead));
            allCategories.textContent = "";
        }
        (categoriesToShow.length ? categoriesToShow : categories).forEach(category => {
            let categoryCont = document.createElement("div");
            let categoryName = document.createElement("div");
            categoryName.textContent = category.subhead;
            categoryName.setAttribute("class", "cateName");
            categoryCont.setAttribute("class", "categoryCont");
            categoryCont.appendChild(categoryName);

            let categoryProductsCont = document.createElement("div");
            categoryProductsCont.setAttribute("class", "cateProdCont")
            category.list.forEach(product => {
                let productCont = document.createElement("div");
                productCont.setAttribute("id", product.id);
                productCont.setAttribute("class", "prodCont");

                let productImage = document.createElement("img");
                productImage.src = `./Images/${ImageMap[category.subhead]}`;

                let productName = document.createElement("div");
                productName.textContent = product.item;
                let productIngredient = document.createElement("div");
                productIngredient.textContent = product.ingredient;

                let priceContainer = document.createElement("div");
                let priceTag = document.createElement("div");
                priceTag.textContent = `Rs. ${product.price}`;

                let button = document.createElement("button");
                const buttonId = `Button${product.id}`
                button.setAttribute("id", buttonId)
                button.textContent = "Add";
                button.addEventListener("click", () => CART.addRemoveToCart({ ...product, category: category.subhead }, buttonId));
                priceContainer.appendChild(priceTag);
                priceContainer.appendChild(button);

                productCont.appendChild(productImage);
                productCont.appendChild(productName);
                productCont.appendChild(productIngredient);
                productCont.appendChild(priceContainer);

                categoryProductsCont.appendChild(productCont);
            });
            categoryCont.appendChild(categoryProductsCont);
            document.getElementById("allCategories").appendChild(categoryCont);
        })
    }

    //Set Categories from fetch call
    function setProducts(fetchedProducts) {
        fetchedProducts.forEach(element => {
            categories.push(element);
        });
    }

    //Fetch Category from API and store it a variable
    function getCategoriesData() {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(response => {
                setProducts(response.products);
                FILTER.displayFilters(response.products)
            })
            .then(() => {
                this.displayProducts();
            })
            .catch(error => {
                const err = error.response;
                console.log(err);
            });
    }
    getCategoriesData();

    return {
        displayProducts: displayProducts
    }
}();
