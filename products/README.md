# How to Add or Edit Products

You do **not** need to know how to code to update the catalogue. Everything the
website shows in the "Hardware Products" section comes from one file:

```
products/products.json
```

## Adding a new product

1. Open `products/products.json` in a plain text editor (Notepad, TextEdit, or
   VS Code all work fine — do not use Microsoft Word).
2. Copy one of the existing entries (the text between `{` and `}`), paste it
   at the end of the list, and edit the values. For example:

```json
{
  "id": "wheelbarrows",
  "name": "Wheelbarrows",
  "category": "tools",
  "description": "Heavy-duty steel wheelbarrows for building sites.",
  "unit": "piece",
  "price": "",
  "bulky": false,
  "icon": "🛒",
  "images": []
}
```

3. Make sure every entry (except the last one) ends with a comma `,` after
   the closing `}`, and that the very last entry does **not** have a trailing
   comma. This is the most common mistake — if the page stops showing
   products after you edit the file, check for a missing or extra comma.
4. Save the file and refresh the website in your browser.

### Field guide

| Field         | Required? | What it means                                                                 |
|---------------|-----------|---------------------------------------------------------------------------------|
| `id`          | Yes       | A short, unique code for the product (letters, numbers, dashes only).          |
| `name`        | Yes       | The product name shown on the card.                                            |
| `category`    | Yes       | Must be one of: `building`, `timber`, `plumbing`, `electrical`, `paint`, `tools`, `roofing`. This controls which filter tab the product appears under. |
| `description` | Yes       | A short one or two sentence description.                                       |
| `unit`        | No        | What the price is per, e.g. `bag`, `piece`, `sheet`, `load`, `metre`.           |
| `price`       | No        | Leave as `""` (empty) if you don't want to show a price yet, or put a number, e.g. `"850"`. |
| `bulky`       | No        | `true` or `false` — shows a "🚚 Bulky" badge on the card if `true`.             |
| `icon`        | No        | An emoji shown when the product has no photo, e.g. `"🔩"`.                     |
| `images`      | No        | A list of image file paths (see below). Leave as `[]` for no photo.            |

## Adding a photo for a product

1. Save your photo as a `.jpg` or `.png` file.
2. Copy it into the `images/products/` folder (next to this README, one level
   up).
3. In `products.json`, add the file's path to the product's `images` list,
   for example:

```json
"images": ["images/products/wheelbarrows.jpg"]
```

You can add up to 4 photos to one product — the site will automatically
arrange them into a small photo grid on the card if you add more than one.

## Removing a product

Delete its entire `{ ... }` block from `products.json`, including the comma
that separates it from the next entry.

## Viewing your changes

Simply open `index.html` in a web browser to preview the site.

**Note:** some browsers block a web page from reading local files (like
`products.json`) when you open `index.html` directly by double-clicking it.
If the product list doesn't appear, either:
- Upload the whole website folder to your web hosting and view it online, or
- Run a simple local server for testing. If you have Python installed, open a
  terminal in this folder's parent directory and run:
  ```
  python3 -m http.server
  ```
  then visit `http://localhost:8000` in your browser.
