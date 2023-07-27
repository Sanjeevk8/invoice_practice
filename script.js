var flag = 1;

var tax = 12; // %
var shippingFee = 100; // Rs
var discount = 18; // %

function addItems() {

    let container = document.getElementById("itemsContainer");
    container.insertAdjacentHTML("beforeend",
                                `<div class="pro_rate_qty_amt" id="index-` + flag + `">` +
                                `<input type="text" id="product"/>
                                <input type="text"  id="rate"/>
                                <input type="text"  id="quantity"/>
                                <input type="text"  id="amount"/>
                                <i class="fa-solid fa-xmark" onclick="deleteRow(this)"></i>
                                </div>`);

    rateFunc(flag);

    flag++;
}


function rateFunc(index) {
    var indexName = getIndexRowNamed(index)
    document.querySelector(indexName + "> #rate").onchange = function (element) {
        console.log("rate_field_index", flag);
        qtyFunc(index);
        amountField(index);
    };
}

function qtyFunc(index){
    var indexName = getIndexRowNamed(index)
    var initialQyt = document.querySelector(indexName + "> #quantity").value;
    
    if(initialQyt == ""){
        document.querySelector(indexName + "> #quantity").value = 1;
    }

    document.querySelector(indexName + "> #quantity").onchange = function (element) {
        console.log("qty_field_index", flag);
        amountField(index);
    };
}

function amountField(index){
    var indexName = getIndexRowNamed(index)
    var rate =  document.querySelector(indexName + "> #rate").value;
    var currentQty = document.querySelector(indexName + "> #quantity").value;
    var totalAmt = rate * currentQty;

    document.querySelector(indexName + "> #amount").value = totalAmt;


    var amount = document.querySelector(indexName + "> #amount  ");
    
    getAllAmountSetChange();
}

function getAllAmountSetChange(){
   var amountFieldList =  document.querySelectorAll("#amount");
   // refresh subtotal elements
   console.log(amountFieldList);
}


function getIndexRowNamed(index) {
    return index == 0 ? "#index" : ("#index-" + index);
}

function deleteRow(rowElement) {
    var parentNode = rowElement.parentNode;
    parentNode.remove();
}

function productamt() {
    let a = document.getElementById("rate").value;
    let b = document.getElementById("quantity").value;
    let c = document.getElementById("amount");
    // document.getElementById("amount").innerHTML= c;
    let result = a * b;
    c.value = result;
}

rateFunc(0);