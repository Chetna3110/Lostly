const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getAllUsers,
  deleteUser,
  promoteToAdmin,
  getAllItems,
  deleteItem,
  markAsResolved,
  approveItem,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All routes require admin access
router.use(protect);
router.use(adminOnly);

// Stats
router.get('/stats', getAdminStats);

// Users
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/promote', promoteToAdmin);

// Items
router.get('/items', getAllItems);
router.delete('/items/:id', deleteItem);
router.put('/items/:id/resolve', markAsResolved);
router.put('/items/:id/approve', approveItem);

module.exports = router;