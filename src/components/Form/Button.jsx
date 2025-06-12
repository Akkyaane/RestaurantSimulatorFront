import PropTypes from 'prop-types';

const Button = ({name, title}) => {
    return (
        <button
            type="submit"
            name={name}
            id={name}
            className="w-full bg-transparent hover:outline-2 hover:outline-white focus:outline-2 focus:outline-white text-white p-2 rounded outline-1 outline-white">
            {title}
        </button>
    );
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Button;