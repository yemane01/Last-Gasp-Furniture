
// Declare all variables
const items = ["Chair", "Recliner", "Table", "Umbrella"];
const prices = [25.50, 37.75, 49.95, 24.89];
const shippingZones = ["1", "2", "3", "4", "5"];
const shippingCosts = [0, 20.00, 30.00, 35.00, 45.00];
const taxRate = 0.15;
const validStates = [
    "NY", "VT", "NH", "ME", "MA", "CT", "RI",
    "PA", "OH", "IN", "NC", "SC", "VA", "WV", "KY",
    "FL", "AL", "GA", "TN", "MN", "IA", "WI", "MI", "IL", "MO", "KS",
    "ND", "SD", "NE", "CO", "OK", "AR", "LA", "MS",
    "WA", "TX", "CA", "OR", "AZ", "NV", "UT", "ID", "WY", "NM", "MT", "AK", "DC", "HI", "PR", "VI"
];

// Corrected stateToZone 
const stateToZone = {
    "NY": 1, "VT": 1, "NH": 1, "ME": 1, "MA": 1, "CT": 1, "RI": 1,
    "PA": 2, "OH": 2, "IN": 2, "NC": 2, "SC": 2, "VA": 2, "WV": 2, "KY": 2,
    "FL": 3, "AL": 3, "GA": 3, "TN": 3, "MN": 3, "IA": 3, "WI": 3, "MI": 3, "IL": 3, "MO": 3, "KS": 3,
    "ND": 4, "SD": 4, "NE": 4, "CO": 4, "OK": 4, "AR": 4, "LA": 4, "MS": 4,
    "WA": 5, "TX": 5, "CA": 5, "OR": 5, "AZ": 5, "NV": 5, "UT": 5, "ID": 5, "WY": 5, "NM": 5, "MT": 5, "PR": 5, "VI": 5, "HI": 5, "AK": 5
};

let purchasedItems = [];
let purchasedQuantities = [];
let stateAbbreviation = "";

// Function to handle the purchase
function makePurchase() {
    let totalCost = 0;
    let item, quantity, zone;

    // Get user inputs
    while (true) {
        while (true) {
            // Prompt user for item and validate input
            item = prompt("What item would you like to buy today: Chair, Recliner, Table or Umbrella?").toLowerCase();
            if (!items.includes(item.charAt(0).toUpperCase() + item.slice(1))) {
                alert("Invalid item. Please try again.");
                continue;
            }
            // Prompt user for quantity and validate input
            quantity = parseInt(prompt("How many " + item.charAt(0).toUpperCase() + item.slice(1) + " would you like to buy?"));
            if (isNaN(quantity) || quantity <= 0) {
                alert("Invalid quantity. Please try again.");
                continue;
            }
            // Add item and quantity to purchased lists
            purchasedItems.push(item.charAt(0).toUpperCase() + item.slice(1));
            purchasedQuantities.push(quantity);
            const continueShopping = prompt("Continue shopping? y/n").toLowerCase();
            if (continueShopping !== 'y') break;
        }
        if (purchasedItems.length === 0) {
            alert("You must purchase at least one item.");
            continue;
        }
        // Prompt user for state abbreviation and validate input
        stateAbbreviation = prompt("Please enter the two letter state abbreviation:").toUpperCase();
        if (!validStates.includes(stateAbbreviation)) {
            alert("Invalid state abbreviation. Please try again.");
            continue;
        }
        zone = stateToZone[stateAbbreviation];
        break;
    }

    // Calculate costs
    let itemCost = 0;
    let shippingCost = shippingCosts[zone - 1];
    for (let i = 0; i < purchasedItems.length; i++) {
        const itemIndex = items.indexOf(purchasedItems[i]);
        itemCost += prices[itemIndex] * purchasedQuantities[i];
    }
    // Free shipping for orders over $100
    if (itemCost > 100) {
        shippingCost = 0;
    }
    totalCost = itemCost + shippingCost;
    const tax = totalCost * taxRate;
    totalCost += tax;

    // Round to two decimal places
    totalCost = totalCost.toFixed(2);

    // Display invoice
    displayInvoice(itemCost, shippingCost, tax, totalCost);
}

// Function to display the invoice
function displayInvoice(itemCost, shippingCost, tax, totalCost) {
    const invoiceDiv = document.getElementById("invoice");
    let itemsHtml = "<table>" +
        "<tr>" +
        "<th>Item</th>" +
        "<th>Quantity</th>" +
        "<th>Unit Price</th>" +
        "<th>Price</th>" +
        "</tr>";

    for (let i = 0; i < purchasedItems.length; i++) {
        const itemIndex = items.indexOf(purchasedItems[i]);
        itemsHtml += "<tr>" +
            "<td>" + purchasedItems[i] + "</td>" +
            "<td>" + purchasedQuantities[i] + "</td>" +
            "<td>$" + prices[itemIndex].toFixed(2) + "</td>" +
            "<td>$" + (prices[itemIndex] * purchasedQuantities[i]).toFixed(2) + "</td>" +
            "</tr>";
    }

    itemsHtml += "</table>";

    invoiceDiv.innerHTML = "<div class='invoice-section'>" +
        "<h2>Invoice</h2>" +
        itemsHtml +
        "<hr>" +
        "<div class='totals-section'>" +
        "<ul>" +
        "<li>Item Total: $" + itemCost.toFixed(2) + "</li>" +
        "<li>Shipping to " + stateAbbreviation + ": $" + shippingCost.toFixed(2) + "</li>" +
        "<li>Subtotal: $" + (itemCost + shippingCost).toFixed(2) + "</li>" +
        "<li>Tax: $" + tax.toFixed(2) + "</li>" +
        "<li>Invoice Total: $" + totalCost + "</li>" +
        "</ul>" +
        "</div>" +
        "<hr>" +
        "<button onclick='resetPage()'>Shop Again</button>" +
        "</div>";
}

// Function to display the invoice
function displayInvoice(itemCost, shippingCost, tax, totalCost) {
    const invoiceDiv = document.getElementById("invoice");
    let itemsHtml = "<table>" +
        "<tr>" +
        "<th>Item</th>" +
        "<th>Quantity</th>" +
        "<th>Unit Price</th>" +
        "<th>Price</th>" +
        "</tr>";

    for (let i = 0; i < purchasedItems.length; i++) {
        const itemIndex = items.indexOf(purchasedItems[i]);
        itemsHtml += "<tr>" +
            "<td>" + purchasedItems[i] + "</td>" +
            "<td>" + purchasedQuantities[i] + "</td>" +
            "<td>$" + prices[itemIndex].toFixed(2) + "</td>" +
            "<td>$" + (prices[itemIndex] * purchasedQuantities[i]).toFixed(2) + "</td>" +
            "</tr>";
    }

    itemsHtml += "</table>";

    invoiceDiv.innerHTML = "<div class='invoice-section'>" +
        "<h2>Invoice</h2>" +
        itemsHtml +
        "<hr>" +
        "<div class='totals-section'>" +
        "<ul>" +
        "<li>Item Total: $" + itemCost.toFixed(2) + "</li>" +
        "<li>Shipping to " + stateAbbreviation + ": $" + shippingCost.toFixed(2) + "</li>" +
        "<li>Subtotal: $" + (itemCost + shippingCost).toFixed(2) + "</li>" +
        "<li>Tax: $" + tax.toFixed(2) + "</li>" +
        "<li>Invoice Total: $" + totalCost + "</li>" +
        "</ul>" +
        "</div>" +
        "<hr>" +
        "<button onclick='resetPage()'>Shop Again</button>" +
        "</div>";
}
// Function to reset the page
function resetPage() {
    purchasedItems = [];
    purchasedQuantities = [];
    document.getElementById("invoice").innerHTML = "";
}

// Add event listener to the purchase button
document.getElementById("purchaseButton").addEventListener("click", makePurchase);
