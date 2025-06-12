import PropTypes from 'prop-types';

const Dish = ({ title, description, price }) => {
  return (
    <ul>
      <li><strong>{title}</strong></li>
      <li>{description}</li>
      <li>{price} €</li>
    </ul>
  );
};

Dish.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Dish;
