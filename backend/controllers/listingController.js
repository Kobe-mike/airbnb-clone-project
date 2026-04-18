import Property from '../models/Property.js';
import { createListingSchema, updateListingSchema } from '../middleware/validate.js';

const listingController = {
  async getListings(req, res) {
    try {
      const { location, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const listings = await Property.findAll({ 
        location, 
        minPrice: parseFloat(minPrice), 
        maxPrice: parseFloat(maxPrice), 
        limit: parseInt(limit), 
        offset 
      });
      res.json({ listings, page: parseInt(page), limit: parseInt(limit) });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getListingById(req, res) {
    try {
      const { id } = req.params;
      const listing = await Property.findById(parseInt(id));
      if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
      }
      res.json(listing);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createListing(req, res) {
    try {
      const { error } = createListingSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const listingId = await Property.create(req.body, req.user.id);
      res.status(201).json({ id: listingId, message: 'Listing created successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async updateListing(req, res) {
    try {
      const { error } = updateListingSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { id } = req.params;
      const success = await Property.update(parseInt(id), req.body, req.user.id);
      if (!success) {
        return res.status(404).json({ message: 'Listing not found or access denied' });
      }
      res.json({ message: 'Listing updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteListing(req, res) {
    try {
      const { id } = req.params;
      const success = await Property.delete(parseInt(id), req.user.id);
      if (!success) {
        return res.status(404).json({ message: 'Listing not found or access denied' });
      }
      res.json({ message: 'Listing deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default listingController;
