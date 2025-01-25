const fetchProductImages = async (productName) => {
  try {
    const images = await Promise.all([
      import(
        `./assets/products/${productName}/image-${productName}-desktop.jpg`
      ),
      import(
        `./assets/products/${productName}/image-${productName}-tablet.jpg`
      ),
      import(
        `./assets/products/${productName}/image-${productName}-mobile.jpg`
      ),
      import(
        `./assets/products/${productName}/image-${productName}-thumbnail.jpg`
      ),
    ]);

    return {
      desktop: images[0].default,
      tablet: images[1].default,
      mobile: images[2].default,
      thumbnail: images[3].default,
    };
  } catch {
    console.log("Error fetching images.");
    return {
      desktop: "",
      tablet: "",
      mobile: "",
      thumbnail: "",
    };
  }
};

export const productsData = [
  {
    id: 1,
    category: "Waffle",
    name: "Waffle with Berries",
    images: fetchProductImages("waffle"),
    price: "6.50",
  },
  {
    id: 2,
    category: "Creme Brulee",
    name: "Vanilla Bean Creme Brulee",
    images: fetchProductImages("creme-brulee"),
    price: "4.00",
  },
  {
    id: 3,
    category: "Macaron",
    name: "Macaron Mix of Five",
    images: fetchProductImages("macaron"),
    price: "8.00",
  },
  {
    id: 4,
    category: "Tiramisu",
    name: "Classic Tiramisu",
    images: fetchProductImages("tiramisu"),
    price: "5.50",
  },
  {
    id: 5,
    category: "Baklava",
    name: "Pistachio Baklava",
    images: fetchProductImages("baklava"),
    price: "4.00",
  },
  {
    id: 6,
    category: "Pie",
    name: "Lemon Meringue Pie",
    images: fetchProductImages("meringue"),
    price: "5.00",
  },
  {
    id: 7,
    category: "Cake",
    name: "Red Velvet Cake",
    images: fetchProductImages("cake"),
    price: "4.50",
  },
  {
    id: 8,
    category: "Brownie",
    name: "Salted Caramel Brownie",
    images: fetchProductImages("brownie"),
    price: "5.50",
  },
  {
    id: 9,
    category: "Panna Cotta",
    name: "Vanilla Panna Cotta",
    images: fetchProductImages("panna-cotta"),
    price: "6.50",
  },
];
