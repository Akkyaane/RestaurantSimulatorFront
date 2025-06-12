import PropTypes from 'prop-types';

const Dish = ({ title, description, price }) => {
  return (
    <li className="flex flex-col gap-4 items-center p-4">
      <span className="font-semibold">{title}</span>
      <span className="text-sm">{description}</span>
      <span className="text-sm">{price} €</span>
      <hr className='w-[100px]' />
    </li>
  );
};

Dish.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Dish;
