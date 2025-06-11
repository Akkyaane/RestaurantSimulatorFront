import PropTypes from 'prop-types';

const Input = ({type, name, title}) => {
    return (
        <div>
            <label htmlFor={name}>{title}</label>
            <input
                type={type} name={name} id={name}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Input;