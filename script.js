const apiUrl = `https://v2.api.noroff.dev/`;
const container = document.getElementById("container");

async function getClothingData() {
  try {
    const response = await fetch(`${apiUrl}rainy-days`);
    const data = await response.json();
    const products = data.data;

    products.forEach((jacket) => {
      const card = document.createElement("a");
      const title = document.createElement("h2");
      const image = document.createElement("img");
      const price = document.createElement("p");

      title.textContent = jacket.title;
      image.src = jacket.image.url;
      image.alt = jacket.image.alt;
      if (jacket.onSale === true) {
        price.textContent = `On sale! ${jacket.discountedPrice}`;
      } else {
        price.textContent = jacket.price;
      }
      card.href = `/product-details.html?id=${jacket.id}`;
      card.className = "card";

      card.append(title, image, price);

      container.append(card);

      console.log(jacket);
    });
  } catch (error) {
    console.error(error);
  }
}
getClothingData();
