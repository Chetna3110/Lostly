const express = require('express');
const {
  createClaim,
  getClaimsForOwner,
  updateClaimStatus,
} = require('../controllers/claimController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createClaim);
router.get('/owner', protect, getClaimsForOwner);
router.put('/:id', protect, updateClaimStatus);

module.exports = router;