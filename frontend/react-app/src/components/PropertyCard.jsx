export default function PropertyCard({ property }) {
  const { id, name, location, rating, price, image } = property;

  return (
    <div className="property-card">
      <div className="property-card__image">
        {image || '🏨'}
      </div>
      <div className="property-card__content">
        <h3 className="property-card__name">{name}</h3>
        <p className="property-card__location">{location}</p>
        <div className="property-card__rating">
          <span>⭐ {rating}</span>
        </div>
        <div className="property-card__price">
          ${price}
          <span className="property-card__price-label">/night</span>
        </div>
        <button className="btn btn--primary property-card__btn">View Details</button>
      </div>
    </div>
  );
}
