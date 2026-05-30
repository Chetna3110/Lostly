const User = require('../models/User');
const Item = require('../models/Item');

// @GET /api/admin/stats
const getAdminStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalItems = await Item.countDocuments();
  const lostItems = await Item.countDocuments({ type: 'lost', status: 'active' });
  const foundItems = await Item.countDocuments({ type: 'found', status: 'active' });
  const resolvedItems = await Item.countDocuments({ status: 'resolved' });
  const pendingReview = await Item.countDocuments({ status: 'pending_admin_review' });

  res.json({
    totalUsers,
    totalItems,
    lostItems,
    foundItems,
    resolvedItems,
    pendingReview,
  });
};

// @GET /api/admin/users
const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

// @DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Don't allow deleting yourself
  if (user._id.toString() === req.user.id) {
    return res.status(400).json({ message: 'Cannot delete yourself' });
  }

  await User.findByIdAndDelete(req.params.id);
  // Also delete all items posted by this user
  await Item.deleteMany({ postedBy: req.params.id });
  
  res.json({ message: 'User deleted successfully' });
};

// @PUT /api/admin/users/:id/promote
const promoteToAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.role = 'admin';
  await user.save();

  res.json({ message: 'User promoted to admin', user });
};

// @GET /api/admin/items
const getAllItems = async (req, res) => {
  const { status, type } = req.query;
  const filter = {};
  
  if (status) filter.status = status;
  if (type) filter.type = type;

  const items = await Item.find(filter)
    .populate('postedBy', 'name email')
    .sort({ createdAt: -1 });

  res.json(items);
};

// @DELETE /api/admin/items/:id
const deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted successfully' });
};

// @PUT /api/admin/items/:id/resolve
const markAsResolved = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  item.status = 'resolved';
  await item.save();

  res.json({ message: 'Item marked as resolved', item });
};

// @PUT /api/admin/items/:id/approve
const approveItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  item.status = 'active';
  await item.save();

  res.json({ message: 'Item approved', item });
};

module.exports = {
  getAdminStats,
  getAllUsers,
  deleteUser,
  promoteToAdmin,
  getAllItems,
  deleteItem,
  markAsResolved,
  approveItem,
};