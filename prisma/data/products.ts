import { z } from "@hono/zod-openapi";
import { CreateProductsSchema } from "../../src/modules/product/schema";

export const dataProducts: z.infer<typeof CreateProductsSchema> = [
  {
    name: "Panda Cushion",
    slug: "panda-cushion",
    price: 10,
    imageUrl:
      "https://ucarecdn.com/89ffcef2-5e5a-422e-ab70-e9a569e59dc6/-/preview/500x500/",
    description: `
      <p>
        A cute and adorable panda head-shaped cushion. With a unique design and
        bright colors, this product is perfect for those who want something
        different and attractive.
      </p>
      <ul>
        <li>Black and white color</li>
        <li>Fluffy and soft</li>
      </ul>
    `,
  },
  {
    name: "Bear Pillow",
    slug: "bear-pillow",
    price: 15,
    imageUrl:
      "https://ucarecdn.com/89ffcef2-5e5a-422e-ab70-e9a569e59dc6/-/preview/500x500/",
    description: `
      <p>
        A comfortable and soft bear-shaped pillow. With a unique design and
        bright colors, this product is perfect for those who want something
        different and attractive.
      </p>
      <ul>
        <li>Brown and white color</li>
        <li>Soft and cuddly</li>
      </ul>
    `,
  },
  {
    name: "Kitty Toy",
    slug: "kitty-toy",
    price: 8,
    imageUrl:
      "https://ucarecdn.com/89ffcef2-5e5a-422e-ab70-e9a569e59dc6/-/preview/500x500/",
    description: `
      <p>
        A cute and adorable cat toy. With a unique design and bright colors,
        this product is perfect for those who want something different and
        attractive.
      </p>
      <ul>
        <li>Colorful and cute</li>
        <li>Soft and lightweight</li>
      </ul>
    `,
  },
  {
    name: "Dog Treats",
    slug: "dog-treats",
    price: 12,
    imageUrl:
      "https://ucarecdn.com/89ffcef2-5e5a-422e-ab70-e9a569e59dc6/-/preview/500x500/",
    description: `
      <p>
        Delicious and healthy dog treats made with natural ingredients. Perfect
        for dog owners who want to give their pets the best.
      </p>
      <ul>
        <li>Natural and healthy</li>
        <li>Delicious and tasty</li>
      </ul>
    `,
  },
  {
    name: "Cat Bed",
    slug: "cat-bed",
    price: 20,
    imageUrl:
      "https://ucarecdn.com/89ffcef2-5e5a-422e-ab70-e9a569e59dc6/-/preview/500x500/",
    description: `
      <p>
        A comfortable and cozy cat bed. With a unique design and bright colors,
        this product is perfect for cat owners who want to give their pets the
        best.
      </p>
      <ul>
        <li>Soft and cozy</li>
        <li>Unique design</li>
      </ul>
    `,
  },
  {
    name: "Fish Tank",
    slug: "fish-tank",
    price: 30,
    imageUrl:
      "https://ucarecdn.com/89ffcef2-5e5a-422e-ab70-e9a569e59dc6/-/preview/500x500/",
    description: `
      <p>
        A beautiful and attractive fish tank. With a unique design and bright
        colors, this product is perfect for those who want something different and
        attractive.
      </p>
      <ul>
        <li>Unique design</li>
        <li>Colorful and attractive</li>
      </ul>
    `,
  },
  {
    name: "Bird Cage",
    slug: "bird-cage",
    price: 25,
    imageUrl:
      "https://ucarecdn.com/89ffcef2-5e5a-422e-ab70-e9a569e59dc6/-/preview/500x500/",
    description: `
      <p>
        A beautiful and attractive bird cage. With a unique design and bright
        colors, this product is perfect for those who want something different and
        attractive.
      </p>
      <ul>
        <li>Unique design</li>
        <li>Colorful and attractive</li>
      </ul>
    `,
  },
  {
    name: "Hamster Wheel",
    slug: "hamster-wheel",
    price: 18,
    imageUrl:
      "https://ucarecdn.com/89ffcef2-5e5a-422e-ab70-e9a569e59dc6/-/preview/500x500/",
    description: `
      <p>
        A cute and adorable hamster wheel. With a unique design and bright colors,
        this product is perfect for those who want something different and
        attractive.
      </p>
      <ul>
        <li>Colorful and cute</li>
        <li>Unique design</li>
      </ul>
    `,
  },
  {
    name: "Turtle Shell",
    slug: "turtle-shell",
    price: 22,
    imageUrl:
      "https://ucarecdn.com/89ffcef2-5e5a-422e-ab70-e9a569e59dc6/-/preview/500x500/",
    description: `
      <p>
        A unique and attractive turtle shell. With a unique design and bright
        colors, this product is perfect for those who want something different and
        attractive.
      </p>
      <ul>
        <li>Unique design</li>
        <li>Colorful and attractive</li>
      </ul>
    `,
  },
  {
    name: "Rabbit Hutch",
    slug: "rabbit-hutch",
    price: 28,
    imageUrl:
      "https://ucarecdn.com/89ffcef2-5e5a-422e-ab70-e9a569e59dc6/-/preview/500x500/",
    description: `
      <p>
        A comfortable and cozy rabbit hutch. With a unique design and bright
        colors, this product is perfect for rabbit owners who want to give their
        pets the best.
      </p>
      <ul>
        <li>Soft and cozy</li>
        <li>Unique design</li>
      </ul>
    `,
  },
];
