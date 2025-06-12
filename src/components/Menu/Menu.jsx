import PropTypes from 'prop-types';
import Category from './Category';
import Dish from './Dish';

const Menu = ({ categories }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-6 text-neutral-900">Menu</h2>
      <ul className="space-y-8">
        {categories.map((category, categoryIndex) => (
          <li key={categoryIndex}>
            <Category name={category.name} />
            <ul className="space-y-2">
              {category.dishes.map((dish, dishIndex) => (
                <Dish
                  key={dishIndex}
                  title={dish.name}
                  description={dish.description}
                  price={dish.price}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
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