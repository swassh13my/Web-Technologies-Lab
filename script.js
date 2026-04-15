function loadInventory() {
  fetch("inventory.json")
    .then(res => res.json())
    .then(data => {
      displayInventory(data);
      calculateTotal(data);
    })
    .catch(err => alert("Error loading JSON"));
}

function displayInventory(products) {
  let table = "<tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th></tr>";
  products.forEach(p => {
    let stockClass = p.stock < 3 ? "low-stock" : "";
    table += `<tr class="${stockClass}">
      <td>${p.id}</td><td>${p.name}</td><td>${p.category}</td><td>${p.price}</td><td>${p.stock}</td>
    </tr>`;
  });
  document.getElementById("inventoryTable").innerHTML = table;
}

function calculateTotal(products) {
  let totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  document.getElementById("totalValue").innerText = "Total Value: $" + totalValue;
}
