const apiUrl = `https://v2.api.noroff.dev/`;
const id = new URLSearchParams(window.location.search).get("id");
const details = document.getElementById("details");
async function renderProduct() {
  try {
    const response = await fetch(`${apiUrl}rainy-days/${id}`);
    const data = await response.json();

    const jacket = data.data;
    console.log(jacket);

    const title = document.createElement("h2");
    const image = document.createElement("img");
    const description = document.createElement("p");
    const price = document.createElement("p");

    title.textContent = jacket.title;
    description.textContent = jacket.description;
    image.src = jacket.image.url;
    image.alt = jacket.image.alt;
    if (jacket.onSale === true) {
      price.textContent = `On sale! ${jacket.discountedPrice}`;
    } else {
      price.textContent = jacket.price;
    }

    details.append(title, image, description, price);
  } catch (error) {
    console.error(error);
  }
}

renderProduct();
