const CART = (
    function () {
        let cart = [];
        let excludedCartInfo = ["id", "nonveg", "logo"]

        let cartButton = document.getElementById("cartButton");
        let cartButtonWrap = document.getElementById("buttonWrap");
        let cartDetailContainer = document.getElementById("showCart");
        let showHideCartCross = document.getElementById("showhideCross");
        let cartInfoContainer = document.getElementById("cartDetails");
        let showCartWrapper = document.getElementById("showCartWrapper");

        cartButtonWrap.addEventListener("click", showCart);
        showHideCartCross.addEventListener("click", hideCart);

        function hideCart() {
            cartDetailContainer.classList.remove("showCart");
            cartDetailContainer.classList.add("hide");
            cartInfoContainer.innerHTML = "";
            showCartWrapper.classList.remove("show");
            showCartWrapper.classList.add("hide");
        }

        function showCart() {
            if(cart.length === 0) {
                return;
            }

            showCartWrapper.classList.remove("hide");
            showCartWrapper.classList.add("show");
            cartDetailContainer.classList.add("showCart");
            cartDetailContainer.classList.remove("hide");

            let cartCardCont = document.createElement("div");
            cart.forEach(itemInCart => {
                let cartCard = document.createElement("div");
                cartCard.setAttribute("class", "cartCard");
                Object.keys(itemInCart).forEach(infoKey => {
                    if(!excludedCartInfo.includes(infoKey)){
                    let info = document.createElement("div");
                    info.setAttribute("class", "cartCardInfo");
                    let infoHeading = document.createElement("div");
                    infoHeading.textContent = `${infoKey.toUpperCase()}`
                    let infoValue = document.createElement("div");
                    infoValue.textContent =  itemInCart[infoKey];
                    info.appendChild(infoHeading);
                    info.appendChild(infoValue);
                    cartCard.appendChild(info);
                    }
                })
                cartCardCont.appendChild(cartCard);
            });

            let totalCartPrice = cart.reduce((acc, item) => {
                return Number(acc)+Number(item.price);
            }, 0);
            let totalPriceHeading = document.createElement("div");
            totalPriceHeading.textContent = "Total";
            let totalPrice = document.createElement("div");
            totalPrice.textContent = totalCartPrice;
            cartInfoContainer.append(cartCardCont);
            cartInfoContainer.appendChild(totalPriceHeading);
            cartInfoContainer.appendChild(totalPrice);
        }

        function displayCartButton() {
            if(cart.length === 0){
                cartButton.classList.add("disabled");
                cartButtonWrap.classList.add("no-cursor");
                const cartLength = document.getElementById("cartLength");
                cartLength.classList.remove("show");
                cartLength.classList.add("hide");
            } else {
                cartButton.classList.remove("disabled");
                cartButtonWrap.classList.remove("no-cursor");
                const cartLength = document.getElementById("cartLength");
                cartLength.classList.add("show");
                cartLength.textContent = cart.length;
            }
        }

        displayCartButton();

        return {
            addRemoveToCart: function addToCart(product, buttonId) {
                const itemIndexInCart = cart.findIndex(cartIem => cartIem.id === product.id)
                if(itemIndexInCart >= 0){
                    cart.splice(itemIndexInCart, 1);
                    document.getElementById(buttonId).textContent = "Add";
                } else {
                    cart.push(product);
                    document.getElementById(buttonId).textContent = "Remove";
                }
                displayCartButton();
            },

            getCart : function(){
                return cart;
            }
        }
    }
)();
