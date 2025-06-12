import PropTypes from 'prop-types';
import Category from './Category';
import Navbar from '../Navbar/Navbar';
import Dish from './Dish';

const Menu = ({ categories }) => {
  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-xl font-semibold p-6">Menu</h2>
        <ul>
          {categories.map((category, categoryIndex) => (
            <li key={categoryIndex}>
              <Category name={category.name} />
              <ul className="space-y-2">
                {category.dishes.map((dish, dishIndex) => (
                  <Dish
                    key={dishIndex}
                    title={dish.name}
                    description={dish.description}
                    price={dish.price} />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

Menu.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      dishes: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          name: PropTypes.string,
          description: PropTypes.string.isRequired,
          price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Menu;