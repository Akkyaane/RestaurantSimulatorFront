import PropTypes from 'prop-types';

const Button = ({ name, title }) => {
    return (
        <button
            type="submit"
            name={name}
            id={name}
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-black rounded py-2 px-4 text-sm transition"
        >
            {title}
        </button>
    );
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Button;