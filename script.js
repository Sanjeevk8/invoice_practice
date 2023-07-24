var flag = 1;

function addItems() {

    let container = document.getElementById("itemsContainer");
    container.insertAdjacentHTML("beforeend", `<div class="pro_rate_qty_amt" id="index-`+flag+`">`+
                                `<input type="text" id="product"/>
                                <input type="text"  id="rate"/>
                                <input type="text"  id="quantity"/>
                                <input type="text"  id="amount"/>
                                <i class="fa-solid fa-xmark" onclick="deleteRow(this)"></i>
                            </div>`);

    // onchange

    // if rate changes then check if quanitity is already set then use this quanitiy other wise set quantity to 1.
    // disable amount field to readonly 
    // get all amount field and calculate total 

    document.querySelector("#index-"+ flag +"> #rate").onchange = function(element){
        console.log("rate_field_index", flag );
    };

    flag++;
}

function deleteRow(rowElement){
    var parentNode = rowElement.parentNode;
    parentNode.remove();
}