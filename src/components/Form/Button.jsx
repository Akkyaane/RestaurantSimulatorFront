import PropTypes from 'prop-types';

const Button = ({name, title}) => {
    return (
        <button
            type="submit"
            name={name}
            id={name}
            className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {title}
        </button>
    );
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Button;