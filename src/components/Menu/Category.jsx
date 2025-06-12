import PropTypes from 'prop-types';

const Category = ({name}) => {
    return (
        <h3 className="text-lg font-medium p-2 border-b-1 border-t-1">{name}</h3>
    );
}

Category.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Category;