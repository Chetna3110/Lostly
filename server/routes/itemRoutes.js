const express = require('express');
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getMyItems,
} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getAllItems);
router.get('/my/posts', protect, getMyItems);
router.get('/:id', getItemById);
router.post('/', protect, upload.array('images', 5), createItem); // Max 5 images
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;