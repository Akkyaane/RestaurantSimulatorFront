import PropTypes from 'prop-types';
import Category from './Category';
import Dish from './Dish';

const Menu = ({ categories }) => {
  return (
    <div className="menu">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul>
        {categories.map((category, categoryIndex) => (
          <li key={categoryIndex}>
            <Category name={category.name} />
            <ul>
              {category.dishes.map((dish, dishIndex) => (
                <Dish
                  key={dishIndex}
                  title={dish.title || dish.name} // ← si "name" est utilisé à la place de "title"
                  description={dish.description}
                  price={Number(dish.price)}
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
          name: PropTypes.string, // ← au cas où
          description: PropTypes.string.isRequired,
          price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Menu;
