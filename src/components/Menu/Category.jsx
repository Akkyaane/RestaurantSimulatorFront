import PropTypes from 'prop-types';

const Category = ({name}) => {
    return (
            <h3>{name}</h3>
    );
}

Category.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Category;