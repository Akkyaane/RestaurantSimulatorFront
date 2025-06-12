import PropTypes from 'prop-types';

const Category = ({name}) => {
    return (
        <h3 className="text-lg font-medium text-neutral-800 mb-2">{name}</h3>
    );
}

Category.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Category;