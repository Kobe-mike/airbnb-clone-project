import { useState, useEffect } from 'react';
import { listingService } from '../services/api';

export function useListings(location = '', minPrice = 0, maxPrice = 10000, page = 1) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await listingService.getListings(location, minPrice, maxPrice, page, 10);
        setListings(response.data.listings || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch listings');
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location, minPrice, maxPrice, page]);

  return { listings, loading, error };
}

export function useListing(id) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await listingService.getListingById(id);
        setListing(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch listing');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  return { listing, loading, error };
}
