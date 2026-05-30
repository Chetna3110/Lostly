const Claim = require('../models/Claim');
const Item = require('../models/Item');

// ==========================
// CREATE CLAIM
// ==========================
const createClaim = async (req, res) => {
  try {
    const { itemId, message } = req.body;

    console.log('🔥 CLAIM CREATED:', req.body, req.user);

    const claim = await Claim.create({
      item: itemId,
      claimant: req.user.id, // correct
      message,
    });

    res.status(201).json(claim);
  } catch (err) {
    console.error('❌ CREATE CLAIM ERROR:', err);
    res.status(500).json({ message: 'Error creating claim' });
  }
};

// ==========================
// GET CLAIMS (ADMIN + OWNER)
// ==========================
const getClaimsForOwner = async (req, res) => {
  try {
    let claims;

    // 🔥 ADMIN → see ALL claims
    if (req.user.role === 'admin') {
      claims = await Claim.find()
        .populate('claimant', 'name email')
        .populate('item', 'title');
    } 
    // 👤 USER → only claims for their items
    else {
      const items = await Item.find({ postedBy: req.user.id });
      const itemIds = items.map(i => i._id);

      claims = await Claim.find({ item: { $in: itemIds } })
        .populate('claimant', 'name email')
        .populate('item', 'title');
    }

    console.log('🔥 CLAIMS FETCHED:', claims.length);

    res.json(claims);
  } catch (err) {
    console.error('❌ FETCH CLAIM ERROR:', err);
    res.status(500).json({ message: 'Error fetching claims' });
  }
};

// ==========================
// UPDATE CLAIM STATUS
// ==========================
const updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const claim = await Claim.findById(req.params.id).populate('item');

    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    // 🔥 ONLY ADMIN should approve/reject
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin only action' });
    }

    claim.status = status;
    await claim.save();

    // ✅ If approved → mark item resolved
    if (status === 'approved') {
      await Item.findByIdAndUpdate(claim.item._id, {
        status: 'resolved',
      });
    }

    res.json(claim);
  } catch (err) {
    console.error('❌ UPDATE CLAIM ERROR:', err);
    res.status(500).json({ message: 'Error updating claim' });
  }
};

module.exports = {
  createClaim,
  getClaimsForOwner,
  updateClaimStatus,
};