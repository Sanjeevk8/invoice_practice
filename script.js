var flag = 1;

var tax = 12; // %
var shippingFee = 100; // Rs
var discount = 18; // %
var TOTAL_ITEMS = [];

// function addItems() {

//     let container = document.getElementById("itemsContainer");
//     container.insertAdjacentHTML("beforeend",
//                                 `<div class="pro_rate_qty_amt" id="index-` + flag + `">` +
//                                 `<input type="text" id="product"/>
//                                 <input type="text"  id="rate"/>
//                                 <input type="text"  id="quantity"/>
//                                 <input onblur="getAllAmountSetChange()" type="text"  id="amount"/>
//                                 <i class="fa-solid fa-xmark" style="color: #959797;" onclick="deleteRow(this)"></i>
//                                 </div>`);

//     rateFunc(flag);

//     flag++;
// }



// adding item and invoive table

function addItems() {
    if(document.querySelector(`#item_product_${flag}`)?.value === "" || document.querySelector(`#item_amt_${flag}`)?.value === "$0"){
        alert("Please fill the detials of previous item !");
        return false;
    }
    flag++;
    let container = document.getElementById("itemsContainer");
    container.insertAdjacentHTML("beforeend",
                                `<div class="pro_rate_qty_amt" id="index-` + flag + `">` +
                                `<input type="text" class="product" id="item_product_` + flag + `"/>
                                <input type="text" value="$0" class="rate" onkeyup="handleItemRateChange(event)" oninput="acceptOnlyNumbers(event)" id="item_rate_` + flag + `"/>
                                <input type="text" value="0" class="quantity" onkeyup="handleItemQtyChange(event)" oninput="acceptOnlyNumbersQTY(event)" id="item_qty_` + flag + `" />
                                <input type="text" value="$0" disabled class="amount" id="item_amt_` + flag + `"/>
                                <i class="fa-solid fa-xmark" style="color: #959797;" onclick="deleteRow(this)"></i>
                                </div>`);

    if(document.querySelector(`#item_product_${flag - 1}`)?.value === undefined){
        return false;
    }
    let tbodyRef = document.getElementById('items_table').getElementsByTagName('tbody')[0];

    // Insert a row at the end of table
    let newRow = tbodyRef.insertRow();
    newRow.id = `table_row_${flag - 1}`;
                                
    // Insert a cell at the end of the row
    let newCell = newRow.insertCell();
    let newCell2 = newRow.insertCell();
    let newCell3 = newRow.insertCell();
    let newCell4 = newRow.insertCell();
                                
    // Append a text node to the cell
    let newText = document.createTextNode(document.querySelector(`#item_product_${flag - 1}`).value);
    let newText2 = document.createTextNode(document.querySelector(`#item_rate_${flag - 1}`).value);
    let newText3 = document.createTextNode(document.querySelector(`#item_qty_${flag - 1}`).value);
    let newText4 = document.createTextNode(document.querySelector(`#item_amt_${flag - 1}`).value);
    newCell.appendChild(newText);
    newCell2.appendChild(newText2);
    newCell3.appendChild(newText3);
    newCell4.appendChild(newText4);
}

function acceptOnlyNumbers(element) {
    return element.target.value = "$" + element.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

function acceptOnlyNumbersQTY(element) {
    return element.target.value = element.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

function handleItemRateChange(event) {
    let index = event.target.id.replace("item_rate_","");
    if(event.keyCode > 47 && event.keyCode < 57){
        quantityFunction(index);
    }else if(event.keyCode === 8){
        quantityFunction(index);
    }
}

function quantityFunction(index) {  
    let rateElement = document.querySelector(`#item_rate_${index}`).value;
    rateElement = rateElement.replace("$","");
    let quantityElement = document.querySelector(`#item_qty_${index}`).value;
    let amountElement = document.querySelector(`#item_amt_${index}`);
    amountElement.value =  "$" + (rateElement * quantityElement);
    getAllAmountSetChange();
}

function handleItemQtyChange(event) {
    let index = event.target.id.replace("item_qty_","");
    if(event.keyCode > 47 && event.keyCode < 57){
        rateFunction(index);
    }else if(event.keyCode === 8){
        rateFunction(index);
    }
}

function rateFunction(index) {  
    let rateElement = document.querySelector(`#item_rate_${index}`).value;
    rateElement = rateElement.replace("$","");
    let quantityElement = document.querySelector(`#item_qty_${index}`).value;
    let amountElement = document.querySelector(`#item_amt_${index}`);
    amountElement.value = "$" + (rateElement * quantityElement);
    getAllAmountSetChange();
}

// function rateFunc(index) {
//     var indexName = getIndexRowNamed(index)
//     document.querySelector(indexName + "> #rate").onkeydown = function (element) {
//         if (element.keyCode > 47 && element.keyCode > 57) {
//             qtyFunc(index);
//             amountField(index);
//         }else if(element.keyCode === 8){
//             qtyFunc(index);
//             amountField(index);
//         }else{
//             document.querySelector(indexName + "> #rate").value = '';
//         }
        
//     };
// }

// function qtyFunc(index){
//     var indexName = getIndexRowNamed(index)
//     document.querySelector(indexName + "> #amount").readOnly = true;
//     var initialQyt = document.querySelector(indexName + "> #quantity").value;
    
//     if(initialQyt == ""){
//         document.querySelector(indexName + "> #quantity").value = 1;
//     }

//     document.querySelector(indexName + "> #quantity").onchange = function (element) {
//         console.log("qty_field_index", flag);
//         amountField(index);
//     };
// }

// function amountField(index){
//     var indexName = getIndexRowNamed(index)
//     var rate =  document.querySelector(indexName + "> #rate").value;
//     var currentQty = document.querySelector(indexName + "> #quantity").value;
//     var totalAmt = rate * currentQty;

//     document.querySelector(indexName + "> #amount").value =totalAmt;

//     // refersh data
//     getAllAmountSetChange();
// }

function getAllAmountSetChange(){
   var arr =  document.querySelectorAll(".amount");
   var tot=0;
   for(i=0; i<arr.length; i++){
    if(arr[i].value)
        tot += parseInt(arr[i].value.replace("$",""));
    }
   // refresh subtotal element
   let allSubtotal = document.querySelectorAll(".S_total");
   allSubtotal.forEach((element) => {
    element.innerHTML ="$" +tot;
   });
   
 // other amounts calculation code here
    let gettax = (tot*tax)/100;
    let allTaxInputs = document.querySelectorAll(".Tax_input");
    allTaxInputs.forEach((element) => {
        element.innerHTML ="$" + gettax;
    });

    let getdis = (tot*discount)/100;
    let allDiscountInputs = document.querySelectorAll(".discount_input");
    allDiscountInputs.forEach((element) => {
        element.innerHTML ="$" + getdis;
    });

    let getshipping = tot !== 0 ? shippingFee : 0;
    let allShoppingFreeInputs = document.querySelectorAll(".Shoping_free_input");
    allShoppingFreeInputs.forEach((element) => {
        element.innerHTML ="$" + getshipping;
    });

    let totalAmount = tot + gettax - getdis + getshipping;
    document.querySelector("#Total_amount_price").innerHTML = "$" + totalAmount.toFixed(2);
}


function getIndexRowNamed(index) {
    return index == 0 ? "#index" : ("#index-" + index);
}

function deleteRow(rowElement) {
    let superParent = document.querySelector("#itemsContainer");
    let parentNode = rowElement.parentNode;
    let index = parentNode.id.replace("index-","");
    if(superParent.childElementCount > 1){
        parentNode.remove();
    }else {
        parentNode.childNodes[1].value = "";
        parentNode.childNodes[3].value = "$0";
        parentNode.childNodes[5].value = "0";
        parentNode.childNodes[7].value = "$0";
    }
    let row = document.getElementById(`table_row_${index}`);
    if(row !== null){
        row.parentNode.removeChild(row);
    }
    getAllAmountSetChange();
}

// rateFunc(0);


function handleInvoiceNumber(number) {
    let invoiceNoRead = document.querySelector("#invoice_num");
    invoiceNoRead.value = number;
}

function handleCompanyDetails(details) {
    let companyDetailsRead = document.querySelector("#bill_issued_company");
    companyDetailsRead.innerHTML = details;
}

function handleCompanyBill(bill) {
    let companyBillRead = document.querySelector("#to_bill");
    companyBillRead.innerHTML = bill;
}

function handleCompanyIssuedDate(issuedate){
    let CompanyIssuedDate=document.querySelector("#issuing_date");
    CompanyIssuedDate.innerHTML=issuedate;
}

function handleCompanyDueDate(duedate){
    let CompanyDueDate=document.querySelector("#last_date");
    CompanyDueDate.innerHTML=duedate;
}

















