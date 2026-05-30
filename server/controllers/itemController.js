const Item = require('../models/Item');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @POST /api/items
const createItem = async (req, res) => {
  const { title, description, category, type, location, date } = req.body;

  // Upload images to Cloudinary
  const imageUrls = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'lost-and-found',
      });
      imageUrls.push(result.secure_url);

      // delete local file
      fs.unlinkSync(file.path);
    }
  }

  // ✅ IMPORTANT: auto-fill user details
  const item = await Item.create({
    title,
    description,
    category,
    type,
    location,
    date,
    images: imageUrls,

    // 🔥 auto-filled fields (fixes your error)
    studentName: req.user.name,
    enrollmentNumber: req.user.enrollmentNumber,
    branch: req.user.branch,
    year: req.user.year,
    contactPhone: req.user.phone || 'N/A',

    postedBy: req.user.id,
  });

  res.status(201).json({
    message: 'Item posted successfully',
    item,
  });
};

// @GET /api/items
const getAllItems = async (req, res) => {
  const { type, category, search } = req.query;

  const filter = { status: 'active' };

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

      const items = await Item.find(filter)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });

    const safeItems = items.map(item => {
      const obj = item.toObject();

      // If NOT admin → hide sensitive fields
      if (req.user?.role !== 'admin') {
        delete obj.description;
        delete obj.location;
      }

      return obj;
    });

    res.json(safeItems);

  res.json(items);
};

    // @GET /api/items/:id
    const getItemById = async (req, res) => {
      const item = await Item.findById(req.params.id)
        .populate('postedBy', 'name email');

      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      let itemObj = item.toObject();

      // Hide sensitive fields for normal users
      if (req.user?.role !== 'admin') {
        delete itemObj.description;
        delete itemObj.location;
      }

      res.json(itemObj);
    };

// @PUT /api/items/:id
const updateItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  // Only owner or admin
  if (item.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to update this item' });
  }

  const updated = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({ message: 'Item updated', item: updated });
};

// @DELETE /api/items/:id
const deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  // Only owner or admin
  if (item.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to delete this item' });
  }

  await Item.findByIdAndDelete(req.params.id);

  res.json({ message: 'Item deleted' });
};

// @GET /api/items/my/posts
const getMyItems = async (req, res) => {
  const items = await Item.find({ postedBy: req.user.id })
    .sort({ createdAt: -1 });

  res.json(items);
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getMyItems,
};