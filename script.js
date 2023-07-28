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
                                <input onblur="getAllAmountSetChange()" type="text"  id="amount"/>
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
    document.querySelector(indexName + "> #amount").readOnly = true;
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


    // var amount = document.querySelector(indexName + "> #amount  ");
    
    getAllAmountSetChange();
}

function getAllAmountSetChange(){
   var arr =  document.getElementById("amount");
   var tot=0;
   for(i=0; i<arr.lenght; i++){
    if(arr[i].value)
        tot +=arr[i].value;
    }
   // refresh subtotal element
   document.getElementById("S_total").value = tot;
   
}


function getIndexRowNamed(index) {
    return index == 0 ? "#index" : ("#index-" + index);
}

function deleteRow(rowElement) {
    var parentNode = rowElement.parentNode;
    parentNode.remove();
   
}

rateFunc(0);
