const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Get all products
router.get('/', async (req, res) => {
  // Code to get all products
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  // Code to get a single product by ID
});

// Create a new product
router.post('/', async (req, res) => {
  // Code to create a new product
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const newCategoryId = req.body.categoryId; // The new category ID to update

    // Check if the new category exists
    const category = await Category.findByPk(newCategoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update the product's category
    const updatedProduct = await Product.update(
      { categoryId: newCategoryId },
      { where: { id: productId } }
    );

    if (updatedProduct[0] === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the product exists and belongs to a category
    const product = await Product.findByPk(productId, {
      include: [{ model: Category }],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product if it belongs to a category
    if (product.Category) {
      await product.destroy();
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(400).json({ message: 'Product has no category assigned' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
