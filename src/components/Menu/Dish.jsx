import PropTypes from 'prop-types';

const Dish = ({ title, description, price }) => {
  return (
    <li className="flex flex-col gap-1 border-b border-neutral-100 pb-2">
      <span className="font-semibold text-neutral-900">{title}</span>
      <span className="text-neutral-600 text-sm">{description}</span>
      <span className="text-neutral-800 text-sm">{price} €</span>
    </li>
  );
};

Dish.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Dish;
